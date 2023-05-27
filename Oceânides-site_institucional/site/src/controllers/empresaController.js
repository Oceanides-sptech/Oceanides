var empresaModel = require('../models/empresaModel')
var usuarioModel = require('../models/usuarioModel')
const nodemailer = require("nodemailer");

function listar(req,res) {
    empresaModel.listar().then(function(resultado) {
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }
    })
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;

    if(nome == undefined){
        console.log("Nome undefinido")
    }else if(cnpj == undefined){
        console.log("CNPJ undefinido")
    }else if(email == undefined){
        console.log("Email undefinido")
    }else{
        empresaModel.verificarCNPJ(cnpj).then(function(resposta) {
            if(resposta == 0){
                
                empresaModel.cadastrar(email,cnpj,nome).then(function() {
                    empresaModel.verificarCNPJ(cnpj).then(function(resposta) {
                    var idEmpresaCadastrada = resposta[0].idEmpresa;
                    var credencial = gerarCredencial(nome)
                    usuarioModel.cadastrar(`admin-${nome}`, email, credencial, idEmpresaCadastrada, null).then(function() {
                        
                        enviarEresmail(nome, email, credencial).then(function(resposta) {
                            res.status(200).json(resposta)
                        })  
                     })
            })
        })
            }else{
                var erro = "CNPJ já cadastrado!"
                res.status(403).send(erro)
            }
        })
    }
}



async function enviarEmail(nome,email,senha) {
    // Declarando as variaveis que estão pegando os valores do json que for enviado da pagina de faça parte
    // req = requisição
    // body = corpo do json
    // nomeServer ou emailServer = valores do json enviado

    var contaTeste = await nodemailer.createTestAccount() // criando uma conta teste, ou temporária
//Montando o transporte do email
    var transporte = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: contaTeste.user, // email gerado pela função da linha 11
          pass: contaTeste.pass, // senha gerada pela função da linha 11
        },
    })
//enviando o email
    var infoEmail = await transporte.sendMail({
        from: "'Oceânides' <oceanides@oceanides.com>",
        to: `"'${nome}', ${email}"`,
        subject: "Credenciais de primeiro acesso da sua empresa",
        text: "AAAAAAAAAAAAAAAAAAA",
        html: `
        <style>
        * {
          font-family: "Segoe UI";
          font-weight: 500;
        }
        #corpo {
          background-color: #00afef;
          display: flex;
          height: 700px;
          width: 1000px;
          align-items: center;
          justify-content: center;
        }
        #titulo{
          color: #00afef;
        }
        #box {
          background-color: white;
          border-radius: 20px;
          width: 400px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .item{
          width: 70%;
          height: 150px;
        }
        .campo {
        width: 100%;
        height: 50px;
          border-radius: 15px;
          border: 1px solid black;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>
      <div id="corpo">
        <div id="box">
          <h1 id="titulo">Primeiro acesso</h1>
          <div class="item">
            <p>Email:</p>
            <div class="campo">${email}</div>
          </div>
          <div class="item">
            <p>Senha:</p>
            <div class="campo">${senha}</div>
          </div>
        </div>
      </div>
      
        `
    }) 

    console.log("Message sent: %s", infoEmail.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(infoEmail));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  var retornoEmail = {
    link: nodemailer.getTestMessageUrl(infoEmail),
  }
 return retornoEmail;
}

function gerarCredencial(nome) {
    var credencial = nome+"-";
    var max = 9;
    var min = 1;
    var intervalo = (max-min)+1
    for(var i = 0; i<3; i++){
        var digito = (parseInt(min + Math.random() * intervalo)).toString()
        credencial+=digito
    }
    return credencial
}

module.exports ={
    listar,
    cadastrar
}

