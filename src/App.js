import './App.scss';
import { Routes, Route } from "react-router-dom"

import Login from './component/login/Login';
import Register from './component/register/Register';
import { ToastContainer } from 'react-toastify';
import Home from './component/home/Home';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
