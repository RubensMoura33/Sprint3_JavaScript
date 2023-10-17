const numeros = [10, 12, 20]

const somatorio = numeros.reduce((total ,n) =>{
    return total + n
},0);

console.log(somatorio);

const produtos = [
    {produtos: "Camiseta", preco: 129.90},
    {produtos: "Tenis", preco: 400.90},
    {produtos: "Jaqueta", preco: 700.90}
];

let totalProdutos = produtos.reduce((vlInicial, oP) =>{
    return vlInicial +oP.preco;
},0)

console.log(`Gerente o valor de vendas foi R$${totalProdutos.toFixed(2)}`);