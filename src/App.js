import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import Home from './components/Home';
import NuevoVideo from './components/NuevoVideo';
import Footer from './components/Footer';

const URL = "http://localhost:3001/videos";

const App = () => {
  return (
    <Router>
      <Header />
      
      
      <Routes>
        <Route path="/" element={<><Banner /><Home URL={URL} /></>} />
       
        <Route path="/nuevo-video" element={<NuevoVideo URL={URL} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
