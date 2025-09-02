const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./oralvis.db');
const bcrypt = require('bcryptjs');


function addUser(email, name, password, role) {
  bcrypt.hash(password, 10, (error, hash) => {
    if (error) {
      console.error("Hashing error:", err.message);
      return;
    }

    db.run(`INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)`, [email, hash, name, role], function (err) {
      if (err) {
        console.log("error inserting", err)
      } else {
        console.log("user added with id: ", this.lastID)
      }
    })
  })
}


// addUser("tech1@example.com", "Technician One", "mypassword123", "Technician");
// addUser("dentist1@example.com", "Dentist One", "securepass456", "Dentist");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      name TEXT,
      password_hash TEXT,
      role TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS scans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_name TEXT,
      patient_id TEXT,
      scan_type TEXT,
      region TEXT,
      image_url TEXT,
      uploaded_by INTEGER,
      uploaded_at DATETIME,
      FOREIGN KEY (uploaded_by) REFERENCES users(id)
    )
  `);

})

db.close()