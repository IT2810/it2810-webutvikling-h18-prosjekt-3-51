## Image processing
For image handling and processing we have assigned an individual screen where the user can either take pictures with the camera or access the image gallery. The picture is stored in AsyncStorage and viewed on the Calendar screen and thus being the motivational aspect for using the app. All information is stored using AsyncStorage.

## Image Gallery
The Image gallery is build using the [ImagePicker](https://docs.expo.io/versions/v30.0.0/sdk/imagepicker) for accessing the system's UI for selecting images and videos from the phone's library in a neat way.

## Phone Camera
For taking pictures, we have implemented the [Camera](https://docs.expo.io/versions/v30.0.0/sdk/camera) component which grants user for permission to access camera. When user has granted access, the user is able to take a picture.
