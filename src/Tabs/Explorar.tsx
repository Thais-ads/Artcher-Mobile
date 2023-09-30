import React from 'react';
import { VStack, Text, Box, Image, HStack, Icon, IconButton, ScrollView } from 'native-base';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o pacote @expo/vector-icons instalado

export default function Explorar() {
  // Suponha que você tenha uma lista de lugares próximos
  const lugaresProximos = [
    {
      nome: 'Consulado Mineiro',
      tipo: 'Restaurante',
      distancia: '500m',
      imagem: 'https://via.placeholder.com/150',
    },
    {
      nome: 'Cafeteria Sonia',
      tipo: 'Cafeteria',
      distancia: '700m',
      imagem: 'https://via.placeholder.com/150',
    },
    {
      nome: 'Parque ',
      tipo: 'Parque',
      distancia: '1km',
      imagem: 'https://via.placeholder.com/150',
    },
    // Adicione mais lugares próximos conforme necessário
  ];

  return (
    <ScrollView flex={1} p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Lugares Próximos
      </Text>
      {lugaresProximos.map((lugar, index) => (
        <Box
          key={index}
          bg="white"
          shadow={2}
          rounded="lg"
          overflow="hidden"
          mb={4}
        >
          <Image
            source={{ uri: lugar.imagem }}
            alt={`Imagem de ${lugar.nome}`}
            size="xl"
            resizeMode="cover"
            height={150}
          />
          <Box p={3}>
            <Text fontSize="xl" fontWeight="bold">
              {lugar.nome}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {lugar.tipo}
            </Text>
            <HStack alignItems="center" mt={2} space={2}>
              <Icon
                as={<Ionicons name="navigate-outline" />}
                size={5}
                color="gray.500"
              />
              <Text fontSize="sm" color="gray.500">
                {lugar.distancia}
              </Text>
            </HStack>
            <IconButton
              icon={<Icon as={<Ionicons name="heart-outline" />} size={6} />}
              colorScheme="red"
              mt={3}
            />
          </Box>
        </Box>
      ))}
    </ScrollView>
  );
}
