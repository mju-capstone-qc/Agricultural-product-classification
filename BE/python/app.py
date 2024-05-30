# app.py
from flask import Flask, request, jsonify
from model_utils import load_and_compile_model
from utils import img_check, process_and_save_image, getInfo, localLogin, getHistory, getProfile, editingName, editingPassword, delAccount, saveResult
from google.cloud import storage
from dotenv import load_dotenv
import os
import tensorflow as tf
# oc 모델 로드 함수 임포트
from oc_model_utils import load_models, load_inception

app = Flask(__name__)

load_dotenv()
GOOGLE_APPLICATION_CREDENTIALS = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
storage_client = storage.Client()
bucket_name = 'exaple_naite'    # 서비스 계정 생성한 bucket 이름 입력
bucket = storage_client.bucket(bucket_name)

# TensorFlow GPU 버전 설치 확인
print(tf.test.is_built_with_cuda())  # True 여야 함

# GPU 장치 목록 확인
gpus = tf.config.experimental.list_physical_devices('GPU')
print("사용 가능한 GPU:", gpus)

# 필요한 경우 메모리 세션 제한 해제
for gpu in gpus:
    tf.config.experimental.set_memory_growth(gpu, True)

# 모델 경로 설정
cabbage_model_path = 'C:/capstone/BE/models/cabbage/model.h5'
apple_model = 'C:/capstone/BE/models/apple/model.h5'
radish_model_path = 'C:/capstone/BE/models/radish/model.h5'

# 모델 불러오기 및 컴파일
cabbage_model = load_and_compile_model(cabbage_model_path)
apple_model = load_and_compile_model(apple_model)
radish_model = load_and_compile_model(radish_model_path)

# oc모델 경로 설정
cabbage_oc_path = 'C:/capstone/BE/models/cabbage/oc_model/'
apple_oc_model = 'C:/capstone/BE/models/apple/oc_model/'
radish_oc_path = 'C:/capstone/BE/models/radish/oc_model/'

# oc모델 불러오기
cabbage_clf = load_models(cabbage_oc_path)
apple_clf = load_models(apple_oc_model)
radish_clf = load_models(radish_oc_path)

# ResNet모델 불러오기
inception_model = load_inception()

@app.post("/check")
def check():
    file = request.json.get('file')
    label = request.json.get('label')
    if(file and label):
        if label == 'cabbage':
            result = img_check(file, cabbage_clf, inception_model)
        elif label == 'apple':
            result = img_check(file, apple_clf, inception_model)
        elif label == 'radish':
            result = img_check(file, radish_clf, inception_model)
        else:
            return jsonify({"error": "Invalid label"}), 400
        return jsonify(result)

@app.post("/image")
def imgPost():
    file = request.json.get('file')
    label = request.json.get('label')
    email = request.json.get('email')
    if (file and label and email):
        if label == 'cabbage':
            result = process_and_save_image(email, file, bucket, cabbage_model, 1)
        elif label == 'apple':
            result = process_and_save_image(email, file, bucket, apple_model, 2)
        elif label == 'radish':
            result = process_and_save_image(email, file, bucket, radish_model, 3)
        else:
            return jsonify({"error": "Invalid label"}), 400
        return jsonify(result)
    
@app.post("/save")
def save():
    url = request.json.get('url')
    email = request.json.get('email')
    product_id = request.json.get('product_id')
    predicted_class = request.json.get('predicted_class')
    date = request.json.get('date')
    print(date)
    if(url and email and product_id and predicted_class>=0 and date):
        result = saveResult(url, email, product_id, predicted_class, date)
        return jsonify({'status': 'success', 'message': 'Data saved successfully'})
    
@app.post("/info")
def info():
    label = request.json.get('label')
    info = getInfo(label)
    return info

@app.post("/login")
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    if(email and password):
        exist = localLogin(email, password)
        print(exist)
    return exist

@app.post("/history")
def history():
    email = request.json.get('email')
    if(email):
        hist = getHistory(email)
        return jsonify(hist)
    
@app.post("/profile")
def profile():
    email = request.json.get('email')
    if(email):
        profile = getProfile(email)
        return profile
    
@app.post("/editName")
def editName():
    email = request.json.get('email')
    name = request.json.get('name')
    if(email and name):
        edit = editingName(email, name)
        return edit,200

@app.post("/editPassword")
def editPassword():
    email = request.json.get('email')
    password = request.json.get('password')
    if(email and password):
        edit = editingPassword(email, password)
        return edit,200

@app.post("/deleteAccount")
def deleteAccount():
    email = request.json.get('email')
    if(email):
        delAccount(email)
        return {'success':'success'},200

app.run(host='0.0.0.0', port=5000, debug=False)