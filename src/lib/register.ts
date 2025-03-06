
import userModel from "./models/users";
const register = async (body: {}) => {
    
  try {
    
    const newUser =new userModel(body);
     await newUser.save()
    console.log(newUser);
    return newUser;
  } catch (error: any) {
    console.log(error.message);
  }
};
export default register;
