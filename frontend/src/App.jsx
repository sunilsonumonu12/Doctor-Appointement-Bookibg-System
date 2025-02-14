import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppContextProvider from './context/AppContext';
import GetDoctor from './pages/getDoctor';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import ShowData from './pages/ShowData';
import AddDoctor from './pages/AddDoctor';
import Signup from './pages/Signup';

const App = () => {
  useEffect(() => {
    // Check for user preference or default to light theme
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
    <AppContextProvider>
      {/* Main Container */}
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />
        
        {/* Content Container */}
        <div className="flex-1 flex flex-col mt-16">
          <div className="flex-1 overflow-auto p-6 bg-gray-100 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:speciality" element={<Doctors />} />
              <Route path="/login" element={<Login />} />
              <Route path="/get-doctor" element={<GetDoctor />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/show-data" element={<ShowData />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/my-appointments" element={<MyAppointments />} />
              <Route path="/appointment/:docId" element={<Appointment />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </AppContextProvider>
  );
};

export default App;