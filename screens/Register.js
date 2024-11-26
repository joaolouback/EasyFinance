import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Pressable, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  const handleRegister = async () => {
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const user = { name, email, password };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setMessage('Usuário cadastrado com sucesso');
        navigation.navigate('Login');
      } else {
        setMessage("As senhas não coincidem");
      }
    } else {
      setMessage('Por favor preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Criar uma conta</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={name}
          onChangeText={setName}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Repita a senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#00974d' : '#00974d',
              borderColor: '#53a4ec',
            },
            styles.button
          ]}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={handleRegister}
        >
          <Text style={[styles.buttonText, { color: isPressed ? '#fff' : '#fff' }]}>
            Criar uma conta
          </Text>
        </Pressable>

        <Pressable style={styles.navigationContainer} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Já tem uma conta? </Text>
          <Text style={styles.linkTextBold}>Entrar</Text>
        </Pressable>

        <View>
          {message !== "" && (<Text style={styles.message}>{message}</Text>)}
        </View>
      </View>
    </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  header: {
    height: height * 0.3, 
    backgroundColor: '#00974d',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30, 
  },
  headerText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#53a4ec',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
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
  },
  linkTextBold: {
    fontSize: 16,
    color: '#53a4ec',
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: '#ea0000',
  },
});
