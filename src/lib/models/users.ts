import mongoose, { model,  Schema} from "mongoose"

interface IUser{
  firstName:string,
  lastName:string,
  DOB:string,
  email:string,
  password:string,
  img:string,
  chats:{userId:string,
    messages:{date:Date, message:string}[]
  }[],
  friends:string[],
  posts:{date:Date,text:string}[]
}
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    friends: {
      type: [],
      default: [],
    },
    posts: {
      type: [],
      default: [],
    },
    chats: {
      type: [],
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default:
        "data:image/jpeg;base64,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",
    },
  },
  { timestamps: true }
);
const userModel=mongoose.models?.user||model<IUser>("user", userSchema)
export default userModel