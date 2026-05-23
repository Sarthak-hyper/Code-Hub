import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './comp/pages/landingpage.js';
import Register from './comp/pages/register.js';
import Login from './comp/pages/login.js';
import UserProfile from './comp/pages/UserProfile.js';
import Team from './comp/pages/team.js';
import TableDemo from './comp/othercomponents/temp.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/team" element={<Team />} />
        <Route path="/form" element={<TableDemo />} />
        
       
      </Routes>
    </Router>
  );
}

export default App;



