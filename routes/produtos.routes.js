import { config } from "../db/config/index.js";
import { produtoService } from "../services/produtos.service.js";

export const produtosRoute = (app) => {
    app.get('/produtos', produtoService.buscarTodos)
    
    app.get('/produto/:id', produtoService.buscarProdutoPorId);

    app.post('/produto', produtoService.createProduto);
    
    app.put('/produto', produtoService.atualizarProduto);

    app.delete ('/produto/:id', produtoService.deletarProduto);
    
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
};