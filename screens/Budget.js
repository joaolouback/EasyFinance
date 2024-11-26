import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useTransactions } from './TransactionsContext';
import { useTheme } from './ThemeContext';

const Budget = () => {
  const { transactions } = useTransactions();
  const { isDarkMode } = useTheme();

  const [budgets, setBudgets] = useState({});
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');

  const calculateTotalByCategory = (category) => {
    return transactions
      .filter(transaction => transaction.type === 'expense' && transaction.description.toLowerCase().includes(category.toLowerCase()))
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const checkBudgetExceeded = (category, totalSpent) => {
    if (totalSpent > budgets[category]) {
      Alert.alert(
        "Alerta de Orçamento",
        `O valor total para ${category} (${totalSpent.toFixed(2)}) ultrapassou o orçamento de R$ ${budgets[category].toFixed(2)}`,
        [{ text: "OK" }]
      );
    }
  };

  const addBudget = () => {
    if (category && budget) {
      setBudgets(prevBudgets => ({ ...prevBudgets, [category]: parseFloat(budget) }));
      setCategory('');
      setBudget('');
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  useEffect(() => {
    Object.keys(budgets).forEach(category => {
      const totalSpent = calculateTotalByCategory(category);
      checkBudgetExceeded(category, totalSpent);
    });
  }, [transactions, budgets]);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f9f9f9' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#333' }]}>Gerenciamento de Orçamentos</Text>
      
      <View style={styles.form}>
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? '#555' : '#f9f9f9', color: isDarkMode ? '#fff' : '#333' }]}
          placeholder="Categoria"
          value={category}
          onChangeText={setCategory}
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
        />
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? '#555' : '#f9f9f9', color: isDarkMode ? '#fff' : '#333' }]}
          placeholder="Orçamento (R$)"
          value={budget}
          keyboardType="numeric"
          onChangeText={setBudget}
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
        />
        <TouchableOpacity style={[styles.addButton, { backgroundColor: isDarkMode ? '#007BFF' : '#53a4ec' }]} onPress={addBudget}>
          <Text style={styles.addButtonText}>Adicionar Orçamento</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={Object.keys(budgets)}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          const totalSpent = calculateTotalByCategory(item);
          const budget = budgets[item];
          return (
            <View style={[styles.budgetItem, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}>
              <Text style={[styles.category, { color: isDarkMode ? '#fff' : '#333' }]}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
              <Text style={[styles.amount, { color: isDarkMode ? '#ccc' : '#555' }]}>
                Total Gasto: R$ {totalSpent.toFixed(2)} / Orçamento: R$ {budget.toFixed(2)}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
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
  budgetItem: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  amount: {
    fontSize: 16,
  },
});

export default Budget;
