import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './assets/logo.jpeg';
import { Titulo } from './Components/Titulo';
WebBrowser.maybeCompleteAuthSession();
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const handleLogin = async () => {
    if (!email || !senha) {
      console.error('Preencha todos os campos de login.');
      return;
    }
    const userData = {
      emailUser: email,
      senha: senha,
    };
    try {
      const response = await axios.post(
        'https://artcher.azurewebsites.net/CadastroUsuario/LoginUsuario',
        userData
      );
      if (response.status === 200) {
        setEmail('');
        setSenha('');
        onLogin(); // Chama a função onLogin para navegar para a próxima tela
      } else {
        console.error('Erro de login: Credenciais inválidas.');
      }
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao enviar solicitação para o servidor:', error);
    }
  };
  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        onChangeText={(text) => setSenha(text)}
        value={senha}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
export default function Login({ navigation }) {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '',
    iosClientId: '',
    webClientId: '191472677230-1hskk7f3cr1dm2c1taqjt5fvl0gbe4vj.apps.googleusercontent.com',
  });
  useEffect(() => {
    handleEffect();
  }, [response, token]);
  async function handleEffect() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === 'success') {
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
    }
  }
  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem('@user');
    if (!data) return null;
    return JSON.parse(data);
  };
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
      // Após o login bem-sucedido, navegue para a tela principal do aplicativo
      navigation.navigate('Tabs');
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
    }
  };
  const handleLoginSuccess = () => {
    navigation.navigate('Tabs');
  };
  const handleLogout = async () => {
    // Remova as informações de usuário armazenadas localmente
    await AsyncStorage.removeItem('@user');
    // Defina userInfo como null para indicar que não há usuário logado
    setUserInfo(null);
  };
  return (
    
    <ScrollView style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <View style={styles.topSection}>
   
        <Titulo>Welcome</Titulo>
      </View>
      <View style={styles.bottomSection}>
        {!userInfo ? (
          <>
            <LoginForm onLogin={handleLoginSuccess} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                disabled={!request}
                onPress={() => {
                  promptAsync();
                }}
              >
                <Text style={styles.buttonText}>Sign with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signupButton} // Estilo do botão "Sign Up"
                onPress={() => navigation.navigate('Cadastro')}
              >
                <Text style={styles.signupText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.card}>
            {userInfo?.picture && (
              <Image source={{ uri: userInfo?.picture }} style={styles.image} />
            )}
            <Text style={styles.text}>Email: {userInfo.email}</Text>
            <Text style={styles.text}>
              Verified: {userInfo.verified_email ? 'yes' : 'no'}
            </Text>
            <Text style={styles.text}>Name: {userInfo.name}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20, // Adicione espaço entre a imagem e a mensagem "Welcome"
  },
  bottomSection: {
    paddingHorizontal: 20, // Adicione espaçamento horizontal para o formulário e botões
  },
  logo: {
    width: 380, // Ajuste o tamanho da imagem conforme necessário
    height: 160, // Ajuste o tamanho da imagem conforme necessário
    marginBottom: 3,
    borderRadius: 21, // Adicione margem abaixo do logo
  },
  formContainer: {
    width: '60%',
    alignSelf: 'center', // Adiciona alinhamento central ao container
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 21,
    alignSelf: 'center', // Adiciona alinhamento central aos campos de entrada
  },
  buttonContainer: {
    flexDirection: 'row', // Alinha os botões horizontalmente
    justifyContent: 'center', // Centraliza horizontalmente os botões
    marginTop: 5, // Espaçamento superior para separar dos campos de entrada
  },
  button: {
    backgroundColor: '#AEC6CF', // Cor de fundo do botão "Sign In"
    paddingVertical: 8, // Diminuí a altura do botão
    paddingHorizontal: 16, // Diminuí a largura do botão
    borderRadius: 21,
    alignItems: 'center',
    width: 100, // Largura do botão
    height: 35, // Altura do botão
    justifyContent: 'center',
    marginHorizontal: 11, // Espaçamento horizontal entre os botões
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#AEC6CF', // Cor de fundo do botão "Sign Up"
    borderRadius: 21,
    alignItems: 'center',
    marginTop: 10, // Espaçamento superior para separar do botão "Sign In"
    width: 100, // Largura do botão
    height: 35, // Altura do botão
    justifyContent: 'center', // Centralizar o conteúdo verticalmente
  },
  googleButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#AEC6CF', // Cor de fundo do botão "Sign Up"
    borderRadius: 21,
    alignItems: 'center',
    marginTop: 1, // Espaçamento superior para separar do botão "Sign In"
    width: 100, // Largura do botão
    height: 35, // Altura do botão
    justifyContent: 'center',
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});