import { Server } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponseWithSocket } from "./types/socket"; // Custom Type (defined below)

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("join-room", ({ callerId, receiverId }) => {
        socket.join(receiverId);
        console.log(`${callerId} joined room: ${receiverId}`);
      });

      socket.on("signal", ({ to, data }) => {
        io.to(to).emit("signal", data);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }
  res.end();
}
