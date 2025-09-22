import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './ui/App'
import './ui/styles.css'

const el = document.getElementById('root')!
createRoot(el).render(<App />)
