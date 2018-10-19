import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import SettingsScreen from '../screens/SettingsScreen';
import CalendarScreen from "../screens/CalendarScreen";
<<<<<<< HEAD
import AddEditEvent from "../screens/AddEditEvent";
import EventInfoScreen from "../screens/EventInfoScreen";
import DayTaskList from "../screens/DayTaskList";
import EmojIcon from '../components/EmojIcon';
=======
import ImagePicker from "../screens/ImagePicker";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};
>>>>>>> 3085ff690cc96cd60f5eda8cdbb7dfe26f1da672

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
<<<<<<< HEAD
  AddEvent: AddEditEvent,
  ViewEvent: EventInfoScreen,
  ViewDay: DayTaskList,
=======
//  AddImage: addImageEvent,
>>>>>>> 3085ff690cc96cd60f5eda8cdbb7dfe26f1da672
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
