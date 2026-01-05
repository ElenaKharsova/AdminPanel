import { createRoot } from 'react-dom/client';
import '/src/assets/styles/styles.css';
import App from './App';
import AuthProvider from './auth/AuthProvider';

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);