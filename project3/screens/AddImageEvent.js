import React, { Component } from 'react';
import { View, Text, Button, CameraRoll, KeyboardAvoidingView, AppRegistry, FlatList, StyleSheet, ScrollView } from "react-native";


class AddImageEvent extends Component {
  constructor(props) {
  super(props);
    this.state = {photos: [], hasPermission: false}
  }


  checkIfValid() {
    return
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.READ_EXTERNAL_STORAGE);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  // _handleButtonPress = () => {
  //    CameraRoll.getPhotos({
  //        first: 20,
  //        assetType: 'Photos',
  //      })
  //      .then((r) => {
  //        console.log(r)
  //       //  this.setState({ photos: r.edges });
  //      })
  //      .catch((err) => {
  //         //Error Loading Images
  //      });
  //    };

  render() {
   return (
     <View>
       <Button title="Load Images" onPress={async () => CameraRoll.getPhotos({
         first: 20,
         assetType: 'Photos',
       }).then((photos) => {console.log(photos)})} />
       {this.state.hasPermission ? {} : (<Text>No permission to load images!</Text>)}
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
