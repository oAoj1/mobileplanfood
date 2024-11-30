import { useState, useEffect } from "react"

import { 
    SafeAreaView, 
    Text, 
    View, 
    StyleSheet,
    ScrollView,
    FlatList,
    Dimensions
} from "react-native"

import api from "../../api/api"

const { width, height } = Dimensions.get('window')

import Header from "../../components/Header"
import Loading from "../../components/Loading"

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

    if(refeicoesHoje.length == 0){
        return <Loading/>
    }

    return(
        <SafeAreaView style={styles.telaPrincipal}>
            <Header/>

            <View style={styles.viewRefeicoesHoje}>
                <Text style={styles.diaHoje}>
                    Hoje - Segunda
                </Text>
                <Text style={styles.refeicoesTitle}>
                    Refeições
                </Text>
            </View>
            
           <View style={styles.viewScrollViewRefeicoes}>
                <View style={styles.viewRefeicoes}>
                    <FlatList
                        data={refeicoesHoje}
                        keyExtractor={item => item._id}
                        renderItem={({item:refeicao}) => (
                            <View style={{marginVertical:5}}>
                                <Text style={styles.textRefeicao}>
                                    {refeicao.refeicao}
                                </Text>
                                <FlatList
                                    data={refeicao.alimentos}
                                    keyExtractor={item => item._id}
                                    renderItem={({item:alimento}) => (
                                        <Text style={styles.alimento}>
                                            {alimento.alimento}
                                        </Text>
                                    )}
                                    horizontal
                                    showsHorizontalScrollIndicator
                                />
                            </View>
                        )}
                    />
                </View>
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
        color:'#272727'
    },
    refeicoesTitle:{
        fontWeight:'bold',
        fontSize:50,
        color:'#000'
    },
    viewScrollViewRefeicoes:{
        backgroundColor:'#48FF2B',
        alignItems:'center',
        paddingVertical:30,
        paddingHorizontal:10,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        height:550
    },
    viewRefeicoes:{
        width:330,
        backgroundColor:'#fff',
        borderRadius:10,
        padding:10,
        marginTop:10,
        elevation:5
    },
    textRefeicao:{
        fontSize:14,
        fontWeight:'bold',
        color:'#000',
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginBottom:5,
        textTransform:'capitalize'
    },
    alimento:{
        backgroundColor:'#85F9A0',
        paddingVertical:1,
        paddingHorizontal:7,
        borderRadius:10,
        textTransform:'capitalize',
        marginHorizontal:10,
        fontSize:15
    }
})