import React, { Component } from 'react';
import { View, Text, Button, ScrollView, KeyboardAvoidingView, AsyncStorage } from "react-native";
import moment from "moment";
import EventEntry from "../components/EventEntry";
import store from "react-native-simple-store";

class DayTaskList extends Component {
  static navigationOptions = {
    title: 'Events in day',
  };

  constructor(props) {
    super(props);
    this.state = { events: [] }
  }

  refresh() {
    return store.get("events").then((events) => {
      console.log(events)
      console.log(moment(this.props.navigation.state.params.date).format("YYYY-MM-DD"))
      const results = events.filter(event => moment(event.date).format("YYYY-MM-DD") == moment(this.props.navigation.state.params.date).format("YYYY-MM-DD"));
      this.setState({ events: results })
    })
  }

  componentDidMount() {
    // fetch all events in day
    this.refresh()
  }

  render() {
    const { navigate } = this.props.navigation;
    const events = this.state.events.map((event) => {
      return <EventEntry key={event.startTime} event={event} onPress={() => {
        navigate("ViewEvent", { event: event })
      }} />
    })
    return (
      <View>
        <Text>{moment(this.props.navigation.state.params.date).format("LL")}</Text>
        <ScrollView>
          {events}
        </ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 15 }}>
          <Button
            title="Add event"
            onPress={() =>
              navigate("AddEvent", { dayDate: moment(this.props.navigation.state.params.date).format("YYYY-MM-DD") })}
          />
          <Button title="Refresh" onPress={() => this.refresh()} />
        </View>
      </View>);
  }
}

export default DayTaskList;