// screens/TelaDetalhes.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { excluirFilme } from '../database/storage';
import AvaliacaoEstrelas from '../components/AvaliacaoEstrelas';
import BadgeStatus from '../components/BadgeStatus';

export default function TelaDetalhes({ route, navigation }) {
  const { item } = route.params;
  const [modalVisivel, setModalVisivel] = useState(false);
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  // Calcula valores responsivos
  const isSmallScreen = width < 380;
  const isLargeScreen = width > 500;
  const isLandscape = height < width;

  async function confirmarExclusao() {
    await excluirFilme(item.id);
    setModalVisivel(false);
    navigation.navigate('TelaListagem');
  }

  // Valores responsivos para tamanho de fonte
  const fontSizeTitle = isSmallScreen ? 18 : 22;
  const fontSizeLabel = isSmallScreen ? 12 : 13;
  const fontSizeValue = isSmallScreen ? 12 : 13;
  const fontSizeBtn = isSmallScreen ? 12 : 14;
  const estrelasTamanho = isSmallScreen ? 20 : 24;

  return (
    <SafeAreaView style={styles.safe}>
      {/* TOPBAR */}
      <View style={[styles.topbar, { paddingTop: Math.max(insets.top, 12) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBtn}>
          <Text style={[styles.voltarTexto, { fontSize: fontSizeBtn }]}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingBottom: Math.max(insets.bottom + 100, 120),
            paddingHorizontal: isSmallScreen ? 8 : 12,
          },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* HERO */}
        <View style={[styles.hero, { margin: isSmallScreen ? 8 : 12 }]}>
          <Text style={[styles.titulo, { fontSize: fontSizeTitle }]}>{item.titulo}</Text>
          <Text style={[styles.metaTipo, { fontSize: isSmallScreen ? 12 : 13 }]}>
            {item.tipo} {item.ano ? `· ${item.ano}` : ''}
          </Text>
          <View style={[styles.heroRodape, { marginTop: isSmallScreen ? 2 : 4 }]}>
            <AvaliacaoEstrelas nota={item.nota} tamanho={estrelasTamanho} />
            <BadgeStatus status={item.status} />
          </View>
        </View>

        {/* DETALHES */}
        <View style={[styles.secao, { marginHorizontal: isSmallScreen ? 8 : 12 }]}>
          <View style={styles.infoLinha}>
            <Text style={[styles.infoLabel, { fontSize: fontSizeLabel }]}>Gênero</Text>
            <Text style={[styles.infoValor, { fontSize: fontSizeValue }]}>{item.genero}</Text>
          </View>
          <View style={styles.infoLinha}>
            <Text style={[styles.infoLabel, { fontSize: fontSizeLabel }]}>Ano</Text>
            <Text style={[styles.infoValor, { fontSize: fontSizeValue }]}>{item.ano ?? '—'}</Text>
          </View>
          <View style={styles.infoLinha}>
            <Text style={[styles.infoLabel, { fontSize: fontSizeLabel }]}>Tipo</Text>
            <Text style={[styles.infoValor, { fontSize: fontSizeValue }]}>{item.tipo}</Text>
          </View>
          <View style={[styles.infoLinha, styles.semBorda]}>
            <Text style={[styles.infoLabel, { fontSize: fontSizeLabel }]}>Nota</Text>
            <Text style={[styles.infoValor, { fontSize: fontSizeValue }]}>
              {item.nota > 0 ? `${item.nota} / 5 estrelas` : 'Sem avaliação'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* AÇÕES */}
      <View
        style={[
          styles.acoes,
          {
            paddingBottom: Math.max(insets.bottom + 16, 28),
            paddingHorizontal: isSmallScreen ? 10 : 16,
            gap: isSmallScreen ? 8 : 10,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.btnEditar, { minHeight: isSmallScreen ? 40 : 44 }]}
          onPress={() => navigation.navigate('TelaFormulario', { item })}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnEditarTexto, { fontSize: fontSizeBtn }]}>✏️  Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnExcluir, { minHeight: isSmallScreen ? 40 : 44 }]}
          onPress={() => setModalVisivel(true)}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnExcluirTexto, { fontSize: fontSizeBtn }]}>🗑  Excluir</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalBox,
              {
                paddingHorizontal: isSmallScreen ? 16 : 24,
                paddingVertical: isSmallScreen ? 20 : 24,
                margin: isSmallScreen ? 8 : 12,
              },
            ]}
          >
            <Text style={[styles.modalTitulo, { fontSize: isSmallScreen ? 16 : 18 }]}>Excluir título?</Text>
            <Text style={[styles.modalSub, { fontSize: isSmallScreen ? 13 : 14 }]}>
              "{item.titulo}" será removido da sua lista. Esta ação não pode ser desfeita.
            </Text>
            <View style={[styles.modalBtns, { gap: isSmallScreen ? 8 : 10 }]}>
              <TouchableOpacity
                style={[styles.btnCancelar, { minHeight: isSmallScreen ? 40 : 44 }]}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={[styles.btnCancelarTexto, { fontSize: fontSizeBtn }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnConfirmarDel, { minHeight: isSmallScreen ? 40 : 44 }]}
                onPress={confirmarExclusao}
              >
                <Text style={[styles.btnConfirmarTexto, { fontSize: fontSizeBtn }]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D0D0F',
  },
  topbar: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2A33',
  },
  voltarBtn: {
    paddingVertical: 4,
    justifyContent: 'center',
  },
  voltarTexto: {
    fontWeight: '600',
    color: '#C084FC',
    lineHeight: 18,
  },
  scroll: {
    flexGrow: 1,
  },
  hero: {
    backgroundColor: '#16161A',
    borderRadius: 20,
    padding: 20,
    borderWidth: 0.5,
    borderColor: '#2A2A33',
  },
  titulo: {
    fontWeight: '800',
    color: '#F1F0F5',
    marginBottom: 6,
    lineHeight: 28,
  },
  metaTipo: {
    color: '#8B8A9B',
    marginBottom: 14,
    lineHeight: 18,
  },
  heroRodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 28,
  },
  secao: {
    backgroundColor: '#16161A',
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 0.5,
    borderColor: '#2A2A33',
  },
  infoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2A33',
  },
  semBorda: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    color: '#8B8A9B',
    lineHeight: 18,
  },
  infoValor: {
    fontWeight: '600',
    color: '#F1F0F5',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
    lineHeight: 18,
  },
  acoes: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#0D0D0F',
    borderTopWidth: 0.5,
    borderTopColor: '#2A2A33',
  },
  btnEditar: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A855F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEditarTexto: {
    fontWeight: '700',
    color: '#C084FC',
    lineHeight: 18,
  },
  btnExcluir: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#7f1d1d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnExcluirTexto: {
    fontWeight: '700',
    color: '#F87171',
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#16161A',
    borderRadius: 24,
    paddingBottom: 36,
    borderWidth: 0.5,
    borderColor: '#2A2A33',
  },
  modalTitulo: {
    fontWeight: '800',
    color: '#F1F0F5',
    marginBottom: 8,
    lineHeight: 22,
  },
  modalSub: {
    color: '#8B8A9B',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalBtns: {
    flexDirection: 'row',
  },
  btnCancelar: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A2A33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancelarTexto: {
    fontWeight: '600',
    color: '#F1F0F5',
    lineHeight: 18,
  },
  btnConfirmarDel: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: '#7f1d1d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnConfirmarTexto: {
    fontWeight: '700',
    color: '#F87171',
    lineHeight: 18,
  },
});
