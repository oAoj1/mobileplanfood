import { 
    SafeAreaView, 
    Text, 
    View, 
    StyleSheet,
    ScrollView,
    FlatList
} from "react-native"

import Header from "../../components/Header"

export default function RefeicoesHoje(){

    const alimentos = [
        'arroz',
        'feijao',
        'ovo',
        'carne',
        'tomate',
        'alface',
        'farofa',
        'chocolate'
    ]

    return(
        <SafeAreaView>
            <Header/>

            <View style={styles.viewRefeicoesHoje}>
                <Text style={styles.diaHoje}>
                    Segunda
                </Text>
                <Text style={styles.refeicoesTitle}>
                    Refeições
                </Text>
            </View>

            <View style={styles.viewScrollViewRefeicoes}>
                <View style={styles.viewRefeicoes}>
                    <Text style={styles.textRefeicao}>
                        Café da manha
                    </Text>
                    <FlatList
                        data={alimentos}
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                            <Text style={styles.alimento}>
                                {item}
                            </Text>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator
                    />
                </View>
                <View style={styles.viewRefeicoes}>
                    <Text style={styles.textRefeicao}>
                        Lanche da manha
                    </Text>
                    <FlatList
                        data={alimentos}
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                            <Text style={styles.alimento}>
                                {item}
                            </Text>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator
                    />
                </View>
                <View style={styles.viewRefeicoes}>
                    <Text style={styles.textRefeicao}>
                        Almoço
                    </Text>
                    <FlatList
                        data={alimentos}
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                            <Text style={styles.alimento}>
                                {item}
                            </Text>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator
                    />
                </View>
                <View style={styles.viewRefeicoes}>
                    <Text style={styles.textRefeicao}>
                        Lanche da tarde
                    </Text>
                    <FlatList
                        data={alimentos}
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                            <Text style={styles.alimento}>
                                {item}
                            </Text>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator
                    />
                </View>
                <View style={styles.viewRefeicoes}>
                    <Text style={styles.textRefeicao}>
                        Jantar
                    </Text>
                    <FlatList
                        data={alimentos}
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                            <Text style={styles.alimento}>
                                {item}
                            </Text>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    viewRefeicoesHoje:{
        alignItems:'center',
        position:'relative',
        top:25,
        zIndex:5
    },
    diaHoje:{
        fontSize:20,
        color:'#272727'
    },
    refeicoesTitle:{
        fontWeight:'bold',
        fontSize:50,
        color:'#000'
    },
    viewScrollViewRefeicoes:{
        backgroundColor:'#48FF2B',
        alignItems:'center',
        paddingVertical:30,
        paddingHorizontal:10,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        height:550
    },
    viewRefeicoes:{
        width:330,
        backgroundColor:'#fff',
        borderRadius:10,
        padding:10,
        marginTop:10,
        elevation:5
    },
    textRefeicao:{
        fontSize:13,
        fontWeight:'bold',
        color:'#000',
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginBottom:5
    },
    alimento:{
        backgroundColor:'#85F9A0',
        paddingVertical:1,
        paddingHorizontal:7,
        borderRadius:10,
        textTransform:'capitalize',
        marginHorizontal:10,
        fontSize:15
    }
})