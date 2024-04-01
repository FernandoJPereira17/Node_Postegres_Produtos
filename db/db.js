import { config } from "./config/index.js";

export const connection = async ()=>{
try {
    //Método connect
    await config.connect();
    console.log('PostgreSQL conectado com sucesso!');
    
} catch (err) {
    console.log('Erro ao conectar com o banco', err);
}

}
