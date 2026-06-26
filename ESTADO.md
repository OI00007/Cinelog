# Plano de Estado – Cinelog

Este documento descreve como os dados são gerenciados e atualizados dentro do aplicativo Cinelog, seguindo os requisitos da avaliação prática.

| Dado | Local no código | Como é atualizado |
| :--- | :--- | :--- |
| **Lista de itens** | `AsyncStorage` / `useState` (TelaListagem) | Ao salvar, editar ou excluir um filme através das funções em `storage.js`. |
| **Campos do formulário** | Estado local (`useState`) em `TelaFormulario` | Através do evento `onChangeText` nos campos de texto e `onPress` nos seletores de tipo e status. |
| **Item selecionado** | Parâmetro de navegação (`route.params`) | Ao clicar em um item da lista na `TelaListagem`, os dados são passados para a `TelaDetalhes`. |
| **Nota de avaliação** | Estado local (`useState`) em `TelaFormulario` | Através da função `onSelect` disparada ao tocar nas estrelas do componente `AvaliacaoEstrelas`. |
| **Filtro de listagem** | Estado local (`useState`) em `TelaListagem` | Ao clicar nos botões de filtro (Todos, Assistidos, Quero ver) na barra superior da listagem. |

O uso de `AsyncStorage` garante que os dados sobrevivam ao fechamento do aplicativo, enquanto o `useState` provê a reatividade necessária para uma interface fluida.
