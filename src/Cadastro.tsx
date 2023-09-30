import { VStack, Image, Text, Box, FormControl, Input, Button, Link, Checkbox, ScrollView } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import Logo from './assets/logo.png'
import Logo2 from './assets/logo2.png'
import Logo3 from './assets/logo3.png'
import { Titulo } from './Components/Titulo'
import { EntradaTexto } from './Components/EntradaTexto'
import { useAppState } from 'native-base/lib/typescript/core/color-mode/hooks'
import { secoes } from './utils/CadastroEntradaTexto'
import { useNavigation } from '@react-navigation/native'


export default function Cadastro() {


  const [numSecao, setNumSecao] = useState(0)
  
  // const [lista, setLista] = useState([]);
  // const navigation = useNavigation();

  // useEffect(() => {
  //   // criar funcao getLista()
  //   // chamar getLista()

  //   const getLista = () => {
  //     try {
  //       fetch('https://artcher.azurewebsites.net/swagger/index.html')
  //        .then(response => response.json())
  //        .then(resultado => {
  //          setLista(resultado)
  //          console.log(resultado)
  //        })

  //     } catch (error) {
  //       console.log('error: ', error)
  //     }
  //   }

  //   getLista()
    
  // }, [])

  // const navegar = () => {
  //   navigation.navigate('Login');
  // };


  function avancarSecao(){
    if ( numSecao < secoes.length - 1 ){
      setNumSecao(numSecao+1)
    }
  }

  function voltarSecao() {
    if ( numSecao > 0  ){
      setNumSecao(numSecao - 1)
    }
  }


  return (
    <ScrollView flex={1} padding={5}>
      <Image source={Logo} alignSelf='center'/>

      <Titulo>
        {secoes[numSecao].titulo}
      </Titulo>

      <Box>
        {
          secoes[numSecao]?.entradaTexto.map(entrada => {
            return <EntradaTexto label={entrada.label} placeholder={entrada.placeholder} key={entrada.id}/>
          })
        }

       {/* <EntradaTexto label=' Create User' placeholder='Your User'/>

       <EntradaTexto label='Create Password' placeholder='Your Password'/> */}
      </Box>
      <Box>
        <Text fontWeight='bold' color='blue.800' fontSize='md' marginTop={5} mb={4}>
          Selecione os tipos de Food que mais gosta:
        </Text>
        {
          secoes[numSecao]?.checkbox.map(checkbox => {
            return <Checkbox key={checkbox.id} 
            value={checkbox.value} >
              {checkbox.value}
            </Checkbox> 

          })
        }
      </Box>
      {numSecao > 0 && <Button width='30%' backgroundColor='gray.300' marginTop={10}
       borderRadius={21} onPress={() => voltarSecao()}>Voltar</Button>}
      <Button width='30%' backgroundColor='blue.500' 
      marginTop={15} borderRadius={21} onPress={() => avancarSecao()}>Avançar</Button>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });