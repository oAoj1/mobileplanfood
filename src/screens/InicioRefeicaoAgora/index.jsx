import { useEffect, useState } from "react";

import { 
  SafeAreaView, 
  Text, 
  View, 
  FlatList,
  TouchableOpacity,
  StyleSheet 
} from "react-native";

import { useNavigation } from '@react-navigation/native'

import api from "../../api/api"

import IoniIcons from 'react-native-vector-icons/Ionicons'

import Header from "../../components/Header"

export default function RefeicaoAgora(){

  const [refeicaoAgora,setRefeicaoAgora] = useState([])

  useEffect(() => {
    async function lerRefeicaoAgora(){
      try{
        const response = await api.get('/refeicoes/agora')
        const data = response.data

        setRefeicaoAgora([data])
      }catch(error){
        console.log(error)
      }
    }

    lerRefeicaoAgora()
  },[])

  const navigation = useNavigation()

  function adicionarAlimento(){
      navigation.navigate('AdicionarAlimento')
  }

  async function removerAlimento(idRefeicao,idAlimento){
    try {
      await api.delete(`/refeicoes/${idRefeicao}/alimentos/${idAlimento}`)
      alert('alimento deletado')
      
    } catch (error) {
      alert('erro ao deletar alimento')
      console.log(error)
    }
    
  }

  return(
    <SafeAreaView style={styles.telaPrincipal}> 

      <Header/>

      <FlatList
        data={refeicaoAgora}
        keyExtractor={item => item._id}
        renderItem={({item:refeicao}) => (
          <View style={styles.refeicaoAgoraContaner}>
            <Text style={styles.dia}>
              {refeicao.dia}
            </Text>
            <Text style={styles.refeicao}>
              {refeicao.refeicao}
            </Text>
            
            <View style={styles.listaAlimentosContainer}>
              <FlatList
                data={refeicao.alimentos}
                keyExtractor={item => item._id}
                renderItem={({item:alimento}) => (
                    <View style={styles.alimentoContainer}>
                      <Text style={styles.alimento}>
                        {alimento.alimento}
                      </Text>

                      <TouchableOpacity 
                        onPress={() => removerAlimento(refeicao._id,alimento._id)}
                      >
                        <IoniIcons
                          name='close-outline'
                          size={25}
                          color='#424242'
                        />
                      </TouchableOpacity>
                    </View>
                )}
              />

            </View>
          </View>
        )}
      />

      <TouchableOpacity onPress={adicionarAlimento}>
        <IoniIcons
          name='add-outline'
          size={55}
          color='#FFF'
          style={styles.iconAdd}
        />
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  telaPrincipal:{
    
  },  
  tituloHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
  },
  planFoodText:{
    fontSize:14,
    color:'#424242',
    marginRight:25
  },
  refeicaoAgoraContaner:{
    marginTop:10,
    alignItems:'center'
  },
  dia:{
    fontSize:20,
    textTransform:'capitalize',
    color:'#272727'
  },
  refeicao:{
    fontWeight:'bold',
    fontSize:50,
    textTransform:'capitalize',
    marginBottom:10,
    color:'#000000'
  },
  listaAlimentosContainer:{
    width:410,
    height:500,
    backgroundColor:'#36F76D',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    alignItems:'center',
    paddingTop:10,
    elevation:-5
  },
  alimentoContainer:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#85F9A0',
    justifyContent:'space-between',
    borderRadius:20,
    width:350,
    marginVertical:5,
    padding:7,
    elevation:5
  },  
  alimento:{
    textTransform:'capitalize',
    fontSize:20,
    paddingLeft:18,
    fontWeight:'regular',
    color:'#000000'
  },
  iconAdd:{
    position:'absolute',
    bottom:18,
    left:'42.10%',
    backgroundColor:'#000',
    padding:7,
    borderRadius:50,
    elevation:10
  }
})