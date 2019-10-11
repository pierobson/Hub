import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import '../components/Prefs.js';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.platformContainer}>
        <ScrollView style={this.props.screenProps.mode ? styles.darkContainer : styles.lightContainer}>
          <View style={this.props.screenProps.mode ? styles.darkWelcomeContainer : styles.lightWelcomeContainer}>
              <Image
                source={require('../assets/images/hub-icon.png')}
                style={styles.welcomeImage}
              />
  
              <Text style={this.props.screenProps.mode ? styles.darkWelcomeText : styles.lightWelcomeText}>Home</Text>
  
              <View style={styles.welcomeSpacer}/>
                  
          </View>
  
          <View style={this.props.screenProps.mode ? styles.darkContainer : styles.lightContainer, styles.getStartedContainer}>
            <DevelopmentModeNotice />
  
            <Text style={styles.getStartedText}>Get started by opening</Text>
  
            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText>screens/HomeScreen.js</MonoText>
            </View>
  
            <Text style={styles.getStartedText}>
              CONTENT
            </Text>
          </View>
  
          <View style={this.props.screenProps.mode ? styles.darkContainer : styles.lightContainer, styles.helpContainer}>
            <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>
                Help, it didn’t automatically reload!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
  
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: global.darkBackground,
  },
  lightContainer: {
    flex: 1,
    backgroundColor: global.lightBackground,
  },
  platformContainer: {
    flex: 1,
    paddingTop: (Platform.OS == 'android') ? 8 : 0, 
  },
  developmentModeText: {
    marginBottom: 20,
    color: global.darkText,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  darkWelcomeContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
    backgroundColor: global.darkBackground,
  },
  lightWelcomeContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
    backgroundColor: global.lightBackground,
  },
  welcomeImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginBottom: 5,
    marginLeft: 10,
  },
  darkWelcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: global.darkText,
    marginBottom: 5,
  },
  lightWelcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: global.lightText,
    marginBottom: 5,
  },
  welcomeSpacer: {
    marginLeft: 41,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: global.darkText,
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: global.darkText,
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
