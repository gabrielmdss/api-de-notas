let {notas, notasExcluidas} = require('../database/database');
const fs = require('fs/promises')
let identificadorNota = 1;


const criarUmaNota = async (req,res) => {
    const {titulo,conteudo} = req.body;

    
    if(!titulo){
        return res.status(400).json({mensagem: "Insira o título da nota."});
    };

    if(!conteudo){
        return res.status(400).json({mensagem: "Insira o conteúdo da nota."});
    };

    const nota = {
        id: identificadorNota,
        titulo,
        conteudo
    };

    identificadorNota++;

    notas.push(nota);

    res.status(200).json({mensagem: "Nota criada com sucesso."})

};

const listarNotas = async (req,res) => {
    return res.status(200).json(notas);
};

const recuperarNota = async (req,res) => {
    const {idNota} = req.params;
    
    
    if(isNaN(idNota)){
        return res.status(400).json({mensagem: "É necessário informar um id válido"});
    };

    let notaEncontrada = notasExcluidas.find((nota)=>{
        return nota.id === Number(idNota)
    });

    notaEncontrada = notas.find((nota)=>{
        return nota.id === Number(idNota)
    });

    if(!notaEncontrada){
        return res.status(400).json({mensagem: "Não existe nota com o id informado"})
    };

    return res.status(200).json(notaEncontrada);

};

const editarNota = async (req,res) => {
    const {id, titulo, conteudo} = req.body;

    
    
    if(isNaN(id)){
        return res.status(400).json({mensagem: "É necessário informar um id válido"});
    };

    notaEncontrada = notas.find((nota)=>{
        return nota.id === Number(id)
    });

    if(!notaEncontrada){
        return res.status(400).json({mensagem: "Nota inexistente ou já foi apagada."})
    };

    notaEncontrada.titulo = titulo;
    notaEncontrada.conteudo = conteudo;

    res.status(200);
}; 

const excluirNota = async (req,res) => {
    const {idNota} = req.params;

    if(isNaN(idNota)){
        return res.status(400).json({mensagem: "É necessário informar um id válido"});
    };

    notaEncontrada = notas.find((nota)=>{
        return nota.id === Number(idNota)
    });

    if(!notaEncontrada){
        return res.status(400).json({mensagem: "Nota inexistente ou já foi apagada."})
    };

    
    notas = notas.filter((nota)=>{
        return nota.id !== Number(idNota)
    })

    

    
};

module.exports = {
    criarUmaNota,
    listarNotas,
    recuperarNota,
    editarNota,
    excluirNota
}
