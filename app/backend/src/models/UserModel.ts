import { IUser } from '../Interfaces/users/IUser';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;

    return user.toJSON();
  }
}
