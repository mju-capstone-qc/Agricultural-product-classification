# app.py
from flask import Flask, request, jsonify
from model_utils import load_and_compile_model
from utils import process_and_save_image, getInfo
from google.cloud import storage
import os

app = Flask(__name__)

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="C:\capstone\BE\cellular-client-420611-c576a2795cf2.json"
storage_client = storage.Client()
bucket_name = 'exaple_naite'    # 서비스 계정 생성한 bucket 이름 입력
bucket = storage_client.bucket(bucket_name)

# 모델 경로 설정
cabbage_model_path = 'D:/농산물데이터/models/cabbage/model.h5'
fuji_apple_model_path = 'D:/농산물데이터/models/fuji_apple/model.h5'
radish_model_path = 'D:/농산물데이터/models/radish/model.h5'

# 모델 불러오기 및 컴파일
cabbage_model = load_and_compile_model(cabbage_model_path)
fuji_apple_model = load_and_compile_model(fuji_apple_model_path)
radish_model = load_and_compile_model(radish_model_path)

@app.post("/image")
def imgPost():
    file = request.json.get('file')
    label = request.json.get('label')
    if (file and label):
        if label == 'cabbage':
            result = process_and_save_image(file, bucket, cabbage_model, 1)
        elif label == 'fuji_apple':
            result = process_and_save_image(file, bucket, fuji_apple_model, 2)
        elif label == 'radish':
            result = process_and_save_image(file, bucket, radish_model, 4)
        else:
            return jsonify({"error": "Invalid label"}), 400
        print('결과다',result)
        return jsonify(result)
    
@app.post("/info")
def info():
    label = request.json.get('label')
    info = getInfo(label)
    return info

app.run(host='0.0.0.0', port=5000, debug=False)