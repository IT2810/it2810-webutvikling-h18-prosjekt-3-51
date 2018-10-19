# Project 3: Personal Information and Motivation Manager

## Group 51

The goal of the project is to create a Personal Information and Motivation Manager (PIMM). Examples of existing apps like these are to-do lists and calendars where you can add appointments with reminders. For our task, we wanted to have a calendar that you could add "events" to, where an event is just an arbitrary thing - a meeting, a birthday party or a to-do. We also wanted to implement a contact list to keep track of people you know, and the ability to have a photo of their face show up in the contact list.

The PIMM is also supposed to give some sort of motivation, so we planned on having events be able to be ticked as "complete", much like how you would cross out something you had already done in a to-do list. 

## Navigation

Navigating between screens is made easier with `react-navigation`. We set up an example React Native project with the "tabs" configuration, which provided a `MainTabNavigator.js` that defined all the navigation related constants. To effectively create a tabbed interface, you create a *stack* for each tab, and add each screen we want to be able to navigate to from that tab, into the stack:

```jsx
const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
  AddEvent: AddEditEvent,
  ViewEvent: EventInfoScreen,
  ViewDay: DayTaskList,
})
```

This enables us to call `navigate("AddEvent")` from a screen in the calendar navigation stack. It is easy to navigate back from a screen, as we are dealing with a stack, so all we have to do is pop from it by calling `goBack()`. To display the actual tabs at the bottom of the screen, we call `createBottomTabNavigator()` with all the different navigation stacks. 

To pass data between screens, we can feed an object into `navigate("AddEvent", {catFood: true})` that gets passed along to the page that gets navigated to, accessible via `props.navigation.state.params` (so the example value passed along would be `props.navigation.state.params.catFood`). One example of usage is to inform our Day screen about what date it should display and fetch events for.

## Calendar

To implement the calendar, we used the excellent [react-native-calendars](https://github.com/wix/react-native-calendars), which provided an intuitive calendar with useful features. For our purposes, we made use of the `markedDates` prop to mark dates in the calendar that had events. To make the calendar more useful and respond when a day is pressed, we simply pass in a method to `onDayPress` which takes the days date as a parameter. In our case, we passed this day value along as a navigation prop for the day task list, but we had to subtract one from the month because of zero/one indexing differences.

```jsx
<Calendar
  markedDates={this.state.events}
  monthFormat={"yyyy MM"}
  hideDayNames={false}
  showWeekNumbers={true}
  onDayPress={(day) => {navigate("ViewDay", {date: moment(day).subtract(1, "month")})}}
/>
```

To mark days with a dot, we have to supply an object to `markedDates` with the following structure:

```js
{
  2018-10-19: { marked: true },
  2018-12-24: { marked: true } }
}
```

## Events

Events are implemented across the screens as an object on the following form:

```js
{
  title: "Feed the cat",
  date: "2018-09-20",
  startTime: "16:45",
  endTime: "16:59",
  desc: "buy more cat food if necessary",
  taskDone: false
}
```

Date is stored as a string in ISO date format, and times are also just strings (it turned out our date/time picker was a lot friendlier with strings).

### Creating an event

To create an event, we have a screen called `AddEditEvent` that provides text fields for the title and description of an event, as well as a date picker, and time pickers for start and end times. For the date and time pickers we used [react-native-datepicker](https://github.com/xgfe/react-native-datepicker) which uses native datepickers on Android and iOS respectively. The `DatePicker` component can be used in different modes, and thus supports being a date picker, a time picker or both a date and time picker. Our event start time picker is implemented like this:

```jsx
<DatePicker
  mode="time"
  format="HH:mm"
  date={this.state.startTime}
  minuteInterval={10}
  onDateChange={(time) => {this.setState({ startTime: time}) }}
/>
```

## Storage of events

We used `AsyncStorage` as a method for storing persistent data across sessions. AsyncStorage stores key-value pairs where both key and value are strings. To store our event objects, we therefore had to serialize them to JSON strings first. Storing many events into AsyncStorage and easily being able to fetch them again can be done in various ways. We opted for the simplest solution of just using an array as a value for the key `"events"`, and pushing to the array each time an event is added. To retrieve events for a specific day, we retrieve the entire events array, then filter on the date in each event. To delete a specific event, we retrieve the entire array, and filter on the title and date, and store the resulting array without matching events. It is not the most sophisticated way to go about it, but it works for our purposes.

To store arrays in AsyncStorage, we used [react-native-simple-store](https://github.com/jasonmerino/react-native-simple-store) which streamlines the interaction with AsyncStorage, especially for arrays. To add an event, we simply do:

```js
store.push("events", event)
```

Where `event` is an event object as mentioned earlier. To retrieve the entire array, we use `store.get("events")` which resolves into an array automatically.

## Testing

The requirements of the project were to have a systematic way of testing the components. We had great difficulties with testing, as our project would not even run the provided tests in the example setup. We could not get npm configured to work with Jest.

Another problem for our testing is that most of our logic is not easily tested. We tried defining a method for adding an event to the store, but difficulties with executing async functions imported from other files arised, so the simplest solution was to just define these with arrow functions fed into components. We could test the logic by simulating presses on buttons (e.g. to add an event and then go to the day page and observe if the event renders) but we fell a bit short on time.

## Collaboration

As with project 2, git was used to keep track of issues and delegate work. This time around we were more structured, and more strictly worked in separate branches for each issue, as the task lent itself well for this; each aspect of the app (calendar & events, contacts, camera) is relatively separate and can thus be implemented in their own navigation stacks.