import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { subscribeRecord } from "./unit";

import { AppState, SafeAreaView, StatusBar, useColorScheme, View } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

import Index from "./containers";
import { Storage } from "./util/fit";
import RNSound from "./util/rnsound";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

RNSound.createPool(1);
import { initMusic } from "./unit/music";
initMusic();

const Drawer = createDrawerNavigator();

subscribeRecord(store); // 将更新的状态记录到localStorage

// RNSound.addSound('my_music').then(res => {
//   console.log('========+++++++++++++++> 88888888888888888888', res);
//   RNSound.play('my_music').then(res => {
//     console.log('========+++++++++++++++> music', res)
//   }).catch(e => console.log('++++++++++--------->', e));
// }).catch(e => console.log('+++++++++7777777777777777------->', e));;

function Test() {
  const [inited, setInited] = useState(false);
  useEffect(() => {
    Storage.init().then(() => setInited(true));
  }, []);

  return inited ? <App /> : null;
}

function Comp1({ navigation }) {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider store={store}>
        <View
          style={{
            width: 360,
            height: 731,
          }}
        >
          <Index />
        </View>
      </Provider>
    </SafeAreaView>
  );
}

const StorageKey = "REACT_TETRIS";

function App(): JSX.Element {
  // useEffect(() => {
  //   const callback = (nextAppState) => {
  //     if (nextAppState === 'background') {
  //       let data = store.getState();
  //       if (data.lock) { // 当状态为锁定, 不记录
  //         return;
  //       }
  //       console.log('storage-----------------------------------: ', JSON.stringify(data.matrix));
  //       data = JSON.stringify(data);
  //       data = encodeURIComponent(data);

  //         try {
  //         Storage.setItem(
  //             StorageKey,
  //             data
  //           );
  //         } catch (error) {
  //           // Error saving data
  //           console.log('error3444: ', error);
  //         }
  //     }
  //   };

  //   AppState.addEventListener('change', callback);
  //   return () => {
  //     AppState?.removeEventListener('change', callback);
  //   };
  // }, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen component={Comp1} name="Home"></Drawer.Screen>
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
