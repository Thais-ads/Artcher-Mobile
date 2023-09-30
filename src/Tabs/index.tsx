import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Principal from "./Principal"
import Consultas from "./Consultas"
import Explorar from "./Explorar"
import Notificacoes from "./Notificacao"
import Mensagem from "./Mensagem"
import Perfil from "./Perfil"
 

const Tab = createBottomTabNavigator()

const screenOptions = {
    tabBarStyle: {
        backgroundColor: '#ACB9B9'
    },
    tabBarActiveTintColor: '#232D46',
    tabBarInactiveTintColor: '#FFFF'
}

const tabs = [
    {
        name: 'Principal',
        compoment: Principal,
        icon: 'home'
    },
    {
        name: 'Explorar',
        compoment: Explorar,
        icon: 'search'
    },
    {
        name: 'Consultas',
        compoment: Consultas,
        icon: 'book'
    },
    {
        name: 'Mensagem',
        compoment: Mensagem,
        icon: 'mail-unread-outline'
    },
    {
        name: 'Notificação',
        compoment: Notificacoes,
        icon: 'notifications-outline'
    },
    {
        name: 'Perfil',
        compoment: Perfil,
        icon: 'person-outline'
    },
]

export default function Tabs(){
    return(
        <Tab.Navigator screenOptions={screenOptions}>
            { tabs.map((tab) => (
                <Tab.Screen 
                key={tab.name}
                name={tab.name}
                component={tab.compoment}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name={tab.icon} color={color} size={size}/>
                    )
                }}
            />
            )) 
            }    
        </Tab.Navigator>
    )
}