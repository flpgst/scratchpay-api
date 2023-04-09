import './bootstrap';
import { app } from './externals/express/app';

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server listening at port: ${port}`);
});
