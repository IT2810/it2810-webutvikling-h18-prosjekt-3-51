import React from 'react';
import { Text, View, TouchableOpacity, Button, AsyncStorage } from 'react-native';
import { Camera, Permissions } from 'expo';
import store from "react-native-simple-store";

export default class CameraExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      renderCamera: false
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async componentDidMount() {
    const didFocusSub = this.props.navigation.addListener(
      'didFocus',
      payload => {
        (async () => this.setState({
          renderCamera: false
        }))();
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
            <View>
              <Button
                onPress={() => this.toggleRenderCamera()}
                title="Enable camera"
                color="#841584"
                style={{ width: 640, height: 480 }}
              />
              <Button
                onPress={() => navigate("Gallery")}
                title="View camera roll"
                color="#841584"
                style={{ width: 640, height: 480 }}
              /></View>
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
              { console.log("kjoert33") }
              store.save("backgroundImage", photo.uri);
              this.toggleRenderCamera(); nav("Calendar");
            }
          }}

          title="Take background photo!"
          color="#841584"
          style={{ width: 640, height: 480 }}
        />
      </View>

    );

  };

}
