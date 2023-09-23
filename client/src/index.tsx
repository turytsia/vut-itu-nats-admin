/**
 * @fileoverview Index file
 *
 * Creates virtual DOM and generates 
 *
 * @module index
 * 
 * @author xturyt00
 */

import ReactDOM from 'react-dom/client'

import App from './App';
import AppContextProvider from './context/AppContextProvider'
import { BrowserRouter } from 'react-router-dom'

// global css
import "./index.css"
import 'react-datepicker/dist/react-datepicker.module.css'
import "react-datetime/css/react-datetime.css"
import 'react-loading-skeleton/dist/skeleton.css'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
