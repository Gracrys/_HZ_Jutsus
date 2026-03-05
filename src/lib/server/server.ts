import Koa from 'koa';
import http from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';
const isDev = process.env.NODE_ENV === 'dev';

console.log(process.env.NODE_ENV)

const app = new Koa();
const server = http.createServer(app.callback());
const io = new Server(server)

if (!isDev) {
    const { handler } = await import('./build/handler.js');
    app.use(async (ctx) => {
        await handler(ctx.req, ctx.res);
        ctx.respond = false;
    });
} else {
    console.log('Running in Dev Mode: Koa is only handling Sockets/API');
}

io.on('connection', (socket) => {
    console.log('A user connected via Koa server');
    socket.on('message', (data) => {
        io.emit('message', data);
    });
socket.on('log', (data) => {
    console.log(data)
  if (games[data.room]) {
      games[data.room].push(data.name)
  }else{
      games[data.room] = [data.name]
  }
    console.log(games)
  if(games[data.room].length <= 2){
    //ctx.socket.join(data.room);
    //app.io.broadcast( 'game', data);
    console.log('client sent data to message endpoint', data);
    // ctx.socket.in(data.room).emit('game', { chicken: 'tasty' });
  } else
    console.log('room full');
   // app.io.broadcast( 'game', {error: "full room"});
})
});


type Games = {
  [key: string] : any[]
}

let games:Games = {}
let gamesArr = []

io.on('game', (ctx, data) => {
  console.log(data)
  ctx.socket.to(data.room).emit('game', { message: data.jutsu });
    // ctx.socket.in(data.room).emit('game', { message: 'tasty' });

    
})

io.on('log', (ctx, data) => {
console.log(data)
  if (games[data.room]) {
      games[data.room].push(data.name)
  }else{
      games[data.room] = [data.name]
  }
    console.log(games)
  if(games[data.room].length <= 2){
    ctx.socket.join(data.room);
    app.io.broadcast( 'game', data);
    console.log('client sent data to message endpoint', data);
    // ctx.socket.in(data.room).emit('game', { chicken: 'tasty' });
  } /*else
    app.io.broadcast( 'game', {error: "full room"});*/
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Koa + SvelteKit + Sockets running on http://localhost:${PORT}`);
});