import { NextFunction, Request, Response } from 'express';
import schemas from './validations/schemas';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const { error } = schemas.loginSchema.validate(data);
    console.log(error);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    next();
  }
}

export default Validations;
