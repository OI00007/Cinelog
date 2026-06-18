// components/BadgeStatus.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BadgeStatus({ status }) {
  const assistido = status === 'Assistido';
  return (
    <View style={[styles.badge, assistido ? styles.bgAssistido : styles.bgQuero]}>
      <Text style={[styles.texto, assistido ? styles.corAssistido : styles.corQuero]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  bgAssistido: {
    backgroundColor: '#16302A',
  },
  bgQuero: {
    backgroundColor: '#2A2030',
  },
  texto: {
    fontSize: 11,
    fontWeight: '700',
  },
  corAssistido: {
    color: '#34D399',
  },
  corQuero: {
    color: '#C084FC',
  },
});
