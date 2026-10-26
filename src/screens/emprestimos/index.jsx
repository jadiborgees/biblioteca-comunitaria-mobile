import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import api from '../../services/api';
import AlertBanner from '../../components/alert-banner';

const Emprestimos = () => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [dataEmprestimo, setDataEmprestimo] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [status, setStatus] = useState('EMPRESTADO');
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    carregarEmprestimos();
  }, []);

  const carregarEmprestimos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/emprestimos');
      const dados = response.data._embedded ? response.data._embedded.emprestimoList : response.data;
      setEmprestimos(dados);
    } catch (error) {
      setMensagem({ text: 'Erro ao carregar empréstimos da API.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCadastrar = async () => {
    if (!dataEmprestimo.trim()) {
      setMensagem({ text: 'Preencha a data do empréstimo.', type: 'info' });
      return;
    }

    try {
      await api.post('/emprestimos', { 
        dataEmprestimo, 
        dataDevolucao, 
        status 
      });
      setMensagem({ text: 'Empréstimo registrado com sucesso!', type: 'success' });
      setDataEmprestimo('');
      setDataDevolucao('');
      setStatus('EMPRESTADO');
      carregarEmprestimos();
    } catch (error) {
      setMensagem({ text: 'Erro ao registrar empréstimo.', type: 'error' });
    }
  };

  return (
    <View style={styles.container}>
      {mensagem && <AlertBanner message={mensagem.text} type={mensagem.type} />}

      <ScrollView style={styles.formContainer}>
        <Text style={styles.formTitle}>Registrar Empréstimo</Text>
        <TextInput style={styles.input} placeholder="Data do Empréstimo (AAAA-MM-DD) *" value={dataEmprestimo} onChangeText={setDataEmprestimo} />
        <TextInput style={styles.input} placeholder="Data de Devolução (AAAA-MM-DD)" value={dataDevolucao} onChangeText={setDataDevolucao} />
        <TextInput style={styles.input} placeholder="Status (EMPRESTADO, DEVOLVIDO, ATRASADO)" value={status} onChangeText={setStatus} autoCapitalize="characters" />

        <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
          <Text style={styles.buttonText}>Adicionar Empréstimo</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.listTitle}>Controle de Empréstimos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#10B981" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={emprestimos}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Empréstimo #{item.id}</Text>
                <Text style={[styles.badge, { backgroundColor: item.status === 'DEVOLVIDO' ? '#D1FAE5' : '#FEF3C7' }]}>
                  {item.status || 'EMPRESTADO'}
                </Text>
              </View>
              <Text style={styles.cardSub}>📅 Empréstimo: {item.dataEmprestimo || 'N/A'}</Text>
              <Text style={styles.cardSub}>🏁 Devolução: {item.dataDevolucao || 'Pendente'}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum empréstimo encontrado na API.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  formContainer: { maxHeight: 260, backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 10 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 10, marginBottom: 8 },
  button: { backgroundColor: '#10B981', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
  listTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A', marginBottom: 10 },
  card: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  badge: { fontSize: 11, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, color: '#0F172A' },
  cardSub: { fontSize: 13, color: '#64748B', marginTop: 2 },
  emptyText: { textAlign: 'center', color: '#64748B', marginTop: 20 }
});

export default Emprestimos;