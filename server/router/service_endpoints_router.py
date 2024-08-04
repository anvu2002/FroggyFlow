from fastapi import Request, APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, FileResponse
from loguru import logger
import json
import pandas as pd


# Importing the 2 ML Models
from gyromodel.core import predict_new_data
from matlab_interface.core import convert_csv_to_image

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
    raw_score = []

    sum = 0

    for item in data['gyro_data']:
        columns = ['ax', 'ay', 'az', 'gx', 'gy', 'gz', 'time']
        new_data= pd.DataFrame([item], columns=columns)
    
        (result, scores) = predict_new_data(new_data)
        sum += scores[0][1]
        raw_score.append(scores[0][1])
        results.append({'score': scores[0][1], 'timestamp': item[6]})

    score = 0

    if len(results) > 0:
        score = sum / len(results)

    json_data = jsonable_encoder({'score': score, 'data': results}) 

    convert_csv_to_image(raw_score)

    return JSONResponse(content=json_data)


@router.get('/graph')
async def get_graph(request: Request):
    return FileResponse("file.png")


