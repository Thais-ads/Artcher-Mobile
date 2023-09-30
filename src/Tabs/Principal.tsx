import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  Image,
  Text,
  IconButton,
  Divider,
  Spacer,
  Icon,
  ScrollView,
  Input,
  Button,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function Principal() {
  const [imageUrl, setImageUrl] = useState('https://images.pexels.com/photos/3927899/pexels-photo-3927899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

  //Iniciado parte de posts para cada usuário
  const TimeLine = () => {
    const posts = [
      { id: 1, user: 'llopes.nath', image: '' }
    ]
  }

  return (
    <VStack flex={1}>
      {/* Cabeçalho */}
      <HStack
        p={4}
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="gray.200"
        mt = {2}
      >
       
        <Spacer />
        
    
      </HStack>

      {/* Imagem obtida da URL */}
      

      {/* Lista de Publicações dentro de ScrollView */}
      <ScrollView flex={1}>
        {[
          {
            username: 'Restaurante do Jorge',
          
            likes: Math.floor(Math.random() * 20),
            comments: [
              { username: 'userA', text: 'Comentário 1' },
              { username: 'userB', text: 'Comentário 2' },
            ],
          },
          {
            username: 'boteco da Coxinha',
            caption: 'Legenda da publicação 2.',
            likes: Math.floor(Math.random() * 20),
            comments: [
              { username: 'userC', text: 'Comentário 3' },
              { username: 'userD', text: 'Comentário 4' },
            ],
          },
    
        ].map((post, index) => (
          <PostItem
            key={index}
            username={post.username}
            imageUri={imageUrl}
            caption={post.caption}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </ScrollView>
    </VStack>
  );
}

// Componente para um único item de postagem
function PostItem({ username, imageUri, caption, likes, comments }) {
  return (
    <Box p={4}>
      {/* Cabeçalho da postagem */}
      <HStack alignItems="center" space={2}>
        <Image
          source={{ uri: imageUri }}
          alt="Imagem de perfil"
          size={35}
          rounded="full"
          mt={2}
      />
        <Text fontSize="md" fontWeight="bold">
          {username}
        </Text>
      </HStack>

      {/* Imagem da postagem */}
    

<Image
  source={{ uri: imageUri }}
  alt="Imagem da postagem"
  size={400}
  mx="auto" 
  p={3}
  mt={5} 
  rounded="md"
/>



      {/* Legenda da postagem */}
      <Text fontSize="md" mt={2}>
        {caption}
      </Text>

      {/* Seção de curtidas */}
      <HStack alignItems="center" mt={2} space={2}>
        <IconButton
          icon={<Icon as={<Ionicons name="heart-outline" />} size={6} />}
          colorScheme="red"
        />
        <Text fontSize="md">{likes} curtidas</Text>
      </HStack>

      {/* Seção de comentários */}
      <Box mt={2}>
        {comments.map((comment, index) => (
          <Text key={index} fontWeight="bold">
            {comment.username}: {comment.text}
          </Text>
        ))}
      </Box>

      {/* Formulário de comentário */}
      <Input
        mt={2}
        placeholder="Adicione um comentário..."
        variant="unstyled"
      />
    </Box>
  );
}
