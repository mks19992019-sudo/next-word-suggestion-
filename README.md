# LSTM Next Word Prediction

A complete next-word prediction project with a trained TensorFlow/Keras LSTM model, a FastAPI inference backend, and a React UI that shows inline gray ghost-text suggestions while the user types.

## Live Demo

```text
https://next-word-suggestion-1.onrender.com
```

## Demo Video

A demo video is included with the project/post to show the React UI, inline gray next-word suggestion, `Tab` accept flow, and `Esc` dismiss flow.

Video path:

```text
demo_video/Lstm next word prediction.mov
```

## How It Works

1. The user types text in the React editor.
2. The UI sends the current text to `POST /predict`.
3. FastAPI tokenizes the text with the saved tokenizer.
4. The sequence is padded to the trained timestamp length.
5. The LSTM model predicts the most likely next word.
6. The UI shows that word in gray; `Tab` accepts it and `Esc` dismisses it.

## Model Summary

| Item | Value |
| --- | ---: |
| Model type | Sequential LSTM language model |
| Vocabulary indexes | 4,993 |
| Dense output classes | 4,994 |
| Input sequence length / timestamp | 83 |
| Embedding dimension | 250 |
| First LSTM units | 192 |
| Second LSTM units | 512 |
| Trainable parameters | 5,594,486 |
| Optimizer parameters | 11,188,974 |
| Total saved parameters | 16,783,460 |
| Trainable model size | 21.34 MB |
| Total saved model size | 64.02 MB |

## Architecture

| Layer | Output Shape | Parameters |
| --- | --- | ---: |
| Embedding | `(None, 83, 250)` | 1,248,500 |
| LSTM | `(None, 83, 192)` | 340,224 |
| LSTM | `(None, 512)` | 1,443,840 |
| Dense Softmax | `(None, 4994)` | 2,561,922 |

## Training Notes

The training README reports:

| Metric | Value |
| --- | ---: |
| Epochs | 50 |
| Final training accuracy | 75.47% |
| Final training loss | 0.9596 |
| Dropout | 0.2, 0.4 |
| Recurrent dropout | 0.3 |
| Learning rate | 0.005 |
| Optimizer | Adam |
| Loss | Categorical Crossentropy |

## API

### Health Check

```http
GET /home
```

Response:

```json
"fast api is working"
```

### Predict Next Word

```http
POST /predict
```

Request:

```json
{
  "text": "Quantum computers harness the principles of"
}
```

Response:

```json
"quantum"
```

## React UI

The React app lives in `ui/` and implements:

- Gray inline next-word suggestion.
- `Tab` to accept the suggestion.
- `Esc` to remove the suggestion.
- Debounced prediction calls while typing.
- Offline message when FastAPI is not running.

## Run The Project

Start the backend:

```bash
cd app
uvicorn main:app --reload
```

Start the UI:

```bash
cd ui
npm run dev
```

Open:

```text
http://localhost:5173
```

## Project Structure

```text
Next_wrod/
├── app/
│   ├── model/
│   │   ├── lstm_next_word.keras
│   │   ├── tokenizer.pkl
│   │   └── max_len.pkl
│   ├── main.py
│   ├── prediction.py
│   └── Readme.md
├── demo_video/
│   └── Lstm next word prediction.mov
├── train/
│   ├── 1661-0.txt
│   ├── next-word.ipynb
│   └── Readme.md
├── ui/
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       └── Component /header/
└── README.md
```
