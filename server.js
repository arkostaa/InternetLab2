const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const db = new sqlite3.Database('./bikeRent.db');

db.run(`
    CREATE TABLE IF NOT EXISTS rentals (
        id TEXT,
        bike TEXT,
        rentalPoint TEXT,
        name TEXT,
        phone TEXT,
        start_time TEXT,
        duration TEXT,
        TotalCost TEXT,
        returnPoint TEXT
    )`);
    var idishka = 0;
    app.post('/submitRentalData', (req, res) => {
        const { id, bike, rentalPoint, name, phone, start} = req.body;
    idishka = id;
     db.run(`INSERT INTO rentals (id, bike, rentalPoint, name, phone, start_time) VALUES (?, ?, ?, ?, ?, ?)`, [id, bike, rentalPoint, name, phone, start], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Failed to submit data');
        } else {
            res.status(200).send('Data submitted successfully');
        }
        });
    });
    app.post('/sendDuration', (req, res) => {
        const { duration, money, returnPoint } = req.body;
        db.run(`UPDATE rentals SET duration = ?, TotalCost = ?, returnPoint = ? WHERE id = ?`, [duration, money, returnPoint, idishka], function(err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Failed to submit data');
            } else {
                res.status(200).send('Data submitted successfully');
            }
            });
    });
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
