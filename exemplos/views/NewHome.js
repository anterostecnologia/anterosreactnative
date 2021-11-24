// Home.js

'use strict';
import PropTypes from 'prop-types'; 
import {Component} from 'react';
import {View, ScrollView, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {AnterosIcon} from 'anteros-react-native';
import {AnterosTheme, AnterosNavigationPage, AnterosNavigationBar, AnterosLabel} from 'anteros-react-native';
import {AnterosGrid} from 'anteros-react-native';
import ArticlesExample from './ArticlesExample';
import AuthenticationExample from './AuthenticationExample';
import ButtonExample from './ButtonExample';
import CalendarExample from './CalendarExample';
import LayoutExample from './LayoutExample';
import OthersExample from './OthersExample';
import NavigationExample from './NavigationExample';
import ListExample from './ListExample';
import ECommerceExample from './ECommerceExample';
import ImageExample from './ImageExample';
import SelectExample from './SelectExample';
import CardExample from './CardExample';
import ModalExample from './ModalExample';
import Examples from './Examples';
import LoadersExample from './LoadersExample';
import GaugeExample from './GaugeExample';
import ChartExample from './ChartExample';
//configuraçāo dos icones de FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
library.add(fas)


const items = [
    {
        name: 'Articles',
        icon: 'newspaper'
    },      
    {
        name: 'Authentication',
        icon: 'lock'
    }, {
        name: 'Buttons',
        icon: 'box'
    }, {
        name: 'Calendar',
        icon: 'calendar'
    }, {
        name: 'Cards',
        icon: 'credit-card'
    },{
        name: 'Charts',
        icon: 'chart-line'
    },{
        name: 'Examples',
        icon: 'ribbon'        
    }, {
        name: 'Form',
        icon: 'pen-square'
    }, {
        name: 'Gauges',
        icon: 'circle-notch'
    }, {
        name: 'Image',
        icon: 'image'
    }, {
        name: 'Layout',
        icon: 'columns'
    }, {
        name: 'Lists',
        icon: 'list'
    }, {
        name: 'Loaders',
        icon: 'spinner'
    }, {
        name: 'Maps',
        icon: 'map'
    }, {
        name: 'Messaging',
        icon: 'comments'
    }, {
        name: 'Modal',
        icon: 'window-maximize'
    }, {
        name: 'Navigation',
        icon: 'location-arrow'
    }, {
        name: 'Others',
        icon: 'clone'
    }, {
        name: 'Select/picker',
        icon: 'list-alt'
    }, {
        name: 'Social',
        icon: 'user'
    }, {
        name: 'Themes',
        icon: 'feather-alt'
    }, {
        name: 'Video',
        icon: 'video'
    }
]


export class NewHome extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Anteros Example'
    };

    constructor(props) {
        super(props);
        this.onPressItem = this.onPressItem.bind(this);
        this.renderItem = this
            .renderItem
            .bind(this);
        this.renderNavigationBar = this.renderNavigationBar.bind(this);    
    }

    onPressItem(item){
        if (item.name=='Articles'){  
            this.navigator.push({view: <ArticlesExample/>});
        } else if (item.name=='Authentication'){
            this.navigator.push({view: <AuthenticationExample/>});
        } else if (item.name=='Buttons'){
            this.navigator.push({view: <ButtonExample/>})
        } else if (item.name=='Calendar'){
            this.navigator.push({view: <CalendarExample/>}) 
        } else if (item.name=='Layout'){
            this.navigator.push({view: <LayoutExample/>})        
        } else if (item.name=='Others'){
            this.navigator.push({view: <OthersExample/>})       
        } else if (item.name=='Navigation'){
            this.navigator.push({view: <NavigationExample/>})    
        } else if (item.name=='Lists'){
            this.navigator.push({view: <ListExample/>})    
        } else if (item.name=='Loaders'){
            this.navigator.push({view: <LoadersExample/>})      
        } else if (item.name=='Image'){
            this.navigator.push({view: <ImageExample/>})    
        } else if (item.name=='Select/picker'){
            this.navigator.push({view: <SelectExample/>})    
        } else if (item.name=='Cards'){
            this.navigator.push({view: <CardExample/>})     
        } else if (item.name=='Examples'){
            this.navigator.push({view: <Examples/>})    
        } else if (item.name=='Modal'){
            this.navigator.push({view: <ModalExample/>})    
        } else if (item.name=='Gauges'){
            this.navigator.push({view: <GaugeExample/>})      
        } else if (item.name=='Charts'){
            this.navigator.push({view: <ChartExample/>})     
        }
    }

    renderItem(item) {
        return <MenuItem item={item} onPressMenuItem={this.onPressItem}/>;
    }



    renderNavigationLeftView(item){
        return <AnterosIcon type='ionicons' name='menu' color='white'/>;
    }

    renderNavigationBar() {
        let {customBackground, hidden, animated, statusBarHidden} = this.state;
        return (
          <AnterosNavigationBar
            title='Anteros example'
            leftView={this.renderNavigationLeftView()}/>
        );
      }

    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <AnterosGrid
                    itemDimension={120}
                    items={items}
                    spacing={0}
                    style={styles.gridView}
                    renderItem={this.renderItem}/>
            </ScrollView>
        )
    }
}


class MenuItem extends Component {
    constructor(props){
        super(props);
        this.onPressItem = this.onPressItem.bind(this);
    }

    static propTypes = {
        onPressMenuItem : PropTypes.func,
        item : PropTypes.object
    }

    onPressItem(event){
        this.props.onPressMenuItem(this.props.item);
    }

    render(){
        return <TouchableHighlight onPress={this.onPressItem}>
        <View
            style={[
            styles.itemContainer, {
                backgroundColor: 'white',
                borderColor: '#f2f2f2',
                borderWidth: 1
            }
        ]}>

            {/* <AnterosIcon
                type='ionicons'
                name={this.props.item.icon}
                size={36}
                color={AnterosTheme.primaryColor}/>  */}

            <FontAwesomeIcon icon={this.props.item.icon} size={36} color={AnterosTheme.primaryColor}/>
                
            <AnterosLabel>{this.props.item.name}</AnterosLabel>
        </View>
    </TouchableHighlight>
    }
}

const styles = StyleSheet.create({
    gridView: {
        paddingTop: 0,
        flex: 1
    },
    itemContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        padding: 1,
        height: 120
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600'
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff'
    }
});