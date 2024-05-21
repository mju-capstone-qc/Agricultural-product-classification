# model_utils.py
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.optimizers.schedules import ExponentialDecay
from tensorflow.keras.models import load_model
from BE.python.utils import f1_m, precision_m, recall_m

def load_and_compile_model(model_path):
    # 모델 불러오기
    model = load_model(model_path, custom_objects={'f1_m': f1_m, 'precision_m': precision_m, 'recall_m': recall_m})

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
    model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy', f1_m, precision_m, recall_m])

    return model
