import React from 'react'

import { LoginButton } from 'react-native-fbsdk'

export default function FBLoginBtn({callback}) {

    return (
        <LoginButton
            publishPermissions={["email"]}
            onLoginFinished={
                (error, result) => {
                    if (error) {
                        alert("Login failed with error: " + error.message);
                    } else if (result.isCancelled) {
                        alert("Login was cancelled");
                    } else {
                        if(callback){
                            callback()
                        }
                    }
                }
            }
            onLogoutFinished={() => {
                if(callback){
                    callback()
                }
            }} />
    )

}
