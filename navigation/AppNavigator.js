import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import '../components/Prefs.js';
import MainTabNavigator from './MainTabNavigator';

const Container = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
  })
);

export default class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: global.darkMode,
    };
  }
  render() {
    return <Container screenProps={{toggleMode: () => {this.setState({mode:!this.state.mode})}, mode:this.state.mode}} />;
  }
}
