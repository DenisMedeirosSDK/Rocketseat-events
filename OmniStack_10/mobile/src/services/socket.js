import socketio from 'socket.io-client';

const socket = socketio('http://192.168.25.14:3333', {
    autoConnect: false,
});

function subscribeToNewDevs(subscribeFuncition) {
    socket.on('new-dev', subscribeFuncition)
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    }
    socket.connect();
}

function disconnect() {
    if (socket.connect) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
};