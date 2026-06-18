// database/storage.js
// Funções de persistência local usando AsyncStorage

import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@cinelog:filmes';

// Dados iniciais de exemplo para a primeira execução
const DADOS_INICIAIS = [
  {
    id: '1',
    titulo: 'Interestelar',
    genero: 'Ficção Científica',
    ano: 2014,
    tipo: 'Filme',
    nota: 5,
    status: 'Assistido',
  },
  {
    id: '2',
    titulo: 'Attack on Titan',
    genero: 'Ação / Fantasia',
    ano: 2013,
    tipo: 'Anime',
    nota: 5,
    status: 'Assistido',
  },
  {
    id: '3',
    titulo: 'The Bear',
    genero: 'Drama',
    ano: 2022,
    tipo: 'Série',
    nota: 4,
    status: 'Assistido',
  },
  {
    id: '4',
    titulo: 'Duna: Parte 2',
    genero: 'Ficção Científica',
    ano: 2024,
    tipo: 'Filme',
    nota: 4,
    status: 'Assistido',
  },
  {
    id: '5',
    titulo: 'Severance',
    genero: 'Thriller / Sci-Fi',
    ano: 2022,
    tipo: 'Série',
    nota: 0,
    status: 'Quero ver',
  },
  {
    id: '6',
    titulo: 'Your Name',
    genero: 'Romance / Animação',
    ano: 2016,
    tipo: 'Filme',
    nota: 5,
    status: 'Assistido',
  },
];

/**
 * Retorna todos os filmes salvos.
 * Na primeira execução, popula com dados iniciais de exemplo.
 */
export async function listarFilmes() {
  try {
    const json = await AsyncStorage.getItem(CHAVE);
    if (json === null) {
      // Primeira execução: salva dados iniciais
      await AsyncStorage.setItem(CHAVE, JSON.stringify(DADOS_INICIAIS));
      return DADOS_INICIAIS;
    }
    return JSON.parse(json);
  } catch (erro) {
    console.error('Erro ao listar filmes:', erro);
    return [];
  }
}

/**
 * Adiciona um novo filme à lista.
 * @param {Object} novoFilme - objeto criado por criarFilme()
 */
export async function salvarFilme(novoFilme) {
  try {
    const lista = await listarFilmes();
    const novaLista = [novoFilme, ...lista];
    await AsyncStorage.setItem(CHAVE, JSON.stringify(novaLista));
  } catch (erro) {
    console.error('Erro ao salvar filme:', erro);
  }
}

/**
 * Atualiza um filme existente pelo ID.
 * @param {Object} filmeAtualizado - objeto com o mesmo id do original
 */
export async function editarFilme(filmeAtualizado) {
  try {
    const lista = await listarFilmes();
    const novaLista = lista.map(f =>
      f.id === filmeAtualizado.id ? filmeAtualizado : f
    );
    await AsyncStorage.setItem(CHAVE, JSON.stringify(novaLista));
  } catch (erro) {
    console.error('Erro ao editar filme:', erro);
  }
}

/**
 * Remove um filme da lista pelo ID.
 * @param {string} id
 */
export async function excluirFilme(id) {
  try {
    const lista = await listarFilmes();
    const novaLista = lista.filter(f => f.id !== id);
    await AsyncStorage.setItem(CHAVE, JSON.stringify(novaLista));
  } catch (erro) {
    console.error('Erro ao excluir filme:', erro);
  }
}
