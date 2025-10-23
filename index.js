// index.js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
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

module.exports = app; // <-- export for tests
