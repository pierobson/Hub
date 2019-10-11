import React from 'react';
import { ScrollView, StyleSheet, View, Platform, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Dimensions } from 'react-native';
import '../components/Prefs.js';


export default class SearchScreen extends React.Component {
  
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <ScrollView style={styles.platformContainer, this.props.screenProps.mode ? styles.darkContainer : styles.lightContainer}>
        <View style={styles.welcomeContainer}>
              <Image
                source={require('../assets/images/hub-icon.png')}
                style={styles.welcomeImage}
              />

              <SearchBar placeholder='search...' 
                         onChangeText={this.updateSearch} 
                         value={search} 
                         lightTheme={!this.props.screenProps.mode}
                         inputContainerStyle={this.props.screenProps.mode ? styles.darkSearchBar: styles.lightSearchBar} 
                         containerStyle={this.props.screenProps.mode ? styles.darkSearchContainer : styles.lightSearchContainer}
                         placeholderTextColor={this.props.screenProps.mode ? global.darkText : global.lightText}
                        />
                  
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: global.darkBackground,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  lightContainer: {
    flex: 1,
    backgroundColor: global.lightBackground,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  platformContainer: {
    flex: 1,
    backgroundColor:  global.darkBackground,
    paddingTop: (Platform.OS == 'android') ? 8 : 0, 
  },
  welcomeContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 10,
    paddingTop: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
  welcomeImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  darkSearchContainer: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 65,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderWidth: 0,
    padding: 0,
    backgroundColor: global.darkBackground,
  },
  lightSearchContainer: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 65,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderWidth: 0,
    padding: 0,
    backgroundColor: global.lightBackground,
  },
  darkSearchBar: {
    alignSelf: 'center',
    height: 35,
    marginBottom: 5,
    backgroundColor: global.darkTabNav,
  },
  lightSearchBar: {
    alignSelf: 'center',
    height: 35,
    marginBottom: 5,
    backgroundColor: global.lightTabNav,
  },
});

SearchScreen.navigationOptions = {
  header: null,
};