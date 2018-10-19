## Image processing
For image handling and processing we have assigned an individual screen where the user can either take pictures with the camera or access the image gallery. The picture is stored in AsyncStorage and viewed on the Calendar screen and thus being the motivational aspect for using the app. All information is stored using AsyncStorage.

## Image Gallery
The Image gallery is build using the [ImagePicker](https://docs.expo.io/versions/v30.0.0/sdk/imagepicker) for accessing the system's UI for selecting images and videos from the phone's library in a neat way.
We have our code for accessing and handling the gallery in AddImageEvent.js.

```js
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
```

«_pickImage» is the function used to a access the gallery. Here we use the built in launchImageLibraryAsync()

## Phone Camera
For taking pictures, we have implemented the [Camera](https://docs.expo.io/versions/v30.0.0/sdk/camera) component which grants user for permission to access camera. When user has granted access, the user is able to take a picture.

```js
  _pickImage = (nav) => {
<View >
        <Camera ref={ref => { this.camera = ref; }} style={{ width: 640, height: 480 }} type={this.state.type}>
}
```

_pickImage is used to render our camera. Prior to this call we set the state on renderCamera. If renderCamera is set to true when clicking the button, the camera will render.

```js
toggleRenderCamera = () => {
    this.setState({
      renderCamera: !this.state.renderCamera
    })
  }
```

Here we have the toggleRenderCamera which updates the state on renderCamera. When the state is changed, the render() is run again and our _pickImage which renders the camera is run.
