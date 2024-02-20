import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store';

import RootLayout from './routes/layout';
import HomePage from "./routes/page"
import WatchPage from './routes/watch/page'
import ResultsPage from './routes/results/page'
import LoginPage from './routes/login/page';
import NotFound from './routes/__404/page';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path='watch' element={<WatchPage />} />
            <Route path='results' element={<ResultsPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
