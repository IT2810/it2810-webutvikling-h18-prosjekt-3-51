import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";
import store from "react-native-simple-store"

class CalendarScreen extends Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  constructor(props) {
    super(props);
    this.state = { events: {} }
    this.refreshEvents = this.refreshEvents.bind(this);
  }

  async componentDidMount() {
    await this.refreshEvents()
  }

  async refreshEvents() {
    try {
      console.log("Refreshing calendar events view")
      const value = await AsyncStorage.getItem("events"); // fetch all events, should come as a JSON-array
      events = value ? JSON.parse(value) : [] // parse it to an array or create a new array in case 
      let markedDates = {}
      Object.values(events).map(event => { markedDates[event.date] = { marked: true } })
      this.setState({ events: markedDates })
    } catch (error) {
      console.error("Error when refreshing events " + error)
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>
          Hello world! I am here!
        </Text>
        <Calendar
          markedDates={this.state.events}
          monthFormat={"yyyy MM"}
          hideDayNames={false}
          showWeekNumbers={true}
          onPressArrowleft={submonth => submonth()}
          onDayPress={(day) => {navigate("ViewDay", {date: moment(day).subtract(1, "month")})}}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 15 }}>
          <Button
            title="Add event"
            onPress={() =>
              navigate("AddEvent", {})}
          />
          <Button
            title="Refresh events"
            onPress={this.refreshEvents}
          />
          <Button
            title="Delete all events"
            onPress={() => {store.delete("events")}}
          />
        </View>
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