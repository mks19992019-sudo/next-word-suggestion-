import { useEffect, useMemo, useRef, useState } from 'react'
import Header from './Component /header/header'

const API_URL = 'http://127.0.0.1:8000/predict'
const PREDICTION_DELAY = 350

const App = () => {
  const [text, setText] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [status, setStatus] = useState('Ready')
  const [error, setError] = useState('')
  const requestId = useRef(0)

  const displaySuggestion = useMemo(() => {
    const trimmed = suggestion.trim()
    if (!trimmed || !text.trim()) {
      return ''
    }

    return text.endsWith(' ') ? trimmed : ` ${trimmed}`
  }, [suggestion, text])

  useEffect(() => {
    const input = text.trim()

    if (!input) {
      return
    }

    const currentRequest = requestId.current + 1
    requestId.current = currentRequest

    const timeout = window.setTimeout(async () => {
      try {
        setStatus('Thinking')
        setError('')

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: input }),
        })

        if (!response.ok) {
          throw new Error(`Prediction failed with ${response.status}`)
        }

        const nextWord = await response.json()

        if (requestId.current === currentRequest) {
          setSuggestion(typeof nextWord === 'string' ? nextWord : '')
          setStatus('Prediction ready')
        }
      } catch {
        if (requestId.current === currentRequest) {
          setSuggestion('')
          setStatus('Offline')
          setError('Start the FastAPI server on port 8000 to see predictions.')
        }
      }
    }, PREDICTION_DELAY)

    return () => window.clearTimeout(timeout)
  }, [text])

  const acceptSuggestion = () => {
    if (!displaySuggestion) {
      return
    }

    setText((currentText) => `${currentText}${displaySuggestion}`)
    setSuggestion('')
    setStatus('Accepted')
  }

  const dismissSuggestion = () => {
    setSuggestion('')
    setStatus('Dismissed')
  }

  const handleTextChange = (event) => {
    const nextText = event.target.value
    setText(nextText)

    if (!nextText.trim()) {
      setSuggestion('')
      setStatus('Ready')
      setError('')
    } else {
      setStatus('Thinking')
      setError('')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Tab' && displaySuggestion) {
      event.preventDefault()
      acceptSuggestion()
    }

    if (event.key === 'Escape' && displaySuggestion) {
      event.preventDefault()
      dismissSuggestion()
    }
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="workspace">
        <section className="editor-panel" aria-label="Next word predictor">
          <div className="panel-topline">
            <span>{status}</span>
            <span>{displaySuggestion ? 'Tab accepts · Esc dismisses' : 'Type to predict'}</span>
          </div>

          <label className="editor-label" htmlFor="next-word-input">
            Write a sentence
          </label>

          <div className="ghost-editor">
            <textarea
              id="next-word-input"
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              placeholder="Start typing and the LSTM model will suggest the next word..."
              spellCheck="false"
              autoFocus
            />
            <div className="ghost-preview" aria-hidden="true">
              <span>{text}</span>
              <span className="ghost-word">{displaySuggestion}</span>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
        </section>
      </main>
    </div>
  )
}

export default App
