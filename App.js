/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {StyleSheet} from 'react-native';
// import WalletConnectProvider from '@walletconnect/react-native-dapp';
// import AsyncStorage from '@react-native-async-storage/async-storage';
function App() {
  console.log('🚀 ~ file: App.js:12 ~ AsyncStorage', AsyncStorage);

  return null;
  // return (
  //   <WalletConnectProvider
  //     redirectUrl={'yourappscheme://'}
  //     storageOptions={{
  //       asyncStorage: AsyncStorage,
  //     }}
  //   />
  // );
}

const styles = StyleSheet.create({});

export default App;
