import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<IUserModel>('User', UserSchema);