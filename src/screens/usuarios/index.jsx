import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import api from '../../services/api';
import AlertBanner from '../../components/alert-banner';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await api.get('/usuarios');
      const dados = response.data._embedded ? response.data._embedded.usuarioList : response.data;
      setUsuarios(dados);
    } catch (error) {
      setMensagem({ text: 'Erro ao carregar usuários da API.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCadastrar = async () => {
    if (!nome.trim() || !email.trim()) {
      setMensagem({ text: 'Preencha o nome e e-mail do usuário.', type: 'info' });
      return;
    }

    try {
      await api.post('/usuarios', { nome, email, telefone, cpf });
      setMensagem({ text: 'Usuário cadastrado com sucesso!', type: 'success' });
      setNome('');
      setEmail('');
      setTelefone('');
      setCpf('');
      carregarUsuarios();
    } catch (error) {
      setMensagem({ text: 'Erro ao cadastrar usuário.', type: 'error' });
    }
  };

  return (
    <View style={styles.container}>
      {mensagem && <AlertBanner message={mensagem.text} type={mensagem.type} />}

      <ScrollView style={styles.formContainer}>
        <Text style={styles.formTitle}>Cadastrar Leitor / Usuário</Text>
        <TextInput style={styles.input} placeholder="Nome completo *" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="E-mail *" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />

        <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
          <Text style={styles.buttonText}>Adicionar Usuário</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.listTitle}>Usuários Cadastrados</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0EA5E9" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardSub}>📧 {item.email}</Text>
              <Text style={styles.cardSub}>📞 {item.telefone || 'Não informado'} | CPF: {item.cpf || 'Não informado'}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum usuário encontrado na API.</Text>}
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
  button: { backgroundColor: '#0EA5E9', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
  listTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A', marginBottom: 10 },
  card: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  cardSub: { fontSize: 13, color: '#64748B', marginTop: 2 },
  emptyText: { textAlign: 'center', color: '#64748B', marginTop: 20 }
});

export default Usuarios;