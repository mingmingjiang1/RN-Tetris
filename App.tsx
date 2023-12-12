import React, { useEffect, useState } from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {subscribeRecord} from './unit';

import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Index from './containers';
import { Storage } from './util/fit';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

subscribeRecord(store); // 将更新的状态记录到localStorage



function Test () {
  const [inited, setInited] = useState(false);
  useEffect(() => {
    Storage.init().then(() => setInited(true));
  }, []);

  return inited ? <App /> : null
}

function Comp1({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return     <SafeAreaView style={backgroundStyle}>
  <StatusBar
    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    backgroundColor={backgroundStyle.backgroundColor}
  />
  <Provider store={store}>
    <View
      style={{
        width: 360,
        height: 731,
      }}>
      <Index />
    </View>
  </Provider>
</SafeAreaView>
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen component={Comp1} name='Home'></Drawer.Screen>
          {/* <Drawer.Screen component={<>你好</>} name='Notifications'></Drawer.Screen> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default Test;
