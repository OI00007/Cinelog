# Documento de Planejamento e Design - Cinelog

Este documento detalha os requisitos de planejamento e design do aplicativo Cinelog, abordando a estrutura de componentes e o gerenciamento de estado, conforme as boas práticas de desenvolvimento.

## 5.1. Wireframes no Figma (ou similar)

Para os wireframes, seria ideal utilizar uma ferramenta como o Figma para ilustrar o fluxo de navegação e a disposição dos elementos nas telas. Abaixo, serão apresentados prints em PDF das telas principais, com setas indicando o fluxo e identificação de componentes reutilizáveis. *O link do Figma seria fornecido aqui em um cenário real.*

## 5.2. Mapa de Componentes

O aplicativo Cinelog é estruturado em uma hierarquia de componentes reutilizáveis, promovendo a modularidade e a manutenibilidade do código. A seguir, é apresentado um mapa que descreve essa hierarquia:

```
App
├── TelaListagem
│   ├── TopBar (reutilizável)
│   │   └── BotaoVoltar (reutilizável)
│   ├── BotaoFlutuante (reutilizável)
│   ├── BotaoFiltro (reutilizável)
│   └── FlatList (renderiza CardItem)
│       └── CardFilme (reutilizável)
│           ├── BadgeStatus (reutilizável)
│           └── AvaliacaoEstrelas (reutilizável)
├── TelaFormulario
│   ├── TopBar (reutilizável)
│   │   └── BotaoVoltar (reutilizável)
│   ├── CampoTexto (reutilizável)
│   ├── SegmentedControl (para Tipo, customizado)
│   ├── AvaliacaoEstrelas (reutilizável)
│   ├── BotaoStatus (reutilizável)
│   └── BotaoSalvar (reutilizável)
└── TelaDetalhes
    ├── TopBar (reutilizável)
    │   └── BotaoVoltar (reutilizável)
    ├── AvaliacaoEstrelas (reutilizável)
    ├── BadgeStatus (reutilizável)
    ├── BotaoAcao (Editar/Excluir, reutilizável)
    └── ModalConfirmacao (reutilizável)
```

### Componentes Reutilizáveis Identificados:

*   **TopBar:** Barra superior com título e botão de voltar/cancelar.
*   **BotaoVoltar:** Botão genérico para navegação de retorno.
*   **BotaoFlutuante:** Botão de ação flutuante (ex: adicionar novo item).
*   **BotaoFiltro:** Botão para aplicar filtros na listagem.
*   **CardFilme:** Componente que exibe os detalhes resumidos de um filme/série na listagem.
*   **BadgeStatus:** Componente para exibir o status (Assistido/Quero ver).
*   **AvaliacaoEstrelas:** Componente para exibir e interagir com a avaliação por estrelas.
*   **CampoTexto:** Campo de entrada de texto com label e validação de erro.
*   **SegmentedControl:** Controle segmentado para seleção de opções (ex: tipo de mídia).
*   **BotaoStatus:** Botões para seleção de status (Assistido/Quero ver) no formulário.
*   **BotaoSalvar:** Botão genérico para salvar formulários.
*   **BotaoAcao:** Botões de ação (ex: Editar, Excluir) na tela de detalhes.
*   **ModalConfirmacao:** Modal genérico para confirmações.

## 5.3. Plano de Estado

O gerenciamento de estado no Cinelog é realizado principalmente através do `useState` do React, com persistência de dados via `AsyncStorage` para a lista de filmes. A seguir, é detalhado como cada dado é armazenado e atualizado:

| Dado                 | Local no Código             | Como é Atualizado                                     |
| :------------------- | :-------------------------- | :---------------------------------------------------- |
| **Lista de Filmes**  | `AsyncStorage` (storage.js) | `listarFilmes`, `salvarFilme`, `editarFilme`, `excluirFilme` |
| **Filme Individual** | `useState` (TelaDetalhes)   | `navigation.setParams` (após edição)                  |
| **Campos do Formulário** | `useState` (TelaFormulario) | `onChangeText` (para `CampoTexto`), `onPress` (para `SegmentedControl`, `BotaoStatus`) |
| **Nota de Avaliação** | `useState` (TelaFormulario) | `onSelect` (no `AvaliacaoEstrelas`)                   |
| **Status (Assistido/Quero ver)** | `useState` (TelaFormulario) | `onPress` (nos `BotaoStatus`)                         |
| **Item Selecionado** | Parâmetro de Navegação (`route.params`) | Ao clicar no `CardFilme` na `TelaListagem`            |
| **Modo de Edição**   | `modoEdicao` (TelaFormulario) | Baseado na existência de `route.params.item`          |
| **Erros de Validação** | `useState` (TelaFormulario) | `setErroTitulo`, `setErroGenero`, `setErroStatus` (após validação) |

Este plano garante que os dados sejam gerenciados de forma eficiente, reativos e persistentes, proporcionando uma experiência de usuário fluida e consistente.
