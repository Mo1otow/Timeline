import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { Title } from 'react-native-paper'

import { AuthContext } from '../AuthContext'

import FBLoginBtn from '../component/FBLoginBtn'

export default function Welcome() {

    const ctx = React.useContext(AuthContext)

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <Title style={{
                alignSelf: 'center',
                marginTop: '10%'
            }}>
                Welcome
            </Title>
            <View style={{
                alignItems: 'center',
                marginTop: '100%'
            }}>
                <FBLoginBtn callback={ctx.getToken} />
            </View>
        </SafeAreaView>
    )
}