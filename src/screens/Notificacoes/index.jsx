import { useEffect, useState } from "react";
import { 
    SafeAreaView, 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList,
    Modal, 
    TextInput 
} from "react-native";

import Header from "../../components/Header";
import Icon from 'react-native-vector-icons/Ionicons';

import notifee, { AndroidImportance } from '@notifee/react-native';

export default function Notificacoes() {

    const [notificacoes, setNotificacoes] = useState([
        {
            id: 1,
            refeicao: 'café da manhã',
            horas: '08:00'
        },
        {
            id: 2,
            refeicao: 'lanche da manhã',
            horas: '10:00'
        },
        {
            id: 3,
            refeicao: 'almoço',
            horas: '12:00'
        },
        {
            id: 4,
            refeicao: 'lanche da tarde',
            horas: '16:00'
        },
        {
            id: 5,
            refeicao: 'jantar',
            horas: '19:00'
        }
    ]);

    const [idItem, setIdItem] = useState('');
    const [horasSelecionadas, setHorasSelecionadas] = useState('');
    const [isModalAberto, setIsModalAberto] = useState(false);

    useEffect(() => {
        // Criar um canal de notificação no Android (necessário para Android 8.0+)
        async function createNotificationChannel() {
            await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
                importance: AndroidImportance.HIGH,
            });
        }

        createNotificationChannel();
    }, []);

    // Função para agendar notificações
    async function agendarNotificacao(id, title, message, date) {
        // Solicitar permissão para mostrar notificações
        await notifee.requestPermission();

        // Agendar notificação
        await notifee.createTriggerNotification(
            {
                title: title,
                body: message,
                android: {
                    channelId: 'default',
                },
            },
            {
                type: 'timestamp',
                timestamp: date.getTime(), // Passa o tempo da notificação
            }
        );
    }

    // Função para abrir o modal e permitir editar a hora
    function abrirModal(id, horas) {
        setIsModalAberto(true);
        setIdItem(id);
        setHorasSelecionadas(horas);
    }

    // Salvar a alteração da hora
    function salvarAlteracaoHora() {
        const novasNotificacoes = notificacoes.map(item => {
            if (item.id === idItem) {
                return { ...item, horas: horasSelecionadas };
            }
            return item;
        });
        setNotificacoes(novasNotificacoes);
        setIsModalAberto(false);
    }

    // Agendar notificações para cada refeição
    useEffect(() => {
        notificacoes.forEach((item) => {
            const horarioRefeicao = new Date();
            const [hours, minutes] = item.horas.split(':');
            horarioRefeicao.setHours(hours);
            horarioRefeicao.setMinutes(minutes);

            agendarNotificacao(
                item.id,
                `Lembrete: ${item.refeicao}`,
                `Está na hora da sua ${item.refeicao}`,
                horarioRefeicao
            );
        });
    }, [notificacoes]);

    return (
        <SafeAreaView>
            <Header />
            <Text style={styles.textNotificacoes}>Notificações</Text>

            <FlatList
                data={notificacoes}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.btnNotificacao}
                        onPress={() => abrirModal(item.id, item.horas)}
                    >
                        <View style={styles.notificacao}>
                            <Text style={styles.textNotificacao}>{item.refeicao}</Text>
                            <Text style={styles.textNotificacao}> - </Text>
                            <Text style={styles.textNotificacao}>{item.horas}</Text>
                        </View>
                        <Icon
                            name='arrow-forward-outline'
                            size={25}
                            color='#000'
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                )}
            />

            {isModalAberto &&
                <Modal
                    animationType="slide"
                    transparent
                    visible={isModalAberto}
                    onRequestClose={() => setIsModalAberto(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.headerModalContent}>
                                <TouchableOpacity onPress={() => setIsModalAberto(false)}>
                                    <Icon
                                        name='close-outline'
                                        size={30}
                                        color='#000'
                                    />
                                </TouchableOpacity>

                                <Text>Alterar Horário</Text>
                                <View />
                            </View>

                            <View>
                                <Text>Editar horário para: {notificacoes.find(item => item.id === idItem)?.refeicao}</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={horasSelecionadas}
                                    onChangeText={setHorasSelecionadas}
                                />
                                <TouchableOpacity
                                    style={styles.btnSalvar}
                                    onPress={salvarAlteracaoHora}
                                >
                                    <Text style={styles.btnText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            }

            <View style={styles.bg} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textNotificacoes: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20
    },
    btnNotificacao: {
        width: 320,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#24FF00',
        marginVertical: 10,
        marginHorizontal: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderRadius: 20,
        elevation: 5
    },
    notificacao: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    textNotificacao: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#000'
    },
    icon: {
        backgroundColor: '#fff',
        borderRadius: 50
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        width: '80%',
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20
    },
    headerModalContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    input: {
        borderBottomWidth: 1,
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center'
    },
    btnSalvar: {
        backgroundColor: '#24FF00',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center'
    },
    btnText: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold'
    },
    bg: {
        marginTop: 40,
        width: '100%',
        height: 190,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: '#A5FF96'
    }
});
