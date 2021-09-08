import React,{useState , useEffect} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/AntDesign';
import LastWatch from '../components/LastWatch';
import Received from '../components/Received';
import Sent from '../components/Sent';
//import Data from '../dummy/Data.json';
import Input from '../components/Input'; 
import {API_KEY , API_URL }from "./global"
import axios from "axios"

const Discussion = ({ route, navigation }) => {
    const [Data , setData] = useState([
        {'sender':'Bot', 'message':"Try say hello"}
    ])
    let is_typing = false 
    const { id , itemName , itemPic , name} = route.params;
    const apiendpoint = API_URL+name
    const [inputMessage, setMessage] = useState('');
    
    async function getResponce  (){
        is_typing = true
        console.log(is_typing);
                //sending the api call
                const payload = {
                    inputs: {
                        text: inputMessage
                    }
                };
                const headers = {
                    'Authorization': 'Bearer ' + API_KEY
                };
                
                let botResponse = '';
                console.log(apiendpoint)
                const req = await axios(apiendpoint  ,
                        {
                            method: 'post',
                            data: JSON.stringify(payload),
                            headers: headers
                        }
                    ).then(function (req){
                        if (req.data.hasOwnProperty('generated_text')) {
                            return botResponse = req.data.generated_text
                        }else {
                            return botResponse = "I do not understand !"
                        }
                        }).catch(function(err){
                            return botResponse = "I do not understand !"
                        })
                Data.push({'sender':'Bot', 'message':botResponse})
                is_typing = false
    }
    const send = async() => {
        Data.push({'sender':'Me', 'message':inputMessage})
        setData(Data)
        setMessage('')
        console.log(is_typing);
        Promise.resolve(getResponce ()).then(function (){
            console.table(Data)
            if (!is_typing){
                setData(Data)
            }
        })
        
    };
    
    var txt = []
    
    console.log(Data)
    console.log({ id , itemName , itemPic , name})

    return(
    <LinearGradient
        colors={['#210b11', '#8a0328', '#52031a']}
        style={styles.container}
    >
        <View style={styles.main}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={()=>navigation.goBack()}
                    >
                        <Icon name='left' color='#000119' size={24}/>
                    </TouchableOpacity>
                    <Text style={styles.username}>{itemName}</Text>
                    <Image source={{uri:itemPic}} style={styles.avatar}/>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <LastWatch  checkedOn='Yesterday'/>
                    {
                        Data.length === 0 ? 
                        (<Text></Text>)
                        :
                        (
                            Data.map(
                                (message) =>{
                                    return (
                                        message.sender =="Me" ? 
                                        (<Sent
                                            message = {message.message}
                                        />)
                                        :
                                        (
                                        <Received
                                            message = {message.message}
                                            image = {itemPic}
                                        />
                                        )
                                    )
                                }
                            )
                        )
                    }
                    <View>
                        {txt}
                    </View>
                </ScrollView>
        </View>
        <Input
            inputMessage={inputMessage}
            setMessage={(inputMessage)=> setMessage(inputMessage)}
            onSendPress={send}
        />
    </LinearGradient>
    )
}
export default Discussion;

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        left:0,
        right:0,
        top:0,
        height:"100%"
    },
    main:{
        backgroundColor:'#FFF',
        height:'88%',
        paddingHorizontal:20,
        borderBottomLeftRadius:35,
        borderBottomRightRadius:35,
        paddingTop:40
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    username:{
        color:"#000119",
        fontFamily:'Montserrat_700Bold',
        fontSize:20,
        flex:1,
        textAlign:'center'
    },
    avatar:{
        width:40,
        height:40,
        borderRadius:20,
    }

})