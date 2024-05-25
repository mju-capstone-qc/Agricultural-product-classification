import numpy as np
from keras.preprocessing.image import load_img, img_to_array
from keras.applications.resnet50 import preprocess_input
import joblib
from keras.applications.resnet50 import ResNet50

def load_models(model_path):
    loaded_oc_svm_clf = joblib.load(model_path+'oc_svm_model.pkl')
    loaded_if_clf = joblib.load(model_path+'if_model.pkl')
    loaded_ss = joblib.load(model_path+'scaler.pkl')
    loaded_pca = joblib.load(model_path+'pca.pkl')
    print("모델이 성공적으로 불러와졌습니다.")
    return loaded_oc_svm_clf, loaded_if_clf, loaded_ss, loaded_pca

def load_ResNet50():
  return ResNet50(input_shape=(299, 299, 3), weights='imagenet', include_top=False)

def preprocess_features(features):
    return features.reshape(-1, np.prod(features.shape[1:]))

def extract_resnet(X, resnet_model):
    features_array = resnet_model.predict(X)
    return features_array

def load_image(img):
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

def predict_with_loaded_models(features, ss, pca, oc_svm_clf, if_clf):
    features_scaled = ss.transform(preprocess_features(features))
    features_pca = pca.transform(features_scaled)
    oc_svm_preds = oc_svm_clf.predict(features_pca)
    if_preds = if_clf.predict(features_pca)
    return oc_svm_preds, if_preds