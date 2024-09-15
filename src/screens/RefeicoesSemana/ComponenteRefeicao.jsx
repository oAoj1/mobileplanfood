import { useState, useEffect } from "react";

import { FlatList, Text, View, StyleSheet, ScrollView } from "react-native";

import api from "../../api/api";

export default function ComponenteRefeicao({dia}){

    const [refeicoesSemana, setRefeicoesSemana] = useState([])

    useEffect(() => {
        async function lerRefeicoesSemana(){
            const response = await api.get(`/refeicoes/${dia}`) 
            const data = response.data

            setRefeicoesSemana(data)
        }

        lerRefeicoesSemana()
    },[])

    return(
        <View style={{borderBottomColor:'#ccc',borderBottomWidth:1,paddingVertical:15}}>
            <Text style={styles.dia}>
                {dia}
            </Text>

            <FlatList
                horizontal
                data={refeicoesSemana}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                    <ScrollView style={styles.viewRefeicao}>
                        <Text style={styles.textRefeicao}>
                            {item.refeicao}
                        </Text>
                        <FlatList
                            horizontal
                            data={item.alimentos}
                            keyExtractor={item => item._id}
                            renderItem={({item}) => (
                                <Text style={styles.alimento}>
                                    {item.alimento}
                                </Text>
                            )}
                        />
                    </ScrollView>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    dia:{
        fontSize:20,
        color:'#fff',
        fontWeight:'bold',
        textTransform:'capitalize'
    },
    viewRefeicao:{
        width:120,
        height:100,
        marginVertical:7,
        backgroundColor:'#fff',
        padding:5,
        borderRadius:10,
        marginRight:5
    },
    textRefeicao:{
        fontSize:14,
        color:'#424242',
        textTransform:'capitalize',
        fontStyle:'italic',
        fontWeight:'light'
    },
    alimento:{
        paddingRight:10,
        paddingTop:5,
        paddingBottom:3,
        textTransform:'capitalize',
        fontSize:15,
        fontWeight:'bold',
        color:'#000'
    }
})