// screens/TelaListagem.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { listarFilmes } from '../database/storage';
import CardFilme from '../components/CardFilme';
import BotaoFiltro from '../components/BotaoFiltro';

const FILTROS = ['Todos', 'Assistido', 'Quero ver'];

// AJUSTADO MANUALMENTE — lógica de filtragem por status
function filtrarFilmes(lista, filtroAtivo) {
  if (filtroAtivo === 'Todos') return lista;
  return lista.filter(item => item.status === filtroAtivo);
}

export default function TelaListagem({ navigation }) {
  const [listaFilmes, setListaFilmes] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');

  // useFocusEffect garante recarregamento sempre que a tela ganhar foco
  // (ao voltar do formulário ou da tela de detalhes)
  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const dados = await listarFilmes();
        setListaFilmes(dados);
      }
      carregar();
    }, [])
  );

  const listaFiltrada = filtrarFilmes(listaFilmes, filtroAtivo);

  function renderVazio() {
    return (
      <View style={styles.vazio}>
        <Text style={styles.vazioCicone}>🎬</Text>
        <Text style={styles.vazioTitulo}>
          {filtroAtivo === 'Todos'
            ? 'Nenhum título ainda'
            : `Nenhum título "${filtroAtivo}"`}
        </Text>
        <Text style={styles.vazioSub}>
          {filtroAtivo === 'Todos'
            ? 'Toque no + para adicionar seu primeiro filme ou série'
            : 'Tente outro filtro ou adicione novos títulos'}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>
            Cine<Text style={styles.tituloAcento}>Log</Text>
          </Text>
          <Text style={styles.subtitulo}>
            {listaFilmes.length} título{listaFilmes.length !== 1 ? 's' : ''} · {listaFiltrada.length} exibido{listaFiltrada.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* FILTROS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosScroll}
        contentContainerStyle={styles.filtrosContainer}
      >
        {FILTROS.map(f => (
          <BotaoFiltro
            key={f}
            label={f}
            ativo={filtroAtivo === f}
            onPress={() => setFiltroAtivo(f)}
          />
        ))}
      </ScrollView>

      {/* LISTA */}
      <FlatList
        data={listaFiltrada}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CardFilme
            item={item}
            onPress={() => navigation.navigate('TelaDetalhes', { item })}
          />
        )}
        ListEmptyComponent={renderVazio}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB — botão flutuante para adicionar */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('TelaFormulario', { item: null })}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcone}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D0D0F',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2A33',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F1F0F5',
    letterSpacing: -0.5,
  },
  tituloAcento: {
    color: '#C084FC',
  },
  subtitulo: {
    fontSize: 12,
    color: '#8B8A9B',
    marginTop: 2,
  },
  filtrosScroll: {
    flexGrow: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2A33',
  },
  filtrosContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  lista: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 90,
    flexGrow: 1,
  },
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  vazioCicone: {
    fontSize: 52,
    marginBottom: 16,
  },
  vazioTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F1F0F5',
    textAlign: 'center',
    marginBottom: 8,
  },
  vazioSub: {
    fontSize: 14,
    color: '#8B8A9B',
    textAlign: 'center',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#A855F7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  fabIcone: {
    fontSize: 30,
    color: '#FFFFFF',
    lineHeight: 34,
    fontWeight: '300',
  },
});
