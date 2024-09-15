import { useState, useEffect } from "react"

import { 
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from "react-native"

import { Picker } from "@react-native-picker/picker"

import Ionicons from 'react-native-vector-icons/Ionicons'

import Header from "../../components/Header"

import api from "../../api/api"

export default function AddAlimento(){
    
    const [grupoSelecionado, setGrupoSelecionado] = useState('')
    const [grupo,setGrupo] = useState([])
    const [refeicaoAgora,setRefeicaoAgora] = useState([])

    const grupos = [
        '',
        "cereais",
        "vegetais",
        "frutas",
        "leguminosas",
        "proteinas",
        "laticinios",
        "gorduras",
        "doces"
    ]

    useEffect(() => {
        async function lerGruposAlimentos(){
            try{
                const response = await api.get(`/alimentos/filtrar?grupo=${grupoSelecionado}`)
                const data = response.data
    
                setGrupo(data)

            }catch(error){
                console.error(error)
            }
        }
        
        async function lerRefeicaoAgora(){
            try{
                const response = await api.get(`/refeicoes/agora`)
                const data = response.data
    
                setRefeicaoAgora([data])
                
            }catch(error){
                console.error(error)

            }
        }

        lerGruposAlimentos()
        lerRefeicaoAgora()

    },[grupoSelecionado])

    let id = refeicaoAgora.map(refeicao => refeicao._id)
    let dia = refeicaoAgora.map(refeicao => refeicao.dia)
    let refeicao = refeicaoAgora.map(refeicao => refeicao.refeicao)

    async function adicionarAlimento(idRefeicao,idAlimento){ 
        try{
            await api.post(`/refeicoes/${idRefeicao}/alimentos/${idAlimento}`)
            alert('Alimento adicionado')

        }catch(error){
            alert('Erro ao adicionar alimento')
            console.error(error.response.data)

        }

    }

    return(
        <SafeAreaView>
            <Header/>

            <View style={styles.viewTitleAddRefeicao}>
                <Text style={styles.diaRefeicao}>
                    {dia} - {refeicao}
                </Text>
                <Text style={styles.addAlimentoTitle}>
                    Adicionar alimento
                </Text>
            </View>

            <View style={styles.viewPicker}>
                <Picker
                    style={styles.pickerGrupo}
                    selectedValue={grupoSelecionado}
                    onValueChange={(itemValue,itemIndex) => {
                        setGrupoSelecionado(itemValue)
                    }
                }>
                    {grupos.map(grupos => (
                        <Picker.Item
                            key={grupos}
                            label={grupos}
                            value={grupos}
                        />
                    ))}
                </Picker>
            </View>

            <View style={styles.bgGrupo}>
                <Text style={styles.textGrupoSelecionado}>
                    {grupoSelecionado.length > 0 ? grupoSelecionado : 'selecione um grupo'}
                </Text>
                
                <ScrollView 
                    showsVerticalScrollIndicator
                    style={styles.scrollViewAlimentosAgrupados}
                >
                    {grupo.map(grupo => (
                        <TouchableOpacity 
                            key={grupo._id}
                            onPress={() => adicionarAlimento(id,grupo._id)}
                        >
                            <View style={styles.viewAlimentosAgrupados}>
                                <Text style={styles.textAlimentosAgrupoados}>
                                    {grupo.alimento}
                                </Text>
                                <Ionicons
                                    name='add-outline'
                                    size={25}
                                    color='#000'
                                    style={styles.iconAlimentosAgrupados}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    planFoodText:{
        fontSize:14,
        color:'#424242',
        textAlign:'center',
        marginTop:12
    },
    viewTitleAddRefeicao:{
        marginTop:15,
        alignItems:'center'
    },
    diaRefeicao:{
        fontSize:18,
        color:'#000',
        textTransform:'capitalize'
    },
    addAlimentoTitle:{
        fontWeight:'bold',
        fontSize:30,
        color:'#000'
    },
    viewPicker:{
        borderRadius:25,
        backgroundColor:'#B7B7B7',
        marginHorizontal:50,
        marginVertical:10,
        elevation:5,
    },
    bgGrupo:{
        backgroundColor:'#357847',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        height:500,
        marginTop:20,
        paddingHorizontal:20,
        paddingVertical:25
    },
    textGrupoSelecionado:{
        fontWeight:'bold',
        fontStyle:'italic',
        color:'#ccc',
        fontSize:16,
        paddingLeft:10,
        paddingBottom:5,
        textTransform:'capitalize',
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },
    scrollViewAlimentosAgrupados:{
        paddingHorizontal:10,
        marginVertical:20,
        marginBottom:60
    },
    viewAlimentosAgrupados:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#85F9A0',
        justifyContent:'space-between',
        paddingVertical:6,
        paddingHorizontal:15,
        elevation:5,
        borderRadius:20,
        marginVertical:11,
    },
    textAlimentosAgrupoados:{
        textTransform:'capitalize',
        fontSize:18,
        color:'#000',
    },
    iconAlimentosAgrupados:{
        backgroundColor:'#fff',
        borderRadius:50
    }
})