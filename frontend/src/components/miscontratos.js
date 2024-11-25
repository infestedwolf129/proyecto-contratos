import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function MisContratos() {
    const [contratos, setContratos] = useState([]);
    const [detalleActivo, setDetalleActivo] = useState(null);
    const { user, isAuthenticated } = useAuth0();

    // Efecto para consultar los contratos cuando el componente se monta
    useEffect(() => {
        axios.get('http://localhost:3001/miscontratos')
            .then((response) => setContratos(response.data))
            .catch((error) => console.error('Error al obtener los contratos:', error));
    }, []);

    const handleVerMas = (id) => {
        setDetalleActivo(detalleActivo === id ? null : id);
    };

    const handleEliminar = (id) => {
        axios.delete(`http://localhost:3001/eliminar-contrato/${id}`)
            .then(() => {
                setContratos(contratos.filter((contrato) => contrato.id !== id));
            })
            .catch((error) => {
                console.error('Error al eliminar el contrato:', error);
            });
    };

    const contratosFiltrados = isAuthenticated
        ? contratos.filter((contrato) => contrato.usuario === user.email)
        : contratos.filter((contrato) => contrato.usuario === '');

    return (
        <div>
            <h1>Mis Contratos</h1>
            <ul>
                {contratosFiltrados.length === 0 ? (
                    <p>No hay contratos disponibles.</p>
                ) : (
                    contratosFiltrados.map((contrato) => (
                        <li key={contrato.id}>
                            <h3>{contrato.cliente} - {contrato.arrendatario}</h3>
                            <p><strong>Dirección:</strong> {contrato.direccion}</p>

                            <button onClick={() => handleVerMas(contrato.id)}>
                                {detalleActivo === contrato.id ? 'Ver menos' : 'Ver más'}
                            </button>

                            <button onClick={() => handleEliminar(contrato.id)}>Eliminar</button>
                            <Link to={`/editar-contrato/${contrato.id}`}>
                                <button>Editar</button>
                            </Link>
                            <Link to={`http://localhost:3001${contrato.pdfPath}`} target="_blank">
                                <button>Ver PDF</button>
                            </Link>
                            {detalleActivo === contrato.id && (
                                <div>
                                    <p><strong>Renta:</strong> ${contrato.renta}</p>
                                    <p><strong>Duración:</strong> {contrato.duracion} meses</p>
                                    <p><strong>Garantía:</strong> ${contrato.garantia}</p>
                                    <p><strong>Mascotas Permitidas:</strong> {contrato.mascotasPermitidas ? 'Sí' : 'No'}</p>
                                    <p><strong>Prohibiciones:</strong> {contrato.prohibiciones.join(', ')}</p>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default MisContratos;
