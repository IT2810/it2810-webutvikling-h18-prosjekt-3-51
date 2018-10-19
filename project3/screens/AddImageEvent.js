import React, { Component } from 'react';
import { View, Text, Button, CameraRoll, KeyboardAvoidingView, AppRegistry, FlatList, StyleSheet, ScrollView } from "react-native";
import { ImagePicker, Permissions } from 'expo';
import store from "react-native-simple-store";


class AddImageEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  render() {
    const {goBack, navigate} = this.props.navigation;
    return (
      <View>
        {this.state.hasCameraPermission ? (<Button
          title="Choose local picture"
          onPress={async () => {await this._pickImage(); goBack(); navigate("Calendar");}}
        />) : (<Text>No camera roll permission</Text>)}
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
