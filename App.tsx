//web 191472677230-1hskk7f3cr1dm2c1taqjt5fvl0gbe4vj.apps.googleusercontent.com
// android...
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Login';
import { NativeBaseProvider, StatusBar } from 'native-base'
import { TEMAS } from './src/styles/temas'
import Rotas from './src/Rotas';


export default function App() {
  return (
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.black}/>
      <Rotas/>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
