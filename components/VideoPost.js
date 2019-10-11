import React from 'react';
import { StyleSheet, Dimensions} from 'react-native';
import { Video } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class VideoPost extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            muted: true,
        }
    }
    
    _play() {
        this.setState({playing:true});
    }

    _pause() {
        this.setState({playing:false});
    }

    _toggle_mute() {
        this.setState({muted:!this.state.muted});
    }

    render() {
        return (
        
        <TouchableOpacity onPress={this._toggle_mute.bind(this)} activeOpacity={1}>
            <Video source={{ uri: this.props.post.url }} 
                isLooping={true}
                shouldPlay={true}
                isMuted={this.state.muted}
                volume={1.0}
                style={styles.video}/>
        </TouchableOpacity>
        
    );}

}

const styles = StyleSheet.create({
    video: {
        flex: 1,
        width: Dimensions.get('window').width,
        aspectRatio: 1, 
        alignSelf: 'center',
        backgroundColor: 'black',
    },
});