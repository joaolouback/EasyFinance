import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation, setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    AsyncStorage.clear(); 
  }, []);

  const handleLogin = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(savedUser);

      if (parsedUser && parsedUser.email === email && parsedUser.password === password) {
            setMessage('Sucesso na autenticação. Redirecionando...');
        setTimeout(() => {
          setIsAuthenticated(true);
        }, 1000);
      } else {
        setMessage('E-mail ou senha inválida');
      }
    } catch (error) {
      setMessage('Erro ao tentar autenticar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require('../images/carteira.png')} style={styles.logo} />
        <Text style={styles.title}>Easy Finance</Text>
        <Text style={styles.subtitle}>Finance App</Text>
      </View>

      <View style={styles.loginBoxContainer}>
        <View style={styles.loginBox}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#00974d' : '#00974d',
                borderColor: '#53a4ec',
              },
              styles.button,
            ]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={handleLogin}
          >
            <Text style={[styles.buttonText, { color: isPressed ? '#fff' : '#fff' }]}>
              Login
            </Text>
          </Pressable>

          <Pressable style={styles.navigationContainer} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}> Não tem uma conta? </Text>
            <Text style={styles.linkTextBold}>Crie uma conta</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View>{message !== '' && <Text style={styles.message}>{message}</Text>}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  topSection: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f9',
  },
  bottomSection: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00974d',
    borderRadius: 10,
  },
  loginBoxContainer: {
    position: 'absolute',
    top: '45%',
    left: '10%',
    right: '10%',
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3685cd',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#3685cd',
    marginBottom: 50,
  },
  loginBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 150,
  },
  input: {
    height: 50,
    borderColor: '#53a4ec',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f4f4f9',
    width: '100%',
  },
  button: {
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#000',
  },
  linkTextBold: {
    fontSize: 16,
    color: '#53a4ec',
    fontWeight: 'bold',
  },
  message: {
    marginTop: 100,
    fontSize: 16,
    color: '#ea0000',
  },
});
