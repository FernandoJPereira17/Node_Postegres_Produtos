import fastify from 'fastify';
import cors from '@fastify/cors';
import { connection } from './db/db.js';
import { produtosRoute } from './routes/produtos.routes.js';

const PORT = 8080
const HOST = '127.0.0.1'

const app = fastify({ logger: false });

app.register(cors, {
    origin: '*',
});

connection()
produtosRoute(app)

app.get('/', (res, reply) => {
    return {
        "code": 200,
        status: "UP",
        message: "Servidor Rodando!"
    }
})


app.listen({ /* host: 'localhost', */ port: `5000` }, (err, address) => {
    if (err) {
        /* app.log.error(err);
        process.exit(1); */
        console.log(`Erro ao rodar os ervidor: ${err}`);
        return;
    }
    app.log.info(`Server listening on ${address}`);
    console.log(`Server listening on ${address}`);
    //console.log(`Server listening on http://${HOST}:${PORT}`);
});
