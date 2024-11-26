import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    title: '',
    body: '',
    userId: 1,
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const formattedData = data.slice(0, 10).map((item) => ({
        description: item.title,
        amount: Math.floor(Math.random() * 1000),
        type: item.id % 2 === 0 ? 'income' : 'expense',
      }));
      setTransactions(formattedData);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  };

  const addTransaction = async () => {
    if (!newTransaction.title || !newTransaction.body) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (response.ok) {
        const addedTransaction = await response.json();
        setTransactions((prev) => [
          ...prev,
          {
            description: addedTransaction.title,
            amount: Math.floor(Math.random() * 1000),
            type: addedTransaction.id % 2 === 0 ? 'income' : 'expense',
          },
        ]);
        setNewTransaction({ title: '', body: '', userId: 1 });
      } else {
        alert('Erro ao adicionar a transação.');
      }
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    }
  };

  const expenseCategories = {};
  const incomeCategories = {};
  let totalExpenses = 0;
  let totalIncome = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === 'expense') {
      if (!expenseCategories[transaction.description]) {
        expenseCategories[transaction.description] = 0;
      }
      expenseCategories[transaction.description] += transaction.amount;
      totalExpenses += transaction.amount;
    } else if (transaction.type === 'income') {
      if (!incomeCategories[transaction.description]) {
        incomeCategories[transaction.description] = 0;
      }
      incomeCategories[transaction.description] += transaction.amount;
      totalIncome += transaction.amount;
    }
  });

  const expenseData = Object.keys(expenseCategories).map((category) => ({
    name: category,
    amount: expenseCategories[category],
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    legendFontColor: '#333',
    legendFontSize: 15,
  }));

  const incomeData = Object.keys(incomeCategories).map((category) => ({
    name: category,
    amount: incomeCategories[category],
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    legendFontColor: '#333',
    legendFontSize: 15,
  }));

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>Descrição: {item.description}</Text>
      <Text style={styles.transactionText}>Valor: R$ {item.amount.toFixed(2)}</Text>
      <Text
        style={[
          styles.transactionText,
          { color: item.type === 'expense' ? '#D32F2F' : '#388E3C' },
        ]}
      >
        Tipo: {item.type === 'expense' ? 'Despesa' : 'Receita'}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Relatórios Financeiros</Text>

        <View style={styles.totalsContainer}>
          <Text style={styles.totalText}>Total de Despesas: R$ {totalExpenses.toFixed(2)}</Text>
          <Text style={styles.totalText}>Total de Receitas: R$ {totalIncome.toFixed(2)}</Text>
        </View>

        <Text style={styles.chartTitle}>Despesas por Categoria</Text>
        <PieChart
          data={expenseData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

        <Text style={styles.chartTitle}>Receitas por Categoria</Text>
        <PieChart
          data={incomeData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

        <Text style={styles.historyTitle}>Histórico de Transações</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTransaction}
          style={styles.transactionList}
        />

        <Text style={styles.chartTitle}>Adicionar Nova Transação</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={newTransaction.title}
          onChangeText={(text) => setNewTransaction({ ...newTransaction, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={newTransaction.body}
          onChangeText={(text) => setNewTransaction({ ...newTransaction, body: text })}
        />
        <Pressable style={styles.button} onPress={addTransaction}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: '#F5F5F5' },
  contentContainer: { paddingBottom: 40 },
  container: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E88E5',
  },
  totalsContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#1E88E5',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#1E88E5',
  },
  transactionList: { marginTop: 20 },
  transactionItem: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: '#FFF',
    shadowColor: '#CCC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  transactionText: { fontSize: 16, color: '#333' },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#1E88E5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default Reports;
