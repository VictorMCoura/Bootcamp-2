# Atlas mundi -Explorador de Países

## Autor
Victor De Mesquita Coura — 22604354

## Descrição
Uma aplicação web que permite consultar informações geográficas, demográficas e visualizar a bandeira de qualquer país do mundo de forma rápida e amigável.

## API utilizada
- **REST Countries API** - [Link da Documentação](https://restcountries.com/)
- **Endpoint consumido:** `https://api.restcountries.com/countries/v5/name?q={name}` (utilizando autenticação via header com chave de demonstração).

## Funcionalidades
- Pesquisa de países pelo nome (em inglês).
- Exibição de dados em tempo real utilizando requisição assíncrona (Fetch).
- Exibição de bandeira oficial, Capital, Continente e População total formatada.
- Tratamento de erro amigável caso o usuário digite um país inexistente.
- Suporte à tecla "Enter" para facilitar a busca.


## Links
- **Aplicação no ar (GitHub Pages):** https://victormcoura.github.io/Bootcamp-2/
- **Repositório:** https://github.com/VictorMCoura/Bootcamp-2