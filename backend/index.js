const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const db = require('./db'); // Asegúrate de importar la conexión a la base de datos

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Ruta para enviar las prohibiciones al frontend
const prohibicionesDisponibles = [
    'Subarrendar el inmueble sin autorización',
    'Realizar modificaciones estructurales sin permiso',
    'Realizar decoraciones permanentes sin autorización',
    'Usar el inmueble con fines comerciales no autorizados',
    'Almacenar materiales peligrosos o inflamables',
    'Organizar eventos con más de X personas sin permiso',
    'Dejar basura acumulada o residuos peligrosos en el inmueble',
    'Instalar antenas, equipos grandes o dispositivos en el exterior sin permiso',
    'Realizar actividades molestas, insalubres, nocivas o peligrosas',
    'Mantener estufas a kerosene sin medidas de seguridad adecuadas',
    'Causar daños al inmueble o sus instalaciones',
    'Ceder el uso del inmueble a terceros sin consentimiento',
    'Instalar sistemas de calefacción sin aprobación previa',
    'Usar el inmueble para actividades ilegales o inmorales',
    'Modificar el sistema eléctrico o de gas sin autorización',
    'Hacer modificaciones estéticas al inmueble sin autorización'
];

// Ruta para enviar las prohibiciones al frontend
app.get('/prohibiciones', (req, res) => {
    res.status(200).send(prohibicionesDisponibles);
});

// Configuración de ruta estática para archivos PDF
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

// Ruta para generar el PDF
app.post('/generar-pdf', (req, res) => {
    const contrato = req.body;

    const { fontSize = 12, textColor = '#000000', fontStyle = 'Times-Roman' } = contrato.personalizacion || {};

    const doc = new PDFDocument();
    const fileName = `contrato_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, 'pdfs', fileName);

    // Verificar si la carpeta 'pdfs' existe y crearla si no
    if (!fs.existsSync(path.join(__dirname, 'pdfs'))) {
        fs.mkdirSync(path.join(__dirname, 'pdfs'));
    }

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Crear contrato base con los datos dinámicos
    let textoContrato = `
En ${new Date().toLocaleDateString()} a ____ de _____ del año ______ comparecen: 

Por una parte, como arrendador/a don/ña ${contrato.cliente}, domiciliado/a en ${contrato.direccion} número _______ comuna de _________, cédula de identidad número ________.

Y por otra parte como arrendatario don/ña ${contrato.arrendatario}, domiciliado/a en ${contrato.direccionArrendatario} número _______ comuna de ________, cédula de identidad número _______ ambos mayores de edad, y expresan:

Que vienen en celebrar el siguiente contrato de arrendamiento. Don/ña ${contrato.cliente} es dueño/a de la propiedad ubicada en calle ${contrato.calle} número ${contrato.numeroCalle} de la ciudad de ${contrato.ciudad}. Su Rol de Avalúos es el número ${contrato.rolAvaluos} de la Comuna de ${contrato.comuna}.

1.- **OBJETO DEL CONTRATO:**  
A través del presente contrato de arrendamiento, el arrendador, don/ña ${contrato.cliente}, da en arrendamiento el inmueble ubicado en ${contrato.direccion}. La propiedad arrendada será destinada exclusivamente a la habitación del arrendatario y su familia y dependientes domésticos, lo que no excede de ${contrato.numeroPersonas} personas.

2.- **PLAZO:**  
El presente contrato de arrendamiento rige a partir de la fecha de celebración del presente, en la que se hace entrega material al arrendatario de la vivienda y de las llaves de acceso a la misma. Su vigencia será de un año a contar de esta fecha. Este plazo se renovará en forma tácita, automática y sucesivamente en las mismas condiciones aquí pactadas, si ninguna de las partes manifiesta a la otra su voluntad de poner término al arrendamiento con un aviso con al menos 60 días de anticipación.

3.- **RENTA:**  
La renta mensual de arrendamiento será la suma $${contrato.renta}, a esta cantidad hay que agregar como costo adicional el gasto común mensual, el cual será cobrado y pagado en la Administración del Condominio. En caso de mora o simple retardo en el pago de la renta de arrendamiento, se deberá pagar el equivalente al 1% de la renta pactada por cada día de atraso.

4.- **MES DE GARANTÍA:**  
El arrendatario entrega en este acto la cantidad correspondiente a 1 mes de renta, $${contrato.garantia} con el fin de garantizar la conservación de la propiedad y su restitución en el mismo estado en que la recibe. La devolución del mes de garantía se realizará en efectivo, con los debidos reajustes de IPC en el plazo de un mes a contar desde el día en que se devuelvan las llaves al arrendador.

5.- **PROHIBICIONES AL ARRENDATARIO:**  
Queda expresamente prohibido al arrendatario y su infracción acarreará el término ipso-facto del presente contrato de arrendamiento:
- ${contrato.prohibiciones.join("\n- ")}

6.- **RESOLUCIÓN DEL CONTRATO:**  
El contrato podrá resolverse en caso de incumplimiento de las cláusulas establecidas en el presente contrato, especialmente las relacionadas con el pago de la renta y las prohibiciones mencionadas anteriormente.

FIRMAS:
Arrendador: ______________________  
Arrendatario: ______________________
`;

    // Agregar las opciones personalizadas al contrato
    doc.font(fontStyle)
        .fontSize(fontSize)
        .fillColor(textColor)
        .text(textoContrato, { align: 'justify' });

    doc.end();

    writeStream.on('finish', () => {
        // Insertar el contrato en la base de datos
        const sql = `
            INSERT INTO contratos (
                cliente, arrendatario, direccion, renta, duracion, garantia, 
                mascotasPermitidas, prohibiciones, calle, numeroCalle, ciudad, 
                rolAvaluos, comuna, numeroPersonas, pdfPath
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            contrato.cliente,
            contrato.arrendatario,
            contrato.direccion,
            contrato.renta,
            contrato.duracion,
            contrato.garantia,
            contrato.mascotasPermitidas ? 1 : 0,
            contrato.prohibiciones.join(', '),
            contrato.calle,
            contrato.numeroCalle,
            contrato.ciudad,
            contrato.rolAvaluos,  // Cambiado a TEXT
            contrato.comuna,
            contrato.numeroPersonas,
            `/pdfs/${fileName}`
        ];

        db.run(sql, params, (err) => {
            if (err) {
                console.error('Error al insertar contrato:', err.message);
                res.status(500).send('Error al guardar el contrato en la base de datos.');
            } else {
                // Enviar la ruta del archivo generado al frontend
                res.status(200).send({ message: 'PDF generado y contrato guardado con éxito', pdfPath: `/pdfs/${fileName}` });
            }
        });
    });

    writeStream.on('error', (err) => {
        console.error('Error al generar el PDF:', err);
        res.status(500).send('Error al generar el PDF');
    });
});


// Ruta para obtener todos los contratos
app.get('/miscontratos', (req, res) => {
    db.all('SELECT * FROM contratos', (err, rows) => {
        if (err) {
            console.error('Error al obtener contratos:', err.message);
            res.status(500).send('Error al obtener contratos.');
        } else {
            // Convertir la cadena de prohibiciones a un array
            rows.forEach((row) => {
                row.prohibiciones = row.prohibiciones.split(', '); // Convertir a un array de prohibiciones
            });
            res.status(200).send(rows);
        }
    });
});

app.put('/actualizar-contrato/:id', (req, res) => {
    const contratoId = req.params.id;
    const { cliente, arrendatario, direccion, renta, duracion, garantia, mascotasPermitidas, prohibiciones, calle, numeroCalle, ciudad, rolAvaluos, comuna, numeroPersonas } = req.body;

    // Actualizar el contrato en la base de datos
    const sql = `UPDATE contratos SET
        cliente = ?,
        arrendatario = ?,
        direccion = ?,
        renta = ?,
        duracion = ?,
        garantia = ?,
        mascotasPermitidas = ?,
        prohibiciones = ?,
        calle = ?,
        numeroCalle = ?,
        ciudad = ?,
        rolAvaluos = ?,
        comuna = ?,
        numeroPersonas = ?
        WHERE id = ?`;

    const params = [
        cliente, arrendatario, direccion, renta, duracion, garantia, mascotasPermitidas, prohibiciones.join(', '), 
        calle, numeroCalle, ciudad, rolAvaluos, comuna, numeroPersonas, contratoId
    ];

    db.run(sql, params, function(err) {
        if (err) {
            console.error('Error al actualizar el contrato:', err.message);
            return res.status(500).send('Error al actualizar el contrato');
        }

        res.status(200).send({ message: 'Contrato actualizado con éxito' });
    });
});

app.delete('/eliminar-contrato/:id', (req, res) => {
    const contratoId = req.params.id;

    const sql = `DELETE FROM contratos WHERE id = ?`;

    db.run(sql, [contratoId], function(err) {
        if (err) {
            console.error('Error al eliminar el contrato:', err.message);
            return res.status(500).send('Error al eliminar el contrato');
        }

        res.status(200).send({ message: 'Contrato eliminado con éxito' });
    });
});

app.get('/contrato/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM contratos WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Error al obtener contrato:', err.message);
            res.status(500).send('Error al obtener contrato.');
        } else if (!row) {
            res.status(404).send('Contrato no encontrado.');
        } else {
            res.status(200).send(row);  // Devuelve los datos del contrato
        }
    });
});


// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});





