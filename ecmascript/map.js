// const numeros = [1, 2, 5, 10, 300];

// const arrDobro = numeros.map((n) => {
//     return n * 2 ;
// })

// console.log(numeros);
// console.log(arrDobro);

const nomes = ['Rubens', 'Gabriel', 'Russo', 'Gabi', 'Wanderson']
const sobrenomes = ['Moura', 'Andrade', 'Victor', 'Souza', 'Santos']

const nomeCompleto = nomes.map((nome, indice) =>
{
    return `${nome} ${sobrenomes[indice]}`
})

nomeCompleto.forEach((nomeCompleto) =>{
    console.log(nomeCompleto);
})