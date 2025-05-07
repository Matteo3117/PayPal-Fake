const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint per registrare l'email
app.post('/register-email', (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).send('Email mancante');
  }
  // Appendi l'email al file, con newline
  fs.appendFile('emails.txt', email + '\n', err => {
    if (err) {
      console.error('Errore scrittura file:', err);
      return res.status(500).send('Impossibile salvare');
    }
    res.sendStatus(200);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
