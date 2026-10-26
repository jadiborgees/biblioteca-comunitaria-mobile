import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import api from '../../services/api';
import AlertBanner from '../../components/alert-banner';

const Autores = () => {
  const [autores, setAutores] = useState([]);
  const [nome, setNome] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    carregarAutores();
  }, []);

  const carregarAutores = async () => {
    try {
      setLoading(true);
      const response = await api.get('/autores');
      const dados = response.data._embedded ? response.data._embedded.autorList : response.data;
      setAutores(dados);
    } catch (error) {
      setMensagem({ text: 'Erro ao carregar autores da API.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCadastrar = async () => {
    if (!nome.trim()) {
      setMensagem({ text: 'Preencha o nome do autor.', type: 'info' });
      return;
    }

    try {
      await api.post('/autores', { nome, nacionalidade });
      setMensagem({ text: 'Autor cadastrado com sucesso!', type: 'success' });
      setNome('');
      setNacionalidade('');
      carregarAutores();
    } catch (error) {
      setMensagem({ text: 'Erro ao cadastrar autor.', type: 'error' });
    }
  };

  return (
    <View style={styles.container}>
      {mensagem && <AlertBanner message={mensagem.text} type={mensagem.type} />}

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Cadastrar Autor</Text>
        <TextInput style={styles.input} placeholder="Nome do Autor *" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Nacionalidade" value={nacionalidade} onChangeText={setNacionalidade} />
        
        <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
          <Text style={styles.buttonText}>Adicionar Autor</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listTitle}>Autores Cadastrados</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#F59E0B" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={autores}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardSub}>Nacionalidade: {item.nacionalidade || 'Não informada'}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum autor encontrado na API.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  formContainer: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 10 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 10, marginBottom: 8 },
  button: { backgroundColor: '#F59E0B', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
  listTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A', marginBottom: 10 },
  card: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  cardSub: { fontSize: 13, color: '#64748B', marginTop: 2 },
  emptyText: { textAlign: 'center', color: '#64748B', marginTop: 20 }
});

export default Autores;