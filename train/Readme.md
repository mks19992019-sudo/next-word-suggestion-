# LSTM Next Word Prediction (v1)

A next word prediction model built using TensorFlow/Keras LSTM. Given an input sequence, the model predicts the most probable next word. The project includes model training, FastAPI inference, and is designed for frontend integration.

---

## Features

- LSTM-based language model
- TensorFlow / Keras
- FastAPI inference API
- Hyperparameter tuning with Keras Tuner
- Real-time next word prediction

---

## Model Architecture

| Layer | Output Shape |
|--------|--------------|
| Embedding | (None, 83, 250) |
| LSTM | (None, 83, 192) |
| LSTM | (None, 512) |
| Dense (Softmax) | (None, 4994) |

**Model Statistics**

- Total Parameters: **5,594,486**
- Model Size: **21.34 MB**

---

## Hyperparameters

| Parameter | Value |
|-----------|------:|
| Vocabulary Size | 4994 |
| Input Sequence Length | 83 |
| Embedding Dimension | 250 |
| LSTM Units | 192, 512 |
| Dropout | 0.2, 0.4 |
| Recurrent Dropout | 0.3 |
| Learning Rate | 0.005 |
| Optimizer | Adam |
| Loss | Categorical Crossentropy |

---

## Training

- Epochs: **50**
- Final Training Accuracy: **75.47%**
- Final Training Loss: **0.9596**

---

## Sample Prediction

**Input**

```
Quantum computers harness
```

**Output**

```
Quantum computers harness the principles of quantum mechanics to perform calculations...
```

---

## Project Structure

```text
Next_word/
│
├── app/
│   ├── model/
│   │   ├── lstm_next_word.keras
│   │   ├── tokenizer.pkl
│   │   └── max_len.pkl
│   ├── main.py
│   ├── prediction.py
│   └── frontend/
│
├── train/
│   └── next-word.ipynb
│
└── README.md
```

---

## Tech Stack

- Python
- TensorFlow / Keras
- FastAPI
- NumPy
- Keras Tuner



---

## Version

**Current Version:** `v1.0`