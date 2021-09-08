import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Received = ({image, message}) => {
    return(
        <View style={styles.container}>
          <Image source={{uri:image}} style={styles.img}/>
          <View>
          <LinearGradient
                colors={['#210b11', '#8a0328']}
                style={styles.gradient}
            >
               <Text style={styles.message}>{message}</Text>
            </LinearGradient>
            <Text style={styles.duration}>12:13 AM</Text>
        </View>
        </View>
    )
}
export default Received;
const styles = StyleSheet.create({
    duration:{
        color:'#b6b6b6',
        fontSize:11,
        marginHorizontal:15,
        marginTop:5,
        fontFamily:'Montserrat_600SemiBold',
    },
    container:{
        flexDirection:'row',
        marginTop:20,
        width:250
    },
    img:{
        width:40,
        height:40,
        borderRadius:20
    },
    message:{
        fontSize:13,
        marginHorizontal:15,
        fontFamily:'Montserrat_700Bold',
        color:'#e0e0dc',
    },
    gradient:{
        maxWidth:220,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
        paddingVertical:10,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        borderBottomLeftRadius:25,
    },
})