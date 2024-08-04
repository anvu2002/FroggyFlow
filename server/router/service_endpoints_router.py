from fastapi import Request, APIRouter, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
from loguru import logger
import json
import pandas as pd


# Importing the 2 ML Models
from gyromodel.core import predict_new_data

router = APIRouter(prefix="/api", tags=["api"])

@router.post("/gyro_predict")
async def gyro_predict(request: Request):
    """
    image to text endpoint
    request format:
    {
        "gyro_data": [???],
    }
    """

    data = await request.json()
    logger.info(f"requested data['gyro_data'] = {data['gyro_data']}")

    columns = ['ax', 'ay', 'az', 'gx', 'gy', 'gz', 'time']
    new_data= pd.DataFrame([data['gyro_data']], columns=columns)
   
    (result, scores) = predict_new_data(new_data)

    logger.debug("--- POSTURE --- is " + result)

    return result


@router.post("/session_summary")
async def session_summary(request: Request):
    """
    image to text endpoint
    request format:
    {
        "gyro_data": [???],
    }
    """

    data = await request.json()
    results = []

    for item in data['gyro_data']:
        columns = ['ax', 'ay', 'az', 'gx', 'gy', 'gz', 'time']
        new_data= pd.DataFrame([item], columns=columns)
    
        (result, scores) = predict_new_data(new_data)``
        results.append(scores[0][1])


    return result

@router.websocket("/ws")
async def websocketendpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receivebytes()
            logger.debug()
            # Convert the bytes data to a numpy array for image processing
            image = np.array(Image.open(BytesIO(data)))
            # Process the image and calculate a number
            result = processimage(image)
            # Send the result back to the client
            await websocket.send_text(str(result))
    except WebSocketDisconnect:
        print("Client disconnected")





