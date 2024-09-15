import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import MenuDrawer from "../MenuDrawer"

export default function Header(){
    return(
        <SafeAreaView>
            <View style={styles.tituloHeader}>
                <MenuDrawer/>

                <Text style={styles.planFoodText}>
                    PlanFood
                </Text>

                <View/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
})