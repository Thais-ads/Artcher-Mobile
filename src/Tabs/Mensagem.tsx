import React, { useState } from "react";
import { VStack, Text, Input, Button, ScrollView, HStack } from "native-base";
import axios from "axios";

const MessageBubble = ({ message, isUser }) => {
  const bubbleStyle = {
    padding: 10,
    borderRadius: 20,
    maxWidth: "70%",
    backgroundColor: isUser ? "#007AFF" : "#E5E5EA",
    alignSelf: isUser ? "flex-end" : "flex-start",
    marginBottom: 10,
  };

  const textStyle = {
    color: isUser ? "white" : "black",
  };

  return (
    <HStack justifyContent={isUser ? "flex-end" : "flex-start"}>
      <VStack style={bubbleStyle}>
        <Text style={textStyle}>{message}</Text>
      </VStack>
    </HStack>
  );
};

export default function Mensagem() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        // Faça uma solicitação HTTP para o servidor Flask
        const response = await axios.post(
          "http://127.0.0.1:5000/chat",
          { user_input: newMessage }
        );
        // Obtenha a resposta do assistente do servidor Flask
        
        const responseMessage = response.data;
        console.log(responseMessage)
        // Atualize o estado 'messages' com a resposta do assistente
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: newMessage, isUser: true },
          { text: responseMessage, isUser: false },
        ]);
  
        // Limpe a entrada de mensagem após o envio
        setNewMessage("");
        
      } catch (error) {
        console.error("Erro ao enviar mensagem para o servidor:", error);
      }
    }
  };

  return (
    <VStack flex={1} p={4}>
      <Text fontSize="xl" mb={4}>
        Artcher
      </Text>
      <ScrollView flex={1}>
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
      </ScrollView>
      <Input
        placeholder="Digite sua pergunta..."
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
        mb={2}
        onSubmitEditing={sendMessage}
      />
      <Button onPress={sendMessage} mb={2}>
        Enviar
      </Button>
    </VStack>
  );
}