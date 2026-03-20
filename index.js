const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

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

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
})
