import { NextFunction, Request, Response } from 'express';
import schemas from './validations/schemas';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const { error } = schemas.loginSchema.validate(data);

    if (error) {
      return res.status(400).json(error.message);
    }

    next();
  }
}

export default Validations;
