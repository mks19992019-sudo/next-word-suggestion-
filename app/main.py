from fastapi import FastAPI
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

@app.get('/home')
def check():
    return 'fast api is working'


@app.post('/predict')
def pred(text:state):
    text_for_pred = text.text
    result = predict_next_word(text_for_pred)
    return result





