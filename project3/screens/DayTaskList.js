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
    this.updateOneEvent = this.updateOneEvent.bind(this);
  }

  refresh() {
    return store.get("events").then((events) => {
      if (!events) {
        return null;
      }
      const results = events.filter(event => moment(event.date).format("YYYY-MM-DD") == moment(this.props.navigation.state.params.date).format("YYYY-MM-DD"));
      this.setState({ events: results })
    })
  }

  updateOneEvent(oldEvent, value){
    // deletes existing event entry in store and adds an updated one
    oldEvent["taskDone"] = value
    store.get("events").then((events) => {
      const result = events.filter(event => event.title != oldEvent.title && moment(event.date).startOf("day") != moment(oldEvent.date).startOf("day"))
      return store.save("events", result)
    }).then(() => {store.push("events", oldEvent);
    })
    this.refresh()
  }

  componentDidMount() {
    // subscribe to focus events (when returning from a new page) and refresh the daily list 
    const didFocusSub = this.props.navigation.addListener(
      'didFocus',
      payload => {
        (async () => this.refresh())();
      }
    );
    // fetch all events in day the first time
    this.refresh()
  }

  render() {
    const { navigate } = this.props.navigation;
    // map events to EventEntries with switches that call updateOneEvent
    const events = this.state.events.map((event) => {
      return <EventEntry key={event.name + event.startTime} event={event} onPress={() => {
        navigate("ViewEvent", { event: event })
      }} eventSwitch={this.updateOneEvent}/>
    })
    return (
      <View>
        <Text style={labelStyle}>{moment(this.props.navigation.state.params.date).format("LL")}</Text>
        <View>
          <ScrollView>
            {events}
          </ScrollView>
        </View>
        <View style={buttonRowStyle}>
          {/* <Button title="Refresh" onPress={() => this.refresh()} /> */}
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