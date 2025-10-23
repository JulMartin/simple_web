const express = require('express');
const app = express();

// Handle GET / → "Hi there"
app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hi there');
});

// Handle GET /health → "OK"
app.get('/health', (req, res) => {
  res.send('OK');
});

// Handle GET /ready → JSON with current ISO timestamp
app.get('/ready', (req, res) => {
  res.json({
    status: 'ready',
    time: new Date().toISOString()
  });
});

// Handle GET /greet?name=...
app.get('/greet', (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).send('Name query parameter is required');
  }
  res.send(`Hello, ${name}!`);
});

// Handle GET /new → "Im new endpoint"
app.get('/new', (req, res) => {
  res.send('Im new endpoint');
});

// Catch-all for unknown routes → 404
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Only listen when started directly: `node index.js`
if (require.main === module) {
  app.listen(8080, () => {
    console.log('Listening on port 8080');
  });
}

module.exports = app;