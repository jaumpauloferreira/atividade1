import express from 'express';

const host='0.0.0.0';
const porta = 3000;
const app = express();

app.get

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
})