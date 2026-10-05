import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://brbktkamjkmzlisuvfne.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyYmt0a2Ftamttemxpc3V2Zm5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyMTEzODksImV4cCI6MjEwNjc4NzM4OX0.vsu-lIxdqMCGvFe8vcCVDVPDcwkW4ZwA0JDJZCJk3Do";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const listaElement = document.getElementById("favoritos-lista");
const contadorElement = document.getElementById("favoritos-contador");

export async function listarFavoritos() {
  if (!listaElement) return;

  const { data, error } = await supabase
    .from("favoritos")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    console.error("Erro ao buscar favoritos:", error.message);
    listaElement.innerHTML = `<p class="error-state">Falha ao sincronizar com o banco: ${error.message}</p>`;
    return;
  }

  renderizarListaFavoritos(data);
}


export async function salvarFavorito(nomeItem, dadosExtra = {}) {
  if (!nomeItem) return;

  const { data: existente } = await supabase
    .from("favoritos")
    .select("id")
    .eq("nome_item", nomeItem)
    .limit(1);

  if (existente && existente.length > 0) {
    alert(`"${nomeItem}" já está na lista de favoritos!`);
    return;
  }

  const { error } = await supabase
    .from("favoritos")
    .insert([{ nome_item: nomeItem, dados_extra: dadosExtra }]);

  if (error) {
    console.error("Erro ao salvar favorito:", error.message);
    alert("Falha ao salvar no banco. Verifique o console.");
    return;
  }

  await listarFavoritos();
}

export async function removerFavorito(id) {
  const { error } = await supabase
    .from("favoritos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erro ao deletar favorito:", error.message);
    alert("Falha ao remover item do banco.");
    return;
  }

  await listarFavoritos();
}

function renderizarListaFavoritos(itens) {
  if (!itens || itens.length === 0) {
    listaElement.innerHTML = `<p class="empty-state">Nenhum favorito cadastrado ainda.</p>`;
    if (contadorElement) contadorElement.textContent = "0 itens";
    return;
  }

  if (contadorElement) {
    contadorElement.textContent = `${itens.length} ${itens.length === 1 ? "item" : "itens"}`;
  }

  listaElement.innerHTML = itens.map(item => {
    const dataFormatada = new Date(item.criado_em).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    const infoAdicional = item.dados_extra && item.dados_extra.detalhe 
      ? `<span class="favorito-subtitulo">${item.dados_extra.detalhe}</span>` 
      : "";

    return `
      <div class="favorito-card" data-id="${item.id}">
        <div class="favorito-info">
          <strong>${item.nome_item}</strong>
          ${infoAdicional}
          <small class="favorito-data">Adicionado em: ${dataFormatada}</small>
        </div>
        <button class="btn-remover" onclick="window.excluirFavoritoApp(${item.id})" title="Remover dos favoritos">
           Excluir
        </button>
      </div>
    `;
  }).join("");
}

window.excluirFavoritoApp = removerFavorito;
window.adicionarFavoritoApp = salvarFavorito;

document.addEventListener("DOMContentLoaded", listarFavoritos);