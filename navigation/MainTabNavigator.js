import React from 'react';
import { Platform, StyleSheet, } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = ({ screenProps }) => {
  return {
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
    tabBarOptions: {
      labelStyle: {
        color: screenProps.mode ? global.darkText : global.lightText,
      },
      tabStyle: {
        backgroundColor: screenProps.mode ? global.darkTabNav : global.lightTabNav,    
      }
    },
  };
};

HomeStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  config
);

SearchStack.navigationOptions = ({ screenProps }) => {
  return {
    tabBarLabel: 'Search',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
    ),
    tabBarOptions: {
      labelStyle: {
        color: screenProps.mode ? global.darkText : global.lightText,
      },
      tabStyle: {
        backgroundColor: screenProps.mode ? global.darkTabNav : global.lightTabNav,    
      }
    },
  };
};

SearchStack.path = '';


const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
  },
  config
);

ProfileStack.navigationOptions = ({ screenProps }) => {
    return {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
      ),
      tabBarOptions: {
        labelStyle: {
          color: screenProps.mode ? global.darkText : global.lightText,
        },
        tabStyle: {
          backgroundColor: screenProps.mode ? global.darkTabNav : global.lightTabNav,    
        }
      },
    };
  };

ProfileStack.path = '';


const tabNavigator = createBottomTabNavigator({
  SearchStack,
  HomeStack,
  ProfileStack
},
{
  initialRouteName: 'HomeStack',
});

export default tabNavigator;
