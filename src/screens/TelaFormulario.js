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
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { salvarFilme, editarFilme } from '../database/storage';
import { criarFilme } from '../models/Filme';
import CampoTexto from '../components/CampoTexto';
import AvaliacaoEstrelas from '../components/AvaliacaoEstrelas';

const TIPOS = ['Filme', 'Série', 'Documentário', 'Anime'];

export default function TelaFormulario({ route, navigation }) {
  const itemExistente = route.params?.item ?? null;
  const modoEdicao = !!itemExistente;

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
      // Navega para detalhes com dados atualizados
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

  return (
    <SafeAreaView style={styles.safe}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity onPress={handleCancelar} style={styles.voltarBtn}>
          <Text style={styles.voltarTexto}>← Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitulo}>
          {modoEdicao ? 'Editar título' : 'Novo título'}
        </Text>
        <View style={{ width: 80 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
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

        <View style={styles.linha2}>
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
            <Text style={styles.label}>Tipo</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={tipo}
                onValueChange={setTipo}
                style={styles.picker}
                dropdownIconColor="#8B8A9B"
                itemStyle={{ color: '#F1F0F5', fontSize: 14 }}
              >
                {TIPOS.map(t => (
                  <Picker.Item key={t} label={t} value={t} color="#F1F0F5" />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        {/* NOTA */}
        <View style={styles.campo}>
          <Text style={styles.label}>Nota</Text>
          <AvaliacaoEstrelas
            nota={nota}
            editavel
            onSelect={setNota}
            tamanho={32}
          />
          <Text style={styles.notaHint}>
            {nota === 0 ? 'Toque para avaliar' : `${nota} de 5 estrelas`}
          </Text>
        </View>

        {/* STATUS */}
        <View style={styles.campo}>
          <Text style={styles.label}>
            Status <Text style={{ color: '#F87171' }}>*</Text>
          </Text>
          <View style={styles.statusRow}>
            <TouchableOpacity
              style={[styles.statusOpt, status === 'Assistido' && styles.statusAssistido]}
              onPress={() => { setStatus(status === 'Assistido' ? '' : 'Assistido'); setErroStatus(''); }}
              activeOpacity={0.8}
            >
              <Text style={[styles.statusTexto, status === 'Assistido' && styles.statusTextoAssistido]}>
                ✓  Assistido
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusOpt, status === 'Quero ver' && styles.statusQuero]}
              onPress={() => { setStatus(status === 'Quero ver' ? '' : 'Quero ver'); setErroStatus(''); }}
              activeOpacity={0.8}
            >
              <Text style={[styles.statusTexto, status === 'Quero ver' && styles.statusTextoQuero]}>
                ♥  Quero ver
              </Text>
            </TouchableOpacity>
          </View>
          {!!erroStatus && <Text style={styles.erro}>{erroStatus}</Text>}
        </View>

        {/* BOTÃO SALVAR */}
        <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar} activeOpacity={0.85}>
          <Text style={styles.btnSalvarTexto}>
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
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2A33',
  },
  voltarBtn: {
    width: 80,
  },
  voltarTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C084FC',
  },
  topbarTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F1F0F5',
  },
  scroll: {
    padding: 16,
    paddingBottom: 48,
  },
  linha2: {
    flexDirection: 'row',
    gap: 12,
  },
  metade: {
    flex: 1,
  },
  campo: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B8A9B',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  pickerWrapper: {
    backgroundColor: '#16161A',
    borderWidth: 1,
    borderColor: '#2A2A33',
    borderRadius: 12,
    overflow: 'hidden',
    height: 46,
    justifyContent: 'center',
  },
  picker: {
    color: '#F1F0F5',
    backgroundColor: 'transparent',
    marginTop: -6,
  },
  notaHint: {
    fontSize: 12,
    color: '#8B8A9B',
    marginTop: 6,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statusOpt: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A33',
    alignItems: 'center',
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
    fontSize: 13,
    fontWeight: '600',
    color: '#8B8A9B',
  },
  statusTextoAssistido: {
    color: '#34D399',
  },
  statusTextoQuero: {
    color: '#C084FC',
  },
  erro: {
    fontSize: 12,
    color: '#F87171',
    marginTop: 6,
  },
  btnSalvar: {
    backgroundColor: '#A855F7',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  btnSalvarTexto: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
