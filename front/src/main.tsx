import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store.ts";
import App from './app/App.tsx'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
  </StrictMode>,
)
