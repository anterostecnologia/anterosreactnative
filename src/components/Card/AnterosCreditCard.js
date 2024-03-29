'use strict';


const {
    PropTypes,
    Component
} = React;

import {AnterosFlipCard} from './AnterosFlipCard';
import Payment from 'payment';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    Image
} from 'react-native';

import {AnterosText} from '../Text/AnterosText';
import {AnterosImage} from '../Image/AnterosImage';

const images = {
    'visa'       : 'data:image/gif;base64,R0lGODlhQAAoAMQAAOnp6GVorv+JAPT085CRu8fHyAAEjdzc29fX16+xxuLi4drUyi0zm8BrOu7v7oQ/Q9zb1P+0ctTU1M/Pz/n5+fz8/NHR0f7+/vv7+87OzsvLy9LS0szMzPf39////83NzSH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFBQ0M3Njc4OEM1MjExRTZCODk4RTczRkIzNkIwMzJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFBQ0M3Njc5OEM1MjExRTZCODk4RTczRkIzNkIwMzJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUYxRDI4NzU4QzQzMTFFNkI4OThFNzNGQjM2QjAzMkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUYxRDI4NzY4QzQzMTFFNkI4OThFNzNGQjM2QjAzMkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAQAAoAAAF/+AlemRpnmiqrmx5VS8sznRt33iu2xVW/cCgcEgsGo9EjE/JbDqf0Kh0KqVYr9isdsvterudsHhMLpvP6PSZom673++BfE6v2+/4vH4vd/j/fneADgODdYOAdoh5iI1zgXSQj4l+AJCBf4eSfX8LEZ+gnwqWfwAEAagBBwipAQkOAJYIpwy1qAmksKatE42ACp4CwsMRsX8FBskGDAAJygYEugQMz8oMCpUOAdXRuYOxsQcRw8IH4NrPBKbPuArb1coB4AAW8PLe37EKBwwPwwvgEFBLxmCDu2cF1j2rVctAAF0KF5rDN2/eNn8CIoyK6FABhIHLJPBLJ/JABgK4wv+BRFix5TxnBvxpVKBgZQEFGUAyOPDB5j6aFQlYA6nOZUsFGwb6Q3AAZrIA+5x2lLCSAQEEAIBmHfkUJNSNRvUdTNZgwYF3yRLQFKqMAE201tzSXIsQ7U6wYekSLMBBJ9OxafexgufwAE2uyyCwTXYT7NzHc6USWAxt31mEhldRjnegaboFkiGLnnuAajy7GTqbJmjBsOUCcNNCsFsgQ894o0d3tpsOQmdk8XxbXgUhwUoCwIdWFZ6b9IHNygow9Rz8g4bOEBBsWAB3MuFqDAq4bi64wMqn2TtTJqDYIcoECeAyMP69WoLOhzvr349AQmwDCUw3GzsD1gcNZQy00p3/b/s1qB8C7S20gEj96VTAAudVE4AGKyUwoQQLYBjcdA7yh4BU0CCgIgIT6JSBBf8RRMAClAWwwQQSSGABd9ZsMN2KQAIpwQTwFZmBBCtaUCR8E0ywQQEJnIIKShncCGWRBWyApIpPLmmBiqsEGaQEWm5gQZlb9pejlmSSacGZIS5gppNsbsBmmmq2maOYfKqY459/rgjooGTaaSihgwpJqKCINuroo5BGSqihlFZq6aWYZqrppjq+6emnoIYq6qiklkpqk6imquqqrLbq6quvZiDrrLTWauutuOaqa64f9Orrr8AGK+ywxBYbrG22caDsssw26+yz0EYrbbO+aqDBJ7LWZqutttN2i+224GbbbLjklmvuueiGW8C67Lbr7rvwxivvvPKGAAA7',
    'amex'       : 'data:image/gif;base64,R0lGODlhUwAyAMQAAACK2gB7zsvp9wDD9gCm6JTS7wC48AC98/D4/ACZ5ACz73XL7QCl6dvx+wCR2QC76wCo4QBzyKXj9wBtw+Hu+AC46gCw7rvf8gCv5QCt4wCc3QCh3ljC6gqu4QByzP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFBQ0M3NjgwOEM1MjExRTZCODk4RTczRkIzNkIwMzJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFBQ0M3NjgxOEM1MjExRTZCODk4RTczRkIzNkIwMzJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUFDQzc2N0U4QzUyMTFFNkI4OThFNzNGQjM2QjAzMkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUFDQzc2N0Y4QzUyMTFFNkI4OThFNzNGQjM2QjAzMkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9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',
    'mastercard' : 'data:image/gif;base64,R0lGODlhTgAyANUAAP9VAPr48/+NABqZyACJu1gtUqQEDAB4rqKZr5RQY7GswfMCAV5thQBspQBnoeSXjP/WnwBinbpbADml0ABcmEGq1Oprb6F8T0uu2P+4ZgByqQCEtv/Jxlmz283K1vUhADCezODq9Z51ef+MAABSkMnU4wBmquiEG+azrwBWlFeNsfE6ObQyRAB+sry90ACl1AB8tQBMjACUw//q3YJ/mjp7pMiCPvDc3/+fKfp4ANkZGQCPwABgpOsBAf+HAP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFBQ0M3NjdDOEM1MjExRTZCODk4RTczRkIzNkIwMzJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFBQ0M3NjdEOEM1MjExRTZCODk4RTczRkIzNkIwMzJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUFDQzc2N0E4QzUyMTFFNkI4OThFNzNGQjM2QjAzMkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5k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',
    'discover'   : 'data:image/gif;base64,R0lGODlhUwAyAMQAAOjo6P9TAIaHiF1fYPP09djX2P+CM9vb2yotMK+xsv+ncPu+ov/Vuvzk2OLk5MvW2t/g4OXx9u3t7v/v4vn5+fb29gEBAfX19ff39/v7+/z8/Pj4+NTU1P39/fPz883NzSH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMxOTFFMzc5OEM1MzExRTZCODk4RTczRkIzNkIwMzJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMxOTFFMzdBOEM1MzExRTZCODk4RTczRkIzNkIwMzJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUFDQzc2ODI4QzUyMTFFNkI4OThFNzNGQjM2QjAzMkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzE5MUUzNzg4QzUzMTFFNkI4OThFNzNGQjM2QjAzMkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9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'
}

const validate = Payment.fns;

export class AnterosCreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: {
                name:"unknown",
                length: 16
            }
        }
    }
    getValue(name) {
        return this[name]();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.updateType(nextProps);
    }
    UNSAFE_componentWillMount() {
        this.updateType(this.props);
    }
    updateType(props) {

        if (!props.number)
            return this.setState({type: {name:"unknown", length: 16}});

        var type = validate.cardType(props.number);
        if (type) {
            if (type === "amex") {
                return this.setState({type: {name: type, length: 15}});
            } else {
                return this.setState({type: {name: type, length: 16}});
            }
        }

        return this.setState({type: {name: "unknown", length: 16}});
    }
    number() {
        if (!this.props.number) {
            var string = "";
        } else {
            var string = this.props.number.toString();
        }

        const maxLength = this.state.type.length;

        if (string.length > maxLength) string = string.slice(0, maxLength);

        while (string.length < maxLength) {
            string += "•"
        }

        if (this.state.type.name === "amex") {
            const space_index1 = 4;
            const space_index2 = 10;

            string = string.substring(0, space_index1) + " " + string.substring(space_index1, space_index2) + " " + string.substring(space_index2);
        } else {
            const amountOfSpaces = Math.ceil(maxLength/4);

            for (var i = 1; i <= amountOfSpaces; i++) {
                var space_index = (i * 4 + (i - 1));
                string = string.slice(0, space_index) + " " + string.slice(space_index)
            }
        }

        return string;
    }
    name() {
        if (this.props.name === "") {
            return "FULL NAME";
        } else {
            return this.props.name.toUpperCase();
        }
    }
    expiry() {
        if (this.props.expiry === "") {
            return "••/••";
        } else {
            var expiry = this.props.expiry.toString();

            const expiryMaxLength = 6;

            if (expiry.match(/\//))
                expiry = expiry.replace("/", "");

            if (!expiry.match(/^[0-9]*$/))
                return "••/••";

            while (expiry.length < 4) {
                expiry += "•";
            }

            expiry = expiry.slice(0, 2) + "/" + expiry.slice(2, expiryMaxLength);
        }

        return expiry;
    }

    cvc() {
        if (this.props.cvc == null) {
            return "•••"
        } else {
            return (this.props.cvc.toString().length <= 4) ? this.props.cvc : this.props.cvc.toString().slice(0, 4);
        }
    }

    render() {
        const isAmex = this.state.type && this.state.type.name === "amex";
        const cardStyle = [styles.container, {width: this.props.width, height: this.props.height, backgroundColor: this.props.bgColor}, this.props.style];
        return (
            <View style={cardStyle}>
                <AnterosFlipCard
                    style={[styles.container, {width: this.props.width, height: this.props.height, backgroundColor: this.props.bgColor}, this.props.style]}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={this.props.focused === 'cvc'}
                    clickable={this.props.clickable}
                    onFlipped={(isFlipped)=>{}}
                    >
                    <View style={[styles.front, {width: this.props.width, height: this.props.height}]}>
                        {this.props.imageFront ?
                            <AnterosImage source={this.props.imageFront} style={[styles.bgImage, {width: this.props.width, height: this.props.height}]} />
                            : null}
                        <View style={styles.lower}>
                            {this.props.shiny ?
                                <View style={styles.shinyFront} />
                                : null}
                            <AnterosImage
                                 style={styles.logo}
                                 source={{uri: images[this.props.type ? this.props.type : this.state.type.name]}}
                            />
                            {isAmex ?
                                <View style={styles.cvcFront}>
                                    <Text style={styles.text}>{this.getValue("cvc")}</Text>
                                </View>
                                : null}
                            <View style={styles.info}>
                                <View style={styles.number}><AnterosText style={styles.textNumber}>{this.getValue("number")}</AnterosText></View>
                                <View style={styles.rowWrap}>
                                    <View style={styles.name}><AnterosText style={styles.textName}>{this.getValue("name")}</AnterosText></View>
                                    <View style={styles.validthru}><AnterosText style={styles.textValidThru}>VALID THRU</AnterosText></View>
                                    <View
                                        style={styles.expiry}
                                        data-before={this.props.expiryBefore}
                                        data-after={this.props.expiryAfter}>
                                        <AnterosText style={styles.textSmall}>MONTH/YEAR</AnterosText>
                                        <AnterosText style={styles.textExpiry}>{this.getValue("expiry")}</AnterosText>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.back, {width: this.props.width, height: this.props.height}]}>
                        {this.props.imageBack ?
                            <AnterosImage source={this.props.imageBack} style={[styles.bgImage, {width: this.props.width, height: this.props.height}]} />
                            : null}
                        {this.props.bar ?
                            <View style={styles.bar}/>
                            : null}
                        <View style={styles.cvc}><AnterosText style={styles.textCvc}>{this.getValue("cvc")}</AnterosText></View>
                        {this.props.shiny ?
                            <View style={styles.shinyBack} data-after={this.props.shinyAfterBack}/>
                            : null}
                    </View>
                </AnterosFlipCard>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        borderWidth: 0,
        flex: null,
    },
    logo: {
        height: 35,
        width: 57,
        position: 'absolute',
        top: 20,
        right: 20
    },
    text: {
        color: '#fff'
    },
    bgImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        borderRadius: 8
    },
    lower: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    expiry: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    rowWrap: {
        flexDirection: 'row',
    },
    name: {
        flex: 2,
        justifyContent: 'center'
    },
    validthru: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    textValidThru: {
        fontSize: 8,
        color: '#ddd',
        fontWeight: '900',
        backgroundColor: 'transparent',
    },
    textSmall: {
        fontSize: 8,
        color: '#ddd',
        fontWeight: '900',
        backgroundColor: 'transparent',
    },
    textNumber: {
        color: '#fff',
        fontSize: 21,
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: 'transparent',
    },
    textName: {
        color: '#fff',
        fontSize: 14,
        backgroundColor: 'transparent',
    },
    textExpiry: {
        color: '#fff',
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    front: {
        flex: 1
    },
    back: {
        flex: 1
    },
    cvc: {
        width: 45,
        height: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        top: 76
    },
    textCvc: {
        color: '#000',
        fontSize: 18
    },
    info: {
        flex: 1,
    },
    shinyFront: {
        backgroundColor: '#ddd',
        borderRadius: 8,
        width: 50,
        height: 40,
        position: 'absolute',
        top: 15,
        left: 20
    },
    shinyBack: {
        backgroundColor: '#ddd',
        borderRadius: 8,
        width: 50,
        height: 40,
        position: 'absolute',
        bottom: 15,
        left: 20
    },
    bar: {
        height: 40,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 30,
        backgroundColor: '#000'
    }
});

AnterosCreditCard.defaultProps = {
    number: null,
    cvc: null,
    name: '',
    expiry: '',
    focused: null,
    expiryBefore: 'month/year',
    expiryAfter: 'valid thru',
    shinyAfterBack: '',
    type: null,
    width: 300,
    height: 180,
    bgColor: '#191278',
    clickable: true,
};

AnterosCreditCard.CardImages = images;

