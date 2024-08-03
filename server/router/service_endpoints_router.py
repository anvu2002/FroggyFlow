from fastapi import Request, APIRouter
from loguru import logger
import json

# Importing the 2 ML Models
# from gyromodel.core import predict_new_data

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
    logger.info(f"requested data = {data}")

    logger.info(f"Gyro Request Received {data}")
    
    # results = predict_new_data(data)
    # return results
    return 



