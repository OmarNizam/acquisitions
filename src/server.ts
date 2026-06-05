import app from './app.js';

const PORT: number = parseInt(process.env.PORT || '3000');

app.listen(PORT, () => {
  console.log(`Express API running on port http://localhost:${PORT}/`);
});
