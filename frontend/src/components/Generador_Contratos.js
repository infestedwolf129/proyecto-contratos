import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GeneradorContratos() {
    // Estados para los detalles del contrato
    const [arrendatario, setArrendatario] = useState('');
    const [direccion, setDireccion] = useState('');
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
    const [rolAvaluos, setRolAvaluos] = useState('');
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
            rolAvaluos,
            comuna,
            numeroPersonas,
            personalizacion: { fontSize, textColor, fontStyle }
        };

        axios.post('http://localhost:3001/generar-pdf', contrato)
            .then((response) => setPdfUrl(`http://localhost:3001${response.data.pdfPath}`))
            .catch((error) => console.error('Error al generar el PDF:', error));
    };

    return (
        <div className="contratos-container">
            <h1>Crear Contrato de Arrendamiento</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div>
                    <label>Arrendador:</label>
                    <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
                </div>
                <div>
                    <label>Arrendatario:</label>
                    <input type="text" value={arrendatario} onChange={(e) => setArrendatario(e.target.value)} required />
                </div>
                <div>
                    <label>Dirección del Arrendatario:</label>
                    <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                </div>
                <div>
                    <label>Renta:</label>
                    <input type="number" value={renta} onChange={(e) => setRenta(e.target.value)} required />
                </div>
                <div>
                    <label>Duración (meses):</label>
                    <input type="number" value={duracion} onChange={(e) => setDuracion(e.target.value)} required />
                </div>
                <div>
                    <label>Garantía:</label> {/* Nuevo campo */}
                    <input type="number" value={garantia} onChange={(e) => setGarantia(e.target.value)} required />
                </div>
                <div>
                    <label>
                        Permitir Mascotas:
                        <input type="checkbox" checked={mascotasPermitidas} onChange={(e) => setMascotasPermitidas(e.target.checked)} />
                    </label>
                </div>
                <div>
                    <label>Prohibiciones:</label>
                    {prohibicionesDisponibles.map((prohibicion, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={prohibicion}
                                    checked={prohibicionesSeleccionadas.includes(prohibicion)}
                                    onChange={handleProhibicionesChange}
                                />
                                {prohibicion}
                            </label>
                        </div>
                    ))}
                </div>
                <div>
                    <h3>Personalización del PDF</h3>
                    <div>
                        <label>Tamaño de letra:</label>
                        <input type="number" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} min={8} max={24} />
                    </div>
                    <div>
                        <label>Color del texto:</label>
                        <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                    </div>
                    <div>
                        <label>Estilo de fuente:</label>
                        <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)}>
                            <option value="Times-Roman">Times-Roman</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Courier">Courier</option>
                        </select>
                    </div>
                </div>
                <button type="submit">Generar Contrato</button>
            </form>
            {pdfUrl && (
                <div>
                    <h2>PDF Generado</h2>
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Descargar PDF</a>
                </div>
            )}
        </div>
    );
}

export default GeneradorContratos;



