import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AlertBanner from '../../components/alert-banner';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    if (!email || !senha) {
      setErro('Preencha os campos para entrar.');
      return;
    }
    setErro('');
    // Acesso do Administrador ao Painel Principal
    navigation.replace('Dashboard');
  };

  return (
    <View style={styles.container}>
      {erro ? <AlertBanner message={erro} type="error" /> : null}

      <Text style={styles.title}>Biblioteca Admin</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail do Administrador"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Palavra-passe"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar no Painel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, color: '#212529' },
  input: { borderWidth: 1, borderColor: '#ced4da', borderRadius: 6, padding: 12, marginBottom: 12, backgroundColor: '#f8f9fa' },
  button: { backgroundColor: '#007bff', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default SignIn;