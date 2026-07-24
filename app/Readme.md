# FastAPI Backend (v1)

This backend serves the trained LSTM model for real-time next word prediction. The model, tokenizer, and preprocessing configuration are loaded once during application startup and reused for all incoming requests.

---

## Features

- FastAPI REST API
- Automatic model initialization on startup
- Real-time next word prediction
- Tokenizer and sequence preprocessing
- Low latency inference

---

## Project Structure

```text
app/
│
├── model/
│   ├── lstm_next_word.keras
│   ├── tokenizer.pkl
│   └── max_len.pkl
│
├── main.py
├── prediction.py
└── README.md
```

---

## API Endpoints

### Health Check

**GET**

```
/home
```

Response

```json
"fast api is working"
```

---

### Next Word Prediction

**POST**

```
/predict
```

Request

```json
{
    "text": "Quantum computers harness the principles of"
}
```

Response

```json
"quantum"
```

---

## Startup Flow

```text
Application Starts
        │
        ▼
Load Trained Model
        │
        ▼
Load Tokenizer
        │
        ▼
Load Max Sequence Length
        │
        ▼
API Ready
```

The model is loaded only once during startup using FastAPI's lifespan event.

---

## Request Flow

```text
Client
   │
   ▼
POST /predict
   │
   ▼
Tokenize Input
   │
   ▼
Pad Sequence
   │
   ▼
LSTM Model
   │
   ▼
Predicted Word
   │
   ▼
JSON Response
```

---

## Running the Server

```bash
uvicorn main:app --reload
```

Server

```
http://127.0.0.1:8000
```

Interactive API Documentation

```
http://127.0.0.1:8000/docs
```

Alternative Documentation

```
http://127.0.0.1:8000/redoc
```

---

## Technologies

- FastAPI
- TensorFlow / Keras
- NumPy
- Pydantic
- Uvicorn
- Pickle

---

## Current Version

**v1.0**

### Current Capabilities

- Single next word prediction
- REST API inference
- Startup model loading
- CPU inference

### Planned Improvements

- React frontend
- Inline ghost text suggestions
- Top-k predictions
- Prediction confidence
- Docker deployment
- Transformer version