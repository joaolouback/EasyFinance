import React, { createContext, useState, useContext } from 'react';

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction, 
      amount: parseFloat(transaction.amount), 
      id: Math.random().toString(),
    };

    
    if (newTransaction.type === 'income') {
      setBalance((prevBalance) => prevBalance + newTransaction.amount);
    } else if (newTransaction.type === 'expense') {
      setBalance((prevBalance) => prevBalance - newTransaction.amount);
    }

    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, balance, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};


export const useTransactions = () => useContext(TransactionsContext);
