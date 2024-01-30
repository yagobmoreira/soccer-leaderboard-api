import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';

export type LoginResponseData = {
  token: string
};

type LoginResponse = ServiceResponse<LoginResponseData>;

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) { }

  public async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const payload = { sub: user.id, role: user.role, email: user.email };
    const secret = process.env.JWT_SECRET ?? 'any-secret';

    const token = jwt.sign(payload, secret, { expiresIn: '30m' });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
