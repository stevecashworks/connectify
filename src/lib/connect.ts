import { connect } from "mongoose";
let connection: { isConnected: boolean } = { isConnected: false };
const ConnectToDb = async () => {
  console.log("hello");
  try {
    if (connection.isConnected) {
      console.log("using existing connection");
      return;
    } else {
      const db = await connect(process.env.server_mongo as string);
      connection.isConnected = db.connections[0].readyState > 0;
    }
    console.log("connected");
    return connection;
  } catch (error: any) {
    console.log(error.message);
  }
};
export default ConnectToDb;
