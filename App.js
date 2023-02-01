import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import MetaMaskSDK from '@metamask/sdk';
import {Linking} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {ethers} from 'ethers';
import WalletConnectProvider, {
  useWalletConnect,
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppModal from './src/Modal';

const MMSDK = new MetaMaskSDK({
  openDeeplink: link => {
    Linking.openURL(link); // Use React Native Linking method or your favourite way of opening deeplinks
  },
  timer: BackgroundTimer, // To keep the app alive once it goes to background
  dappMetadata: {
    name: 'YGG SEA', // The name of your application
    url: 'https://yggsea.io/', // The url of your website
  },
});

const ethereum = MMSDK.getProvider();

function App() {
  return (
    <WalletConnectProvider
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}
      bridge="https://bridge.walletconnect.org"
      clientMeta={{
        description: 'Connect with WalletConnect',
        url: 'https://walletconnect.org',
        icons: ['https://walletconnect.org/walletconnect-logo.png'],
        name: 'WalletConnect',
      }}
      renderQrcodeModal={props => {
        return <AppModal {...props} />;
      }}>
      <>
        <View style={styles.container}>
          <View style={styles.box}>
            <MetaMask />
          </View>
          <View style={styles.box}>
            <WalletConnect />
          </View>
        </View>
      </>
    </WalletConnectProvider>
  );
}

function MetaMask() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  async function onConnect() {
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    const provider = new ethers.providers.Web3Provider(ethereum);
    // Get the balance of an account (by address or ENS name, if supported by network)
    const bl = await provider.getBalance(ethereum.selectedAddress);
    const balanceInETH = ethers.utils.formatEther(bl);
    setBalance(balanceInETH);
    setAddress(accounts[0]);
  }
  return (
    <View>
      <Button onPress={onConnect} title="Connect Metamask" />
      <Text>Address: {address}</Text>
      <Text>Balance: {balance}</Text>
    </View>
  );
}

function WalletConnect() {
  const connector = useWalletConnect();

  if (connector.connected === false) {
    return (
      <Button
        title="Connect With Wallet connect"
        onPress={() => connector.connect()}
      />
    );
  }
  return (
    <View>
      <Button title="Disconnect" onPress={() => connector.killSession()} />
      <Text>Address: {connector.accounts[0]}</Text>
      <Text>ChainId: {connector.chainId}</Text>
      <Text>networkId: {connector.networkId}</Text>
      <Text>rpcUrl: {connector.rpcUrl}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#E9E8E8',
    borderRadius: 4,
    padding: 16,
    margin: 16,
  },
});

export default App;
