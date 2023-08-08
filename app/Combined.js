import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import img from './pxfuel.jpg';
import { useState } from 'react';
import {MaterialIcons} from '@expo/vector-icons'
import { GiftedChat } from 'react-native-gifted-chat';
import * as Speech from "expo-speech"

export default function Combined({navigation}) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState(null)
  const [messages,setMessages] = useState([])
  
  const handlesubmit = async() => {
    const message = {
      _id: Math.random().toString(36).substring(),
      text:input,
      createdAt:new Date(),
      user:{_id:1,name:"Me"}
    }

    setMessages((previousMessages)=>GiftedChat.append(previousMessages,[message]))
    

  }


  const generateImages = async() => {

    const message= {
      _id: Math.random().toString(36).substring(7),
      text: input,
      createdAt: new Date(),
      user:{_id:1}
    }

    setMessages((previousMessages)=>GiftedChat.append(previousMessages,[message]))
    await fetch('https://api.openai.com/v1/images/generations', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "prompt": input,
        "n": 2,
        "size": "1024x1024"
      })
    }).then(response=>response.json()).then((data)=>{console.log(data.data[0].url), setOutput(data.data[0].url)
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: "image",
      createdAt: new Date(),
      user: {_id:2},
      image: data.data[0].url
    }
    
    setMessages((previousMessages)=>GiftedChat.append(previousMessages,[message]))
  },)
  }



  const handleSend = () => {
    console.log(input)
    if (input.trim().startsWith("Generate")) {
      generateImages();
    } else {
      handlesubmit();
    }
  };

  return (
    <ImageBackground source={img} style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <GiftedChat messages={messages} renderInputToolbar={() => { }} user={{_id:1}}/>
      </View>

      <View style={{ flexDirection: 'row' }}>
        
      <TouchableOpacity onPress={() => navigation.navigate('GPT3.5')}>
                    <View style={styles.button}>
                    <MaterialIcons name="refresh" size={30} style={{ marginLeft: 12 }} />
    
                    </View>
                </TouchableOpacity>
        <View style={styles.input}>
          <TextInput placeholder="Enter text here" style={{flex:1,marginLeft:3,backgroundColor:"white",borderRadius:10}} onChange={(e) => setInput(e.target.value)} />
        </View>

        <TouchableOpacity>
          <View style={styles.button}>
            <MaterialIcons onPress={() => handleSend()} name="send" size={30} style={{marginLeft:12}}/>
          </View>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}
const {width} = Dimensions.get("window")
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
    marginHorizontal:10
  },
  button: {
    padding: 4,
    width:60,
    height:60,
    backgroundColor: "yellow",
    borderRadius: 9999,
    justifyContent:"center"
  },
  input: {
    width:"800px",
    marginRight:8,
    marginBottom:5,
    justifyContent:"center",
    height:60,
    flex: 1,
    marginLeft: 10,
    borderRadius:"20px"
  }
});
