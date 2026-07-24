from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from prediction import initialize_variable , close , predict_next_word
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
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/home')
def check():
    return 'fast api is working'


@app.post('/predict')
def pred(text:state):
    text_for_pred = text.text
    result = predict_next_word(text_for_pred)
    return result




