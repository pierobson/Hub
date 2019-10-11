import React from 'react';
import { View, Image, Text, Platform, StyleSheet } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import TabBarIcon from '../components/TabBarIcon';
import * as WebBrowser from 'expo-web-browser';
import Post from '../components/Post';
import SettingsScreen from './SettingsScreen';
import SideMenu from 'react-native-side-menu';
import { Dimensions } from 'react-native';
import { JSO, Popup } from 'jso';
import '../components/Prefs.js';

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      insta_access_token: null,
      twitter_access_token: null,
      content: [],
      isOpen: false,
      mode: props.screenProps.mode,
      username: undefined,
      profilePic: undefined,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ toggle: this._toggle.bind(this), getMode: this._getMode.bind(this),
                                      getUser: this.state.username, getProfilePicture: this.state.profilePic });
  }

  changeMode() {
    this.setState({mode:!this.state.mode});
    this.props.screenProps.toggleMode();
  }

  _getMode() {
    return this.state.mode;
  }

  _toggle() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    let content = (this.state.insta_access_token == null && this.state.twitter_access_token == null) ? 
                    (<View style={styles.buttonWrapper}>
                        <TouchableOpacity
                          style={styles.button} 
                          onPress={this._handleOpenAuthLink}>
                          <Text style={styles.buttonText}>Login to Instagram</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.button} 
                          onPress={this._handleOpenTwitterAuth}>
                          <Text style={styles.buttonText}>Login to Twitter</Text>
                        </TouchableOpacity>
                     </View>) :
                    (<FlatList
                        data={this.state.content}
                        renderItem={({ item }) => (
                          <Post post={item}></Post>
                        )}
                        keyExtractor={item => item.url}
                        style={styles.container}
                        contentContainerStyle={styles.postList}
                    />);
    const settings = <SettingsScreen screenProps={this.props.screenProps} changeMode={this.changeMode.bind(this)}/>;
    const profPic = this.state.profilePic 
                    ? {uri: this.state.profilePic}
                    : require('../assets/images/hub-icon.png');
    const user = this.state.username
                 ? '@' + this.state.username
                 : 'Sign In';
    return (
      <View style={styles.platformContainer}>
        <View style={this.props.screenProps.mode ? styles.darkHeader : styles.lightHeader}>
          <View style={this.props.screenProps.mode ? styles.darkWelcomeContainer : styles.lightWelcomeContainer}>
              <Image
                source={profPic}
                style={styles.welcomeImage}
              />
  
              <Text style={this.props.screenProps.mode ? styles.darkWelcomeText : styles.lightWelcomeText}>{user}</Text>
  
              <TouchableOpacity onPress={this._toggle.bind(this)} style={{marginRight: 20}}>
                <TabBarIcon color={this.props.screenProps.mode ? global.darkText : global.lightText} name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}/>
              </TouchableOpacity>

          </View>
        </View>

        <View style={this.props.screenProps.mode ? styles.darkContainer : styles.lightContainer}>

        <SideMenu menu={settings} menuPosition='right' openMenuOffset={Dimensions.get('window').width * 4/5} isOpen={this.state.isOpen} disableGestures={true}>

          <View style={this.state.mode ? styles.darkContainer : styles.lightContainer}
                contentContainerStyle={styles.contentContainer}>

              {content}

          </View>    

        </SideMenu>
        
        </View>
  
      </View>
    );
  }

  _handleOpenAuthLink = () => {
    const config = {
      clientId: '12d9b35f1ee741cd9e3fd2ef6d1de398',
      redirect_uri: 'https://123hub987.weebly.com'
    };
    
    if (this.state.insta_access_token == null) {
      WebBrowser.openAuthSessionAsync('https://api.instagram.com/oauth/authorize/?client_id=' + config.clientId + '&redirect_uri=' + config.redirect_uri + '&response_type=token')
        .then(function(result) {
        let url = result.url;
        let token = url.split('token=')[1];
        if (token != null) {
          this.setState({insta_access_token: token})
          this._fetchProfile(token);
        } else {
          this._authFailure();
        }
      }.bind(this), function(err) {
        alert(err);
      }).catch(function(error) {
        alert('An error occured. Please check your connection and try again.');
        console.log("An error occured: ", error);
      });
    } else {
      this._fetchProfile(this.state.insta_access_token);
    }  
  }
  
  _fetchProfile = (token) => {
    let url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token;
    fetch(url).then(function(response) {
      return response.json();
    }.bind(this)).then(function(json) {
      this.setState({username:json['data'][0]['caption']['from']['username'], profilePic:json['data'][0]['caption']['from']['profile_picture']});
      let posts = [];
      for(i=0; i<json['data'].length; i++)  {
        let post = null;
        if (json['data'][i]['type'] == 'video') {
          let video = json['data'][i]['videos']['standard_resolution'];
          post = {
            url: video['url'],
            height: video['height'],
            width: video['width'],
            caption: json['data'][i]['caption']['text'],
            type: json['data'][i]['type'],
            handle: json['data'][i]['caption']['from']['username'],
            };
        } else {
          let image = json['data'][i]['images']['standard_resolution'];
          post = {
            url: image['url'],
            height: image['height'],
            width: image['width'],
            caption: json['data'][i]['caption']['text'],
            type: json['data'][i]['type'],
            handle: json['data'][i]['caption']['from']['username'],
          };
        }
        posts.push(post);
      }
      this.setState({content: posts});
    }.bind(this)).catch(function(error) {
      console.log("An error occured: ", error);
    });
  }
  
  _authFailure = () => {
    alert('Failed to authenticate.');
  }
  

  _handleOpenTwitterAuth = () => {
    let config = {
      providerID: 'twitter',
      client_id: '2jQCb10DCVrX7oUH4XfKoGTpc',
      api_secret: 'udxNzupM4dIEoufT8mneYz0eSNTHve108nxbJHR4mQOFEINmfE',
      redirect_uri: 'https://123.hub987.weebly.com',
      authorization: 'https://api.twitter.com/oauth/request_token',
    };

    /*
      OAuth 
      oauth_nonce="K7ny27JTpKVsTgdyLdDfmQQWVLERj2zAK5BslRsqyw", 
      oauth_callback="http%3A%2F%2Fmyapp.com%3A3005%2Ftwitter%2Fprocess_callback", 
      oauth_signature_method="HMAC-SHA1", 
      oauth_timestamp="1300228849", 
      oauth_consumer_key="OqEqJeafRSF11jBMStrZz", 
      oauth_signature="Pc%2BMLdv028fxCErFyi8KXFM%2BddU%3D", 
      oauth_version="1.0"
    */

    if (this.state.twitter_access_token == null) {
      let nonce = 
      WebBrowser.openAuthSessionAsync(config.url + encodeURI(config.callback) + '&oauth_client').then(function(response) {
        
      }.bind(this)).then(function(json) {
        console.log(JSON.stringify(json));
      }.bind(this)).catch(function(error) {
        console.log("An error occured: ", error);
      });
    }
  }

}

const styles = StyleSheet.create({
  platformContainer: {
    flex: 1,
    paddingTop: (Platform.OS == 'android') ? 8 : 0, 
  },
  darkContainer: {
    flex: 1,
    backgroundColor: global.darkBackground,
  },
  lightContainer: {
    flex: 1,
    backgroundColor: global.lightBackground,
  },
  darkHeader: {
    backgroundColor: global.darkBackground,
    borderBottomColor: 'black',
    height: (Platform.OS == 'android') ? 73 : 60.5,
    paddingTop: (Platform.OS == 'android') ? 8 : 0,
  },
  lightHeader: {
    backgroundColor: global.lightBackground,
    borderBottomColor: 'black',
    height: (Platform.OS == 'android') ? 73 : 60.5,
    paddingTop: (Platform.OS == 'android') ? 8 : 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },  
  touchable: {
    marginRight: 20,
  },
  darkWelcomeContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderRadius: 35/2,
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
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'grey',
    width: 200, 
    height: 100,
    padding: 5,
    marginBottom: 20,
    borderRadius: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#222',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.7,
  },
  buttonText: {
    color: 'blue',
    fontSize: 24,
    textAlign: 'center',
  },
  postList: {
    justifyContent: 'center',
  },
  profilePic: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    borderRadius: 35/2,
  },
});

ProfileScreen.navigationOptions = {
  header: null,
}