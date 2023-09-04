import ReactDOM from 'react-dom/client'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.less'
import '../tailwind.css'

ReactDOM.createRoot(document.getElementById('app') as Element).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
