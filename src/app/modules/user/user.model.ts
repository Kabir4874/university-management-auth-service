import { model, Schema } from 'mongoose';
import type { IUser, UserModel } from './user.interface.js';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = model<IUser, UserModel>('User', userSchema);

export default User;
