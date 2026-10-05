async function buscarDados(termo) {
    const area = document.getElementById("resultado");
    area.innerHTML = "<p>Buscando informações...</p>";
    
    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo.toLowerCase()}`);
        
        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado na API");
        }
        
        const dados = await resposta.json();
        
        const spriteOriginal = dados.sprites.other?.['official-artwork']?.front_default || dados.sprites.front_default;
        
        // Monta o visual na tela
        area.innerHTML = `
            <div class="cartao-pais">
                <img src="${spriteOriginal}" alt="${dados.name}" style="width: 100%; max-height: 200px; object-fit: contain; border-radius: 8px; margin-bottom: 1rem; border: 1px solid #ddd; background-color: #f8f9fa;">
                <h2 style="text-transform: capitalize;">${dados.name}</h2>
                <p><strong> Tipo:</strong> ${dados.types.map(t => t.type.name).join(', ')}</p>
                <p><strong> Peso:</strong> ${dados.weight / 10} kg</p>
                <p><strong> Altura:</strong> ${dados.height / 10} m</p>
                
                <button type="button" class="btn-favoritar" id="btn-add-fav">
                     Adicionar aos Favoritos
                </button>
            </div>
        `;

        const botaoFav = document.getElementById("btn-add-fav");
        botaoFav.onclick = function() {
            if (typeof window.adicionarFavoritoApp === "function") {
                window.adicionarFavoritoApp(dados.name, { sprite: spriteOriginal });
            } else {
                alert("O banco de dados ainda não conectou. Pressione F12 e olhe a aba Console.");
            }
        };

    } catch (erro) {

        console.error("ERRO:", erro);
        area.innerHTML = `<p class="erro" style="color: #e74c3c; font-weight: bold;">Falha: ${erro.message}</p>`;
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