import { 
    SafeAreaView, 
    Text, 
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from "react-native"

import Header from "../../components/Header"

import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Notificacoes(){

    const notificacoes = [
        {
            id:1,
            refeicao:'cafe da manha',
            horas:'07:00'
        },
        {
            id:2,
            refeicao:'lanche da manha',
            horas:'09:00'
        },
        {
            id:3,
            refeicao:'almoco',
            horas:'12:00'
        },
        {
            id:4,
            refeicao:'lanche da tarde',
            horas:'15:00'
        },
        {
            id:5,
            refeicao:'jantar',
            horas:'18:00'
        },
    ]

    return(
        <SafeAreaView>
            <Header/>

            <Text style={styles.textNotificacoes}>
                Notificações
            </Text>

            <FlatList
                data={notificacoes}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.btnNotificacao}>
                        <View style={styles.notificacao}>
                            <Text style={styles.textNotificacao}>{item.refeicao}</Text>
                            <Text style={styles.textNotificacao}> - </Text>
                            <Text style={styles.textNotificacao}>{item.horas}</Text>
                        </View>
                        <Ionicons
                            name='arrow-forward-outline'
                            size={25}
                            color='#000'
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                )}
            />

            <View style={styles.bg}/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textNotificacoes:{
        textAlign:'center',
        fontSize:50,
        fontWeight:'bold',
        color:'#000',
        marginTop:20
    },
    viewNotificacoes:{
        alignItems:'center',
        marginVertical:20
    },
    btnNotificacao:{
        width:320,
        height:50,
        alignItems:'center',
        backgroundColor:'#24FF00',
        marginVertical:10,
        marginHorizontal:'auto',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:15,
        borderRadius:20,
        elevation:5
    },
    notificacao:{
        alignItems:'center',
        flexDirection:'row'
    },
    textNotificacao:{
        fontWeight:'bold',
        textTransform:'capitalize',
        color:'#000'
    },
    icon:{
        backgroundColor:'#fff',
        borderRadius:50
    },
    bg:{
        marginTop:40,
        width:'100%',
        height:190,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        backgroundColor:'#A5FF96'
    }
})