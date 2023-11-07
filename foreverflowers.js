//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
 
//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;
 
//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/foreverflowers',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});
 
//criando a model do seu projeto
const usuarioSchema = new mongoose.Schema({
    email : {type : String, Required : true},
    senha : {type : String}
});
const Usuario = mongoose.model("Usuario", usuarioSchema);
 
//criando a segunda model
const produtoEsporteSchema = new mongoose.Schema({
    id_produtoartificial : {type : String, Required : true},
    descricao : {type : String},
    fornecedor : {type : String},
    dataFabricacao : {type : Date},
    quantidadeEstoque : {type : Number}
});
const produtoartificial = mongoose.model("produtoartificial", produtoEsporteSchema);
 
//configurando os roteamentos
app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha;
 
    //mandando para banco
    const usuario = new Usuario({
        email : email,
        senha : senha,
    })
 
    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }
});
 
app.post("/cadastroprodutoartificial", async(req, res)=>{
    const id_produtoartificial = req.body.id_produtoartificial;
    const descricao = req.body.descricao;
    const fornecedor = req.body.fornecedor;
    const dataFabricacao = req.body.dataFabricacao;
    const quantidadeEstoque = req.body.quantidadeEstoque

    if(quantidadeEstoque <= 0 || quantidadeEstoque > 27){
        return res.status(400).json({error: "Estoque so é posivel de 0 até 27.."})
    }
 
    //mandando para banco
    const produtoesporte = new Produtoesporte({
        id_produtoartificial : id_produtoartificial,
        descricao : descricao,
        fornecedor : fornecedor,
        dataFabricacao : dataFabricacao,
        quantidadeEstoque : quantidadeEstoque
    })
 
    try{
        const newprodutoartificial = await produtoartificial.save();
        res.json({error : null, msg : "Cadastro ok", produtoartificialId : newprodutoartificial._id});
    } catch(error){
        res.status(400).json({error});
    }
});
 
//rota para o get de cadastro
app.get("/cadastrousuario", async(req, res)=>{
    res.sendFile(__dirname +"/cadastrousuario.html");
})
 
//rota para o get de cadastro
app.get("/cadastroprodutoartificial", async(req, res)=>{
    res.sendFile(__dirname +"/cadastroprodutoartificial.html");
})
 
//rota raiz - inw
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})
 
//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})