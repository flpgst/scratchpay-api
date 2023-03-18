import './bootstrap';
import Express from '@/externals/express';

const port = process.env.SERVER_PORT || 3000;

Express.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
