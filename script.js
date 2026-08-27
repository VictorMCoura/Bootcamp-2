const API_KEY = 'rc_live_demo';

async function buscarDados(termo) {

    const area = document.getElementById("resultado");
    
    area.innerHTML = "<p>Buscando informações...</p>";
    
    try {
        const resposta = await fetch(`https://api.restcountries.com/countries/v5/name?q=${termo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        
        if (!resposta.ok) throw new Error("País não encontrado");
        const dados = await resposta.json();
        const pais = dados.items[0];

        area.innerHTML = `
            <div class="cartao-pais">
                <img src="${pais.flag.svg}" alt="Bandeira de ${pais.name.common}">
                <h2>${pais.names.common}</h2>
                <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "Não possui"}</p>
                <p><strong>Continente:</strong> ${pais.region}</p>
                <p><strong>População:</strong> ${pais.population.toLocaleString("pt-BR")}</p>
            </div>
        `;
    } catch (erro) {
        area.innerHTML = `<p class="erro">Não foi encontrado nenhum país chamado "${termo}". Verifique a escrita correta.</p>`;
    }
}

document.getElementById("botao-buscar").addEventListener("click", () => {
    const termo = document.getElementById("campo-busca").value.trim();
    if (termo) {
        buscarDados(termo);
    }
});
document.getElementById("campo-busca").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("botao-buscar").click();
    }
});