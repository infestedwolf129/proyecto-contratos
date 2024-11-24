import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import '../styles_files/home/index.css';

const Home = () => {
    return (
        <div className="home">
            <div className="home__hero">
                <h2>Crea tu contrato de arriendo de forma fácil y rápida</h2>
                <p>Personaliza tu contrato con solo unos clics. Genera documentos legales válidos, sin complicaciones, para cualquier tipo de arriendo.</p>
                <Button as={Link} to="/generador-contratos" className="home__cta-button">Comienza Ahora</Button>
            </div>

            <div className="home__main-content">
                <div className="home__card">
                    <h3>Fácil de Usar</h3>
                    <p>Una interfaz intuitiva para crear contratos de arriendo personalizados en minutos.</p>
                </div>
                <div className="home__card">
                    <h3>Seguro y Legal</h3>
                    <p>Genera contratos válidos y de acuerdo con las normativas legales vigentes.</p>
                </div>
                <div className="home__card">
                    <h3>Personalización Total</h3>
                    <p>Adapta cada sección del contrato a tus necesidades específicas.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
