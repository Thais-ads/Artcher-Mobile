import React from 'react';
import { VStack, Text, ScrollView } from 'native-base';
import { Restaurantes } from '../Components/Restaurantes';

export default function Consultas() {
  // Defina um array de objetos representando os restaurantes
  const restaurantes = [
    {
      nome: 'Restaurante 1',
      descricao: 'Descrição do Restaurante 1',
      avatar: 'https://images.pexels.com/photos/3752066/pexels-photo-3752066.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
      nome: 'Restaurante 2',
      descricao: 'Descrição do Restaurante 2',
      avatar: 'https://images.pexels.com/photos/3752066/pexels-photo-3752066.jpeg?auto=compress&cs=tinysrgb&w=1600', // URL do avatar do Restaurante 2
    },
    {
      nome: 'Restaurante 3',
      descricao: 'Descrição do Restaurante 3',
      avatar: 'https://exemplo.com/imagem3.jpg', // URL do avatar do Restaurante 3
    },
    // Adicione mais restaurantes conforme necessário
  ];

  return (
    <ScrollView p={5}>
      {restaurantes.map((restaurante, index) => (
        <Restaurantes
          key={index}
          nome={restaurante.nome}
          descricao={restaurante.descricao}
          avatar={restaurante.avatar}
        />
      ))}
    </ScrollView>
  );
}
