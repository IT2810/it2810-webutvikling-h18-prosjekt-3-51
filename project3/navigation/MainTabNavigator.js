import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import SettingsScreen from '../screens/SettingsScreen';
import CalendarScreen from "../screens/CalendarScreen";
import AddEditEvent from "../screens/AddEditEvent";
import EventInfoScreen from "../screens/EventInfoScreen";
import DayTaskList from "../screens/DayTaskList";
import EmojIcon from '../components/EmojIcon';

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Contacts (?)',
  tabBarIcon: ({ focused }) => (
    <EmojIcon emoji={"👥"} focused={focused}/>
  ),
};

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
  AddEvent: AddEditEvent,
  ViewEvent: EventInfoScreen,
  ViewDay: DayTaskList,
})

CalendarStack.navigationOptions ={
  tabBarLabel: "Calendar",
  tabBarIcon: ({ focused }) => (
    <EmojIcon emoji={"📅"} focused={focused}/>
  ),
};

export default createBottomTabNavigator({
  CalendarStack,
  SettingsStack,
});
