// components/AvaliacaoEstrelas.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Exibe estrelas de avaliação.
 * @param {number} nota - 0 a 5
 * @param {boolean} editavel - se true, toque nas estrelas altera a nota
 * @param {function} onSelect - chamada com o novo valor ao tocar (apenas se editavel=true)
 * @param {number} tamanho - tamanho em px das estrelas (padrão 18)
 */
export default function AvaliacaoEstrelas({ nota, editavel = false, onSelect, tamanho = 18 }) {
  const estrelas = [1, 2, 3, 4, 5];

  return (
    <View style={styles.row}>
      {estrelas.map(i => {
        const preenchida = i <= nota;
        if (editavel) {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                // Se tocar na mesma nota atual, zera
                onSelect(nota === i ? 0 : i);
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.estrela, { fontSize: tamanho }, preenchida ? styles.on : styles.off]}>
                ★
              </Text>
            </TouchableOpacity>
          );
        }
        return (
          <Text
            key={i}
            style={[styles.estrela, { fontSize: tamanho }, preenchida ? styles.on : styles.off]}
          >
            ★
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  estrela: {
    lineHeight: 24,
  },
  on: {
    color: '#FBBF24',
  },
  off: {
    color: '#2A2A33',
  },
});
