import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World from Acquistions api!');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sample API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express API', version: '1.0.0' });
});

app.post('/api/echo', (req, res) => {
  res.json({ echo: req.body });
});

export default app;
