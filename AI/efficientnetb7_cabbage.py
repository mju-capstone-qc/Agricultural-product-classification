import numpy as np
from tensorflow.keras.applications import EfficientNetB7
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.optimizers.schedules import ExponentialDecay
from tensorflow.keras.regularizers import l2
import os
from tensorflow.keras import backend
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau

def add_gaussian_noise(image):
    row, col, ch = image.shape
    mean = 0
    var = 0.1
    sigma = var ** 0.5
    gauss = np.random.normal(mean, sigma, (row, col, ch))
    gauss = gauss.reshape(row, col, ch)
    noisy = image + gauss
    return noisy


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

base_dir = '/content/drive/Othercomputers/내 노트북 (1)/농산물데이터/cabbage/data'
train_dir = os.path.join(base_dir, 'Training')
validation_dir = os.path.join(base_dir, 'Validation')
test_dir = os.path.join(base_dir, 'Test')

IMG_SIZE = 299
train_datagen = ImageDataGenerator(
    rescale=1./255,
    brightness_range=[0.6, 1.2],
    channel_shift_range=30.0,
    shear_range=0.2,
    preprocessing_function=add_gaussian_noise,
    horizontal_flip=True
    )

test_datagen = ImageDataGenerator(rescale=1./255)

validation_datagen = ImageDataGenerator(rescale=1./255)


train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=32,
    class_mode='categorical',)

validation_generator = validation_datagen.flow_from_directory(
    validation_dir,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=32,
    class_mode='categorical',)

test_generator = test_datagen.flow_from_directory(
    test_dir,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=32,
    class_mode='categorical',)

with open("/content/drive/Othercomputers/내 노트북 (1)/농산물데이터/cabbage/category.txt", "w") as text_file:
    print(train_generator.class_indices, file=text_file)

backend.clear_session()

# EfficientNetB7 모델 로드
base_model = EfficientNetB7(input_shape=(IMG_SIZE, IMG_SIZE, 3), weights='imagenet', include_top=False)

# 모델 구축
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu', kernel_regularizer=l2(0.001))(x)
x = Dropout(0.3)(x)
output = Dense(3, activation='softmax')(x)

# Model 클래스로 전체 모델 구성
model = Model(inputs=base_model.input, outputs=output)

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
model.compile(optimizer=optimizer,
              loss='categorical_crossentropy',
              metrics=['accuracy', f1_m, precision_m, recall_m])

model.summary()


# EarlyStopping: 모델이 더 이상 개선되지 않을 때 조기에 학습을 중단합니다.
early_stopping = EarlyStopping(monitor='val_loss', patience=10, verbose=1)

# ReduceLROnPlateau: 'val_loss'가 개선되지 않을 때 학습률을 동적으로 감소시킵니다.
reduce_lr = ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.2,  # 학습률을 20% 감소
    patience=5,  # 'val_loss'의 개선이 5 에포크 동안 없을 경우
    min_lr=0.001,  # 최소 학습률
    verbose=1)

while(True):
  # 모델 학습
  history1 = model.fit(
      train_generator,
      validation_data=validation_generator,
      epochs=1,
      verbose=1,
      callbacks=[early_stopping, reduce_lr]
  )

  if history1.history['val_accuracy'][0]>0.90:
    loss, accuracy, f1_score, precision, recall = model.evaluate(test_generator)
    print('Model testing loss, accuracy, f1_score, precision, recall:', loss, " ", accuracy, " ", f1_score, " ", precision, " ", recall, " ")
    if accuracy>0.90:
      model.save('/content/drive/Othercomputers/내 노트북 (1)/농산물데이터/models/cabbage/new/model_1.h5')
      break

# # Evaluate the test accuracy and test loss of the model
loss, accuracy, f1_score, precision, recall = model.evaluate(test_generator)
print('Model testing loss, accuracy, f1_score, precision, recall:', loss, " ", accuracy, " ", f1_score, " ", precision, " ", recall, " ")

loss, accuracy, f1_score, precision, recall = model.evaluate(validation_generator)
print('Model validation loss, accuracy, f1_score, precision, recall:', loss, " ", accuracy, " ", f1_score, " ", precision, " ", recall, " ")