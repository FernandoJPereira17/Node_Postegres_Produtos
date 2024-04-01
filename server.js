import Fastify from "fastify";
import { produtoService } from "./services/produtos.service.js";
import { connection } from "./db/db.js";
import { config } from "./db/config/index.js";

const fastify = Fastify({
  logger: false,
});

connection();

const PORT = 5000;

fastify.get("/", (req, reply) => {
  
  reply.send({
    code: 200,
    status: "UP",
    message: "Servidor Rodando!",
  });
});

fastify.get("/produto/:id", async (req, res)=> {
    const result = await config.query('SELECT * from produtos');
    return result.rows;
})

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

fastify.get("/produto", produtoService.buscarProdutos);
fastify.get("/produtos", produtoService.buscarProdutos);
fastify.get("/produto/?status=ativo", produtoService.buscarProdutos);
fastify.post("/produto", produtoService.addProduto);
// fastify.put("/produto/:id", produtoService.atualizarProduto);
// fastify.patch("/produto/:id", produtoService.atualizarParcialProduto);
// fastify.delete("/produto/:id", produtoService.deleteProduto);

//GET /produto GET /produtos GET /produto/?status=ativo 
//POST /produto 
//PUT /produto/:id 
//PATCH /produto/:id 
//DELETE /produto/:id

fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error("Erro ao subuir o servidor", err);
    return;
  }
  console.log(`Server ins now listening on ${address}`);
});
