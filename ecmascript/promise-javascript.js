// const api = new Promise((resolve, reject)=>
// {

//     setTimeout(()=>{console.log('ACESSANDO O BANCO E RETORNANDO OS DADOS');

    
//     const sucesso = true;
//     if(sucesso)
//     return resolve('Deu certo, toma aqui seus dados')
//     else return reject('Deu ruim')
//     console.log(api)},3000)



// });const retorno = api;
// console.log(retorno);

const api = new Promise((resolve, reject) => {
    let condition = true; //simula uma operação no back end
  
    const soma = (x, y) => s + y;
  
    //aqui simula uma chamada demorada ao servidor
    setTimeout(() => {
      console.log("promise sendo executada");
      if (condition) {
        resolve("A promise foi resolvida com sucesso.");
      } else {
        reject("A promise foi rejeitada.");
      }
    }, 3000);
  });
  
  console.log();
  console.log();
  console.log(api); //chamada na api
  console.log();
  console.log();
  
  api
    .then((retorno) => {//fullfiled/resolve
      console.log(retorno);
    })
    .catch((erro) => {//rejected
      console.error(erro);
    });
  
  