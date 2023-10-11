function calcular() {
    //alert('Boa pra nois')
    event.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);
    
    if (isNaN(altura) || isNaN(peso) || nome.length == 0) 
    {
        alert('Preencha todos os dados')
        return;
    }

    const imc = peso/(altura*altura);
    let situacao = retornaSituacao(imc);

    function retornaSituacao(imc)
    {
        if (imc < 18.5)
        {
            return 'Magreza Severa';
        }

        else if (imc >18.99 && imc < 25) 
        {
            return 'Peso normal';
        }
        else if (imc >24.99 && imc < 30) 
        {
            return 'Acima do peso';
        }
        else if (imc >29.99 && imc < 35) 
        {
            return 'Obesidade 1';
        }
        else if (imc >34.99 && imc < 40) 
        {
            return 'Obesidade 11';
        }
        else
        {
            return 'Cuidado!!';
        }
    }

    
    console.log(imc);
    console.log(nome);
    console.log(situacao);
}