import React, { Component } from 'react';
import { View, Text, Button, ScrollView, KeyboardAvoidingView, AsyncStorage } from "react-native";
import moment from "moment";
import EventEntry from "../components/EventEntry";
import store from "react-native-simple-store";
import {labelStyle, flexStyle, buttonRowStyle} from "../constants/Styles"

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
        <Text style={labelStyle}>{moment(this.props.navigation.state.params.date).format("LL")}</Text>
        <ScrollView>
          {events}
        </ScrollView>
        <View style={buttonRowStyle}>
          <Button title="Refresh" onPress={() => this.refresh()} />
          <Button
            title="Add event"
            onPress={() =>
              navigate("AddEvent", { dayDate: moment(this.props.navigation.state.params.date).format("YYYY-MM-DD") })}
          />
        </View>
      </View>);
  }
}

export default DayTaskList;