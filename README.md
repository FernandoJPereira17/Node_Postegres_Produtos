# Node_Fastify_Postegre


Aplicação para revisão de estudo com:

NodeJs, nodemon, PostgreSQL, fastify, cors, dotenv.

Objetivo: Criar uma api de produtos usando o Postgres para persisitir os dados usando alguma biblioteca, por exemplo: pg

1 - Criar um servidor que ao subir retorne no path '/':

{
  "code": 200,
  "status": "UP",
  "message": "Servidor Rodando!"
}
Utlizando nodemon, fastify e type: module.

2 - Condigurar a conexão da biblioteca pg. No link possui a doc. Aparecer no log que o banco está conectado.

colunas da tabela produto:

nome, descricao, desconto, preco, ativo, categoria, data_cadastro,

3 - Endpoints:

GET /produto GET /produtos GET /produto/?status=ativo POST /produto PUT /produto/:id PATCH /produto/:id DELETE /produto/:id


--Criando o banco de dados e as colunas...

create database dc_produtos;

CREATE TABLE produtos (
	ID SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	descricao VARCHAR(255) NOT NULL,
	desconto INTEGER NOT NULL,
	preco DECIMAL (10,2) NOT NULL,
	ativo BOOLEAN DEFAULT TRUE,
	categoria VARCHAR(255) NOT NULL,
	data_cadastro DATE NOT NULL	
)

--nome, descricao, desconto, preco, ativo, categoria, data_cadastro,
