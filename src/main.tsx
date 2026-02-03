
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import './index.css'
import App from './App.tsx'
import { store } from './Store/apiStore.ts';
import AppInitializer from './@All/Component/AppLoader/AppInitializer.tsx';

createRoot(document.getElementById('root')!).render(
 
  <Provider store={store}>
     <AppInitializer>
    <App />
     </AppInitializer>
  </Provider>
 
)


