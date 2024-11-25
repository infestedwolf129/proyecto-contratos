import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GeneradorContratos from './components/Generador_Contratos';
import NavBar from './components/NavBar';
import HomePage from './pages/home.js';
import Footer from './components/Footer';
import ProfilePage from './pages/profilePage.js';
import MisContratos from './components/miscontratos.js';
import EditarContrato from './components/EditarContratos.js';  // Asegúrate de importar EditarContrato

import './styles_files/index.css';

function App() {
    return (
    <div className="App">
      <BrowserRouter>
          <NavBar />
          <div className='home'>
            <header>
              <h2>Contrato Fácil</h2>
            </header>
          </div>
          <main className="app_main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/generador-contratos" element={<GeneradorContratos />} />
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="/miscontratos" element={<MisContratos />} />
              <Route path="/editar-contrato/:id" element={<EditarContrato />} />  {/* Ruta para editar contrato */}
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </main>
          <Footer />
      </BrowserRouter>
    </div>
    );
}

export default App;


