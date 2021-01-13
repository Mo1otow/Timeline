import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Welcome from '../screen/Welcome'
import Details from '../screen/Details'
import Home from '../screen/Home'
import { AuthContext } from '../AuthContext'
import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native'

const Root = createStackNavigator()

export default function Screens() {

    const ctx = React.useContext(AuthContext);

    let screens, initialRouteName;

    if (ctx.loading) {
        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator />
            </SafeAreaView>
        )
    }

    if (ctx.user) {
        initialRouteName = 'Home',
            screens = (
                <React.Fragment>
                    <Root.Screen name="Home" component={Home} />
                    <Root.Screen name="Details" component={Details} />
                </React.Fragment>
            )
    } else {
        initialRouteName = 'Welcome',
            screens = (
                <React.Fragment>
                    <Root.Screen name="Welcome" component={Welcome} />
                </React.Fragment>
            )
    }

    const navigator = (
        <Root.Navigator headerMode="none" initialRouteName={initialRouteName}>
            {screens}
        </Root.Navigator>
    )

    return navigator
}