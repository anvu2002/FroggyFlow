from fastapi import Request, APIRouter
from fastapi.responses import JSONResponse
from loguru import logger
import json
import pandas as pd


# Importing the 2 ML Models
from gyromodel.core import predict_new_data

router = APIRouter(prefix="/api", tags=["api"])

@router.post("/gyro_predict")
async def get_similarity(request: Request):
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
   
    result = predict_new_data(new_data)

    logger.debug("--- POSTURE --- is " + result)

    return result



