import { useState, useEffect } from "react"

import { 
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    FlatList
} from "react-native"

import api from "../../api/api"

const { width, height } = Dimensions.get('window')

import Header from "../../components/Header"

export default function RefeicoesSemana(){

    const [refeicoesSemana,setRefeicoesSemana] = useState([])

    useEffect(() => {
        async function lerRefeicoesSemana(){
            const response = await api.get('/refeicoes')
            const data = response.data

            setRefeicoesSemana(data)
        }

        lerRefeicoesSemana()
    },[])

    return(
        <SafeAreaView style={styles.telaPrincipal}>
            <Header/>

            <View style={styles.viewTitle}>
                <Text style={styles.titleRefeicoes}>
                    Refeições
                </Text>
                <Text style={styles.titleSemana}>
                    Semana
                </Text>
            </View>

            <View style={styles.bgRefeicoesSemana}>
                <FlatList
                    data={refeicoesSemana}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => (
                        <View style={styles.viewLista}>
                            <Text>{item.refeicao}</Text>
                            <Text>{item.dia}</Text>
                        </View>  
                    )}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    telaPrincipal:{
        width:width,
        height:height
    },
    viewTitle:{
        marginTop:10,
        justifyContent:'center',
        alignItems:'center'
    },
    titleRefeicoes:{
        fontSize:18,
        color:'#000'
    },
    titleSemana:{
        fontSize:50,
        color:'#000',
        fontWeight:'600'
    },
    viewLista:{
        padding:20,
        alignItems:'center'
    },
    bgRefeicoesSemana:{
        width:width,
        height:height,
        backgroundColor:'#008920',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        marginTop:10
    }
})