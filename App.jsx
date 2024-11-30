import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import CustomDrawer from './src/components/CustomDrawer';

import AddAlimento from './src/screens/AdicionarAlimento';
import RefeicaoAgora from './src/screens/InicioRefeicaoAgora';
import RefeicoesHoje from './src/screens/RefeicoesHoje';
import Notificacoes from './src/screens/Notificacoes';

import Ionicons from 'react-native-vector-icons/Ionicons'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: '#36F76D',
            drawerActiveTintColor: '#002F0B',
            drawerInactiveBackgroundColor: '#fff',
            drawerInactiveTintColor: '#000'
          }}
        >
          <Drawer.Screen
            name="Inicio"
            component={RefeicaoAgora}
            options={{drawerIcon:({color,size}) => (
              <Ionicons
                name='home-outline'
                color={color}
                size={size}
              />
            )}}
          />
          <Drawer.Screen
            name="AdicionarAlimento"
            component={AddAlimento}
            options={{drawerIcon:({color,size}) => (
              <Ionicons
                name='add-outline'
                color={color}
                size={size}
              />
            )}}
          />
          <Drawer.Screen
            name="RefeicoesHoje"
            component={RefeicoesHoje}
            options={{drawerIcon:({color,size}) => (
              <Ionicons
                name='restaurant-outline'
                color={color}
                size={size}
              />
            )}}
          />
          <Drawer.Screen
            name="Notificacoes"
            component={Notificacoes}
            options={{drawerIcon:({color,size}) => (
              <Ionicons
                name='notifications-outline'
                color={color}
                size={size}
              />
            )}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
