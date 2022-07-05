import mongoose, { Document, Schema } from 'mongoose';

export interface IRole {
  type: string,
}

export interface IRoleModel extends IRole, Document {}

const RoleSchema: Schema = new Schema(
  {
    type: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<IRoleModel>('Role', RoleSchema);