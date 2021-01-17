import React from 'react'
import { ActivityIndicator, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper'
import { AccessToken } from 'react-native-fbsdk'
import moment from 'moment'
import database from '@react-native-firebase/database';

export default function AddItem({callback}) {

    const [item, setItem] = React.useState({})

    const [user, setUser] = React.useState()

    const [loading, setLoading] = React.useState(false)

    const theme = useTheme()

    const initUser = React.useCallback((token) => {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                setUser(json)
            })
            .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK')
            })
    }, [setUser])

    const addItem = React.useCallback((value) => {
        setLoading(true)
        database().ref(`/items/${moment().format('MM-DD-YYYY-hh:mm:ss')}-${user.id}`)
            .set(value).then(() => {
                alert('You have added data successfully')
                if(callback){
                    callback()
                }
                setLoading(false)
            })
            .catch(e => console.log('ErrorFBRD : ', e))
    }, [user, setLoading])

    React.useEffect(() => {
        AccessToken.getCurrentAccessToken()
            .then(data => initUser(data.accessToken))
            .catch(e => console.log('AccessTokenEr :', e))
    }, [initUser])

    return (
        <View style={{
            width: '100%',
            padding: 10,
        }}>
            <TextInput
                mode="outlined"
                label="Title"
                value={item?.title || null}
                onChangeText={(text) => setItem(prev => ({
                    ...prev,
                    title: text
                }))} />
            <TextInput
                mode="outlined"
                label="Description"
                value={item?.description || null}
                onChangeText={(text) => setItem(prev => ({
                    ...prev,
                    description: text
                }))} />
            { !loading ? <Button mode="contained" style={{
                marginVertical: 10,
                width: '30%',
                alignSelf: 'center'
            }}
                onPress={() => {
                    if (user) {
                        addItem({
                            ...item,
                            author: user.name,
                            timestamp: moment().toString()
                        })
                    }
                }}
                disabled={!(item.title && item.description)} >
                Add
            </Button> : <ActivityIndicator size={32} color={theme.colors.primary} style={{ margin: 10 }} />}

        </View>
    )

}