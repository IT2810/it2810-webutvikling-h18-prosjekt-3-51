import React, { Component } from 'react';
import { View, Text, Button, CameraRoll, KeyboardAvoidingView, AppRegistry, FlatList, StyleSheet, ScrollView } from "react-native";
import { ImagePicker } from 'expo';
import store from "react-native-simple-store";


class AddImageEvent extends Component {


  render() {
    const {goBack, navigate} = this.props.navigation;
    return (
      <View>
        <Button
          title="Choose local picture"
          onPress={async () => {await this._pickImage(); goBack(); navigate("Calendar");}}
        />
      </View>
    );
  }


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      store.save("backgroundImage", result.uri);
    }

  };

}

export default AddImageEvent;
