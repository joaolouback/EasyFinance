import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTransactions } from './TransactionsContext';
import { useTheme } from './ThemeContext';

const Transactions = () => {
  const { addTransaction } = useTransactions();
  const { isDarkMode } = useTheme();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income'); 

  const handleAddTransaction = () => {
    if (description && amount) {
      addTransaction({
        id: Math.random().toString(),
        description,
        amount: parseFloat(amount),
        type,
      });
      setDescription('');
      setAmount('');
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#333' }]}>Adicionar Transação</Text>

      {/* Campo de Descrição */}
      <Text style={[styles.label, { color: isDarkMode ? '#aaa' : '#555' }]}>Descrição</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#555' : '#f9f9f9', color: isDarkMode ? '#fff' : '#333' }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Ex: Mercado, Salário"
        placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
      />

     
      <Text style={[styles.label, { color: isDarkMode ? '#aaa' : '#555' }]}>Valor</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#555' : '#f9f9f9', color: isDarkMode ? '#fff' : '#333' }]}
        value={amount}
        onChangeText={setAmount}
        placeholder="Ex: 100.00"
        keyboardType="numeric"
        placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
      />

    
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[styles.typeButton, { backgroundColor: type === 'income' ? (isDarkMode ? '#007BFF' : '#53a4ec') : (isDarkMode ? '#555' : '#f0f0f0') }]}
          onPress={() => setType('income')}
        >
          <Text style={[styles.typeButtonText, { color: type === 'income' ? '#fff' : (isDarkMode ? '#ccc' : '#777') }]}>
            Receita
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, { backgroundColor: type === 'expense' ? (isDarkMode ? '#DC3545' : '#DC3545') : (isDarkMode ? '#555' : '#f0f0f0') }]}
          onPress={() => setType('expense')}
        >
          <Text style={[styles.typeButtonText, { color: type === 'expense' ? '#fff' : (isDarkMode ? '#ccc' : '#777') }]}>
            Despesa
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  typeButtonText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#00974d',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Transactions;
