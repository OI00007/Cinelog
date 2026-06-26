# Decisões de projeto – Cinelog

Este documento justifica as escolhas técnicas e arquiteturais feitas durante o desenvolvimento do aplicativo Cinelog para a avaliação prática.

## Tecnologia escolhida
- [ ] Nativo (Kotlin) ou [x] Híbrido (React Native)?
**Justificativa:** A escolha pelo React Native com Expo se deu pela agilidade no desenvolvimento e pela facilidade de criar uma interface moderna e responsiva que funciona tanto em Android quanto em iOS. O ecossistema do Expo também facilita o acesso a APIs de sistema como Safe Area e persistência local.

## Persistência escolhida
**Qual biblioteca/método? Por quê?**
Utilizamos o `AsyncStorage`. Por se tratar de um catálogo de filmes pessoal, o volume de dados é perfeitamente suportado por essa solução de chave-valor, que é simples de implementar e garante que os dados não sejam perdidos ao fechar o aplicativo.

## Estrutura de navegação
**Quantas telas? Como elas se comunicam?**
O app possui 3 telas principais:
1.  **TelaListagem:** Exibe todos os filmes e permite filtrar por status.
2.  **TelaFormulario:** Utilizada tanto para criar novos registros quanto para editar os existentes.
3.  **TelaDetalhes:** Exibe as informações completas de um item e oferece as opções de editar ou excluir.
A comunicação é feita via `React Navigation`, passando objetos de dados através de parâmetros de rota (`route.params`).

## Funcionalidade que eu queria implementar mas não deu tempo
**O quê? Como começaria a fazer?**
Gostaria de ter implementado a integração com uma API externa (como a TMDB) para buscar automaticamente a capa e os detalhes dos filmes ao digitar o título. Começaria configurando o `axios` para as requisições e criando um componente de busca em tempo real no formulário.

## Trecho que eu escrevi sem ajuda de IA
**Função/método:** Lógica de cálculo de Safe Area dinâmica nas TopBars.
```javascript
// Trecho extraído da TelaFormulario.js
<View style={[styles.topbar, { paddingTop: Math.max(insets.top, 12) }]}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBtn}>
    <Text style={[styles.voltarTexto, { fontSize: fontSizeTitle }]}>Cancelar</Text>
  </TouchableOpacity>
  {/* ... restante do código */}
</View>
```
**Explicação:** Este trecho garante que o botão "Cancelar" e o título da tela nunca fiquem escondidos atrás do notch ou do relógio do sistema, calculando o maior valor entre o `inset.top` do dispositivo e um padding padrão de 12px.

## Uso de IA e Ajustes Manuais
Conforme as orientações da avaliação:
- **Auxílio de IA:** A IA foi utilizada para a estruturação inicial dos componentes e auxílio na configuração do AsyncStorage.
- **Ajustes Manuais:** Todos os ajustes de responsividade, cores de contraste das estrelas, remoção de ícones desnecessários e personalização do seletor de tipo foram feitos manualmente para garantir que o design seguisse a identidade visual do Cinelog. No código, esses trechos estão marcados com o comentário `// AJUSTADO MANUALMENTE`.
