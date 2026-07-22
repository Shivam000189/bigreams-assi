const express = require('express');
const cors = require('cors');
const guestRoutes = require('./routes/guestRoutes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api', guestRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = app;
