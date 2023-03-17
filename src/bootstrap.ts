import path from 'path';

require('dotenv').config({
  path:
    process.env.NODE_ENV === 'test'
      ? `${path.resolve(process.cwd(), '.env.test')}`
      : `${path.resolve(process.cwd(), '.env')}`,
});
