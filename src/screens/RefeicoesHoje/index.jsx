import { useState, useEffect } from "react"

import { 
    SafeAreaView, 
    Text, 
    View, 
    StyleSheet,
    FlatList,
    Dimensions,
    ScrollView
} from "react-native"

import api from "../../api/api"

const { width, height } = Dimensions.get('window')

import Header from "../../components/Header"
import Loading from "../../components/Loading"

import Icon from 'react-native-vector-icons/MaterialIcons'

export default function RefeicoesHoje(){

    const [refeicoesHoje,setRefeicoesHoje] = useState([])

    useEffect(() => {
        async function lerRefeicoesHoje(){
            const response = await api.get('/refeicoes/hoje')
            const data = response.data

            setRefeicoesHoje(data)
        }

        lerRefeicoesHoje()
    },[])

    const dia = refeicoesHoje.map(refeicao => refeicao.dia)[0];

    if(refeicoesHoje.length == 0){
        return <Loading/>
    }

    return(
        <SafeAreaView style={styles.telaPrincipal}>
            <Header/>

            <View style={styles.viewRefeicoesHoje}>
                <Text style={styles.diaHoje}>
                    {dia}
                </Text>
                <Text style={styles.refeicoesTitle}>
                    Refeições
                </Text>
            </View>
            
            <View style={styles.viewScrollViewRefeicoes}>
    <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        showsVerticalScrollIndicator={false}>
        <FlatList
            data={refeicoesHoje}
            keyExtractor={item => item._id}
            renderItem={({item: refeicao}) => (
                <View style={styles.viewRefeicoes}>
                    <Text style={styles.textRefeicao}>
                        {refeicao.refeicao}
                    </Text>
                    <FlatList
                        data={refeicao.alimentos}
                        keyExtractor={item => item._id}
                        renderItem={({item: alimento}) => (
                            <View style={styles.viewAlimento}>
                                <Icon
                                    name="egg"
                                    size={20}
                                    color="#000"
                                />
                                <Text style={styles.textAlimento}>
                                    {alimento.alimento}
                                </Text>
                            </View>
                        )}
                        nestedScrollEnabled={true}
                    />
                </View>
            )}
            showsVerticalScrollIndicator={false}
        />
    </ScrollView>
</View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    telaPrincipal:{
        width:width,
        height:height
    },
    viewRefeicoesHoje:{
        alignItems:'center',
        position:'relative',
        top:25,
        zIndex:5
    },
    diaHoje:{
        fontSize:20,
        color:'#272727',
        textTransform:'capitalize'
    },
    refeicoesTitle:{
        fontWeight:'bold',
        fontSize:50,
        color:'#000'
    },
    viewScrollViewRefeicoes:{
        width:width,
        height:height,
        backgroundColor:'#48FF2B',
        alignItems:'center',
        paddingVertical:30,
        paddingHorizontal:10,
        borderTopLeftRadius:40,
        borderTopRightRadius:40
    },
    viewRefeicoes:{
        width:250,
        backgroundColor:'#fff',
        padding:10,
        borderRadius:15,
        marginBottom:10,
    },
    viewLista:{
        marginVertical:15
    },  
    textRefeicao:{
        fontSize:12,
        color:'#000',
        textTransform:'capitalize',
        textAlign:'center'
    },
    viewAlimento:{
        backgroundColor:'#F4F0F0',
        flexDirection:'row',
        alignItems:'center',
        marginVertical:5,
        padding:5,
        borderRadius:20
    },
    textAlimento:{
        fontSize:15,
        textTransform:'capitalize',
        marginLeft:5
    },
    viewScrollViewRefeicoes: {
        width:width,
        height:height,
        flex: 1,
        backgroundColor: '#48FF2B',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 10,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: 'hidden',
    },
})