import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import './index.css';
import './App.css'; // Импортируем стили для App

createRoot(document.getElementById('root')!).render(
  <App />
)
