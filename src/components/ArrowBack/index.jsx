import { StyleSheet, TouchableOpacity } from "react-native"

import { useNavigation } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ArrowBack(){

    const navigation = useNavigation()

    function voltar(){
        navigation.navigate('Home')
    }

    return(
        <TouchableOpacity onPress={voltar}>
            <Ionicons
                name='arrow-back-outline'
                size={35}
                color='#000'
                style={styles.voltar}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    voltar:{
        marginLeft:17
    }
})