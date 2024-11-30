import { ActivityIndicator, View, StyleSheet } from "react-native"

export default function Loading(){
    return(
        <View style={styles.viewLoading}>
            <ActivityIndicator
                size={80}
                color='#008920'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewLoading:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})