const express = require("express");
const cors = require("cors");
const db = require("./dbniki");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"../")));

// HOME
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"../nikhil.html"));
});

// =======================
// AUTO LOGIN (NO REGISTER)
// =======================
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username=?", [username], (err, rows) => {

        if (err) return res.json({ error: err.message });

        if (rows.length > 0) {
            if (rows[0].password === password) {
                return res.json(rows[0]);
            } else {
                return res.json({ error: "Wrong password" });
            }
        }

        // create new user
        db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, password],
            (err2, result) => {

                if (err2) return res.json({ error: err2.message });

                res.json({
                    user_id: result.insertId,
                    username: username
                });
            }
        );
    });
});

// =======================
// TRAINS + ROUTES
// =======================
app.get("/compartments",(req,res)=>{
    const sql = `
    SELECT c.*, t.train_name, t.source, t.destination
    FROM compartments c
    JOIN trains t ON c.train_id=t.train_id
    `;
    db.query(sql,(err,rows)=>res.json(rows));
});

// =======================
// BOOK
// =======================
app.post("/bookings",(req,res)=>{
    const {user_id,train_id,compartment_type,seats} = req.body;

    db.query("SELECT available_seats FROM compartments WHERE train_id=? AND type=?",
    [train_id,compartment_type],(err,rows)=>{

        if(rows[0].available_seats < seats)
            return res.json({error:"Not enough seats"});

        db.query("INSERT INTO bookings (user_id,train_id,compartment_type,seats) VALUES (?,?,?,?)",
        [user_id,train_id,compartment_type,seats]);

        db.query("UPDATE compartments SET available_seats=available_seats-? WHERE train_id=? AND type=?",
        [seats,train_id,compartment_type]);

        res.json({message:"Booked"});
    });
});

// =======================
// BOOKINGS (WITH USERNAME)
// =======================
app.get("/bookings",(req,res)=>{
    const sql = `
    SELECT 
        b.booking_id,
        u.username,
        t.train_name,
        t.source,
        t.destination,
        b.compartment_type,
        b.seats,
        b.status,
        b.user_id
    FROM bookings b
    JOIN trains t ON b.train_id = t.train_id
    JOIN users u ON b.user_id = u.user_id
    `;
    db.query(sql,(err,rows)=>res.json(rows));
});

// =======================
// CANCEL
// =======================
app.put("/cancel/:id",(req,res)=>{
    db.query("UPDATE bookings SET status='Cancelled' WHERE booking_id=?",
    [req.params.id]);

    res.json({message:"Cancelled"});
});

app.listen(5000,()=>console.log("🚀 http://localhost:5000"));