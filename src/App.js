import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';

import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';
import FullDataPage from './components/FullDataPage';
import PrivateRoute from './components/PrivateRoute';
import Settings from './components/Settings';
import Analysis from './components/Analysis';
import DoctorRequest from './components/DoctorRequest';
import AvailableDoctors from './components/AvailableDoctors';
import Chat from './components/Chat';
import PatientMedData from './components/PatientMedData';

function App() {
  // localStorage.removeItem('jwt');
  const isAuthorized = Boolean(localStorage.getItem('jwt'));
  return (
    <Router>
      <div class="container">
        <Fragment>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/fulldata" element={<FullDataPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/doctorRoleRequest" element={<DoctorRequest />} />
            <Route path="/availableDoctors" element={<AvailableDoctors />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="patientMedicalData" element={<PatientMedData />} />
          </Routes>
        </Fragment>
      </div>
    </Router>
  );
}

export default App;
