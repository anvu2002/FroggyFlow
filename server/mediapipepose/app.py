import cv2
import mediapipe as mp
import numpy as np
#give drawing utilities
mp_drawing = mp.solutions.drawing_utils 
#import pose estimation model
mp_pose = mp.solutions.pose

#create angle between shoulder and wrist
def calculate_angle(a,b,c):
    a = np.array(a) #First starting point
    b = np.array(b) #Mid point
    c = np.array(c) #Endpoint 
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180/np.pi)
    if angle > 180.0:
        angle = 360-angle
    return angle

# Detection
cap = cv2.VideoCapture(0)

#
counter = 0 
stage = None

##Setup mediapipe sample 
##accessing pose and setting up detection and tracking confidence -> bump confidence for more accurate confidence

with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
        ret, frame = cap.read()
        # Recolor image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False

        #Create detect
        results = pose.process(image)

        #Recolor back to BGR
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        #Extract landmark
        try: 
            landmarks = results.pose_landmarks.landmark
            
            shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
            elbow = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
            wrist = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]

            #Calculate angle
            angle = calculate_angle(shoulder, elbow, wrist)

            #Visualize 
            cv2.putText(image, str(angle),
                        tuple(np.multiply(elbow, [640, 480]).astype(int)), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                            
                       )

            #jumping jack counter logic 
            if angle > 160:
                stage = "down"
            if angle < 30 and stage == 'down':
                stage = "up"
                counter += 1
                print (counter)
        except: 
            pass

        # render jumping jack counter
        # setup status box
        cv2.rectangle(image, (0,0), (300,150), (245, 117, 16), -1)

        # rep data
        cv2.putText(image, 'REPS', (20, 80),
                    cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 1, cv2.LINE_AA)
        cv2.putText(image, str(counter), (20,130), cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2, cv2.LINE_AA)

        # Stage data
        cv2.putText(image, 'STAGE', (200, 80),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 1, cv2.LINE_AA)
        cv2.putText(image, stage, (180,130), cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2, cv2.LINE_AA)  

        #drawingSpec is the specification of drawing a landmark
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS, 
                                  mp_drawing.DrawingSpec(color = (245, 117, 66), thickness = 2, circle_radius = 2), 
                                 mp_drawing.DrawingSpec(color=(245, 66, 230), thickness = 2, circle_radius = 2))
        
        cv2.imshow('Mediapipe Feed', image)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
            
    cap.release()
    cv2.destroyAllWindows()

    #mp_drawing.DrawingSpec?