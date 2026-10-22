import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://brbktkamjkmzlisuvfne.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyYmt0a2Ftamttemxpc3V2Zm5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyMTEzODksImV4cCI6MjEwNjc4NzM4OX0.vsu-lIxdqMCGvFe8vcCVDVPDcwkW4ZwA0JDJZCJk3Do";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const listaElement = document.getElementById("favoritos-lista");
const contadorElement = document.getElementById("favoritos-contador");
const sessaoIdKey = "pokedex-sessao-id";

function escaparHtml(valor) {
  return String(valor).replace(/[&<>"']/g, caractere => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[caractere]);
}

function obterSessaoId() {
  let sessaoId = sessionStorage.getItem(sessaoIdKey);

  if (!sessaoId) {
    sessaoId = crypto.randomUUID();
    sessionStorage.setItem(sessaoIdKey, sessaoId);
  }

  return sessaoId;
}

const sessaoId = obterSessaoId();

export async function listarFavoritos() {
  if (!listaElement) return;

  const [{ data: favoritos, error: erroFavoritos }, { data: votos, error: erroVotos }] = await Promise.all([
    supabase
      .from("favoritos")
      .select("id, nome_item, dados_extra, criado_em, quantidade_favoritos")
      .order("criado_em", { ascending: false }),
    supabase.rpc("listar_votos_sessao", { p_sessao_id: sessaoId })
  ]);

  if (erroFavoritos || erroVotos) {
    const erro = erroFavoritos || erroVotos;
    console.error("Erro ao buscar favoritos e votos:", erro.message);
    listaElement.innerHTML = `<p class="error-state">Falha ao sincronizar com o banco: ${escaparHtml(erro.message)}</p>`;
    return;
  }

  renderizarListaFavoritos(favoritos, votos || []);
}

export async function salvarFavorito(nomeItem, dadosExtra = {}) {
  if (!nomeItem) return;

  const { data: votou, error } = await window.registrarVoto(
    supabase,
    nomeItem,
    dadosExtra,
    sessaoId
  );

  if (error) {
    console.error("Erro ao registrar voto:", error.message);
    alert("Falha ao registrar voto. Tente novamente mais tarde");
    return;
  }

  if (!votou) {
    alert("Você já votou neste Pokémon.");
  }

  await listarFavoritos();
}

export async function removerVoto(nomeItem) {
  const { data: removeuVoto, error } = await supabase.rpc("remover_voto", {
    p_nome_item: nomeItem,
    p_sessao_id: sessaoId
  });

  if (error) {
    console.error("Erro ao remover voto:", error.message);
    alert("Falha ao remover voto. Tente mais tarde");
    return;
  }

  if (!removeuVoto) {
    alert("Vote para poder remover.");
  }

  await listarFavoritos();
}

function renderizarListaFavoritos(itens, votos) {
  if (!itens || itens.length === 0) {
    listaElement.innerHTML = `<p class="empty-state">Nenhum favorito cadastrado ainda.</p>`;
    if (contadorElement) contadorElement.textContent = "0 Pokémons";
    return;
  }

  const votosPorPokemon = new Map(votos.map(voto => [String(voto.favorito_id), voto.ativo]));

  if (contadorElement) {
    const quantidade = itens.length;
    contadorElement.textContent = `${quantidade} ${quantidade === 1 ? "Pokémon" : "Pokémons"}`;
  }

  listaElement.innerHTML = itens.map((item, index) => {
    const dataFormatada = new Date(item.criado_em).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    const chaveId = String(item.id);
    const jaVotou = votosPorPokemon.has(chaveId);
    const votoAtivo = votosPorPokemon.get(chaveId);
    const botaoVoto = !jaVotou
      ? `<button class="btn-favoritar-lista" data-votar-index="${index}">Votar</button>`
      : votoAtivo
        ? `<button class="btn-remover" data-remover-voto-index="${index}">Remover meu voto</button>`
        : `<button class="btn-voto-removido" disabled>Voto removido</button>`;

    return `
      <div class="favorito-card">
        <div class="favorito-info">
          <strong>${escaparHtml(item.nome_item)}</strong>
          <small class="favorito-data">Adicionado em: ${dataFormatada}</small>
          <small class="favorito-data">Número de vezes favoritado: ${item.quantidade_favoritos}</small>
        </div>
        ${botaoVoto}
      </div>
    `;
  }).join("");

  listaElement.querySelectorAll("[data-votar-index]").forEach(botao => {
    botao.addEventListener("click", () => {
      const item = itens[Number(botao.dataset.votarIndex)];
      salvarFavorito(item.nome_item, item.dados_extra || {});
    });
  });

  listaElement.querySelectorAll("[data-remover-voto-index]").forEach(botao => {
    botao.addEventListener("click", () => {
      const item = itens[Number(botao.dataset.removerVotoIndex)];
      removerVoto(item.nome_item);
    });
  });
}

window.adicionarFavoritoApp = salvarFavorito;
window.removerVotoFavoritoApp = removerVoto;

document.addEventListener("DOMContentLoaded", listarFavoritos);