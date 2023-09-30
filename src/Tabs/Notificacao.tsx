import { VStack, Text, ScrollView, Box } from "native-base";

export default function Notificacoes() {
  const promocoes = [
    {
      restaurante: "Consulado Mineiro",
      descricao: "Promoção: 50% de desconto em pratos principais hoje!",
    },
    {
      restaurante: "Consulado Mineiro",
      descricao: "Oferta especial: Ganhe uma sobremesa grátis com seu pedido.",
    },
    {
      restaurante: "Consulado Mineiro",
      descricao: "Happy Hour: Bebidas com desconto das 17h às 19h.",
    },
    // Adicione mais promoções conforme necessário
  ];

  return (
    <ScrollView p={5}>
      {promocoes.map((promocao, index) => (
        <Box
          key={index}
          borderWidth={1}
          borderRadius={5}
          borderColor="gray.200"
          p={3}
          my={2}
        >
          <Text fontSize="lg" fontWeight="bold">
            {promocao.restaurante}
          </Text>
          <Text fontSize="md" mt={2}>
            {promocao.descricao}
          </Text>
        </Box>
      ))}
    </ScrollView>
  );
}
