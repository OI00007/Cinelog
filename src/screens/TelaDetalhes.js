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
} from 'react-native';
import { excluirFilme } from '../database/storage';
import AvaliacaoEstrelas from '../components/AvaliacaoEstrelas';
import BadgeStatus from '../components/BadgeStatus';

export default function TelaDetalhes({ route, navigation }) {
  const { item } = route.params;
  const [modalVisivel, setModalVisivel] = useState(false);

  async function confirmarExclusao() {
    await excluirFilme(item.id);
    setModalVisivel(false);
    navigation.navigate('TelaListagem');
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBtn}>
          <Text style={styles.voltarTexto}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.metaTipo}>
            {item.tipo} {item.ano ? `· ${item.ano}` : ''}
          </Text>
          <View style={styles.heroRodape}>
            <AvaliacaoEstrelas nota={item.nota} tamanho={24} />
            <BadgeStatus status={item.status} />
          </View>
        </View>

        {/* DETALHES */}
        <View style={styles.secao}>
          <View style={styles.infoLinha}>
            <Text style={styles.infoLabel}>Gênero</Text>
            <Text style={styles.infoValor}>{item.genero}</Text>
          </View>
          <View style={styles.infoLinha}>
            <Text style={styles.infoLabel}>Ano</Text>
            <Text style={styles.infoValor}>{item.ano ?? '—'}</Text>
          </View>
          <View style={styles.infoLinha}>
            <Text style={styles.infoLabel}>Tipo</Text>
            <Text style={styles.infoValor}>{item.tipo}</Text>
          </View>
          <View style={[styles.infoLinha, styles.semBorda]}>
            <Text style={styles.infoLabel}>Nota</Text>
            <Text style={styles.infoValor}>
              {item.nota > 0 ? `${item.nota} / 5 estrelas` : 'Sem avaliação'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* AÇÕES */}
      <View style={styles.acoes}>
        <TouchableOpacity
          style={styles.btnEditar}
          onPress={() => navigation.navigate('TelaFormulario', { item })}
          activeOpacity={0.8}
        >
          <Text style={styles.btnEditarTexto}>✏️  Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnExcluir}
          onPress={() => setModalVisivel(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.btnExcluirTexto}>🗑  Excluir</Text>
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
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Excluir título?</Text>
            <Text style={styles.modalSub}>
              "{item.titulo}" será removido da sua lista. Esta ação não pode ser desfeita.
            </Text>
            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.btnCancelar}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.btnCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnConfirmarDel}
                onPress={confirmarExclusao}
              >
                <Text style={styles.btnConfirmarTexto}>Excluir</Text>
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
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2A33',
  },
  voltarBtn: {
    paddingVertical: 4,
  },
  voltarTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C084FC',
  },
  scroll: {
    paddingBottom: 100,
  },
  hero: {
    margin: 12,
    backgroundColor: '#16161A',
    borderRadius: 20,
    padding: 20,
    borderWidth: 0.5,
    borderColor: '#2A2A33',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F1F0F5',
    marginBottom: 6,
    lineHeight: 28,
  },
  metaTipo: {
    fontSize: 13,
    color: '#8B8A9B',
    marginBottom: 14,
  },
  heroRodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secao: {
    marginHorizontal: 12,
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
    fontSize: 13,
    color: '#8B8A9B',
  },
  infoValor: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F1F0F5',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
  },
  acoes: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    paddingBottom: 28,
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
  },
  btnEditarTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: '#C084FC',
  },
  btnExcluir: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#7f1d1d',
    alignItems: 'center',
  },
  btnExcluirTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F87171',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#16161A',
    borderRadius: 24,
    padding: 24,
    paddingBottom: 36,
    margin: 12,
    borderWidth: 0.5,
    borderColor: '#2A2A33',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F1F0F5',
    marginBottom: 8,
  },
  modalSub: {
    fontSize: 14,
    color: '#8B8A9B',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalBtns: {
    flexDirection: 'row',
    gap: 10,
  },
  btnCancelar: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A2A33',
    alignItems: 'center',
  },
  btnCancelarTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F1F0F5',
  },
  btnConfirmarDel: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: '#7f1d1d',
    alignItems: 'center',
  },
  btnConfirmarTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F87171',
  },
});
