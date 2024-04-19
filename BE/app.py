import os #경로와 파일을 다뤄 위치를 지정하거나 삭제함
import requests #경로를 생성하거나 서버로 오는 요청을 수신
import numpy as np #수학연산, 행렬 작업
import tensorflow as tf
import naite_db

from imageio import imsave, imread
from flask import Flask, request, jsonify, Request, Response
from tensorflow.keras.models import load_model
import tensorflow as tf
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.optimizers.schedules import ExponentialDecay
from tensorflow.keras.preprocessing import image

import os, shutil
from tensorflow.keras import backend
from rembg import remove
from PIL import Image
import cv2
from io import BytesIO
from google.cloud import storage
import base64
from datetime import datetime
import secrets
import string

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="C:\capstone\BE\cellular-client-420611-c576a2795cf2.json"

storage_client = storage.Client()

bucket_name = 'exaple_naite'    # 서비스 계정 생성한 bucket 이름 입력
bucket = storage_client.bucket(bucket_name)

def get_user_info(email: str):
    # MySQL 연결 설정
    db_class = naite_db.Database()

    # MySQL 쿼리 실행
    query = "SELECT user_email, user_name FROM user WHERE user_email = %s"
    user_info = db_class.executeOne(query, (email,))

    # 연결 및 커서 닫기
    db_class.close()

    return user_info

def add_user_info(email: str, name: str, user_id: int):
    # MySQL 연결 설정
    db_class = naite_db.Database()

    # MySQL 쿼리 실행
    query = "insert into user(user_email, user_name, user_id) values (%s,%s,%s);"
    db_class.execute(query, (email, name, user_id))

    db_class.commit()
    # 연결 및 커서 닫기
    db_class.close()

    return 'success'

# 현재 시간을 기준으로 고유한 파일 이름 생성
def generate_unique_filename():
    now = datetime.now()
    timestamp = now.strftime("%Y%m%d%H%M%S")
    random_string = ''.join(secrets.choice(string.ascii_letters + string.digits) for i in range(8))  # 8자리 무작위 문자열 생성
    unique_filename = f"image_{timestamp}_{random_string}.jpg"
    return unique_filename

#모델 구조 가져오기
# 모델 망구성방식(토폴로지)에 대한 정보가 담긴 json 파일, 가중치를 저장하는 .h5 파일 

def recall_m(y_true, y_pred):
    true_positives = backend.sum(backend.round(backend.clip(y_true * y_pred, 0, 1)))
    possible_positives = backend.sum(backend.round(backend.clip(y_true, 0, 1)))
    recall = true_positives / (possible_positives + backend.epsilon())
    return recall

def precision_m(y_true, y_pred):
    true_positives = backend.sum(backend.round(backend.clip(y_true * y_pred, 0, 1)))
    predicted_positives = backend.sum(backend.round(backend.clip(y_pred, 0, 1)))
    precision = true_positives / (predicted_positives + backend.epsilon())
    return precision

def f1_m(y_true, y_pred):
    precision = precision_m(y_true, y_pred)
    recall = recall_m(y_true, y_pred)
    return 2*((precision*recall)/(precision+recall+backend.epsilon()))
    

# 모델 불러오기
model = load_model('D:\농산물\models\cabbage\model_full.h5', custom_objects={'f1_m': f1_m, 'precision_m': precision_m, 'recall_m': recall_m})

# learning rate 스케줄링 설정
initial_learning_rate = 0.0001
lr_schedule = ExponentialDecay(
    initial_learning_rate,
    decay_steps=10000,
    decay_rate=0.9,
    staircase=True
)

# Adam optimizer 설정
optimizer = Adam(learning_rate=lr_schedule)

# 모델 컴파일
model.compile(optimizer=optimizer,loss='categorical_crossentropy',metrics=['accuracy', f1_m, precision_m, recall_m])

#flask api 만들기
app = Flask(__name__)

@app.post("/image")
def imgPost():

    db_class = naite_db.Database()

    file = request.json.get('file')
    if file:
        # base64 이미지 데이터를 디코딩하여 이미지로 저장
        image_data = base64.b64decode(file)

        img = Image.open(BytesIO(image_data))

        # 이미지 열기
        # img = Image.open(upload_dir)
        out = remove(img)

        # 배경이 흰색인 이미지 생성
        white_bg = Image.new("RGBA", img.size, "WHITE")
        white_bg.paste(img, (0, 0), out)
        white_bg = white_bg.convert("RGB")

        # PIL 이미지를 OpenCV 이미지로 변환
        open_cv_image = np.array(white_bg)
        # Convert RGB to BGR
        open_cv_image = open_cv_image[:, :, ::-1]

        # 그레이 스케일 변환
        gray = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        if contours:
            c = max(contours, key=cv2.contourArea)

            # 윤곽을 둘러싸는 사각형을 구합니다.
            x, y, w, h = cv2.boundingRect(c)

            # 사각형에 따라 이미지를 자릅니다.
            crop_img = open_cv_image[y:y+h, x:x+w]

        # OpenCV 이미지를 다시 PIL 이미지로 변환
        crop_img_pil = Image.fromarray(crop_img[:, :, ::-1])  # BGR to RGB

        # 이미지 크기 조정
        target_size = (299, 299)
        resized_image = crop_img_pil.resize(target_size)

        destination_blob_name = generate_unique_filename()  # 업로드할 파일을 GCP에 저장할 때의 이름

        # 이미지를 Google Cloud Storage에 업로드
        blob = bucket.blob(destination_blob_name)
        with BytesIO() as output:
            resized_image.save(output, format='JPEG')
            output.seek(0)
            blob.upload_from_file(output, content_type='image/jpeg')
        
        sql = "INSERT INTO photo(user_email, product_id, image_path) VALUES (%s, %s, %s)"
        values = ('jjjk0605@naver.com',1,'https://storage.googleapis.com/exaple_naite/'+destination_blob_name)
        print(values)
        db_class.execute(sql, values)
        db_class.commit()
        db_class.close()

        x = image.img_to_array(resized_image)
        x = np.expand_dims(x, axis=0)
        x /= 255.

        output = model.predict(x)
        class_probabilities = tf.nn.softmax(output[0]).numpy().tolist()
        print(class_probabilities)

        max_value = max(class_probabilities)
        max_index = class_probabilities.index(max_value)

        return jsonify({"predicted_percent": class_probabilities, "predicted_class": max_index, "url": 'https://storage.googleapis.com/exaple_naite/'+destination_blob_name})

#flask 실행
@app.get("/kakao")
def hello():
    code = request.args.get('code')

    return ''

@app.post('/kakao/login')
def login():
    try:
        ACCESS_TOKEN = request.json.get('access_token')

        # 카카오 API 호출을 위한 URL 및 헤더 설정
        url = 'https://kapi.kakao.com/v2/user/me'
        headers = {
            'Authorization': f'Bearer {ACCESS_TOKEN}'
        }
        # 카카오 API 호출
        response = requests.get(url, headers=headers)
        response_data = response.json()
        if response.ok:
            user_id = response_data['id']
            nickname = response_data['properties']['nickname']
            email = response_data['kakao_account']['email']
            print(user_id)

            # 사용자 정보 DB에서 조회
            # 예시로 result 변수에는 DB에서 조회한 결과를 담아야 합니다.
            # 이 부분은 사용자 정보를 DB에서 조회하고, 결과를 result 변수에 저장하는 코드로 대체되어야 합니다.
            result = get_user_info(email)
            print(result)
            if result:
                response = {
                    'result': 'success',
                    'data': result
                }
            else:
                # 사용자 정보가 DB에 없는 경우, DB에 추가하고 추가된 사용자 정보를 반환합니다.
                # 예시로 payload 변수에는 새로운 사용자 정보를 담아야 합니다.
                # 이 부분은 새로운 nickname 정보를 DB에 추가하고, 추가된 사용자 정보를 반환하는 코드로 대체되어야 합니다.
                add_user_info(email, nickname, user_id)
                print('hello')
                data = get_user_info(email)  # 추가된 사용자 정보를 조회하는 코드
                # 이 부분은 실제 사용되는 데이터베이스 ORM에 맞게 수정되어야 합니다.

                response = {
                    'result': 'success',
                    'data': data
                }

        else:
            # 카카오 API 호출이 실패한 경우 에러 응답 반환
            response = {
                'result': 'fail',
                'error': '카카오 API 호출 실패'
            }

    except Exception as e:
        # 예외가 발생한 경우 에러 응답 반환
        response = {
            'result': 'fail',
            'error': str(e)
        }

    # JSON 형태로 응답 반환
    return response


app.run(host='0.0.0.0', port=5000, debug=False)
