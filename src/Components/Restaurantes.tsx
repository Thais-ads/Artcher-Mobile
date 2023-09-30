import { Text, Avatar, VStack, Button, Row, Divider } from 'native-base'
import Consulado from  '../assets/consulado2.jpg'


interface RestaurantesProps {
    nome: String;
    avatar: String;
    descricao: String
}

export function Restaurantes({

    nome,
    avatar,
    descricao

}: RestaurantesProps ) {
    return(
        <VStack width='100%' bg="white" p={5} borderRadius={37} shadow={2}>
            <VStack flexDir='row'>
                <Avatar size='lg' source={Consulado} marginTop={5}/>

                <VStack paddingLeft={4}> 
                    <Text fontSize='md' bold>{nome}</Text>
                    <Text>Alameda Santos, 31</Text>
                    <Text>{descricao}</Text>
                </VStack>

            </VStack>
            <Button mt={4} borderRadius={27}>Ver Local</Button>

        </VStack>
        
    )
}