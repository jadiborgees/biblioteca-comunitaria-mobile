import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Dashboard = ({ navigation }) => {
  const menuItems = [
    { title: 'Livros', subtitle: 'Catálogo e acervo', iconName: 'book-outline', route: 'Livros', color: '#4F46E5' },
    { title: 'Usuários', subtitle: 'Gestão de leitores', iconName: 'people-outline', route: 'Usuarios', color: '#0EA5E9' },
    { title: 'Empréstimos', subtitle: 'Controle e prazos', iconName: 'swap-horizontal-outline', route: 'Emprestimos', color: '#10B981' },
    { title: 'Autores', subtitle: 'Escritores cadastrados', iconName: 'create-outline', route: 'Autores', color: '#F59E0B' },
    { title: 'Endereços', subtitle: 'Localidades e CEPs', iconName: 'location-outline', route: 'Enderecos', color: '#8B5CF6' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Painel Administrativo</Text>
        <Text style={styles.subGreeting}>Selecione um módulo para gerenciar o sistema</Text>
      </View>

      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.iconName} size={22} color={item.color} />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 20 },
  header: { marginBottom: 24, marginTop: 8 },
  greeting: { fontSize: 22, fontWeight: 'bold', color: '#0F172A' },
  subGreeting: { fontSize: 14, color: '#64748B', marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  cardSubtitle: { fontSize: 12, color: '#64748B' },
});

export default Dashboard;