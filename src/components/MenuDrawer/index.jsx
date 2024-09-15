import { TouchableOpacity } from "react-native"

import { useNavigation } from '@react-navigation/native'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function MenuDrawer(){

    const navigation = useNavigation()

    return(
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome
            name='bars'
            size={30}
            color='#000000'
          />
        </TouchableOpacity>
    )
}