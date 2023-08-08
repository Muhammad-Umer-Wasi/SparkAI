import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import img from './pxfuel.jpg';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { GiftedChat } from 'react-native-gifted-chat';
import * as Speech from "expo-speech"

export default function TextModel({navigation}) {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState(null)
    const [messages, setMessages] = useState([])

    const handlesubmit = () => {
        const message = {
            _id: Math.random().toString(36).substring(),
            text: input,
            createdAt: new Date(),
            user: { _id: 1, name: "Me" }
        }

        setMessages((previousMessages) => GiftedChat.append(previousMessages, [message]))

        fetch('https://api.openai.com/v1/chat/completions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user",
                        "content": input
                    }
                ]
            })
        }
        ).then(responce => responce.json()).then((data) => {
            console.log(data.choices[0].message.content), setOutput(data.choices[0].message.content.trim())
            const message = {
                _id: Math.random().toString(36).substring(7),
                text: data.choices[0].message.content.trim(),
                createdAt: new Date(),
                user: { _id: 2, name: "openAI" }
            }

            setMessages((previousMessages) => GiftedChat.append(previousMessages, [message]))
            Speech.speak(data.choices[0].message.content.trim())
        })
        
    }
    
    return (
        <ImageBackground source={img} style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <GiftedChat messages={messages} renderInputToolbar={() => { }} user={{ _id: 1 }} />
            </View>

            <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.navigate('DallE')}>
                    <View style={styles.button} >
                    <MaterialIcons name="refresh" size={30} style={{ marginLeft: 12 }} />
    
                    </View>
                </TouchableOpacity>
                
                <View style={styles.input}>
                    <TextInput placeholder="Enter text here" style={{ flex: 1, marginLeft: 3, backgroundColor: "white", borderRadius: 10 }} onChange={(e) => setInput(e.target.value)} />
                </View>

                <TouchableOpacity>
                    <View style={styles.button}>
                        <MaterialIcons onPress={() => handlesubmit()} name="send" size={30} style={{ marginLeft: 12 }} />
                    </View>
                </TouchableOpacity>
                
                
            </View>

            <StatusBar style="auto" />
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "white",
        marginHorizontal: 10
    },
    button: {
        padding: 4,
        width: 60,
        height: 60,
        backgroundColor: "green",
        borderRadius: 9999,
        justifyContent: "center"
    },
    input: {
        width: "800px",
        marginRight: 8,
        marginBottom: 5,
        justifyContent: "center",
        height: 60,
        flex: 1,
        marginLeft: 10,
        borderRadius: "20px"
    }
})
