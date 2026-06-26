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
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  // Calcula valores responsivos baseado no tamanho da tela
  const isSmallScreen = width < 380;
  const isLargeScreen = width > 500;
  const isLandscape = height < width;

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
        <Text style={[styles.vazioCicone, { fontSize: isSmallScreen ? 40 : 52 }]}>🎬</Text>
        <Text style={[styles.vazioTitulo, { fontSize: isSmallScreen ? 15 : 17 }]}>
          {filtroAtivo === 'Todos'
            ? 'Nenhum título ainda'
            : `Nenhum título "${filtroAtivo}"`}
        </Text>
        <Text style={[styles.vazioSub, { fontSize: isSmallScreen ? 12 : 14 }]}>
          {filtroAtivo === 'Todos'
            ? 'Toque no + para adicionar seu primeiro filme ou série'
            : 'Tente outro filtro ou adicione novos títulos'}
        </Text>
      </View>
    );
  }

  // Calcula o padding do FAB baseado na orientação e safe area
  const fabBottom = Math.max(insets.bottom + 20, 28);
  const fabRight = isSmallScreen ? 16 : 20;
  const fabSize = isSmallScreen ? 48 : 56;

  // Calcula o padding da lista para não sobrepor o FAB
  const listaPaddingBottom = Math.max(fabSize + 40, 90);

  return (
    <SafeAreaView style={styles.safe}>
      {/* CABEÇALHO */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
        <View>
          <Text style={[styles.titulo, { fontSize: isSmallScreen ? 22 : isLargeScreen ? 30 : 26 }]}>
            Cine<Text style={styles.tituloAcento}>Log</Text>
          </Text>
          <Text style={[styles.subtitulo, { fontSize: isSmallScreen ? 11 : 12 }]}>
            {listaFilmes.length} título{listaFilmes.length !== 1 ? 's' : ''} · {listaFiltrada.length} exibido{listaFiltrada.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* FILTROS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosScroll}
        contentContainerStyle={[styles.filtrosContainer, { paddingHorizontal: isSmallScreen ? 12 : 16 }]}
        scrollEventThrottle={16}
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
        contentContainerStyle={[
          styles.lista,
          {
            paddingHorizontal: isSmallScreen ? 8 : 12,
            paddingBottom: Math.max(insets.bottom + listaPaddingBottom, listaPaddingBottom),
          },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
      />

      {/* FAB — botão flutuante para adicionar */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            bottom: fabBottom,
            right: fabRight,
            width: fabSize,
            height: fabSize,
            borderRadius: fabSize / 2,
          },
        ]}
        onPress={() => navigation.navigate('TelaFormulario', { item: null })}
        activeOpacity={0.85}
      >
        <Text style={[styles.fabIcone, { fontSize: isSmallScreen ? 24 : 30 }]}>+</Text>
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
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2A33',
  },
  titulo: {
    fontWeight: '800',
    color: '#F1F0F5',
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  tituloAcento: {
    color: '#C084FC',
  },
  subtitulo: {
    color: '#8B8A9B',
    marginTop: 2,
    lineHeight: 16,
  },
  filtrosScroll: {
    flexGrow: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2A33',
  },
  filtrosContainer: {
    paddingVertical: 10,
  },
  lista: {
    paddingTop: 10,
    flexGrow: 1,
  },
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
    minHeight: 300,
  },
  vazioCicone: {
    marginBottom: 16,
  },
  vazioTitulo: {
    fontWeight: '700',
    color: '#F1F0F5',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  vazioSub: {
    color: '#8B8A9B',
    textAlign: 'center',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
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
    color: '#FFFFFF',
    fontWeight: '300',
    lineHeight: 34,
  },
});
