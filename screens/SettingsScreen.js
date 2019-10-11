import React from 'react';
import { ScrollView, StyleSheet, View, Switch, Text } from 'react-native';
import '../components/Prefs.js';

export default class SettingsScreen extends React.Component {
  
  state = {mode:this.props.screenProps.mode}

  toggleMode = (value) => {
    this.setState({mode:value});
    this.props.changeMode();
    global.darkMode = value;
  }
  
  render() { 
    return (
      <ScrollView style={this.state.mode ? styles.darkContainer : styles.lightContainer}>
        <View style={styles.themeContainer}>

          <Text style={this.state.mode ? styles.darkThemeText : styles.lightThemeText}>Toggle Theme</Text>

          <Switch onValueChange={this.toggleMode} value={this.state.mode} style={this.state.mode ? styles.darkSwitch: styles.lightSwitch}/>

        </View>
      </ScrollView>
    );
  }
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: global.darkSettings,
  },
  lightContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: global.lightSettings,
  },
  themeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 15,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  darkSwitch: {
    flex: 1,
    backgroundColor: global.darkSettings,
  },
  lightSwitch: {
    flex: 1,
    backgroundColor: global.lightSettings,
  },
  darkThemeText: {
    flex: 2,
    fontSize: 18,
    color: global.darkText,
    textAlign: 'center',
  },
  lightThemeText: {
    flex: 2,
    fontSize: 18,
    color: global.lightText,
    textAlign: 'center',
  },
});
