const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conexión a la base de datos SQLite
const dbPath = path.resolve(__dirname, 'contracts.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Eliminar la tabla 'contratos' si existe y luego crearla de nuevo
db.run(`DROP TABLE IF EXISTS contratos`, (err) => {
    if (err) {
        console.error('Error al eliminar la tabla contratos:', err.message);
    } else {
        console.log('Tabla contratos eliminada con éxito');
    }

    // Ahora crear la tabla con la nueva estructura
    db.run(`
        CREATE TABLE IF NOT EXISTS contratos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente TEXT NOT NULL,
            arrendatario TEXT NOT NULL,
            direccion TEXT NOT NULL,
            renta REAL NOT NULL,
            duracion INTEGER NOT NULL,
            garantia REAL NOT NULL,
            mascotasPermitidas INTEGER NOT NULL,
            prohibiciones TEXT NOT NULL,
            calle TEXT NOT NULL,
            numeroCalle INTEGER NOT NULL,
            ciudad TEXT NOT NULL,
            rolAvaluos TEXT NOT NULL,  
            comuna TEXT NOT NULL,
            numeroPersonas INTEGER NOT NULL,
            pdfPath TEXT NOT NULL,
            usuario TEXT
        );
    `, (err) => {
        if (err) {
            console.error('Error al crear la tabla contratos:', err.message);
        } else {
            console.log('Tabla contratos creada con éxito');
        }
    });
});

module.exports = db;

