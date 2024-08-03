from fastapi import Request, APIRouter
from loguru import logger
import json

# from service.core import similarity, text_to_speech, filter_keywords
# need to imports ml models here

router = APIRouter(prefix="/api", tags=["api"])

@router.post("/get_similarity")
async def get_similarity(request: Request):
    """
    image to text endpoint
    request format:
    {
        "images": ["./images/1.jpg", "https://test.com/1.jpg"],
        "prompt": "google search prompt"
    }
    """

    data = await request.json()
    logger.info(f"Similarity Request Received {data}")

    image_urls, prompt_text = data["images"], data["prompt"]
    results = similarity(image_urls, prompt_text)
    return results

@router.post("/tts")
async def tts(request: Request):
    from .core_types import TTSResponse

    """
    text to speech endpoint
    request format:
    {
        "text": "text to convert",
        "save_path": "path where the file is saved"
    }
    """

    data = await request.json()
    logger.info(f"TTS Request Received {data}")
    if isinstance(data, str): data = json.loads(data)
    text, save_path = data["text"], data["save_path"]

    try:
        text_to_speech(text, save_path)
        pass
    except Exception as e:
        return TTSResponse("failed", e).to_dict()
    
    return TTSResponse("success", save_path).to_dict()

@router.post("/keyword_extractor")
async def keyword_extractor(request : Request):
    """
    raw text to filtered keywords endpoint
    request format:
    {
        "raw_txt": "raw text to be filtered"
    }
    """
    resp = await request.json()
    logger.info(f"Keyword Extractor Request Received {resp}")
    processed_keyword = filter_keywords(resp["raw_text"])

    return processed_keyword

