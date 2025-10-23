const express = require('express');
const app = express();

// Handle GET / → "Hi there, Kirsten"
app.get('/', (req, res) => {
  res.type('text/plain'); // optional, to make headers explicit
  res.send('Hi there, Kirsten');
});

app.get('/health', (req, res) => {
    res.send('OK');
});

app.get('/ready', (req, res) => {
    res.json({
        status: 'ready',
        time: new Date().toISOString()
    });
});

app.get('/greet', (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).send('Name query parameter is required');
    }
    res.send(`Hello, ${name}!`);
});

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).end();
});

// Only listen when started directly: `node index.js`
if (require.main === module) {
    app.listen(8080, () => {
        console.log('Listening on port 8080');
    });
}

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

// Catch-all for unknown routes → 404
app.use((req, res) => {
  res.status(404).send('Not Found');
});

module.exports = app;