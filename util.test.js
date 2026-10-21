const { validarTermoBusca, formatarNomePokemon, converterMedidas } = require("./util");

test("rejeita termo de busca vazio", () => {
    expect(validarTermoBusca("")).toBe(false);
    expect(validarTermoBusca("   ")).toBe(false);
});

test("aceita nome de pokemon valido", () => {
    expect(validarTermoBusca("pikachu")).toBe(true);
});

test("formata nome com inicial maiuscula", () => {
    expect(formatarNomePokemon("pikachu")).toBe("Pikachu");
});

test("converte medidas de peso e altura corretamente", () => {
    const medidas = converterMedidas(60, 4);
    expect(medidas.pesoKg).toBe(6);
    expect(medidas.alturaM).toBe(0.4);
});
