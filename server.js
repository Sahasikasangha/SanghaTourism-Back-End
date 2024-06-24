const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    // host : 'localhost',
    host : 'sanghatourism.my.id',
    user : 'root',
    password:'',
    // database: "signup"
    database: "sanghato_signup"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.post('/Register', (req, res)=> {
    const sql = "INSERT INTO login (username, email, password) VALUES (?, ?, ?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ]
    db.query(sql, values, (err, data) => {
        if(err) {
            console.error('Error inserting into MySQL:', err);
            return res.status(500).json({ message: 'error' });

        }
        return res.status(201).json({ message: 'User registered successfully' });
    })
})

app.post('/Login', (req, res)=> {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) {
            console.error('Error querying MySQL:', err);
            return res.status(500).json({ message: 'error' });
        }
        if(data.length > 0){
            return res.json("sukses");
            // return res.status(200).json({ message: 'sukses' });
        } else {
            return res.status(401).json({ message: 'failed', reason: 'Email atau password yang dimasukkan salah' });
        }
    });
});

app.listen(8081, ()=> {
    console.log('server running di 8081');
})