// components/CardFilme.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AvaliacaoEstrelas from './AvaliacaoEstrelas';
import BadgeStatus from './BadgeStatus';

/**
 * Card exibido em cada item da FlatList na TelaListagem.
 * @param {Object} item - objeto Filme
 * @param {function} onPress
 */
export default function CardFilme({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.topo}>
        <Text style={styles.titulo} numberOfLines={2}>
          {item.titulo}
        </Text>
        <BadgeStatus status={item.status} />
      </View>

      <Text style={styles.meta}>
        {item.tipo} · {item.genero}
        {item.ano ? ` · ${item.ano}` : ''}
      </Text>

      <View style={styles.rodape}>
        <AvaliacaoEstrelas nota={item.nota} tamanho={15} />
        <Text style={styles.notaTexto}>
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
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F1F0F5',
    flex: 1,
    lineHeight: 20,
  },
  meta: {
    fontSize: 12,
    color: '#8B8A9B',
    marginBottom: 8,
  },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notaTexto: {
    fontSize: 12,
    color: '#8B8A9B',
  },
});
