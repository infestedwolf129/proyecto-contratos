import React, { useState } from 'react';
import axios from 'axios';

function GeneradorContratos(){

    // Estados para los detalles del contrato
    const [cliente, setCliente] = useState('');
    const [objeto, setObjeto] = useState(''); // Objeto del contrato (Casa o Departamento)
    const [renta, setRenta] = useState('');
    const [duracion, setDuracion] = useState('');
    const [garantia, setGarantia] = useState('');
    const [mascotasPermitidas, setMascotasPermitidas] = useState(false);
    const [prohibiciones, setProhibiciones] = useState([]);
    
    // Lista de prohibiciones predefinidas
    const prohibicionesOptions = [
        'Subarrendar',
        'Hacer modificaciones sin permiso',
        'Realizar ruidos molestos',
        'Tener mascotas sin autorización'
    ];

    // Estado para mostrar el contrato generado
    const [contratoGenerado, setContratoGenerado] = useState(null);

    const handleProhibicionesChange = (event) => {
        const { value, checked } = event.target;
        setProhibiciones(prev => 
            checked ? [...prev, value] : prev.filter(item => item !== value)
        );
    };

    const handleSubmit = () => {
        // Crear el contrato con los valores del formulario
        const contrato = {
            cliente,
            objeto,
            renta: parseFloat(renta),
            duracion: parseInt(duracion),
            garantia: parseFloat(garantia),
            mascotasPermitidas,
            prohibiciones
        };

        // Establecer el contrato generado para mostrarlo en pantalla
        setContratoGenerado(contrato);

        // Enviar el contrato al backend
        axios.post('http://localhost:3001/guardar-contrato', contrato)
            .then((response) => {
                console.log('Contrato guardado en el backend:', response.data);
            })
            .catch((error) => {
                console.error('Error al guardar el contrato:', error);
            });
    };

    return(
            <div className="contratos-container">
                <h1>Crear Contrato de Arrendamiento</h1>
                <div className='details-container'>
                    <h2>Detalles del Contrato</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className='details-label'>
                        <label>Cliente:</label>
                        <input
                            type="text"
                            value={cliente}
                            onChange={(e) => setCliente(e.target.value)}
                            placeholder="Nombre del cliente"
                            required
                        />
                    </div>
                    <div>
                        <label>Objeto del Contrato:</label>
                        <select
                            value={objeto}
                            onChange={(e) => setObjeto(e.target.value)}
                            required
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="Casa">Casa</option>
                            <option value="Departamento">Departamento</option>
                        </select>
                    </div>
                    <div>
                        <label>Renta:</label>
                        <input
                            type="number"
                            value={renta}
                            onChange={(e) => setRenta(e.target.value)}
                            placeholder="Monto de la renta"
                            required
                        />
                    </div>
                    <div>
                        <label>Duración (meses):</label>
                        <input
                            type="number"
                            value={duracion}
                            onChange={(e) => setDuracion(e.target.value)}
                            placeholder="Duración del contrato"
                            required
                        />
                    </div>
                    <div>
                        <label>Garantía:</label>
                        <input
                            type="number"
                            value={garantia}
                            onChange={(e) => setGarantia(e.target.value)}
                            placeholder="Monto de la garantía"
                            required
                        />
                    </div>
                    <div>
                        <label>
                            Permitir Mascotas:
                            <input
                                type="checkbox"
                                checked={mascotasPermitidas}
                                onChange={(e) => setMascotasPermitidas(e.target.checked)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Prohibiciones (selecciona las que apliquen):</label>
                        <div>
                            {prohibicionesOptions.map((prohibicion, index) => (
                                <div key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={prohibicion}
                                            checked={prohibiciones.includes(prohibicion)}
                                            onChange={handleProhibicionesChange}
                                        />
                                        {prohibicion}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit">Generar Contrato</button>
                </form>
            </div>

            {contratoGenerado && (
                <div>
                    <h2>Contrato Generado</h2>
                    <p><strong>Cliente:</strong> {contratoGenerado.cliente}</p>
                    <p><strong>Objeto:</strong> {contratoGenerado.objeto}</p>
                    <p><strong>Renta:</strong> ${contratoGenerado.renta}</p>
                    <p><strong>Duración:</strong> {contratoGenerado.duracion} meses</p>
                    <p><strong>Garantía:</strong> ${contratoGenerado.garantia}</p>
                    <p><strong>Mascotas Permitidas:</strong> {contratoGenerado.mascotasPermitidas ? 'Sí' : 'No'}</p>
                    <p><strong>Prohibiciones:</strong> {contratoGenerado.prohibiciones.join(', ')}</p>
                </div>
            )}
        </div>
    )
}

export default GeneradorContratos;