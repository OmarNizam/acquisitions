import express, { type Request, type Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from Acquistions api!');
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express API', version: '1.0.0' });
});

app.post('/api/echo', (req: Request, res: Response) => {
  res.json({ echo: req.body });
});

app.use('/auth', authRoutes);

export default app;
