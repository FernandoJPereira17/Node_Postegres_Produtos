import { config } from "../db/config/index.js";

export const produtoService = {

    buscarTodos: async (req, res) => {
        const result = await config.query('SELECT * FROM produtos');
        return result.rows;
    },

    buscarProdutoPorId: async (req, res) => {
        const id = req.params.id;
        const query = `SELECT * FROM produtos WHERE id = ${id}`
        console.log(`[QUERY]: ${query}`);
        
        const result = await config.query(query);
    
        if(result.rows.length === 0){
            res.status(404).send(`Produto com o id ${id} não encontrado!`);
            return;
        }
        return result.rows;
    },

    atualizarProduto: async (req, res) => {
        const { nome, descricao, desconto, preco, ativo, categoria, data_cadastro } = req.body;
    
        try {
            const query = 'UPDATE produtos SET nome=$1, descricao=$2, desconto=$3, preco=$4, ativo=$5, categoria=$6, data_cadastro=$7 WHERE id = $4';
            const values = [nome, descricao, desconto, preco, ativo, categoria, data_cadastro];
            const result = await config.query(query, values);
            res.send(result.rows[0]);
        } catch (err) {
            console.log('Erro ao inserir produto:', err);
            res.status(500).send('Erro ao inserir produto');
        }
    },

    createProduto: async (req, res) => {
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
    },

    deletarProduto: async (req, res) =>{
        const id = req.params.id;
        const query = 'DELETE FROM produtos WHERE id=$1'
        const values = [id];
        await config.query(query, values);
    }
}