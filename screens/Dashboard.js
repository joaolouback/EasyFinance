import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useTransactions } from './TransactionsContext';
import { useTheme } from './ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Dashboard = ({ navigation }) => {
  const { transactions, balance } = useTransactions();
  const { isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#333' }]}>Dashboard</Text>

      <View style={styles.balanceContainer}>
        <Text style={[styles.balanceLabel, { color: isDarkMode ? '#aaa' : '#888' }]}>Saldo Atual</Text>
        <Text style={[styles.balance, { color: isDarkMode ? '#4caf50' : '#4caf50' }]}>R$ {balance.toFixed(2)}</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.transaction, { backgroundColor: isDarkMode ? '#444' : '#f9f9f9', borderBottomColor: isDarkMode ? '#555' : '#eee' }]}>
            <Text style={[styles.transactionText, { color: isDarkMode ? '#fff' : '#333' }]}>{item.description}</Text>
            <Text style={[styles.transactionAmount, item.type === 'income' ? styles.income : styles.expense]}>
              {item.type === 'income' ? '+' : '-'} R$ {item.amount.toFixed(2)}
            </Text>
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Transações')}
        >
          <Icon name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Adicionar Transação</Text>
        </TouchableOpacity>
      </View>
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
  balanceContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 18,
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
  },
  transactionText: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  income: {
    color: '#4caf50',
  },
  expense: {
    color: '#f44336',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#53a4ec',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default Dashboard;
