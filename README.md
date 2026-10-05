# Pokédex Web

## Autor
Victor De Mesquita Coura — 22604354

## Descrição
Uma aplicação web rápida e amigável que consome dados do universo Pokémon, permitindo que o usuário consulte informações básicas e o visual oficial de diversas espécies. Na segunda etapa do projeto, a aplicação ganhou persistência de dados em nuvem para salvar os favoritos e foi conteinerizada com Docker.

## API utilizada
- **PokeAPI** - [Link da Documentação](https://pokeapi.co/)
- **Endpoint consumido:** `https://pokeapi.co/api/v2/pokemon/{name}`.

## Funcionalidades
- Pesquisa de Pokémon pelo nome.
- Exibição de dados em tempo real utilizando requisição assíncrona (Fetch).
- Exibição de arte oficial, Tipos, Peso e Altura.
- Tratamento de erro amigável caso o usuário digite um nome inexistente.
- Suporte à tecla "Enter" para facilitar a busca.
- Sistema de Favoritos: Salva as escolhas do usuário, sobrevivendo ao fechamento do navegador.
-  Operações CRUD: Funcionalidades integradas para listar, adicionar e excluir favoritos diretamente na interface.

## Links
- **Aplicação no ar (GitHub Pages):** https://victormcoura.github.io/Bootcamp-2/
- **Repositório:** https://github.com/VictorMCoura/Bootcamp-2
- **Imagem no Docker Hub:** https://hub.docker.com/repository/docker/victorcoura123/bootcamp2-app/general

---

## Como Rodar a Aplicação via Docker
Execute o comando abaixo no terminal para baixar a imagem pública e rodar a aplicação localmente:

```bash
docker run -d -p 8080:80 victorcoura123/bootcamp2-app:latest
```
## Evidências das Sidequests 
```
- **SQ1 · Arquivo `.dockerignore`:** 
  O arquivo `.dockerignore` foi criado para excluir pastas como `.git` e arquivos como `README.md` e capturas de tela. Isso deixa o processo de build mais rápido porque o Docker não precisa transferir arquivos inúteis para o daemon (motor do Docker) durante a construção. Além disso, a imagem final fica menor e mais segura, pois contém estritamente o necessário para a aplicação rodar, sem vazar histórico de versionamento.

- **SQ2 · Versionamento de imagem:** 
  Foram publicadas três versões da imagem no Docker Hub, acessíveis pelas tags `1.0`, `1.1` e `latest`.

- **SQ3 · Descrição no Docker Hub:** 
  O *Overview* do repositório no Docker Hub foi atualizado com a descrição do projeto, o link do GitHub e o comando de execução direta (`docker run`).

- **SQ4 · Explorando a orquestração:** 
  Dois containers foram executados simultaneamente nas portas 8080 e 8081 
  . 
  **"Se eu tivesse 100 containers, como gerenciaria?"** 
  Para gerenciar 100 instâncias, eu utilizaria uma ferramenta de orquestração como o **Kubernetes**. Nele, várias máquinas trabalham juntas formando um **cluster**. A aplicação não roda em containers soltos, mas encapsulada na menor unidade do sistema, chamada **pod**. Eu criaria uma configuração especificando que desejo ter 100 **réplicas** desse pod. A partir daí, o Kubernetes distribui automaticamente a carga pelo cluster, monitora a saúde de cada container e recria sozinho qualquer pod que venha a falhar, sem necessidade de intervenção manual.
