const { validarTermoBusca, formatarNomePokemon, converterMedidas, registrarVoto } = require("./app/util");

test("rejeita termo de busca vazio", () => {
    expect(validarTermoBusca("")).toBe(false);
    expect(validarTermoBusca("   ")).toBe(false);
});

test("aceita nome de pokemon valido", () => {
    expect(validarTermoBusca("pikachu")).toBe(true);
    expect(validarTermoBusca("Mr-Mime")).toBe(true);
});

test("rejeita termos com caracteres ou espaços internos invalidos", () => {
    expect(validarTermoBusca("pikachu xyz")).toBe(false);
    expect(validarTermoBusca("pikachu!")).toBe(false);
    expect(validarTermoBusca("-pikachu")).toBe(false);
    expect(validarTermoBusca("pikachu-")).toBe(false);
});

test("formata nome com inicial maiuscula", () => {
    expect(formatarNomePokemon("pikachu")).toBe("Pikachu");
});

test("converte medidas de peso e altura corretamente", () => {
    const medidas = converterMedidas(60, 4);
    expect(medidas.pesoKg).toBe(6);
    expect(medidas.alturaM).toBe(0.4);
});

test("envia o voto e a sessão ao Supabase", async () => {
    const supabase = { rpc: jest.fn().mockResolvedValue({ data: true, error: null }) };

    await registrarVoto(supabase, "pikachu", { sprite: "pikachu.png" }, "sessao-123");

    expect(supabase.rpc).toHaveBeenCalledWith("registrar_voto", {
        p_nome_item: "pikachu",
        p_dados_extra: { sprite: "pikachu.png" },
        p_sessao_id: "sessao-123"
    });
});
