import { 
    Text, 
    View, 
    StyleSheet 
} from "react-native"

import { 
    DrawerContentScrollView, 
    DrawerItemList
} from "@react-navigation/drawer"

import Ionicon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from "react-native-gesture-handler"

export default function CustomDrawer(props){
    return(
        <DrawerContentScrollView {...props}>
             <View style={styles.viewTitleHeader}>
                <View style={styles.viewTextsTitleHeader}>
                    <Text style={styles.textBemVindo}>
                        Bem vindo ao
                    </Text>
                    <Text style={styles.textPlanFood}>
                        PlanFood
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                        <Ionicon
                            name='close-outline'
                            size={30}
                            color='#7A7A7A'
                        />
                    </TouchableOpacity>
                </View>
             </View>

            <DrawerItemList {...props}/>

        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    viewTitleHeader:{
        padding:10,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between'
    },
    viewTextsTitleHeader:{
        
    },
    textBemVindo:{
        fontSize:12,
        color:'#424242'
    },
    textPlanFood:{
        fontSize:25,
        color:'#000',
        fontWeight:'bold'
    }
})