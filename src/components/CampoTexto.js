// components/CampoTexto.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, useWindowDimensions } from 'react-native';

/**
 * Campo de texto reutilizável com label e mensagem de erro.
 * @param {string} label
 * @param {string} valor
 * @param {function} onChangeText
 * @param {string} placeholder
 * @param {string} keyboardType
 * @param {string} erro - mensagem de erro (exibida se não vazia)
 * @param {boolean} obrigatorio
 */
export default function CampoTexto({
  label,
  valor,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  erro = '',
  obrigatorio = false,
}) {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 380;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { fontSize: isSmallScreen ? 11 : 12 }]}>
        {label}
        {obrigatorio && <Text style={styles.asterisco}> *</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          { fontSize: isSmallScreen ? 13 : 14, minHeight: isSmallScreen ? 40 : 44 },
          erro ? styles.inputErro : null,
        ]}
        value={valor}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#5A5A6A"
        keyboardType={keyboardType}
        autoCapitalize="sentences"
      />
      {!!erro && <Text style={[styles.erro, { fontSize: isSmallScreen ? 11 : 12 }]}>{erro}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '700',
    color: '#8B8A9B',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 6,
    lineHeight: 16,
  },
  asterisco: {
    color: '#F87171',
  },
  input: {
    backgroundColor: '#16161A',
    borderWidth: 1,
    borderColor: '#2A2A33',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#F1F0F5',
    lineHeight: 18,
  },
  inputErro: {
    borderColor: '#F87171',
  },
  erro: {
    color: '#F87171',
    marginTop: 4,
    lineHeight: 16,
  },
});
