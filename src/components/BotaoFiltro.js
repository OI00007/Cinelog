// components/BotaoFiltro.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * Botão de filtro de status na TelaListagem.
 * @param {string} label - texto exibido
 * @param {boolean} ativo - se este filtro está selecionado
 * @param {function} onPress
 */
export default function BotaoFiltro({ label, ativo, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.botao, ativo && styles.ativo]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.texto, ativo && styles.textoAtivo]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A33',
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  ativo: {
    backgroundColor: '#A855F7',
    borderColor: '#A855F7',
  },
  texto: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B8A9B',
  },
  textoAtivo: {
    color: '#FFFFFF',
  },
});
