import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js';
import { Server } from 'socket.io';

const app = express();
const messages = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+ '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+ '/public'));
app.use('/', viewsRouter);

const httpServer = app.listen(8080, ()=>
    console.log('estoy escuchando 8080')
)

const socketServer = new Server (httpServer);

socketServer.on('connection', (socket) => {
    console.log('nuevo cliente conectado')
    socket.emit('message', messages);

    socket.on('new-message', (message) => {
        console.log(message);
        messages.push(message);
        io.emit('messages', messages)
    })
})

