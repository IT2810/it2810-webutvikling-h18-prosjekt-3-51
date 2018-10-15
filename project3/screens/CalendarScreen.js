
import React, { Component } from 'react';
import { Button, Image, View, Text } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { ImagePicker } from 'expo';


class CalendarScreen extends React.Component {
  state = {
    image: null,
  };

  static navigationOptions = {
    title: 'Calendaar',
  };

  render() {
    let { image } = this.state;

    return (
      <View>
      <Button
       title="Add image to contact"
       onPress={this._pickImage}
     />
     {image &&
       <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Calendar
          monthFormat={"yyyy MM"}
          hideDayNames={false}
          showWeekNumbers={true}
          onPressArrowleft={submonth => submonth()}
        />

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

    // videre hvor man skal koble image uri til basert
  };

}

export default CalendarScreen;

// import React, { Component } from 'react';
// import { Button, Image, View, Text } from "react-native";
// import { Calendar, CalendarList, Agenda } from "react-native-calendars";
// import { ImagePicker } from 'expo';
//
//
// class CalendarScreen extends Component {
//   state = {
//     image: null,
//   };
//
//   static navigationOptions = {
//     title: 'Calendar',
//   };
//
//   render() {
//     let { image } = this.state;
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Button
//           title="Pick an image from camera roll"
//           onPress={this._pickImage}
//         />
//         {image &&
//           <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//       </View>
//     );
//   }
//
//   _pickImage = async () => {
//   let result = await ImagePicker.launchImageLibraryAsync({
//     allowsEditing: true,
//     aspect: [4, 3],
//   });
//
//   console.log(result);
//
//   if (!result.cancelled) {
//     this.setState({ image: result.uri });
//   }
// };
// }
//
// export default CalendarScreen;

/*
<Agenda
  items={{
      "2018-10-05": [{text: "hello world!"}],
      "2018-10-07": [{text:"what's on your agenda?"}]
    }}
  renderitem={(item, firstItemInDay) => {return (<View>
    <Text>contents: {item.text}</Text>
  </View>);}}
  renderDay={(day, item) => {return (<View />);}}
  renderEmptyDate={() => {return (<View />);}}
  renderKnob={() => {return (<View />);}}
  renderEmptyData = {() => {return (<View />);}}
  rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
  refreshing={false}
  refreshControl={null}
  />
*/
