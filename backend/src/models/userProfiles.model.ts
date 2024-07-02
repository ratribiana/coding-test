import { model, Schema, Document } from 'mongoose';
import { IUserProfile } from '@/interfaces/userProfiles.interface';
import { toBase64 } from '@utils/functions';

const userProfileSchema: Schema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: v =>
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(v),
        message: () => 'Invalid email address.',
      },
      required: [true, 'Email is a required field'],
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);
function transformId(doc: any, ret: any) {
  ret.id = toBase64(ret._id.toString());
  delete ret._id;
  return ret;
}

userProfileSchema.set('toJSON', {
  transform: transformId,
});

userProfileSchema.set('toObject', {
  transform: transformId,
});

const userProfileModel = model<IUserProfile & Document>('UserProfiles', userProfileSchema, 'users');

export default userProfileModel;
