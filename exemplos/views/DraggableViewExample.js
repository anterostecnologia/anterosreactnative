import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    StatusBar,
} from 'react-native';

import iconCart from '../images/icon_cart.png';
import iconClaw from '../images/icon_claw.png';
import iconCheckout from '../images/icon_next_arrow.png';
import iconBack from '../images/icon_back_arrow.png';
import iconExit from '../images/icon_exit.png';
import demoProduct from '../images/demo_product.png';
import demoProduct2 from '../images/demo_product2.png';
import demoProduct3 from '../images/demo_product3.png';
import demoProduct4 from '../images/demo_product4.png';

import iconStar from '../images/icon_star.png';
import iconStarDisable from '../images/icon_star_disable.png';

import btnMinus from '../images/button_minus.png';
import btnPlus from '../images/button_plus.png';
import btnPlusLarge from '../images/button_plus_large.png';

import iconNoteEnable from '../images/icon_note_enable.png';
import iconNoteDisable from '../images/icon_note_disable.png';     

import {AnterosDraggableView, AnterosCollapsible, AnterosText, AnterosImage, AnterosNavigationPage} from 'anteros-react-native';

export class DraggableViewExample extends Component {
    render() {
        return (
            <AnterosDraggableView
                initialDrawerSize={0.09}
                renderContainerView={() => <Screen2 navigation={this.props.navigation} />}
                renderDrawerView={() => (
                    <Screen3 navigation={this.props.navigation} />)}
                renderInitDrawerView={() => (<View style={{
                    backgroundColor: 'white',
                    height: 66,
                }}>
                    <StatusBar hidden={true} />
                    <CartHeader />
                </View>)}
            />
        );
    }
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#D8D8D8",
                }}
            />
        );
    };
}




const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

class CartHeader extends Component{
    render() {
        return (
            <View style={stylesHeader.cart_layout}>
                <View style={{ height: 4, width: Screen.width, backgroundColor: '#FD792E' }} />
                <View style={stylesHeader.cart_detail}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 40,
                            height: 40,
                        }}>
                            <AnterosImage style={stylesHeader.icon_cart} source={iconCart} />
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: 20,
                                height: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#FC5734', borderRadius: 10
                            }}>
                                <AnterosText style={{

                                    fontSize: 10,
                                    color: 'white'
                                }}> 20</AnterosText>
                            </View>
                        </View>
                        <AnterosText style={{ color: '#4A4A4A', fontSize: 14, fontWeight: 'bold', marginLeft: 10, }}>KES 3000</AnterosText>
                    </View>
                    <AnterosImage style={stylesHeader.icon_claw} source={iconClaw} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AnterosText style={{ color: '#FD792E', fontSize: 12, marginRight: 10, }}>FREE DELIVERY</AnterosText>
                        <TouchableOpacity>
                        <AnterosText style={stylesHeader.icon_checkout} source={iconCheckout} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const stylesHeader = StyleSheet.create({
    cart_layout: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 56,
    },
    cart_detail: {
        paddingLeft: 20,
        paddingRight: 20,
        height: 52,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon_claw: {
        position: 'absolute',
        top: 2,
        bottom: 0,
        left: (Screen.width / 2) - 16,
        right: (Screen.width / 2) - 16,
        width: 32,
        height: 6,
    },
    icon_checkout: {
        width: 16,
        height: 16,
    },
    icon_cart: {

        width: 22,
        height: 23,
    },
})



class Screen2 extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Draggable view',
        showBackButton: true
    };
  
    constructor(props) {
      super(props);
    }

    _keyExtractor = (item, index) => item.id;


    renderPage() {

        return (

            <View style={stylesScreen2.container}>
                <View style={stylesScreen2.content}>
                    <View style={stylesScreen2.body}>
                        <FlatList
                            data={
                                [{ id: 1, image: demoProduct }, { id: 2, image: demoProduct2 }, { id: 3, image: demoProduct3 }, { id: 4, image: demoProduct4 },
                                { id: 5, image: demoProduct4 }, { id: 6, image: demoProduct4 }, { id: 7, image: demoProduct4 }, { id: 8, image: demoProduct4 }]
                            }
                            renderItem={({ item }) =>
                                <ProductItem image={item.image} />
                            }
                            ItemSeparatorComponent={this.renderSeparator}
                            keyExtractor={this._keyExtractor}
                        />
                        {this.renderItemProduct}
                    </View>

                </View>

            </View>

        );
    }
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#D8D8D8",
                }}
            />
        );
    };

}


const stylesScreen2 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    content: {
        // height: Screen.height,
        width: Screen.width,
        // height: 300,
        flex: 1,
    },
    body: {
        flex: 1,
        marginBottom: 56,
    },
    toolbar: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: '#2B3740'
    },
    toolbarLeft: {
        marginLeft: 10,
        width: 16,
        height: 16,
    },
    toolbarTitle: {
        color: 'white',
        fontSize: 16,
    },
    toolbarRight: {
        marginRight: 10,
        width: 14,
        height: 14,
    },



});



class Screen3 extends Component {
    constructor(props) {
        super(props);

    }
    _keyExtractor = (item, index) => item.id;


    render() {

        return (

            <View style={stylesScreen3.container}>
                <View style={stylesScreen3.content}>
                    <View style={stylesScreen3.alert_layout}>
                        <AnterosText style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>KES 1800  more to free delivery! </AnterosText>
                    </View>
                    <View style={stylesScreen3.body}>
                        <FlatList
                            data={
                                [{ id: 0, title: 'Meat', type: 0 }, { id: 1, image: demoProduct, type: 1 }, { id: 2, image: demoProduct2, type: 1 }, { id: 3, title: 'Fresh food', type: 0 },
                                { id: 4, image: demoProduct3, type: 1 }, { id: 5, image: demoProduct4, type: 1 },
                                ]
                            }
                            renderItem={({ item }) =>
                                item.type == 0 ? <View style={{ padding: 15 }}>
                                    <AnterosText style={{ fontSize: 18, color: '#4A4A4A' }}> {item.title}</AnterosText>
                                </View>
                                    :
                                    <ProductItemNote image={item.image} />
                            }
                            ItemSeparatorComponent={this.renderSeparator}
                            keyExtractor={this._keyExtractor}
                        />
                        {this.renderItemProduct}
                    </View>

                </View>

            </View>

        );
    }
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#D8D8D8",
                }}
            />
        );
    };

}


const stylesScreen3 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF0F2',
    },
    body: {
        flex: 1,
    },
    content: {
        // height: Screen.height,
        width: Screen.width,
        // height: 300,
        flex: 1,
    },
    alert_layout: {
        backgroundColor: '#FD792E',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});



class ProductItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            number: 0,
            isFavorite: true,

        }
    }
    render() {
        return (
            <View style={stylesProduct.product}>
                <AnterosImage style={stylesProduct.product_image} source={this.props.image} />
                <View style={stylesProduct.product_detail}>
                    <View style={stylesProduct.product_detail_header}>
                        <AnterosText style={stylesProduct.product_name} numberOfLines={2} ellipsizeMode='tail'>
                            Fresh countryside chicken thigh ( pack of 4 )
                        </AnterosText>
                        <TouchableOpacity onPress={this.onFavoritePress}>
                            <Image style={stylesProduct.product_favorite} source={this.state.isFavorite ? iconStar : iconStarDisable} />
                        </TouchableOpacity>
                    </View>
                    <View style={stylesProduct.product_detail_footer}>
                        <View style={stylesProduct.product_price}>
                            <AnterosText style={stylesProduct.product_price_default}>
                                150 KES
                            </AnterosText>
                            <AnterosText style={stylesProduct.product_price_discount}>
                                120 KES
                            </AnterosText>
                        </View>
                        {this.state.number > 0 ?
                            <View style={stylesProduct.button_layout}>
                                <TouchableOpacity
                                    onPress={this.onMinusPress}
                                    style={{ marginRight: 15 }}>
                                    <AnterosImage style={stylesProduct.button_minus} source={btnMinus} />
                                </TouchableOpacity>
                                <AnterosText style={{ marginRight: 15, fontSize: 14, }} >
                                    {this.state.number}
                                </AnterosText>
                                <TouchableOpacity
                                    onPress={this.onPlusPress}>
                                    <AnterosImage style={stylesProduct.button_plus} source={btnPlus} />
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <TouchableOpacity
                                    onPress={this.onPlusPress} >
                                    <AnterosImage
                                        style={stylesProduct.button_plus_large} source={btnPlusLarge} />
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>
            </View>
        );
    }
    onMinusPress = () => {
        if (this.state.number > 0) {
            this.setState({
                number: this.state.number - 1
            })
        }
    }
    onPlusPress = () => {
        this.setState({
            number: this.state.number + 1
        })
    }
    onFavoritePress = () => {
        this.setState({
            isFavorite: !this.state.isFavorite
        })
    }
}

const stylesProduct = StyleSheet.create({
    product: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        flex: 1,
    },
    body: {
        flex: 1,
        height: Screen.height - 122,
    },
    product_image: {
        width: 72,
        height: 72,
    },
    product_detail: {
        justifyContent: 'space-around',
        marginLeft: 10,
        flexDirection: 'column',
        flex: 1,
    },
    product_detail_header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    product_name: {
        color: '#4A4A4A',
        fontSize: 14,
        width: 180,
    },
    product_favorite: {
        width: 20,
        height: 19,
    },
    product_detail_footer: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    product_price: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    product_price_default: {
        textDecorationLine: 'line-through',
        color: '#BABCBE',
        fontSize: 12,
    },
    product_price_discount: {
        marginLeft: 20,

        color: '#FC5734',
        fontSize: 12,
    },
    button_layout: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    button_minus: {
        width: 34,
        height: 34,
    },
    button_plus: {
        width: 34,
        height: 34,
    },
    button_plus_large: {
        width: 109,
        height: 32,
    },
})


class ProductItemNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: true,
            note: '',
            number: 0,
            isFavorite: true,
            isNote: false,
        };
    }
    render() {
        return (
            <View>
                <View style={stylesItem.product}>
                    <AnterosImage style={stylesItem.product_image} source={this.props.image} />
                    <View style={stylesItem.product_detail}>
                        <View style={stylesItem.product_detail_header}>
                            <AnterosText style={stylesItem.product_name} numberOfLines={2} ellipsizeMode='tail'>
                                Fresh countryside chicken thigh ( pack of 4 )
                            </AnterosText>
                            <TouchableOpacity onPress={this.toggleNote}>
                                <AnterosImage style={stylesItem.product_note} source={this.state.isNote ? iconNoteEnable : iconNoteDisable} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onFavoritePress}>
                                <AnterosImage style={stylesItem.product_favorite} source={this.state.isFavorite ? iconStar : iconStarDisable} />
                            </TouchableOpacity>

                        </View>
                        <View style={stylesItem.product_detail_footer}>
                            <View style={stylesItem.product_price}>
                                <AnterosText style={stylesItem.product_price_default}>
                                    150 KES
                                </AnterosText>
                                <AnterosText style={stylesItem.product_price_discount}>
                                    120 KES
                                </AnterosText>
                            </View>
                            {this.state.number > 0 ?
                                <View style={stylesItem.button_layout}>
                                    <TouchableOpacity
                                        onPress={this.onMinusPress}
                                        style={{ marginRight: 15 }}>
                                        <AnterosImage style={stylesItem.button_minus} source={btnMinus} />
                                    </TouchableOpacity>
                                    <AnterosText style={{ marginRight: 15, fontSize: 14, }} >
                                        {this.state.number}
                                    </AnterosText>
                                    <TouchableOpacity
                                        onPress={this.onPlusPress}>
                                        <AnterosImage style={stylesItem.button_plus} source={btnPlus} />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View>
                                    <TouchableOpacity
                                        onPress={this.onPlusPress}>
                                        <AnterosImage
                                            style={stylesItem.button_plus_large} source={btnPlusLarge} />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                </View>
                <AnterosCollapsible collapsed={this.state.collapsed} style={styles.collapsible} >
                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#D8D8D8",
                        }}
                    />
                    <View style={styles.note_collap}>
                        <TextInput
                            style={{ color: '#BABCBE', fontSize: 14, height: 40, width: 150 }}
                            onChangeText={(note) => this.setState({ note })}
                            placeholder="Add a specific "
                        />

                        <TouchableOpacity>
                            <AnterosText style={{ color: '#FD792E', fontSize: 12, fontWeight: 'bold' }}> ADD NOTE </AnterosText>
                        </TouchableOpacity>
                    </View>
                </AnterosCollapsible>
            </View>
        );
    }
    onMinusPress = () => {
        if (this.state.number > 0) {
            this.setState({
                number: this.state.number - 1
            })
        }
    }
    onPlusPress = () => {
        console.log('___________________onPlusPress_____________')
        console.log('Number: ', this.state.number)
        this.setState({
            number: this.state.number + 1
        })

    }
    onFavoritePress = () => {
        this.setState({
            isFavorite: !this.state.isFavorite
        })
    }
    toggleNote = () => {
        this.setState({
            isNote: !this.state.isNote,
            collapsed: !this.state.collapsed
        });
    }
}

const stylesItem = StyleSheet.create({
    product: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        flex: 1,
    },
    body: {
        flex: 1,
        height: Screen.height - 122,
    },
    product_image: {
        width: 72,
        height: 72,
    },
    product_detail: {
        justifyContent: 'space-around',
        marginLeft: 10,
        flexDirection: 'column',
        flex: 1,
    },
    product_detail_header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    product_name: {
        color: '#4A4A4A',
        fontSize: 14,
        width: 180,
    },
    product_favorite: {
        width: 20,
        height: 19,
    },
    product_note: {
        width: 17,
        height: 22,
    },
    product_detail_footer: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    product_price: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    product_price_default: {
        color: '#BABCBE',
        fontSize: 12,
    },
    product_price_discount: {
        marginLeft: 20,

        color: '#FC5734',
        fontSize: 12,
    },
    button_layout: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    button_minus: {
        width: 34,
        height: 34,
    },
    button_plus: {
        width: 34,
        height: 34,
    },
    button_plus_large: {
        width: 109,
        height: 32,
    },

    collapsible: {

    },
    note_collap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },

})