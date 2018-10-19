import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import CalendarScreen from "../screens/CalendarScreen";
import AddEditEvent from "../screens/AddEditEvent";
import EventInfoScreen from "../screens/EventInfoScreen";
import DayTaskList from "../screens/DayTaskList";
import EmojIcon from '../components/EmojIcon';
import CameraExample from "../screens/PhoneCameraScreen";
import AddImageEvent from "../screens/AddImageEvent";
import ContactsScreen from "../screens/ContactsScreen";
import AddContact from "../screens/AddContact";
import ViewContact from "../screens/ViewContact";

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

const CameraStack = createStackNavigator({
  Camera: CameraExample,
  Gallery: AddImageEvent,
})

CameraStack.navigationOptions ={
  tabBarLabel: "Camera",
  tabBarIcon: ({ focused }) => (
    <EmojIcon emoji={"📷"} focused={focused}/>
  ),
};

const ContactsStack = createStackNavigator({
  Contacts: ContactsScreen,
  AddContact: AddContact,
  ViewContact: ViewContact,
})

ContactsStack.navigationOptions ={
  tabBarLabel: "Contacts",
  tabBarIcon: ({ focused }) => (
    <EmojIcon emoji={"👥"} focused={focused}/>
  ),
};

export default createBottomTabNavigator({
  CalendarStack,
  ContactsStack,
  CameraStack,
});
