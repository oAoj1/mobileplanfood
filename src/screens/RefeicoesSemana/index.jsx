import { useState, useEffect } from "react"

import { 
    SafeAreaView, 
    Text, 
    View,
    FlatList, 
    StyleSheet, 
    ScrollView
} from "react-native"

import Header from "../../components/Header"
import ComponenteRefeicao from "./ComponenteRefeicao"

export default function RefeicoesSemana(){

    return(
        <SafeAreaView>
            <Header/>

            <View style={styles.viewTitleRefeicoesSemana}>
                <Text style={styles.textRefeicoes}>
                    Refeições
                </Text>
                <Text style={styles.textSemana}>
                    Semana
                </Text>
            </View>

            <ScrollView style={styles.viewRefeicoesSemana}>
                <ComponenteRefeicao dia='segunda'/>
                <ComponenteRefeicao dia='terca'/>
                <ComponenteRefeicao dia='quarta'/>
                <ComponenteRefeicao dia='quinta'/>
                <ComponenteRefeicao dia='sexta'/>
                <ComponenteRefeicao dia='sabado'/>
                <ComponenteRefeicao dia='domingo'/>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    viewTitleRefeicoesSemana:{
        alignItems:'center'
    },
    textRefeicoes:{
        fontSize:18,
        color:'#000',
    },
    textSemana:{
        fontSize:50,
        fontWeight:'bold',
        color:'#000',
    },
    viewRefeicoesSemana:{
        backgroundColor:'#008920',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        paddingHorizontal:20,
        height:550
    }
})