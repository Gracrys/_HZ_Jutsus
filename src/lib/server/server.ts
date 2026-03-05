import Koa from 'koa';
import http from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';
import syncDatabase from './db';
const isDev = process.env.NODE_ENV === 'dev';

console.log(process.env.NODE_ENV)
await syncDatabase()

const app = new Koa();
const server = http.createServer(app.callback());
const io = new Server(server)

if (!isDev) {
    try {
       /* const { handler } = await import('../build/handler.js');
        app.use(async (ctx) => {
            await handler(ctx.req, ctx.res);
            ctx.respond = false;
        });*/
    } catch (error) {
        console.error('Failed to load build handler:', error);
        console.log('Running in Dev Mode: Koa is only handling Sockets/API');
    }
} else {
    console.log('Running in Dev Mode: Koa is only handling Sockets/API');
}

io.on('connection', (socket) => {
    console.log('A user connected via Koa server');
    socket.on('message', (data) => {
        io.emit('message', data);
    });
    socket.on('log', (data) => {
        console.log('here', data)
        const roomName = data.room;
        if (games[data.room]) {
            games[data.room].push(data.name)
        } else {
            games[data.room] = [data.name]
        }
        console.log(games, data.room)
        if (games[data.room].length == 2) {
            socket.join(data.room);
            socket.broadcast.emit('game', data);
            console.log('client sent data to message endpoint', data);
            io.to(roomName).emit('game', { 
                message: `${data.name} has joined the game`,
                players: games[roomName] 
            });
            // ctx.socket.in(data.room).emit('game', { chicken: 'tasty' });
        } else if (games[data.room].length > 2) {
            console.log('room full');
            socket.broadcast.emit('game', { error: "full room" });
        } else {
            console.log('waiting for more players');
          //  socket.broadcast.emit('game', { message: "waiting for more players" });
        }
    })

    socket.on('game', (data) => {
        console.log('client sent data to game endpoint', data);
 socket.to(data.room).emit('game', { message: data.jutsu });
    })
});




type Games = {
    [key: string]: any[]
}

let games: Games = {}
let gamesArr = []



const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Koa + SvelteKit + Sockets running on http://localhost:${PORT}`);
});