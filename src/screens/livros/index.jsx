import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import api from '../../services/api';
import AlertBanner from '../../components/alert-banner';

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [isbn, setIsbn] = useState('');
  const [editora, setEditora] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = async () => {
    try {
      setLoading(true);
      const response = await api.get('/livros');
      const dados = response.data._embedded ? response.data._embedded.livroList : response.data;
      setLivros(dados);
    } catch (error) {
      setMensagem({ text: 'Erro ao carregar livros da API.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCadastrar = async () => {
    if (!titulo.trim()) {
      setMensagem({ text: 'Preencha o título do livro.', type: 'info' });
      return;
    }

    try {
      await api.post('/livros', { 
        titulo, 
        isbn, 
        editora, 
        anoPublicacao: anoPublicacao ? parseInt(anoPublicacao, 10) : null 
      });
      setMensagem({ text: 'Livro cadastrado com sucesso!', type: 'success' });
      setTitulo('');
      setIsbn('');
      setEditora('');
      setAnoPublicacao('');
      carregarLivros();
    } catch (error) {
      setMensagem({ text: 'Erro ao cadastrar livro na API.', type: 'error' });
    }
  };

  return (
    <View style={styles.container}>
      {mensagem && <AlertBanner message={mensagem.text} type={mensagem.type} />}

      <ScrollView style={styles.formContainer}>
        <Text style={styles.formTitle}>Cadastrar Novo Livro</Text>
        <TextInput style={styles.input} placeholder="Título *" value={titulo} onChangeText={setTitulo} />
        <TextInput style={styles.input} placeholder="ISBN" value={isbn} onChangeText={setIsbn} />
        <TextInput style={styles.input} placeholder="Editora" value={editora} onChangeText={setEditora} />
        <TextInput style={styles.input} placeholder="Ano de Publicação" value={anoPublicacao} onChangeText={setAnoPublicacao} keyboardType="numeric" />

        <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
          <Text style={styles.buttonText}>Adicionar Livro</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.listTitle}>Acervo de Livros</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4F46E5" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={livros}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardSub}>ISBN: {item.isbn || 'Não informado'}</Text>
              <Text style={styles.cardSub}>Editora: {item.editora || 'Não informada'} {item.anoPublicacao ? `(${item.anoPublicacao})` : ''}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum livro encontrado na API.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  formContainer: { maxHeight: 280, backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 10 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 10, marginBottom: 8 },
  button: { backgroundColor: '#4F46E5', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
  listTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A', marginBottom: 10 },
  card: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  cardSub: { fontSize: 13, color: '#64748B', marginTop: 2 },
  emptyText: { textAlign: 'center', color: '#64748B', marginTop: 20 }
});

export default Livros;