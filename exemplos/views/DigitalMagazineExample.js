// import Exponent from 'exponent';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


import {AnterosNavigationPage,AnterosDigitalMagazine} from 'anteros-react-native';

export default class DigitalMagazineExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Digital magazine',
      showBackButton: true,
    };

    state = {
        appIsReady: false,
    }

    // async componentWillMount() {
    //     try {
    //         await Exponent.Font.loadAsync({cursive: require('../assets/fonts/dancingscript.ttf')});
    //         this.setState({appIsReady: true});
    //     } catch(e) {
    //         // console.warn(
    //         //     'There was an error caching assets (see: main.js), perhaps due to a ' +
    //         //     'network timeout, so we skipped caching. Reload the app to try again.'
    //         // );
    //         // console.log(e.message);
    //     }
    // }



    renderPage() {
        // if (!this.state.appIsReady) {
        //     return (
        //         <Exponent.Components.AppLoading />
        //     );
        // }

        return (
            <View style={styles.container}>
                <AnterosDigitalMagazine
                    images={[require('../images/page1.jpg'), require('../images/page2.jpg'), require('../images/page3.jpg')]}
                    items={
                    [
                        {page: 0, color: '#ca2214', publisher:'ANIMELDELSE',
                        highlight: 'SICARIO',
                        title: ', OUTSTANDING WORK FROM EMILY BLUNT AND BENICIO DEL TORO', author: 'Af Thomas Tanggaard'},
                        {page: 1, color: '#3db3db', publisher:'NYHED',
                        title: "BEVERYLY HILLS' BRANDON HAR HOVEDROLLEN I NY KRIMIKOMEDIE", author: 'Af Thomas Tanggaard'},
                        {page: 2, color: '#ca2214', publisher:'ANIMELDELSE',
                        highlight: 'STRANGER THINGS\n',
                        title: 'WHEN IS SEASON 2 COMING OUT PLEASE COME OUT ALREADY', author: 'Af Thomas Tanggaard'},
                    ]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});