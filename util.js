function validarTermoBusca(termo) {
    if (!termo || typeof termo !== "string") return false;
    const limpo = termo.trim();
    return limpo.length > 0 && limpo.length <= 30;
}

function formatarNomePokemon(nome) {
    if (!nome || typeof nome !== "string") return "";
    const limpo = nome.trim().toLowerCase();
    return limpo.charAt(0).toUpperCase() + limpo.slice(1);
}

function converterMedidas(pesoHectogramas, alturaDecimetros) {
    return {
        pesoKg: pesoHectogramas / 10,
        alturaM: alturaDecimetros / 10
    };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { validarTermoBusca, formatarNomePokemon, converterMedidas };
}