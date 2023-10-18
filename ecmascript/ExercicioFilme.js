// 

// const filmes =
// {
//     nomeDoFilme: 'Planeta dos macaco',
//     genero: 'Acao',
//     precoAluguel:15.00,
//     descricaoDoFilme: 'Macacos malucos'
//  }

//  const{nomeDoFilme, precoAluguel, descricaoDoFilme} = filmes

// const filmeArray = [Rubens = {
//     nomeFilme: 'Rubens: O filme',
//     duracao: '2 horas',
//     descricao: 'Rubens ex estrela do futebol mundial'
// }, Gabriel = {
//     nomeFilmeGab:'Gabriel: O filme',
//     duracaoFilmeGab: '5 minutos',
//     descricaoFilmeGab:'Pior jogador da historia do futebol mundial'
// }]

// const {nomeFilme, duracao, descricao} = Rubens
//  const {nomeFilmeGab, descricaoFilmeGab, duracaoFilmeGab} = Gabriel

// console.log(`
// Filmes


// Nome do filme: ${nomeDoFilme}
// Preco para alugar: $${precoAluguel}
// Descricao do filme: ${descricaoDoFilme}


// Nome do filme: ${nomeFilme}
// Duracao do filme: ${duracao}
// Descricao do filme: ${descricao}


// Nome do filme: ${nomeFilmeGab}
// Duracao do filme: ${duracaoFilmeGab}
// Descricao do filme: ${descricaoFilmeGab}

// `);

// const filmes = [
//     Filme1 =
//     {
//         titulo:'Planeta dos macacos',
//         genero:"Acao"
//     },
//     Filme2 =
//     {
//         titulo:'Planeta dos macacos',
//         genero:"Acao"
//     },
//     Filme3 =
//     {
//         titulo:'Planeta dos macacos',
//         genero:"Acao"
//     },
//     Filme4 =
//     {
//         titulo:'Planeta dos macacos',
//         genero:"Acao"
//     }]


    // filmes.foreach(({titulo,genero}) => {
    //     console.log(`
    //     Filmes:${titulo}
    //     Genero:${genero}`);
    // });

const filmes = [
    
    {
        titulo:'Planeta dos macacos',
        genero:"Acao"
    },
    
    {
        titulo:'Planeta dos macacos',
        genero:"Acao"
    },
    
    {
        titulo:'Planeta dos macacos',
        genero:"Acao"
    },
    
    {
        titulo:'Planeta dos macacos',
        genero:"Acao"
    }

]

filmes.forEach(({titulo,genero}) => {
    console.log(`
    Filmes:${titulo}
    Genero:${genero}`);
});
