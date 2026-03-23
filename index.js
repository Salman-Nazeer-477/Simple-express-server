const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.text())
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'data.txt')

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error reading the file')
      return
    }

    res.send(data)
  });
});

app.put('/datainput', (req, res) => {
  const text = req.body;

  console.log('Received text:', text);

  res.send('Text received successfully');
  fs.appendFile('data.txt', `${text}<br>`, (err) => {
    if (err) {
      console.error('Error appending to file', err);
      return;
    }
    console.log('Data appended to file');
  });
});

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
})
