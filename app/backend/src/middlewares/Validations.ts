import { NextFunction, Request, Response } from 'express';
import schemas from './validations/schemas';

const verifyErrorType = (type: string): number => {
  if (type === 'string.email' || type === 'string.min') {
    return 401;
  }
  return 400;
};

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const { error } = schemas.loginSchema.validate(data);

    if (error) {
      console.log(error);
      const errorStatus = verifyErrorType(error.details[0].type);
      return res.status(errorStatus).json({ message: error.message });
    }

    next();
  }
}

export default Validations;
