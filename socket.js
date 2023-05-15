let io;

module.exports = {
    init: httpServer => {
        const socketIO = require('socket.io');
        io = socketIO(httpServer, {
            cors: {
                origin: '*', // Replace '*' with the appropriate origin(s) you want to allow
                methods: ['GET', 'POST'], // Specify the HTTP methods you want to allow
            },
        })
        return io;
    },
    getIO: () => {
        if(!io) {
            throw new Error('Socket.io not initialized')
        }
        return io;
    }
}