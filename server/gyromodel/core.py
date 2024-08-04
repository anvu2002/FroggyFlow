import subprocess
import sys
from loguru import logger

# def install_requirements():
#     try:
#         # Open the requirements.txt file and read the packages
#         with open('requirements.txt', 'r') as f:
#             packages = f.read().splitlines()
        
#         # Install each package using pip
#         for package in packages:
#             subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])
#     except Exception as e:
#         print(f"An error occurred: {e}")

# if __name__ == "__main__":
#     install_requirements()


import mediapipe as mp
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

bad_df = pd.read_csv("gyromodel/data/bad_test.csv")
good_df = pd.read_csv("gyromodel/data/good_test.csv")
#Label data points as good or bad
bad_df['label'] = 'bad'
good_df['label'] = 'good' 

#Combine data into one
combined_data = pd.concat([bad_df, good_df], ignore_index=True)
# combined_data['time_delta'] = combined_data['time'].diff().fillna(0)
# window_size = 1000  #ms
# combined_data['rolling_mean'] = combined_data['time'].rolling(window=window_size).mean()

# print(combined_data.head())
# print(combined_data.tail())

# combined_data['time_delta'] = combined_data['time'].diff().fillna(0)

X = combined_data.drop('label', axis=1) 
y = combined_data['label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))

# Predict posture quality score in percentage
y_pred_proba = model.predict_proba(X_test)
prob_positive_class = y_pred_proba[:, 1]
scores_percentage = prob_positive_class * 100
print("scores: ", scores_percentage)

#Function to predict new data and classify them if bad or good
def predict_new_data(new_data):
    new_data = scaler.transform(new_data)  
    predictions = model.predict(new_data)
    scores = model.predict_proba(new_data)
    return (predictions[0], scores)

# columns = ['ax', 'ay', 'az', 'gx', 'gy', 'gz', 'time']
# new_data= pd.DataFrame([[-0.84, -0.21, 0.50, -0.92, -0.06, -0.92, 100]], columns=columns)

# breakpoint()
# print(predict_new_data(new_data))
