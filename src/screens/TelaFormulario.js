// screens/TelaFormulario.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { salvarFilme, editarFilme } from '../database/storage';
import { criarFilme } from '../models/Filme';
import CampoTexto from '../components/CampoTexto';
import AvaliacaoEstrelas from '../components/AvaliacaoEstrelas';

const TIPOS = ['Filme', 'Série', 'Documentário', 'Anime'];

export default function TelaFormulario({ route, navigation }) {
  const itemExistente = route.params?.item ?? null;
  const modoEdicao = !!itemExistente;
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  // Calcula valores responsivos
  const isSmallScreen = width < 380;
  const isLargeScreen = width > 500;
  const isLandscape = height < width;

  // Estado de cada campo do formulário
  const [titulo, setTitulo] = useState(itemExistente?.titulo ?? '');
  const [genero, setGenero] = useState(itemExistente?.genero ?? '');
  const [ano, setAno] = useState(itemExistente?.ano?.toString() ?? '');
  const [tipo, setTipo] = useState(itemExistente?.tipo ?? 'Filme');
  const [nota, setNota] = useState(itemExistente?.nota ?? 0);
  const [status, setStatus] = useState(itemExistente?.status ?? '');

  // Erros de validação
  const [erroTitulo, setErroTitulo] = useState('');
  const [erroGenero, setErroGenero] = useState('');
  const [erroStatus, setErroStatus] = useState('');

  // AJUSTADO MANUALMENTE — validação antes de salvar
  function validar() {
    let valido = true;

    if (!titulo.trim()) {
      setErroTitulo('Título é obrigatório');
      valido = false;
    }

    if (!genero.trim()) {
      setErroGenero('Gênero é obrigatório');
      valido = false;
    }

    if (!status) {
      setErroStatus('Selecione um status');
      valido = false;
    }

    const anoNum = parseInt(ano);
    if (ano && (isNaN(anoNum) || anoNum < 1888 || anoNum > 2099)) {
      Alert.alert('Ano inválido', 'Informe um ano entre 1888 e 2099, ou deixe em branco.');
      valido = false;
    }

    return valido;
  }

  async function handleSalvar() {
    if (!validar()) return;

    if (modoEdicao) {
      const atualizado = {
        ...itemExistente,
        titulo: titulo.trim(),
        genero: genero.trim(),
        ano: ano ? parseInt(ano) : null,
        tipo,
        nota,
        status,
      };
      await editarFilme(atualizado);
      navigation.navigate('TelaDetalhes', { item: atualizado });
    } else {
      const novo = criarFilme(titulo.trim(), genero.trim(), ano ? parseInt(ano) : null, tipo, nota, status);
      await salvarFilme(novo);
      navigation.navigate('TelaListagem');
    }
  }

  function handleCancelar() {
    if (modoEdicao) {
      navigation.goBack();
    } else {
      navigation.navigate('TelaListagem');
    }
  }

  // Valores responsivos para tamanho de fonte
  const fontSizeTitle = isSmallScreen ? 14 : 16;
  const fontSizeLabel = isSmallScreen ? 11 : 12;
  const fontSizeInput = isSmallScreen ? 13 : 14;
  const estrelasTamanho = isSmallScreen ? 28 : 32;

  return (
    <SafeAreaView style={styles.safe}>
      {/* TOPBAR */}
      <View style={[styles.topbar, { paddingTop: Math.max(insets.top, 12) }]}>
        <TouchableOpacity onPress={handleCancelar} style={styles.voltarBtn}>
          <Text style={[styles.voltarTexto, { fontSize: fontSizeTitle }]}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={[styles.topbarTitulo, { fontSize: fontSizeTitle }]}>
          {modoEdicao ? 'Editar título' : 'Novo título'}
        </Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingBottom: Math.max(insets.bottom + 24, 48),
            paddingHorizontal: isSmallScreen ? 12 : 16,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* CAMPOS DE TEXTO */}
        <CampoTexto
          label="Título"
          valor={titulo}
          onChangeText={t => { setTitulo(t); setErroTitulo(''); }}
          placeholder="Ex: Interestelar"
          erro={erroTitulo}
          obrigatorio
        />

        <CampoTexto
          label="Gênero"
          valor={genero}
          onChangeText={t => { setGenero(t); setErroGenero(''); }}
          placeholder="Ex: Ficção Científica"
          erro={erroGenero}
          obrigatorio
        />

        {/* LINHA 2: ANO E TIPO */}
        <View style={[styles.linha2, { gap: isSmallScreen ? 8 : 12 }]}>
          <View style={styles.metade}>
            <CampoTexto
              label="Ano"
              valor={ano}
              onChangeText={setAno}
              placeholder="2024"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.metade}>
            {/* Seletor de tipo */}
            <Text style={[styles.label, { fontSize: fontSizeLabel }]}>Tipo</Text>
            <View style={[styles.pickerWrapper, { minHeight: isSmallScreen ? 48 : 52 }]}>
              <Picker
                selectedValue={tipo}
                onValueChange={setTipo}
                style={[styles.picker, { height: isSmallScreen ? 48 : 52 }]}
                dropdownIconColor="#8B8A9B"
                itemStyle={{ color: '#F1F0F5', fontSize: fontSizeInput }}
              >
                {TIPOS.map(t => (
                  <Picker.Item key={t} label={t} value={t} color="#F1F0F5" />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        {/* NOTA */}
        <View style={[styles.campo, { minHeight: isSmallScreen ? 80 : 90 }]}>
          <Text style={[styles.label, { fontSize: fontSizeLabel }]}>Nota</Text>
          <AvaliacaoEstrelas
            nota={nota}
            editavel
            onSelect={setNota}
            tamanho={estrelasTamanho}
          />
          <Text style={[styles.notaHint, { fontSize: fontSizeLabel }]}>
            {nota === 0 ? 'Toque para avaliar' : `${nota} de 5 estrelas`}
          </Text>
        </View>

        {/* STATUS */}
        <View style={styles.campo}>
          <Text style={[styles.label, { fontSize: fontSizeLabel }]}>
            Status <Text style={{ color: '#F87171' }}>*</Text>
          </Text>
          <View style={[styles.statusRow, { gap: isSmallScreen ? 8 : 10 }]}>
            <TouchableOpacity
              style={[
                styles.statusOpt,
                { minHeight: isSmallScreen ? 40 : 44 },
                status === 'Assistido' && styles.statusAssistido,
              ]}
              onPress={() => { setStatus(status === 'Assistido' ? '' : 'Assistido'); setErroStatus(''); }}
              activeOpacity={0.8}
            >
              <Text style={[styles.statusTexto, { fontSize: fontSizeInput }, status === 'Assistido' && styles.statusTextoAssistido]}>
                ✓  Assistido
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusOpt,
                { minHeight: isSmallScreen ? 40 : 44 },
                status === 'Quero ver' && styles.statusQuero,
              ]}
              onPress={() => { setStatus(status === 'Quero ver' ? '' : 'Quero ver'); setErroStatus(''); }}
              activeOpacity={0.8}
            >
              <Text style={[styles.statusTexto, { fontSize: fontSizeInput }, status === 'Quero ver' && styles.statusTextoQuero]}>
                ♥  Quero ver
              </Text>
            </TouchableOpacity>
          </View>
          {!!erroStatus && <Text style={[styles.erro, { fontSize: fontSizeLabel }]}>{erroStatus}</Text>}
        </View>

        {/* BOTÃO SALVAR */}
        <TouchableOpacity
          style={[styles.btnSalvar, { minHeight: isSmallScreen ? 44 : 48 }]}
          onPress={handleSalvar}
          activeOpacity={0.85}
        >
          <Text style={[styles.btnSalvarTexto, { fontSize: isSmallScreen ? 14 : 16 }]}>
            {modoEdicao ? 'Salvar alterações' : 'Adicionar à lista'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D0D0F',
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2A33',
  },
  voltarBtn: {
    width: 80,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  voltarTexto: {
    fontWeight: '600',
    color: '#C084FC',
    lineHeight: 18,
  },
  topbarTitulo: {
    fontWeight: '700',
    color: '#F1F0F5',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
    lineHeight: 20,
  },
  scroll: {
    paddingTop: 16,
    flexGrow: 1,
  },
  linha2: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  metade: {
    flex: 1,
    minWidth: 0,
  },
  campo: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '700',
    color: '#8B8A9B',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
    lineHeight: 16,
  },
  pickerWrapper: {
    backgroundColor: '#16161A',
    borderWidth: 1,
    borderColor: '#2A2A33',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    color: '#F1F0F5',
    backgroundColor: 'transparent',
    marginTop: 0,
  },
  notaHint: {
    color: '#8B8A9B',
    marginTop: 10,
    marginBottom: 4,
    lineHeight: 16,
  },
  statusRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  statusOpt: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusAssistido: {
    borderColor: '#34D399',
    backgroundColor: '#16302A',
  },
  statusQuero: {
    borderColor: '#A855F7',
    backgroundColor: '#2A2030',
  },
  statusTexto: {
    fontWeight: '600',
    color: '#8B8A9B',
    flexWrap: 'wrap',
    lineHeight: 18,
  },
  statusTextoAssistido: {
    color: '#34D399',
    flexWrap: 'wrap',
  },
  statusTextoQuero: {
    color: '#C084FC',
    flexWrap: 'wrap',
  },
  erro: {
    color: '#F87171',
    marginTop: 8,
    lineHeight: 16,
  },
  btnSalvar: {
    backgroundColor: '#A855F7',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  btnSalvarTexto: {
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 20,
  },
});
