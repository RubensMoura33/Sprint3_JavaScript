//Funcao para calcular
function calcular()
{
    //parar o submit do formulario
    event.preventDefault();
    //Criar uma variavel para cada numero
    let n1 = parseFloat(document.getElementById('n1').value);
    let n2 = parseFloat(document.getElementById('n2').value);
    let op = document.getElementById('operacao').value;
    //Cria uma variavel para o resultado da soma
    let resultado;
    
    if (isNaN(n1) || isNaN(n2)) 
    {
        alert('Preencha todos os campos')
        return;
    }
    
    if (op == '+') {
        resultado = somar(n1, n2);
        //Criar um alert com o resultado da soma
    }
    else if (op == '-') {
        resultado = subtrair(n1, n2)
        //Criar um alert com o resultado da subtracao
    }
    else if (op == '*') {
        resultado = multiplicar(n1, n2)
        //Criar um alert com o resultado da multiplicacao
    }
    else if (op == '/') {
        resultado = dividir(n1, n2)
        //Criar um alert com o resultado da divisao
    }
    else 
    {
        alert("Selecione um tipo de operacao")
    }
    
        document.getElementById('result').innerText = resultado;
}

function subtrair(n1, n2) 
{
    return n1 - n2;
}

function somar(n1, n2) 
{
    return n1 + n2;
}

function multiplicar(n1, n2) 
{
    return n1 * n2;
}

function dividir(n1, n2) 
{
    if (n2 == 0) 
    {
        return 'Nao e possivel dividir por zero'    
    }

    return n1 / n2;
}