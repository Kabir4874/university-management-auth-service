import config from '../../../config/index.js';
import ApiError from '../../../errors/ApiError.js';
import type { IUser } from './user.interface.js';
import User from './user.model.js';
import { generateUserId } from './user.utils.js';

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id;
};

export const createUserService = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUserId();

  user.id = id;
  //default password
  if (!user.password) {
    user.password = config.default_user_pass;
  }
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};
