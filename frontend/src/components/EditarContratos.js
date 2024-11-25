import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarContrato() {
    const { id } = useParams();  // Obtener el id del contrato desde la URL
    const [contrato, setContrato] = useState(null);
    const [prohibicionesDisponibles, setProhibicionesDisponibles] = useState([]);
    const navigate = useNavigate();  // Para redirigir después de actualizar

    // Cargar los datos del contrato y las prohibiciones disponibles
    useEffect(() => {
        axios.get(`http://localhost:3001/contrato/${id}`)
            .then((response) => {
                setContrato(response.data);  // Cargar los datos del contrato
            })
            .catch((error) => {
                console.error('Error al obtener el contrato:', error);
                navigate('/miscontratos');  // Si no se encuentra el contrato, redirigir a "Mis Contratos"
            });

        // Obtener la lista de prohibiciones disponibles
        axios.get('http://localhost:3001/prohibiciones')
            .then((response) => {
                setProhibicionesDisponibles(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener las prohibiciones:', error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Enviar el contrato actualizado al backend
        axios.put(`http://localhost:3001/actualizar-contrato/${id}`, contrato)
            .then(() => {
                alert('Contrato actualizado');
                navigate('/miscontratos');  // Redirigir después de actualizar
            })
            .catch((error) => {
                console.error('Error al actualizar el contrato:', error);
            });
    };

    if (!contrato) return <div>Cargando...</div>;

    return (
        <div>
            <h1>Editar Contrato</h1>
            <form onSubmit={handleSubmit}>
                {/* Los campos de entrada del contrato */}
                <div>
                    <label>Arrendador:</label>
                    <input
                        type="text"
                        value={contrato.cliente}
                        onChange={(e) => setContrato({ ...contrato, cliente: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label>Dirección del Arrendador:</label>
                    <input
                        type="text"
                        value={contrato.direccion}
                        onChange={(e) => setContrato({ ...contrato, direccion: e.target.value })}
                        required
                    />
                </div>

                {/* Más campos del contrato aquí */}

                <div>
                    <label>Prohibiciones:</label>
                    {prohibicionesDisponibles.map((prohibicion, index) => (
                        <div key={index} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                value={prohibicion}
                                checked={contrato.prohibiciones.includes(prohibicion)}
                                onChange={(e) => {
                                    const newProhibiciones = e.target.checked
                                        ? [...contrato.prohibiciones, prohibicion]
                                        : contrato.prohibiciones.filter((item) => item !== prohibicion);
                                    setContrato({ ...contrato, prohibiciones: newProhibiciones });
                                }}
                            />
                            <label className="form-check-label">{prohibicion}</label>
                        </div>
                    ))}
                </div>

                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
}

export default EditarContrato;



