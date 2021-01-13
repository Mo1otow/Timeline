import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { Appbar, Paragraph, Title } from 'react-native-paper'

export default function Details({ navigation, route }) {

    console.log(Object.keys(route))

    const item = route.params

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title={item.title} subtitle={item.timestamp} />
            </Appbar>

            <View style={{
                alignItems: 'center'
            }}>

                <Paragraph style={{
                    padding: 10
                }} >{item.description}</Paragraph>
                <Title style={{
                    paddingVertical: 10
                }} >{item.author}</Title>
            </View>

        </SafeAreaView>
    )
}