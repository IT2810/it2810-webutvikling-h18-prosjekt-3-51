import React, { Component } from 'react';
import { View, Text, Button, TextInput, KeyboardAvoidingView } from "react-native";
import InputField from "../components/InputField";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import {
  AppRegistry, FlatList, StyleSheet, ScrollView
} from 'react-native';


class AddImageEvent extends Component {
  constructor(props) {
  super(props);
  //this.setState({photos: {}});
  this.state = {};
  }


  checkIfValid() {
    return
  }

  _handleButtonPress = () => {
     CameraRoll.getPhotos({
         first: 20,
         assetType: 'Photos',
       })
       .then(r => {
         this.setState({ photos: r.edges });
       })
       .catch((err) => {
          //Error Loading Images
       });
     };
  render() {
   return (
     <View>
       <Button title="Load Images" onPress={this._handleButtonPress} />
       <ScrollView>
         {this.state.photos.map((p, i) => {
         return (
           <Image
             key={i}
             style={{
               width: 300,
               height: 100,
             }}
             source={{ uri: p.node.image.uri }}
           />
         );
       })}
       </ScrollView>
     </View>
   );
  }
}

export default AddImageEvent;
