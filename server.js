import fastify from 'fastify';
import cors from '@fastify/cors';
import { rotasProdutos } from './controller/produto.controller.js';
import { connection } from './db/db.js';
import { config } from './db/config/index.js';

const PORT = 8080
const HOST = '127.0.0.1'

const app = fastify({ logger: false });

app.register(cors, {
    origin: '*',
});

connection()

app.get('/', (res, reply) => {
    return {
        "code": 200,
        status: "UP",
        message: "Servidor Rodando!"
    }
})

app.get('/produtos', async (req, res) => {
    const result = await config.query('SELECT * FROM produtos');
    return result.rows;
})

app.get('/produto/:id', async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM produtos WHERE id = ${id}`
    console.log(`[QUERY]: ${query}`);
    
    const result = await config.query(query);

    if(result.rows.length === 0){
        res.status(404).send(`Produto com o id ${id} não encontrado!`);
    }
    return result.rows;
})



//EXEMPLO...
// app.get('/produto/:id', async (req, res)=> {
//     try {
//         const { id } = req.params.id;
//         const query = 'SELECT * FROM produtos WHERE id = $1';
//         const result = await config.query (query, [id]);

//         if (result.rows.length > 0){
//             res.json(result.rows[1]);
//         } else {
//             res.status(404).json({ message: 'Produto não encontrado...' });
//         }
//       } catch (error) {
//         console.error('Erro na Consulta:', error);
//         res.status(500).json({ message: 'Erro no Servidor...' });
//       }
//     });

app.post('/produto', async (req, res) => {
    const { nome, descricao, desconto, preco, ativo, categoria, data_cadastro } = req.body;

    try {
        const query = 'INSERT INTO produtos (nome, descricao, desconto, preco, ativo, categoria, data_cadastro) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [nome, descricao, desconto, preco, ativo, categoria, data_cadastro];
        const result = await config.query(query, values);
        res.send(result.rows[0]);
    } catch (err) {
        console.log('Erro ao inserir produto:', err);
        res.status(500).send('Erro ao inserir produto');
    }
})

//app.register(rotasProdutos);

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
