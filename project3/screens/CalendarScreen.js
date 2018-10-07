import React, { Component } from 'react';
import { View, Text, Button } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

class CalendarScreen extends Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>
          Hello world! I am here!
        </Text>
        <Calendar
          monthFormat={"yyyy MM"}
          hideDayNames={false}
          showWeekNumbers={true}
          onPressArrowleft={submonth => submonth()}
        />
        <Button
          title="Add event"
          onPress={() =>
            navigate("AddEvent",{})}
          />
      </View>
    );
  }
}

export default CalendarScreen;

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