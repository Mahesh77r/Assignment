import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import ResetPassword from './pages/ResetPasswordPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/resetpassword/:token' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
