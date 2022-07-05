import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  role: string,
  comparePassword(candidatePassword: string): Promise<boolean>
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, required: true, ref: 'Role' }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.pre('save', async function(next) {
  let user = this as IUserModel;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  const user = this as IUserModel;

  return bcrypt.compare(candidatePassword, user.password)
    .catch((e) => false);
};

export default mongoose.model<IUserModel>('User', UserSchema);