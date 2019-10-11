import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import VideoPost from './VideoPost'

const {width, height} = Dimensions.get('window');

export default class Post extends React.Component {

    render() {

        if (this.props.post.type != 'video') {
            // Image post

            let actualWidth = (this.props.post.width > width - 10) ? width - 10 : this.props.post.width;
            let actualHeight = this.props.post.height * (actualWidth / this.props.post.width);
            return (

                <View style={styles.container} contentContainerStyle={styles.contentContainer}> 
        
                    <Image source={{ uri: this.props.post.url }}
                           style={styles.image, {width : actualWidth, height: actualHeight}}/>

                    <View style={styles.captionContainer}>
                        <Text style={styles.caption}><Text style={styles.handle}>@{this.props.post.handle}</Text>   {this.props.post.caption}</Text>
                    </View> 
        
                </View>
        
            );
        } else {
            // Video post
            return (
                <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        
                    <VideoPost post={this.props.post}/>           

                    <View style={styles.captionContainer}>
                        <Text style={styles.caption}><Text style={styles.handle}>@{this.props.post.handle}</Text>   {this.props.post.caption}</Text>
                    </View> 
                           
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: width - 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginBottom: 15,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    captionContainer: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: '#555',
        padding: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: 'grey',
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: 'grey',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    video: {
        flex: 1,
        width: Dimensions.get('window').width,
        aspectRatio: 1, 
        alignSelf: 'center',
        backgroundColor: 'black',
    },
    handle: {
        flex: 1,
        color: 'grey',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    caption: {
        flex: 1,
        color: 'white',
        fontSize: 14,
        textAlign: 'left',
        marginLeft: 10,
    },
});
