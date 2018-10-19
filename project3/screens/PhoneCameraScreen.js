import React from 'react';
import { Text, View, TouchableOpacity, Button, AsyncStorage } from 'react-native';
import { Camera, Permissions } from 'expo';
import store from "react-native-simple-store";

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    renderCamera: false
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({ hasCameraPermission: status === 'granted' });
  }

  async componentDidMount() {
    const didFocusSub = this.props.navigation.addListener(
      'didFocus',
      payload => {
        (async () => this.setState({
          renderCamera: false}))();
      }
    );
  }


  render() {
    const { hasCameraPermission } = this.state;
    const { navigate } = this.props.navigation;
    if (hasCameraPermission === null) {
     return <View />;
   } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.state.renderCamera ?
            this._pickImage(navigate)
          :
            <Button
            onPress={() => this.toggleRenderCamera()}
            title="Enable camera"
            color="#841584"
            style={{ width: 640, height: 480 }}
            />
        }

      </View>
      );
    }
  }

  toggleRenderCamera = () => {
    this.setState({
      renderCamera: !this.state.renderCamera
    })
  }

  _pickImage = (nav) => {
    return (
      <View >
          <Camera ref={ref => { this.camera = ref; }} style={{ width: 640, height: 480 }} type={this.state.type}>
            <View
              style={{

                backgroundColor: 'transparent',
                flexDirection: 'row',
                //alignItems: 'center', justifyContent: 'center'
                alignSelf: 'stretch',
              }}>{console.log("test2_3")}
              <TouchableOpacity
                style={{

                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>{console.log("test2_4")}
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>{console.log("test2_5")}
              </TouchableOpacity>
            </View>
          </Camera>{console.log("test2_66")}

          <Button
          /*onPress={() => (async () => {if (this.camera) {
            {console.log("kjoert22")}
            let photo = await this.camera.takePictureAsync();
            {console.log("kjoert2")}}}
          )()
        }*/
          onPress={async () => {
              if (this.camera) {
              let photo = await this.camera.takePictureAsync();
              {console.log("kjoert33")}
              store.save("backgroundImage", photo.uri);
              this.toggleRenderCamera(); nav("Calendar"); 
            }}}

          title="Take background photo!"
          color="#841584"
          style={{ width: 640, height: 480 }}
          />
        </View>

      );

  };

  // snap = async () => {
  //   if (this.camera) {
  //     let photo = await this.camera.takePictureAsync();
  //     {console.log("kjoert2")}
  //     }
  //   };

}
/*

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}*/


// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
//
// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

/// New section   New section  New section  New section  New section  New section

/*
import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}
*/
