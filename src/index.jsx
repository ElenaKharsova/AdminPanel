import { createRoot } from 'react-dom/client';
import '/src/assets/styles/styles.css';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
    <App />
);