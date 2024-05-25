# app.py
from flask import Flask, request, jsonify
from model_utils import load_and_compile_model
from utils import img_check, process_and_save_image, getInfo, localLogin, getHistory, getProfile, editingName, editingPassword, delAccount, saveResult
from google.cloud import storage
from dotenv import load_dotenv
import os
import tensorflow as tf
# oc 모델 로드 함수 임포트
from oc_model_utils import load_models, load_ResNet50

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
fuji_apple_model_path = 'C:/capstone/BE/models/fuji_apple/model.h5'
radish_model_path = 'C:/capstone/BE/models/radish/model.h5'

# 모델 불러오기 및 컴파일
cabbage_model = load_and_compile_model(cabbage_model_path)
fuji_apple_model = load_and_compile_model(fuji_apple_model_path)
radish_model = load_and_compile_model(radish_model_path)

# oc모델 경로 설정
cabbage_oc_path = 'C:/capstone/BE/models/cabbage/oc_model/'
fuji_apple_oc_path = 'C:/capstone/BE/models/cabbage/oc_model/'
radish_oc_path = 'C:/capstone/BE/models/cabbage/oc_model/'

# oc모델 불러오기
cabbage_oc, cabbage_clf, cabbage_ss, cabbage_pca = load_models(cabbage_oc_path)
fuji_apple_oc, fuji_apple_clf, fuji_apple_ss, fuji_apple_pca = load_models(fuji_apple_oc_path)
radish_oc, radish_clf, radish_ss, radish_pca = load_models(radish_oc_path)

# ResNet모델 불러오기
resnet_model = load_ResNet50()

@app.post("/check")
def check():
    file = request.json.get('file')
    label = request.json.get('label')
    if(file and label):
        if label == 'cabbage':
            result = img_check(file, cabbage_oc, cabbage_clf, cabbage_ss, cabbage_pca, resnet_model)
        elif label == 'fuji_apple':
            result = img_check(file, fuji_apple_oc, fuji_apple_clf, fuji_apple_ss, fuji_apple_pca, resnet_model)
        elif label == 'radish':
            result = img_check(file, radish_oc, radish_clf, radish_ss, radish_pca, resnet_model)
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
        elif label == 'fuji_apple':
            result = process_and_save_image(email, file, bucket, fuji_apple_model, 2)
        elif label == 'radish':
            result = process_and_save_image(email, file, bucket, radish_model, 4)
        else:
            return jsonify({"error": "Invalid label"}), 400
        return jsonify(result)
    
@app.post("/save")
def save():
    url = request.json.get('url')
    email = request.json.get('email')
    product_id = request.json.get('product_id')
    predicted_class = request.json.get('predicted_class')
    # date = request.json.get('date')
    if(url and email and product_id and predicted_class):
        result = saveResult(url, email, product_id, predicted_class)
        return result
    
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