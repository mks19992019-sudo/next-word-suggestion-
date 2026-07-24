from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool
from app.prediction import initialize_variable , close , predict_next_word
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app:FastAPI):
    initialize_variable()
    yield
    close()


class state(BaseModel):
    text : str
    
app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # it allow all browser not only the local host if it true then it block 
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/home')
async def check():
    return 'fast api is working'


@app.post('/predict')
async def pred(text:state):
    text_for_pred = text.text
    result = await run_in_threadpool(predict_next_word, text_for_pred)
    return result


