function validarTermoBusca(termo) {
    if (!termo || typeof termo !== "string") return false;
    const limpo = termo.trim();
    return limpo.length <= 30 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(limpo);
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

function registrarVoto(supabase, nomeItem, dadosExtra, sessaoId) {
    return supabase.rpc("registrar_voto", {
        p_nome_item: nomeItem,
        p_dados_extra: dadosExtra,
        p_sessao_id: sessaoId
    });
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { validarTermoBusca, formatarNomePokemon, converterMedidas, registrarVoto };
}
