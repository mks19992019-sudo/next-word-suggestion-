from tensorflow.keras.models import load_model
import pickle
from pathlib import Path
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

model   = None
tokenizer = None
max_len = None
MODEL_DIR = Path(__file__).resolve().parent / "model"


# intialize the model and tokenizer if they are not already initialized
def initialize_variable():
    global model,tokenizer , max_len
    if model is None or tokenizer is None or max_len is None:
        model = model_initialize()
        tokenizer = tokenizer_initialize()
        max_len = max_sequence_length()



def model_initialize():
    model = load_model(MODEL_DIR / "lstm_next_word.keras")
    return model


def tokenizer_initialize():
    with open(MODEL_DIR / "tokenizer.pkl", "rb") as f:
        tokenizer = pickle.load(f)
    return tokenizer


def max_sequence_length():
    with open(MODEL_DIR / "max_len.pkl", "rb") as f:
        max_len=pickle.load(f)

    return max_len

def predict_next_word(input_text:str):
    ''' model prediction function '''

    token_text = tokenizer.texts_to_sequences([input_text])[0]

    padding_seq = pad_sequences([token_text],maxlen=max_len,padding = 'pre')

    pred = model.predict(padding_seq,verbose=0)

    pred_index = int(np.argmax(pred))

    result = tokenizer.index_word.get(pred_index,'not find')
    return result




def close():
    global model , tokenizer , max_len
    model =None
    tokenizer = None
    max_len = None




    
