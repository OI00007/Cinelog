// components/BadgeStatus.js
import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

export default function BadgeStatus({ status }) {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 380;
  const assistido = status === 'Assistido';

  return (
    <View
      style={[
        styles.badge,
        {
          paddingHorizontal: isSmallScreen ? 8 : 10,
          paddingVertical: isSmallScreen ? 3 : 4,
          minHeight: isSmallScreen ? 20 : 24,
        },
        assistido ? styles.bgAssistido : styles.bgQuero,
      ]}
    >
      <Text style={[styles.texto, { fontSize: isSmallScreen ? 10 : 11 }, assistido ? styles.corAssistido : styles.corQuero]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgAssistido: {
    backgroundColor: '#16302A',
  },
  bgQuero: {
    backgroundColor: '#2A2030',
  },
  texto: {
    fontWeight: '700',
    lineHeight: 14,
  },
  corAssistido: {
    color: '#34D399',
  },
  corQuero: {
    color: '#C084FC',
  },
});
