/* ISC Copyright
Copyright 2023 MariseMiranda && Thiago Rodrigues
*/

/*
    CÓDIGO ADAPTADO PARA CAPTAR DADOS VINDOS DA OPENWEATHER. REPOSITÓRIO ORIGINAL SE BASEAVA EM DADOS ALEATÓRIOS
*/

const express = require('express');

const DELAY = 10000; //ms
const SERVIDOR_PORTA = 3300; //127.0.0.1:3000/sensores/

const faixa_temp = "alta"; // alterar para que o sensor aplique a fórmula que simule a temperatura nas condições da faixa
//  intermediária: 3°C a 8°C
//  baixa: 0°C a 1°C
// alta: 10°C a 14°C

function simularTemperatura(faixa, temperatura) {
    var intermediaria = faixa == "intermediaria";
    var temp_simulada = 0;
    var alta = faixa == "alta";
    if (alta) {
        temp_simulada = temperatura * 0.373832 + 2.373832;
        return Number(temp_simulada.toFixed(2));
    }else if(intermediaria){
        temp_simulada = temperatura * 0.467228972 - 6.53;
        return Number(temp_simulada.toFixed(2));
    }else {
        temp_simulada = temperatura * 0.09345 - 1.90654;
        return  Number(temp_simulada.toFixed(2))
    }
}

function simularUmidade(umidade) {
    var umidade_simulada = umidade * 0.08929 + 86.5179
    return Number(umidade_simulada.toFixed(2));
}

const app = express(); // ABRE O SERVIDOR
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});
app.listen(SERVIDOR_PORTA, () => {
    console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
});


 
var valoresDht11Umidade = [];
var valoresDht11Temperatura = [];


function buscarTemp () {
    let latitude = -23.5804794; 
    let longitude = -46.3922478;
    let key = "425c939f1fa1145433bb3ac877f6e848";
    let endpoint = `weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
    let api = "https://api.openweathermap.org/data/2.5/" + endpoint;

    fetch(api, {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        var temperatura = data.main.temp;
        var umidade = data.main.humidity

       valoresDht11Temperatura.push(simularTemperatura(faixa_temp,temperatura));
       valoresDht11Umidade.push(simularUmidade(umidade));

       console.log(`UMIDADE: ${umidade}, \n TEMPERATURA: ${temperatura}`);
      });
  };

 

const servidor = (
    valoresDht11Umidade,
    valoresDht11Temperatura,
) => {
    
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresDht11Umidade);
    });
    app.get('/sensores/dht11/temperatura', (_, response) => {
        return response.json(valoresDht11Temperatura);
    });
}



setInterval(()=>{
    buscarTemp();
    servidor(
        valoresDht11Umidade, 
        valoresDht11Temperatura
    );
}, DELAY);

