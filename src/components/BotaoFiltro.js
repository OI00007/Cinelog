// components/BotaoFiltro.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';

/**
 * Botão de filtro de status na TelaListagem.
 * @param {string} label - texto exibido
 * @param {boolean} ativo - se este filtro está selecionado
 * @param {function} onPress
 */
export default function BotaoFiltro({ label, ativo, onPress }) {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 380;

  return (
    <TouchableOpacity
      style={[
        styles.botao,
        {
          paddingHorizontal: isSmallScreen ? 12 : 16,
          paddingVertical: isSmallScreen ? 6 : 7,
          marginRight: isSmallScreen ? 6 : 8,
          minHeight: isSmallScreen ? 32 : 36,
        },
        ativo && styles.ativo,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.texto, { fontSize: isSmallScreen ? 12 : 13 }, ativo && styles.textoAtivo]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A33',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ativo: {
    backgroundColor: '#A855F7',
    borderColor: '#A855F7',
  },
  texto: {
    fontWeight: '600',
    color: '#8B8A9B',
    lineHeight: 18,
  },
  textoAtivo: {
    color: '#FFFFFF',
  },
});
