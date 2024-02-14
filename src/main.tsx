import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './routes/layout';
import HomePage from "./routes/page"
import WatchPage from './routes/watch/page'
import ResultsPage from './routes/results/page'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route index element={ <HomePage /> } />
          <Route path='/watch' element={ <WatchPage /> } />
          <Route path='/results' element={ <ResultsPage /> } />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  </React.StrictMode>,
)
