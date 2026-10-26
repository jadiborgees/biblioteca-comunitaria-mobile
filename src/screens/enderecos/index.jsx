import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import api from '../../services/api';
import AlertBanner from '../../components/alert-banner';

const Enderecos = () => {
  const [enderecos, setEnderecos] = useState([]);
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    carregarEnderecos();
  }, []);

  const carregarEnderecos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/enderecos');
      const dados = response.data._embedded ? response.data._embedded.enderecoList : response.data;
      setEnderecos(dados);
    } catch (error) {
      setMensagem({ text: 'Erro ao carregar endereços da API.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCadastrar = async () => {
    if (!logradouro.trim() || !cidade.trim()) {
      setMensagem({ text: 'Preencha pelo menos o logradouro e a cidade.', type: 'info' });
      return;
    }

    try {
      await api.post('/enderecos', { 
        logradouro, 
        numero, 
        complemento, 
        bairro, 
        cidade, 
        estado, 
        cep 
      });
      setMensagem({ text: 'Endereço cadastrado com sucesso!', type: 'success' });
      setLogradouro('');
      setNumero('');
      setComplemento('');
      setBairro('');
      setCidade('');
      setEstado('');
      setCep('');
      carregarEnderecos();
    } catch (error) {
      setMensagem({ text: 'Erro ao cadastrar endereço.', type: 'error' });
    }
  };

  return (
    <View style={styles.container}>
      {mensagem && <AlertBanner message={mensagem.text} type={mensagem.type} />}

      <ScrollView style={styles.formContainer}>
        <Text style={styles.formTitle}>Cadastrar Endereço</Text>
        <TextInput style={styles.input} placeholder="Rua / Logradouro *" value={logradouro} onChangeText={setLogradouro} />
        <TextInput style={styles.input} placeholder="Número" value={numero} onChangeText={setNumero} />
        <TextInput style={styles.input} placeholder="Complemento" value={complemento} onChangeText={setComplemento} />
        <TextInput style={styles.input} placeholder="Bairro" value={bairro} onChangeText={setBairro} />
        <TextInput style={styles.input} placeholder="Cidade *" value={cidade} onChangeText={setCidade} />
        <TextInput style={styles.input} placeholder="UF / Estado (ex: SP)" value={estado} onChangeText={setEstado} maxLength={2} autoCapitalize="characters" />
        <TextInput style={styles.input} placeholder="CEP" value={cep} onChangeText={setCep} keyboardType="numeric" />

        <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
          <Text style={styles.buttonText}>Adicionar Endereço</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.listTitle}>Endereços Cadastrados</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#8B5CF6" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={enderecos}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.logradouro}, {item.numero || 'S/N'}</Text>
              {item.complemento ? <Text style={styles.cardSub}>Comp: {item.complemento}</Text> : null}
              <Text style={styles.cardSub}>{item.bairro ? `${item.bairro} - ` : ''}{item.cidade}/{item.estado || 'UF'}</Text>
              <Text style={styles.cardSub}>CEP: {item.cep || 'Não informado'}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum endereço encontrado na API.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  formContainer: { maxHeight: 290, backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 10 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 10, marginBottom: 8 },
  button: { backgroundColor: '#8B5CF6', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
  listTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A', marginBottom: 10 },
  card: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  cardSub: { fontSize: 13, color: '#64748B', marginTop: 2 },
  emptyText: { textAlign: 'center', color: '#64748B', marginTop: 20 }
});

export default Enderecos;