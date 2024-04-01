import { produtos } from "../db/produtos.js";

export const produtoService = {
  buscarProdutos: (req, reply) => {
    return {
      code: 200,
      status: "UP",
      message: "Servidor Rodando!",
    };
  },
  addProduto: (req, res) => {

        let produtoReq = req.body;
        let id = produtos.length +1
        req.body.nome = `Produto${id}`
        req.body.id = id
        return produtos.push(produtoReq);


    // let idNext = produtos.length + 1;
    // const { id, nome, descricao, desconto, preco, ativo, categoria, data_cadastro } = req.body
    // let produtoBd = {
    //     id: idNext,
    //     nome: `Nome ${idNext}`,
    //     descricao,
    //     desconto,
    //     preco,
    //     ativo,
    //     categoria,
    //     data_cadastro,
    //  }
    //  return produtos.push(produtoBd);
  },

  
};
