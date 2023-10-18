const camisaLacoste = {
    descricao: 'Camisa polo',
    preco: 589.97,
    tamanho: 'm',
    cor: 'Amarelo',
    presente: true
}
//  Forma comun
// const descricao = camisaLacoste.descricao;
// const preco = camisaLacoste.preco;

//destructuring
const {descricao, preco, presente} = camisaLacoste;

// console.log('PRODUTO');
// console.log();
// console.log(`Descricao : ${descricao}`);
// console.log(`Preco : ${preco}`);
// console.log(`Presente : ${preco}`);

console.log(`
PRODUTO:
    Descricao: ${descricao}
    Preco: ${preco}
    Presente: ${presente ? 'Sim' : 'Nao'}`);

    const evento = {
        dataEvento : new Date(),
        descricaoEvento: 'Evento de JavaScript',
        titulo : 'programacao web',
        presencaEvento: true,
        comentario :'evento foi top com edu'
    }


    const {dataEvento, descricaoEvento, titulo, presencaEvento, comentario} = evento

    console.log(`
    ${dataEvento}
    ${descricaoEvento}
    ${titulo}
    ${presencaEvento ? 'Sim' : 'Nao'}
    ${comentario}
    `);

    //Criar uma desestruturacao para um objeto filmes
    //trazer somente tres propriedades