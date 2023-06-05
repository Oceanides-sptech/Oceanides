/* ISC Copyright
Copyright 2023 MariseMiranda && Thiago Rodrigues
*/

/*
    CÓDIGO ADAPTADO PARA CAPTAR DADOS VINDOS DA OPENWEATHER. REPOSITÓRIO ORIGINAL SE BASEAVA EM DADOS ALEATÓRIOS
*/

const express = require('express');
const mysql = require('mysql2');
const sql = require('mssql');

const DELAY = 1000; //ms


var temperatura;
var umidade;



async function buscarTemp () {
    let latitude = -23.5804794; 
    let longitude = -46.3922478;
    let key = "425c939f1fa1145433bb3ac877f6e848";
    let endpoint = `weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
    let api = "https://api.openweathermap.org/data/2.5/" + endpoint;

    await fetch(api, {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        temperatura = data.main.temp;
        umidade = data.main.humidity
        umidade = umidade * 0.08929 + 86.5179;
       console.log(`UMIDADE: ${umidade}, \n TEMPERATURA: ${temperatura}`);
      });

  };

async function cadastrar() {
    var poolBancoDados = '';
    
    poolBancoDados = mysql.createPool({
        host: 'localhost',
        user: "oceanides-admin",
        password: "oceanides@2023",
        database: 'oceanides'
    }
    ).promise()
    
    await poolBancoDados.execute( `INSERT INTO registro (temperatura, umidade, fkSensor) VALUES(?,?,
        (SELECT 
        FLOOR((1+RAND()*(((max(idSensor)) - (min(idSensor)))+1)))
        from sensor
        ));`,
       [temperatura, umidade])
       console.log("valores inseridos no banco: ", temperatura + ", " + umidade)
}


setInterval(async ()=>{
    await buscarTemp();
    await cadastrar()
}, DELAY);

