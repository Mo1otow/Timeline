import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigator/ref'
import Navigator from './src/navigator'
import { Provider as PaperProvider } from 'react-native-paper';
import AuthProvider from './src/AuthContext'
import messaging from '@react-native-firebase/messaging'

const App = () => {


  const requestUserPermission = React.useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }, [])

  React.useEffect(() => {
    requestUserPermission()
  }, [])

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
