import numpy as np
import joblib
from keras.applications.resnet50 import ResNet50
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications import InceptionV3
from tensorflow.keras.models import Model
from tensorflow.keras.layers import GlobalAveragePooling2D

def load_models(model_path):
    loaded_if_clf = joblib.load(model_path+'if_clf_model.pkl')
    print("모델이 성공적으로 불러와졌습니다.")
    return loaded_if_clf

def extract_features(img, model):
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    features = model.predict(img_array)
    return features

def load_inception():
    IMG_SIZE = 299
    # InceptionV3 모델 로드 (ImageNet 가중치 사용, 최상위 레이어 제외)
    base_model = InceptionV3(weights='imagenet', include_top=False, input_shape=(IMG_SIZE, IMG_SIZE, 3))

    # 특징 추출 모델 구성
    models = Model(inputs=base_model.input, outputs=GlobalAveragePooling2D()(base_model.output))
    return models

def predict_is(if_clf, features):
    prediction = if_clf.predict(features)
    return prediction