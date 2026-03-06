async function buscarCEP() {
    const uf = document.getElementById('uf').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const resultadoDiv = document.getElementById('resultado');

    // Validação básica de campos
    if (uf.length !== 2 || cidade.length < 3 || rua.length < 3) {
        alert("Por favor, preencha todos os campos corretamente (UF deve ter 2 letras).");
        return;
    }

    const url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;

    try {
        const response = await fetch(url);
        const dados = await response.json();

        if (dados.length === 0) {
            resultadoDiv.innerHTML = "<p>Nenhum CEP encontrado para este endereço.</p>";
        } else {
            resultadoDiv.innerHTML = "<strong>CEPs encontrados:</strong>";
            
            // Itera sobre os resultados (limitei aos 3 primeiros para não ficar gigante)
            dados.slice(0, 3).forEach(info => {
                resultadoDiv.innerHTML += `
                    <div class="item-resultado">
                        <p><strong>CEP:</strong> ${info.cep}</p>
                        <p><strong>Bairro:</strong> ${info.bairro}</p>
                        <p><strong>Logradouro:</strong> ${info.logradouro}</p>
                    </div>
                `;
            });
        }
        
        resultadoDiv.classList.remove('resultado-oculto');

    } catch (error) {
        console.error("Erro na busca:", error);
        alert("Erro ao buscar o CEP. Verifique a conexão ou os dados digitados.");
    }
}