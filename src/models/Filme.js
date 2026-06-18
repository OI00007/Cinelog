// models/Filme.js
// Estrutura de um objeto Filme no CineLog

/**
 * Cria um novo objeto Filme com ID único gerado automaticamente.
 * @param {string} titulo
 * @param {string} genero
 * @param {number|null} ano
 * @param {string} tipo  - 'Filme' | 'Série' | 'Documentário' | 'Anime'
 * @param {number} nota  - 0 a 5
 * @param {string} status - 'Assistido' | 'Quero ver'
 * @returns {Object}
 */
export function criarFilme(titulo, genero, ano, tipo, nota, status) {
  return {
    id: Date.now().toString(),
    titulo,
    genero,
    ano: ano ? parseInt(ano) : null,
    tipo,
    nota,
    status,
  };
}
