# Pokédex Web

## Autor
Victor De Mesquita Coura — 22604354

## Descrição
Uma aplicação web rápida e amigável que consome dados do universo Pokémon, permitindo que o usuário consulte informações básicas e o visual oficial de diversas espécies. Na segunda etapa do projeto, a aplicação ganhou persistência de dados em nuvem para salvar os favoritos e foi conteinerizada com Docker.

## API utilizada
- **PokeAPI** — [Documentação](https://pokeapi.co/)
- **Endpoint consumido:** `https://pokeapi.co/api/v2/pokemon/{name}`

## Funcionalidades
- Pesquisa de Pokémon pelo nome.
- Exibição de dados em tempo real utilizando requisição assíncrona (Fetch).
- Exibição de arte oficial, tipos, peso e altura.
- Tratamento de erro amigável caso o usuário digite um nome inexistente.
- Suporte à tecla "Enter" para facilitar a busca.
- **Sistema de Favoritos:** salva as escolhas do usuário em banco de dados, sobrevivendo ao fechamento do navegador.
- **Operações CRUD:** listar, adicionar e excluir favoritos diretamente na interface.

## Links
| Item | Link |
|---|---|
| Aplicação no ar (GitHub Pages) | https://victormcoura.github.io/Bootcamp-2/app/ |
| Repositório (GitHub) | https://github.com/VictorMCoura/Bootcamp-2 |
| Imagem no Docker Hub | https://hub.docker.com/r/victorcoura123/bootcamp2-app |

## Como rodar a aplicação via Docker
Execute o comando abaixo no terminal para baixar a imagem pública e rodar a aplicação localmente:

```bash
docker run -d -p 8080:80 victorcoura123/bootcamp2-app:latest
```

Depois, acesse **http://localhost:8080** no navegador.

Para parar e remover o container:

```bash
docker ps                # descobre o ID/nome do container
docker stop <container>
docker rm <container>
```

## Persistência
- **Banco escolhido:** Supabase (PostgreSQL), com comunicação direta pelo frontend usando a biblioteca `supabase-js` e a chave `anon public`.
- **Tabela:** `favoritos`

| Coluna | Descrição |
|---|---|
| `id` | Chave primária |
| `criado_em` | Data/hora de criação do registro |
| `nome_item` | Nome do Pokémon favoritado |
| `dados_extra` | Sprite/imagem oficial, usada para exibir o item na lista |

- **Operações implementadas:** criar (botão "Favoritar"), listar (seção "Meus favoritos", carregada ao abrir a página) e excluir (botão de remover em cada item).
- **Limitação conhecida (RLS):** para viabilizar a arquitetura somente com frontend, sem sistema de login nesta etapa, a tabela utiliza políticas de Row Level Security (RLS) abertas para a role `anon`, permitindo leitura, inserção e deleção públicas. Em um ambiente de produção, a solução seria adicionar autenticação e políticas por usuário.

## Evidências das Sidequests

### SQ1 · Arquivo `.dockerignore`
O arquivo `.dockerignore` foi criado para excluir da imagem itens como a pasta `.git`, o `README.md` e as capturas de tela. Isso deixa o build mais rápido, porque o Docker não precisa enviar arquivos inúteis ao daemon (motor do Docker) durante a construção. Além disso, a imagem final fica menor e mais segura, pois contém estritamente o necessário para a aplicação rodar, sem expor o histórico de versionamento.

### SQ2 · Versionamento de imagem
Foram publicadas três tags da imagem no Docker Hub: `1.0` (primeira versão funcional), `1.1` (versão após melhoria na aplicação) e `latest`.

![Tags no Docker Hub](screenshots/)

### SQ3 · Descrição no Docker Hub
O *Overview* do repositório no Docker Hub foi preenchido com a descrição da aplicação, o link do repositório no GitHub e o comando `docker run` pronto para copiar.

[Overview no Docker Hub](https://hub.docker.com/r/victorcoura123/bootcamp2-app)

### SQ4 · Explorando a orquestração
Dois containers da aplicação foram executados simultaneamente, nas portas 8080 e 8081. O print do `docker ps` mostra os dois em execução:

![Docker ps com dois containers](screenshots/)

**"Se eu tivesse 100 containers, como gerenciaria?"**

Para gerenciar 100 instâncias, eu utilizaria uma ferramenta de orquestração como o **Kubernetes**. Nele, várias máquinas trabalham juntas formando um **cluster**. A aplicação não roda em containers soltos, mas encapsulada na menor unidade do sistema, chamada **pod**. Eu criaria uma configuração (um *Deployment*) especificando que desejo ter 100 **réplicas** desse pod. A partir daí, o Kubernetes distribui automaticamente a carga pelo cluster, monitora a saúde de cada container e recria sozinho qualquer pod que venha a falhar, sem necessidade de intervenção manual. Um *Service* ainda pode balancear o tráfego entre todas as réplicas, expondo um único ponto de acesso.
