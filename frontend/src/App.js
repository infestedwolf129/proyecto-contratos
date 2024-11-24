import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GeneradorContratos from './components/Generador_Contratos';
import NavBar from './components/NavBar';
import HomePage from './pages/home.jsx';

import './styles_files/index.css';

function App() {
    return (
    <div className="App">
      <BrowserRouter>
          <NavBar />
          <main className="app_main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/generador-contratos" element={<GeneradorContratos />} />
            </Routes>
          </main>
          <footer className="app_footer">
            <p>©Contrato Fácil</p>
          </footer>
      </BrowserRouter>
    </div>
    );
  }
  
  

export default App;
