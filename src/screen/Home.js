import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { Appbar, FAB, Title } from 'react-native-paper'

import { AuthContext } from '../AuthContext'

import AddItem from '../component/AddItem'
import Modal from '../component/Modal'
import DataList from '../component/DataList'
import FBLoginBtn from '../component/FBLoginBtn';

export default function Home() {

    const modalLogOutRef = React.useRef();
    const modalAddItemRef = React.useRef();

    const ctx = React.useContext(AuthContext)

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <Appbar>
                <Appbar.Content title="Timeline" />
                <Appbar.Action style={{
                    position: 'absolute',
                    right: 0,
                }} icon="logout" onPress={() => modalLogOutRef.current.show()} />
            </Appbar>
            <Modal ref={modalLogOutRef} >
                <Title>Are you sure?</Title>
                <View style={{
                    marginVertical: 10
                }}>
                    <FBLoginBtn callback={() => {
                        modalLogOutRef.current.hide()
                        ctx.removeToken()
                    }} />
                </View>
            </Modal>
            <FAB style={{
                position: 'absolute',
                zIndex: 999,
                bottom: 30,
                right: 30
            }}
                icon="plus"
                onPress={() => modalAddItemRef.current.show()} />
            <Modal ref={modalAddItemRef} >
                <AddItem callback={() => modalAddItemRef.current.hide()} />
            </Modal>

            <DataList />

        </SafeAreaView>
    )

}