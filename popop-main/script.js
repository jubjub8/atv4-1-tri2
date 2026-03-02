async function buscarEndereco() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 dígitos.");
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado!");
            limparCampos();
        } else {
            document.getElementById('rua').innerText = dados.logradouro;
            document.getElementById('bairro').innerText = dados.bairro;
            document.getElementById('cidade').innerText = dados.localidade;
            document.getElementById('uf').innerText = dados.uf;
            document.getElementById('cep-resultado').innerText = dados.cep;
        }
    } catch (erro) {
        console.error("Erro ao buscar o CEP:", erro);
        alert("Erro ao conectar com o serviço de busca.");
    }
}

function limparCampos() {
    document.getElementById('rua').innerText = "...";
    document.getElementById('bairro').innerText = "...";
    document.getElementById('cidade').innerText = "...";
    document.getElementById('uf').innerText = "...";
    document.getElementById('cep-resultado').innerText = "...";
}