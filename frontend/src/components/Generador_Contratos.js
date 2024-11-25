import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles_files/gen_contratos/index.css';

function GeneradorContratos() {
    // Estados para los detalles del contrato
    const [arrendatario, setArrendatario] = useState('');
    const [direccion, setDireccion] = useState('');
    const [direccionArrendatario, setDireccionArrendatario] = useState('');
    const [renta, setRenta] = useState('');
    const [duracion, setDuracion] = useState('');
    const [garantia, setGarantia] = useState('');  // Nuevo campo para la garantía
    const [mascotasPermitidas, setMascotasPermitidas] = useState(false);
    const [prohibicionesSeleccionadas, setProhibicionesSeleccionadas] = useState([]);
    const [prohibicionesDisponibles, setProhibicionesDisponibles] = useState([]);
    const [cliente, setCliente] = useState('');
    const [calle, setCalle] = useState('');
    const [numeroCalle, setNumeroCalle] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [rolAvaluos, setRolAvaluos] = useState('');  // Ahora es un string
    const [comuna, setComuna] = useState('');
    const [numeroPersonas, setNumeroPersonas] = useState('');
    const [pdfUrl, setPdfUrl] = useState(null);

    // Personalización del PDF
    const [fontSize, setFontSize] = useState(12);
    const [textColor, setTextColor] = useState('#000000');
    const [fontStyle, setFontStyle] = useState('Times-Roman');

    // Obtener las prohibiciones desde el backend
    useEffect(() => {
        axios.get('http://localhost:3001/prohibiciones')
            .then((response) => setProhibicionesDisponibles(response.data))
            .catch((error) => console.error('Error al cargar las prohibiciones:', error));
    }, []);

    const handleProhibicionesChange = (event) => {
        const { value, checked } = event.target;
        setProhibicionesSeleccionadas((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    const handleSubmit = () => {
        const contrato = {
            cliente,
            arrendatario,
            direccion,
            renta: parseFloat(renta),
            duracion: parseInt(duracion),
            garantia: parseFloat(garantia),
            mascotasPermitidas,
            prohibiciones: prohibicionesSeleccionadas,
            calle,
            numeroCalle,
            ciudad,
            rolAvaluos,  // Se mantiene como string
            comuna,
            numeroPersonas,
            personalizacion: { fontSize, textColor, fontStyle }
        };

        axios.post('http://localhost:3001/generar-pdf', contrato)
            .then((response) => setPdfUrl(`http://localhost:3001${response.data.pdfPath}`))
            .catch((error) => console.error('Error al generar el PDF:', error));
    };

    return (
        <div className='generador'>
            <div className="container mt-5">
                <h1 className="text-center mb-4">Generador de Contratos</h1>
                <div className="card shadow p-4">
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <h3>Datos del contrato:</h3>
                        <br />
                        <div className="mb-3">
                            <label className="form-label">Arrendador</label>
                            <input
                                type="text"
                                className="form-control"
                                value={cliente}
                                onChange={(e) => setCliente(e.target.value)}
                                required
                                placeholder='Juan Perez...'
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dirección del Arrendador</label>
                            <input
                                type="text"
                                className="form-control"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                required
                                placeholder='Av. Providencia 1234...'
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Arrendatario</label>
                            <input
                                type="text"
                                className="form-control"
                                value={arrendatario}
                                onChange={(e) => setArrendatario(e.target.value)}
                                required
                                placeholder='Maria Rodriguez...'
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dirección del Arrendatario</label>
                            <input
                                type="text"
                                className="form-control"
                                value={direccionArrendatario}
                                onChange={(e) => setDireccionArrendatario(e.target.value)}
                                required
                                placeholder='Av.Ejemplo 123...'
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dirección de propiedad arrendada:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={calle}
                                onChange={(e) => setCalle(e.target.value)}
                                required
                                placeholder='Av.Ejemplo 123...'
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Numero de calle de propiedad arrendada:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={numeroCalle}
                                onChange={(e) => setNumeroCalle(e.target.value)}
                                required
                                placeholder='1234...'
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ciudad de la propiedad arrendada</label>
                            <input
                                type="text"
                                className="form-control"
                                value={ciudad}
                                onChange={(e) => setCiudad(e.target.value)}
                                required
                                placeholder='Santiago...'
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Rol de Avalúos</label>
                            <input
                                type="text" // Cambiado a texto
                                className="form-control"
                                value={rolAvaluos}
                                onChange={(e) => setRolAvaluos(e.target.value)}  // Sigue siendo tratado como string
                                required
                                placeholder='12.345.678-9'
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Comuna del Arrendatario</label>
                            <input
                                type="text"
                                className="form-control"
                                value={comuna}
                                onChange={(e) => setComuna(e.target.value)}
                                required
                                placeholder='Las Condes...'
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Cantidad Maxima de personas en el inmueble</label>
                            <input
                                type="number"
                                className="form-control"
                                value={numeroPersonas}
                                onChange={(e) => setNumeroPersonas(e.target.value)}
                                required
                                min={1}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Renta</label>
                            <input
                                type="number"
                                className="form-control"
                                value={renta}
                                onChange={(e) => setRenta(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Duración (meses)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={duracion}
                                onChange={(e) => setDuracion(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Garantía</label>
                            <input
                                type="number"
                                className="form-control"
                                value={garantia}
                                onChange={(e) => setGarantia(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={mascotasPermitidas}
                                onChange={(e) => setMascotasPermitidas(e.target.checked)}
                            />
                            <label className="form-check-label">Permitir Mascotas</label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Prohibiciones</label>
                            {prohibicionesDisponibles.map((prohibicion, index) => (
                                <div key={index} className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value={prohibicion}
                                        checked={prohibicionesSeleccionadas.includes(prohibicion)}
                                        onChange={handleProhibicionesChange}
                                    />
                                    <label className="form-check-label">{prohibicion}</label>
                                </div>
                            ))}
                        </div>
                        <h3>Personalización del PDF:</h3><br />
                        <div className="mb-3">
                            <label className="form-label">Tamaño de letra:</label>
                            <input
                                type="number"
                                value={fontSize}
                                onChange={(e) => setFontSize(parseInt(e.target.value))}
                                min={8}
                                max={24}
                                className="form-control"
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Color del texto:</label>
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Estilo de fuente:</label>
                            <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className='form-select'>
                                <option value="Times-Roman">Times-Roman</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Courier">Courier</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Generar Contrato</button>
                    </form>
                    {pdfUrl && (
                        <div className="mt-4">
                            <h2>PDF Generado</h2>
                            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success">Descargar PDF</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GeneradorContratos;

