// socket.js
import { Server } from 'socket.io';

export function initializeSocket(server) {
    const io = new Server(3000, server);
    io.on("connection", (socket) => {
        const chatRoomId = socket.handshake.query.chatRoomId
        //console.log(socket.id)
        socket.on(chatRoomId, (mess) => {
            io.emit(chatRoomId, mess);
        });
        // socket.emit(chatRoomId, arr);
        // Xử lý sự kiện khi người dùng ngắt kết nối
        socket.on("disconnect", () => {
            console.log('User disconnected');
        });
    });
    return io;
}

