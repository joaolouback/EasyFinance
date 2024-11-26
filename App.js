import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from 'react-native';

import { ThemeProvider, useTheme } from './screens/ThemeContext';
import { TransactionsProvider } from './screens/TransactionsContext';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import Transactions from './screens/Transactions';
import Budget from './screens/Budget';
import Reports from './screens/Reports';
import Settings from './screens/Settings'; 

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

const TabNavigator = () => {
  const { isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'home-outline';
              break;
            case 'Transações':
              iconName = 'list-outline';
              break;
            case 'Orçamento':
              iconName = 'wallet-outline';
              break;
            case 'Relatórios':
              iconName = 'bar-chart-outline';
              break;
            case 'Configurações':
              iconName = 'settings-outline';
              break;
            default:
              iconName = 'home-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: isDarkMode ? '#ff6347' : '#bf5321',
        tabBarInactiveTintColor: isDarkMode ? '#aaa' : 'gray',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#333' : '#fff',
          paddingBottom: 10,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Transações" component={Transactions} />
      <Tab.Screen name="Orçamento" component={Budget} />
      <Tab.Screen name="Relatórios" component={Reports} />
      <Tab.Screen name="Configurações" component={Settings} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const scheme = useColorScheme();

  return (
    <ThemeProvider>
      <TransactionsProvider>
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          {isAuthenticated ? (
            <MainStack.Navigator screenOptions={{ headerShown: false }}>
              <MainStack.Screen name="Main" component={TabNavigator} />
            </MainStack.Navigator>
          ) : (
            <AuthStack.Navigator initialRouteName="Login">
              <AuthStack.Screen name="Login">
                {(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
              </AuthStack.Screen>
              <AuthStack.Screen name="Register" component={Register} />
            </AuthStack.Navigator>
          )}
        </NavigationContainer>
      </TransactionsProvider>
    </ThemeProvider>
  );
};

export default App;
