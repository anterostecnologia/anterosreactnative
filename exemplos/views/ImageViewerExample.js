import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';

import {AnterosText, AnterosNavigationPage, AnterosImage, AnterosImageViewer} from 'anteros-react-native'

const {width} = Dimensions.get('window');

const images = [
    {
        source: {
            uri:
                'https://avatars.mds.yandex.net/get-pdb/49816/d9152cc6-bf48-4e44-b2d5-de73b2e94454/s800',
        },
        title: 'London',
    },
    {
        source: require('../images/spb.jpg'),
        title: 'St-Petersburg',
        width: 1200,
        height: 800,
    },
    {
        source: {
            uri:
                'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
        },
        title: 'Paris',
        width: 806,
        height: 720,
    },
    {
        source: {
            uri:
                'https://source.unsplash.com/RKsLQoSnuTc/960x720',
        },
        title: 'Metropolitan City of Venice, Italy',
        width: 960,
        height: 720,
    },
    {
        source: {
            uri:
                'https://source.unsplash.com/-kgrPSetNW8/960x720',
        },
        title: 'Москва, Россия',
        width: 960,
        height: 720,
    },
    {
        source: {
            uri:
                'https://source.unsplash.com/dgE3lWVyDh8/960x720',
        },
        title: 'Manhatten, New York, USA',
        width: 960,
        height: 720,
    }

];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    footer: {
        width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    footerButton: {
        flexDirection: 'row',
        marginLeft: 15,
    },
    footerText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
    },
});

export default class ImageViewerExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Image viewer',
        showBackButton: true
    };
    
    constructor(props) {
        super(props);

        this.state = {
            imageIndex: 0,
            isImageViewVisible: false,
            likes: images.reduce((acc, image) => {
                acc[image.title] = 0;

                return acc;
            }, {}),
        };

        this.renderFooter = this.renderFooter.bind(this);
    }

    renderFooter({title}) {
        const {likes} = this.state;

        return (
            <View style={styles.footer}>
                <AnterosText style={styles.footerText}>{title}</AnterosText>
                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => {
                        const imageLikes = likes[title] + 1;
                        this.setState({likes: {...likes, [title]: imageLikes}});
                    }}
                >
                    <AnterosText style={styles.footerText}>♥</AnterosText>
                    <AnterosText style={[styles.footerText, {marginLeft: 7}]}>
                        {likes[title]}
                    </AnterosText>
                </TouchableOpacity>
            </View>
        );
    }

    renderPage() {
        const {isImageViewVisible, imageIndex} = this.state;

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        {images.map((image, index) => (
                            <TouchableOpacity
                                key={image.title}
                                onPress={() => {
                                    this.setState({
                                        imageIndex: index,
                                        isImageViewVisible: true,
                                    });
                                }}
                            >
                                <AnterosImage
                                    style={{width, height: 200}}
                                    source={image.source}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    {/* <AnterosImageViewer
                        images={images}
                        imageIndex={imageIndex}
                        animationType="fade"
                        isVisible={isImageViewVisible}
                        renderFooter={this.renderFooter}
                    /> */}
                </View>
            </ScrollView>
        );
    }
}