import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { Surface, List, ActivityIndicator, Title } from 'react-native-paper'
import moment from 'moment'
import { StackActions, useNavigation } from '@react-navigation/native'
import database from '@react-native-firebase/database'

export default function DataList() {

    const [data, setData] = React.useState()

    const [loading, setLoading] = React.useState(false)

    const navigation = useNavigation()

    React.useEffect(() => {

        setLoading(true)

        let intervalId = setInterval(() => {
            database()
                .ref('/items')
                .once('value')
                .then(snapshot => {
                    const rawData = snapshot.val()
                    let readyData = [];
                    for (let key in rawData) {
                        readyData.push({
                            id: key,
                            ...rawData[key]
                        })
                    }
                    if (readyData !== data) {
                        setData(readyData)
                    }
                });
                setLoading(false)
        }, 10000)


        return () => clearInterval(intervalId)

    }, [setData, setLoading])

    const renderItem = React.useCallback(({ item }) => {

        return (
            <List.Item
                title={item.title}
                description={`${moment(item.timestamp).format('MM-DD-YYYY hh:mm:ss').toString()}      ${item.author}`}
                titleStyle={{
                    alignSelf: 'center'
                }}
                onPress={() => {
                    navigation.dispatch(StackActions.push('Details', item))
                }}
            />
        )
    }, [data])

    const renderEmpty = React.useCallback(() => {
        return (
            <Surface style={{
                alignSelf: 'center',
                marginTop: 50,
                marginBottom: 11,
                elevation: 8,
                width: '90%',
                height: 200,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }} >

                <Title style={{
                    textAlign: 'center',
                    marginHorizontal: 10,
                }} >Sorry, we have nothing to offer you at the moment</Title>

            </Surface>
        )
    }, [])

    const keyExtractor = React.useCallback((item) => item.id, [data])

    return (
        <Surface style={{ flex: 1 }}>
            { loading ? (
                <ActivityIndicator size={32} style={{
                    marginTop: 30
                }} />
            ) : (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        ListEmptyComponent={renderEmpty}
                    />)}
        </Surface>
    )

}