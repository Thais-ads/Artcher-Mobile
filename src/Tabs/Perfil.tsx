import { VStack, Text, ScrollView, Avatar, Divider, Button } from "native-base"
import { Titulo } from "../Components/Titulo"
import { useNavigation } from "@react-navigation/native"; // Importe useNavigation

export default function Perfil() {
    const navigation = useNavigation(); // Obtenha a função de navegação

    const handleLogout = () => {
        // Implemente a lógica de logout aqui, por exemplo, limpar os dados de autenticação
        // e navegar de volta para a tela de login
        // ...

        // Navegue de volta para a tela de login
        navigation.navigate('Login');
    }

    return (
       <ScrollView flex={1}>
        <VStack flex={1} alignItems='center' padding={5}>
            <Titulo color='blue.500' >Meu Perfil</Titulo>

            <Avatar size='xl' source={{ uri:'https://avatars.githubusercontent.com/u/101108268?v=4' }} marginTop={5}/>

            <Titulo color='blue.500'>
                Meus Dados
            </Titulo>

            <Titulo fontSize='lg' marginBottom={1}>
                Nathalia Lopes
            </Titulo>

            <Text>
                @llopes.nath
            </Text>

            <Text>
                iOS - Fiap
            </Text>

            <Divider marginTop={5}/>

            <Text color='blue.500' >
                Feed
            </Text>

            <Button onPress={handleLogout} marginTop={5}>
                Logout
            </Button>
        </VStack>
       </ScrollView>
    )
}
