const url = 'https://viacep.com.br/ws'


function cadastrar(e){
    e.preventDefault();
    alert("Cadastrar ...");
}
async function buscarEndereco(cep){
    const resource = `/${cep}/json/`
    try {
        const promise = await fetch(url+resource);
        const endereco = await promise.json();
        console.log(endereco);

        document.getElementById('not-found').innerText = '';

        document.getElementById('endereco').value = endereco.logradouro ;
        document.getElementById('cidade').value = endereco.localidade;
        document.getElementById('estado').value = endereco.uf;
        
        
    } catch (error) {
        alert('error')
        document.getElementById("not-found").innerText = "cep invalido"
    }
    console.log(`CEP ${cep}`);

}

function preencherCampos(endereco)
{
    
}
