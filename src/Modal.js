import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const AppModal = ({walletServices, visible, connectToWalletService, uri}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={{height: 300}}>
            <ScrollView style={styles.modalView}>
              {walletServices.map(walletService => (
                <TouchableOpacity
                  key={walletService.id}
                  style={{paddingVertical: 10}}
                  onPress={() => connectToWalletService(walletService, uri)}>
                  <Image source={{uri: walletService.logo}} />
                  <Text>{walletService.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#E9E8E8',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AppModal;
