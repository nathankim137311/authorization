import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/auth/login' element={<Login />} />
      <Route path='/auth/register' element={<Register />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
