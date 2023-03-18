import { NOT_FOUND } from 'http-status';

interface NotFoundErrorProps {
  message: string;
}

class NotFoundError extends Error {
  public httpStatus = NOT_FOUND;
  constructor(value: NotFoundErrorProps) {
    super(value.message);
  }
}

export default NotFoundError;
