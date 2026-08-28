async function buscarDados(termo) {
    const area = document.getElementById("resultado");
    area.innerHTML = "<p>Buscando informações...</p>";
    
    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo.toLowerCase()}`);
        
        if (!resposta.ok) throw new Error("Pokémon não encontrado");
        
        const dados = await resposta.json();
        
        area.innerHTML = `
            <div class="cartao-pais">
                <img src="${dados.sprites.other['official-artwork'].front_default}" alt="${dados.name}" style="width: 100%; max-height: 200px; object-fit: contain; border-radius: 8px; margin-bottom: 1rem; border: 1px solid #ddd; background-color: #f8f9fa;">
                <h2 style="text-transform: capitalize;">${dados.name}</h2>
                <p><strong> Tipo:</strong> ${dados.types.map(t => t.type.name).join(', ')}</p>
                <p><strong> Peso:</strong> ${dados.weight / 10} kg</p>
                <p><strong> Altura:</strong> ${dados.height / 10} m</p>
            </div>
        `;
    } catch (erro) {
        area.innerHTML = `<p class="erro" style="color: #e74c3c; font-weight: bold;">Ops! Não encontramos esse Pokémon. Verifique o nome e tente novamente.</p>`;
    }
}

document.getElementById("botao-buscar").addEventListener("click", () => {
    const termo = document.getElementById("campo-busca").value.trim();
    if (termo) buscarDados(termo);
});

document.getElementById("campo-busca").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("botao-buscar").click();
    }
});