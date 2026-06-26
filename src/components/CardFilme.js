// components/CardFilme.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import AvaliacaoEstrelas from './AvaliacaoEstrelas';
import BadgeStatus from './BadgeStatus';

/**
 * Card exibido em cada item da FlatList na TelaListagem.
 * @param {Object} item - objeto Filme
 * @param {function} onPress
 */
export default function CardFilme({ item, onPress }) {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 380;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          padding: isSmallScreen ? 12 : 14,
          marginBottom: isSmallScreen ? 8 : 10,
          borderRadius: isSmallScreen ? 14 : 16,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.topo, { gap: isSmallScreen ? 6 : 8, marginBottom: isSmallScreen ? 4 : 6 }]}>
        <Text style={[styles.titulo, { fontSize: isSmallScreen ? 13 : 15 }]} numberOfLines={2}>
          {item.titulo}
        </Text>
        <BadgeStatus status={item.status} />
      </View>

      <Text style={[styles.meta, { fontSize: isSmallScreen ? 11 : 12, marginBottom: isSmallScreen ? 6 : 8 }]}>
        {item.tipo} · {item.genero}
        {item.ano ? ` · ${item.ano}` : ''}
      </Text>

      <View style={[styles.rodape, { gap: isSmallScreen ? 6 : 8 }]}>
        <AvaliacaoEstrelas nota={item.nota} tamanho={isSmallScreen ? 13 : 15} />
        <Text style={[styles.notaTexto, { fontSize: isSmallScreen ? 11 : 12 }]}>
          {item.nota > 0 ? `${item.nota}/5` : 'Sem nota'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16161A',
    borderWidth: 0.5,
    borderColor: '#2A2A33',
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titulo: {
    fontWeight: '700',
    color: '#F1F0F5',
    flex: 1,
    lineHeight: 20,
  },
  meta: {
    color: '#8B8A9B',
    lineHeight: 16,
  },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 20,
  },
  notaTexto: {
    color: '#8B8A9B',
    lineHeight: 16,
  },
});
