import {Component, PureComponent} from 'react';
import {
    StyleSheet,
    FlatList,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Actions,
    SafeAreaView,
    Platform,
    Modal,
    ImageBackground,
    ViewPropTypes,
    Animated,
    StatusBar,
    Easing,
    Image,
    TextInput,
    Dimensions,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {AnterosButton, AnterosSwiper, AnterosNavigationPage, AnterosActionSheet, 
     AnterosLabel, AnterosListRow, AnterosText, AnterosChart, shadeColor,
     AnterosCard, AnterosCardSection, AnterosHistogram, AnterosImage, AnterosSeparator} from 'anteros-react-native';
import ChartSparklineExample from './ChartSparklineExample';
import {Path, Defs, LinearGradient, Stop, ClipPath, Rect, Line, G, Circle, Text, Shape} from 'react-native-svg';
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import dateFns from 'date-fns'


const timer = require('react-native-timer');

export class ChartExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Charts',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.chart1 = this
            .chart1
            .bind(this);
        this.chart2 = this
            .chart2
            .bind(this);    
        this.chart3 = this
            .chart3
            .bind(this);    
        this.chart4 = this
            .chart4
            .bind(this);    
        this.chart5 = this
            .chart5
            .bind(this);     
        this.chart6 = this
            .chart6
            .bind(this);    
        this.chart7 = this
            .chart7
            .bind(this);      
        this.chart8 = this
            .chart8
            .bind(this);      
        this.chart9 = this
            .chart9
            .bind(this);         
        this.chart10 = this
            .chart10
            .bind(this);    
        this.chart11 = this
            .chart11
            .bind(this); 
        this.chart12 = this
            .chart12
            .bind(this);     
        this.chart13 = this
            .chart13
            .bind(this);     
        this.chart14 = this
            .chart14
            .bind(this);     
        this.chart15 = this
            .chart15
            .bind(this);      
        this.chart16 = this
            .chart16
            .bind(this); 
        this.chart17 = this
            .chart17
            .bind(this);           
    }

    renderRow = (highlighted) => {
        if (Platform.OS !== 'android') {
            return <View
                style={[
                {
                    backgroundColor: '#f0f0f0',
                    height: 1
                },
                highlighted && {
                    marginLeft: 0
                }
            ]}/>;
        }

        return null;
    };

    chart1() {
        this
            .navigator
            .push({view: <ChartSparklineExample/>})
    }

    chart2() {
        this
            .navigator
            .push({view: <LineChartExample/>})
    }

    chart3() {        
        this
            .navigator
            .push({view: <MultiSeriesExample/>})
    }

    chart4() {
        this
            .navigator
            .push({view: <StepExample/>})
    }

    chart5() {
        this
            .navigator
            .push({view: <AreaRangeExample/>})
    }

    chart6() {
        this
            .navigator
            .push({view: <BarsRangeExample/>})
    }

    chart7() {
        this
            .navigator
            .push({view: <Bars3DExample/>})
    }
    chart8() {
        this
            .navigator
            .push({view: <CandleStickExample/>})
    }
    chart9() {
        this
            .navigator
            .push({view: <PieChartExample/>})
    }
    chart10() {
        this
            .navigator
            .push({view: <DonutChartExample/>})
    }

    chart11() {
        this
            .navigator
            .push({view: <ScatterExample/>})
    }
    chart12() {
        this
            .navigator
            .push({view: <SparkPieExample/>})
    }
    chart13() {
        this
            .navigator
            .push({view: <HeatmapExample/>})
    }
    chart14() {
        this
            .navigator
            .push({view: <AreaChartExample/>})
    }
    chart15() {
        this
            .navigator
            .push({view: <BarChartExample/>})
    }
    chart16() {
        this
            .navigator
            .push({view: <StackedAreaChartExample/>})
    }
    chart17() {
        this
            .navigator
            .push({view: <HistogramExample/>})
    }


    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow title='Sparkline' onPress={this.chart1} topSeparator='full'/>
                <AnterosListRow title='Sparkpie' onPress={this.chart12} topSeparator='full'/>
                <AnterosListRow title='Line' onPress={this.chart2} topSeparator='full'/>
                <AnterosListRow title='Area' onPress={this.chart14} topSeparator='full'/>
                <AnterosListRow title='Bar' onPress={this.chart15} topSeparator='full'/>
                <AnterosListRow title='Stacked Area' onPress={this.chart16} topSeparator='full'/>
                <AnterosListRow title='Multi series' onPress={this.chart3} topSeparator='full'/>                
                <AnterosListRow title='Step' onPress={this.chart4} topSeparator='full'/>
                <AnterosListRow title='Area range' onPress={this.chart5} topSeparator='full'/>
                <AnterosListRow title='Bars range' onPress={this.chart6} topSeparator='full'/>
                <AnterosListRow title='Bars 3D' onPress={this.chart7} topSeparator='full'/>
                <AnterosListRow title='Candle stick' onPress={this.chart8} topSeparator='full'/>
                <AnterosListRow title='Pie' onPress={this.chart9} topSeparator='full'/>
                <AnterosListRow title='Donut' onPress={this.chart10} topSeparator='full'/>
                <AnterosListRow title='Scatter and bubble' onPress={this.chart11} topSeparator='full'/>
                <AnterosListRow title='Heatmap' onPress={this.chart13} topSeparator='full'/>
                <AnterosListRow title='Histogram' onPress={this.chart17} topSeparator='full'/>
            </ScrollView>
        );
    }
}

const stylesList = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
        paddingHorizontal: 10,
        paddingVertical: 20
    }
});


class CardChart extends PureComponent {
    
    render(){
        return (<AnterosCard height={260} showBorder={true} showShadow={true} style={{borderColor: '#E0E0E0',}}>
                    <AnterosCardSection style={{paddingVertical: 5.5,paddingHorizontal: 16,justifyContent: 'center',}} height={40}>
                        <AnterosLabel style={{fontSize: 22, color: "#424242", marginTop: 5}}>{this.props.title}</AnterosLabel>
                    </AnterosCardSection>
                    <AnterosCardSection style={{flex:1, margin:10}}>
                        {this.props.children}
                    </AnterosCardSection>
                </AnterosCard>);
    }
}


const screenWidth = Dimensions.get('window').width
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      data: [ 20, 45, 28, 80, 99, 43 ]
    }]
  }

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
}  



const Shadow1 = ({ line }) => (
    <Path
        key={'shadow'}
        y={2}
        d={line}
        fill={'none'}
        strokeWidth={4}
        stroke={'rgba(134, 65, 244, 0.2)'}
    />
)

const Shadow2 = ({ line }) => (
    <Path
        y={ 3 }
        key={ 'shadow-1' }
        d={ line }
        stroke={ 'rgba(134, 65, 244, 0.2)' }
        strokeWidth={ 5 }
        fill={ 'none' }
    />
)

const Gradient = () => (
    <Defs key={'gradient'}>
        <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
            <Stop offset={'0%'} stopColor={'#C0CA33'}/>
            <Stop offset={'100%'} stopColor={'#388E3C'}/>
        </LinearGradient>
    </Defs>
)

const indexToClipFrom = 10

const Clips = ({ x, width }) => (
    <Defs key={ 'clips' }>
        <ClipPath id="clip-path-1">
            <Rect x={ '0' } y={ '0' } width={ x(indexToClipFrom) } height={ '100%' }/>
        </ClipPath>
        <ClipPath id={ 'clip-path-2' }>
            <Rect x={ x(indexToClipFrom) } y={ '0' } width={ width - x(indexToClipFrom) } height={ '100%' }/>
        </ClipPath>
    </Defs>
)

// Line extras:
const DashedLine = ({ line }) => (
    <Path
        key={ 'line-1' }
        d={ line }
        stroke={ '#C62828' }
        strokeWidth={ 2 }
        fill={ 'none' }
        strokeDasharray={ [ 4, 4 ] }
        clipPath={ 'url(#clip-path-2)' }
    />
)


const HorizontalLine = (({ y }) => (
    <Line
        key={ 'zero-axis' }
        x1={ '0%' }
        x2={ '100%' }
        y1={ y(50) }
        y2={ y(50) }
        stroke={ 'grey' }
        strokeDasharray={ [ 4, 8 ] }
        strokeWidth={ 2 }
    />
))


const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 }
const xAxisHeight = 30



const dataChart = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];
const dataChart2 = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ].reverse()
const dataChart3 = [
    {
        value: 50,
        date: dateFns.setHours(new Date(2018, 0, 0), 6),
    },
    {
        value: 10,
        date: dateFns.setHours(new Date(2018, 0, 0), 9),
    },
    {
        value: 150,
        date: dateFns.setHours(new Date(2018, 0, 0), 15),
    },
    {
        value: 10,
        date: dateFns.setHours(new Date(2018, 0, 0), 18),
    },
    {
        value: 100,
        date: dateFns.setHours(new Date(2018, 0, 0), 21),
    },
    {
        value: 20,
        date: dateFns.setHours(new Date(2018, 0, 0), 24),
    },
]

class LineChartExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Line chart",
      showBackButton: true
    };
  
    constructor(props) {
      super(props);
      this.state = {
        items: {}
      };
    }
  
    renderPage() {   
        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 4 }
                    stroke={ 'rgb(134, 65, 244)' }
                    fill={ 'white' }
                />
            ))
        }
        
        
        const LineDecorator = ({ line }) => (
            <Path
                d={ line }
                stroke={ 'rgba(134, 65, 244)' }
                fill={ 'none' }
            />
        )
             
        return (
            <ScrollView>
                <CardChart title='Line'>
                    <AnterosChart.LineChartSVG
                        style={ { height: 200 } }
                        data={ dataChart }
                        svg={{ stroke: '#F57F17' }}
                        contentInset={ { top: 20, bottom: 20 } }
                    >
                        <AnterosChart.GridSVG/>
                        <Shadow1/>
                    </AnterosChart.LineChartSVG>
                </CardChart>

                <CardChart title='Line'>
                    <AnterosChart.LineChartSVG
                        style={ { height: 200 } }
                        data={ dataChart }
                        contentInset={ { top: 20, bottom: 20 } }
                        svg={{
                            strokeWidth: 2,
                            stroke: 'url(#gradient)',
                        }}
                    >
                        <AnterosChart.GridSVG/>
                        <Gradient/>
                    </AnterosChart.LineChartSVG>
                </CardChart>           

                <CardChart title='Line'>        
                    <AnterosChart.LineChartSVG
                        style={{ height: 200 }}
                        data={ dataChart }
                        contentInset={{ top: 20, bottom: 20 }}
                        svg={{
                            stroke: '#C62828',
                            strokeWidth: 2,
                            clipPath: 'url(#clip-path-1)',
                        }}
                    >
                        <Clips/>
                        <Shadow2/>
                        <DashedLine/>
                    </AnterosChart.LineChartSVG>
                </CardChart>        
                
                <CardChart title='Line'>
                    <AnterosChart.LineChartSVG
                        style={{ height: 200 }}
                        data={ dataChart }
                        svg={{
                            stroke: '#C0CA33',
                            strokeWidth: 2,
                        }}
                        contentInset={{ top: 20, bottom: 20 }}
                        curve={ shape.curveLinear }
                    >
                        <AnterosChart.GridSVG/>
                        <HorizontalLine/>
                    </AnterosChart.LineChartSVG>
                </CardChart>    
                <CardChart title='Line'>
                    <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                        <AnterosChart.YAxisSVG
                            data={dataChart}
                            style={{ marginBottom: xAxisHeight }}
                            contentInset={verticalContentInset}
                            svg={axesSvg}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <AnterosChart.LineChartSVG
                                style={{ flex: 1 }}
                                data={dataChart}
                                contentInset={verticalContentInset}
                                svg={{ stroke: '#EF6C00' }}
                            >
                                <AnterosChart.GridSVG/>
                            </AnterosChart.LineChartSVG>    
                            <AnterosChart.XAxisSVG
                                style={{ marginHorizontal: -10, height: xAxisHeight }}
                                data={dataChart}
                                formatLabel={(value, index) => index}
                                contentInset={{ left: 10, right: 10 }}
                                svg={axesSvg}
                            />
                    </View>  
                </View>
            </CardChart>      
            <CardChart title='Line'>
                <AnterosChart.AreaChartSVG
                    style={{ height: 200 }}
                    data={ dataChart }
                    svg={{ fill: 'rgba(244,67,54, 0.2)' }}
                    contentInset={{ top: 20, bottom: 30 }}
                >
                    <AnterosChart.GridSVG/>
                    <LineDecorator/>
                    <Decorator/>
                </AnterosChart.AreaChartSVG>
            </CardChart>    
        </ScrollView>);
    }
}

class AreaChartExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Area chart",
      showBackButton: true
    };
  
    constructor(props) {
      super(props);
      this.state = {
        items: {}
      };
    }
  
    renderPage() {   

       
        const Gradient = () => (
            <Defs key={ 'defs' }>
                <LinearGradient id={ 'gradient' } x1={ '0%' } y={ '0%' } x2={ '0%' } y2={ '100%' }>
                    <Stop offset={ '0%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.8 }/>
                    <Stop offset={ '100%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.2 }/>
                </LinearGradient>
            </Defs>
        )
        
        const Line= ({ line }) => (
            <Path
                d={ line }
                stroke={ 'rgba(85,139,47)' }
                fill={ 'none' }
            />
        )

        const Clips = ({ x, width }) => (
            <Defs key={ 'clips' }>
                <ClipPath id={ 'clip-path-1' } key={ '0' }>
                    <Rect x={ 0 } y={ '0' } width={ x(indexToClipFrom) } height={ '100%' }/>
                </ClipPath>
                <ClipPath id="clip-path-2" key={ '1' }>
                    <Rect x={ x(indexToClipFrom) } y={ '0' } width={ width - x(indexToClipFrom) } height={ '100%' }/>
                </ClipPath>
            </Defs>
        )

        
             
        return (
            <ScrollView>
                <CardChart title='Area'>
                    <AnterosChart.AreaChartSVG
                        style={{ height: 200 }}
                        data={dataChart}
                        contentInset={{ top: 30, bottom: 30 }}
                        curve={shape.curveNatural}
                        svg={{ fill: 'rgba(253,216,53, 0.8)' }}
                    >
                        <AnterosChart.GridSVG/>
                        <Line/>
                    </AnterosChart.AreaChartSVG>
                </CardChart>

                <CardChart title='Area'>
                    <AnterosChart.AreaChartSVG
                        style={{ height: 200 }}
                        data={ dataChart }
                        svg={{ fill: 'rgba(244,81,30, 0.8)' }}
                        curve={ shape.curveNatural }
                        gridMax={ 500 }
                        gridMin={ -500 }
                    >
                        <Line/>
                    </AnterosChart.AreaChartSVG>
                </CardChart>
                
                <CardChart title='Area'>
                    <AnterosChart.AreaChartSVG
                        style={{ height: 200 }}
                        data={dataChart}
                        contentInset={{ top: 20, bottom: 20 }}
                        svg={{ fill: 'url(#gradient)' }}
                    >
                        <AnterosChart.GridSVG/>
                        <Gradient/>
                    </AnterosChart.AreaChartSVG>
                </CardChart>    

                <CardChart title='Area'>
                    <AnterosChart.AreaChartSVG
                        style={{ height: 200 }}
                        data={ dataChart }
                        contentInset={{ top: 30, bottom: 30 }}
                        svg={{
                            fill: 'url(#gradient)',
                            clipPath: 'url(#clip-path-1)',
                        }}
                    >
                        <Gradient/>
                        <Clips/>
                        <Line/>
                        <DashedLine/>
                    </AnterosChart.AreaChartSVG>
                </CardChart> 

                <CardChart title='Area'>
                    <AnterosChart.AreaChartSVG
                        style={ { flex: 1 } }
                        data={ dataChart }
                        svg={{ fill: 'rgba(33,150,243, 0.9)' }}
                        contentInset={ { top: 20, bottom: 20 } }
                        curve={ shape.curveNatural }
                    >
                        <AnterosChart.GridSVG/>
                    </AnterosChart.AreaChartSVG>
                    <AnterosChart.AreaChartSVG
                        style={ StyleSheet.absoluteFill }
                        data={ dataChart2 }
                        svg={{ fill: 'rgba(245,127,23,0.9)' }}
                        contentInset={ { top: 20, bottom: 20 } }
                        curve={ shape.curveNatural }
                    />
                </CardChart> 

                <CardChart title='Area'>
                    <AnterosChart.AreaChartSVG
                        style={{ flex: 1 }}
                        data={ dataChart3 }
                        yAccessor={ ({ item }) => item.value }
                        xAccessor={ ({ item }) => item.date }
                        xScale={ scale.scaleTime }
                        contentInset={{ top: 10, bottom: 10 }}
                        svg={{ fill: 'rgba(0,137,123, 0.6)' }}
                        curve={ shape.curveLinear }
                    >
                        <AnterosChart.GridSVG/>
                    </AnterosChart.AreaChartSVG>
                    <AnterosChart.XAxisSVG
                        data={ dataChart3 }
                        svg={{
                            fill: 'black',
                            fontSize: 8,
                            fontWeight: 'bold',
                            rotation: 20,
                            originY: 30,
                            y: 5,
                        }}
                        xAccessor={ ({ item }) => item.date }
                        scale={ scale.scaleTime }
                        numberOfTicks={ 6 }
                        style={{ marginHorizontal: -15, height: 20 }}
                        contentInset={{ left: 10, right: 25 }}
                        formatLabel={ (value) => dateFns.format(value, 'HH:mm') }
                    />
               </CardChart> 
                
            </ScrollView>
        )
    }
}

class StackedAreaChartExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "StackedArea chart",
      showBackButton: true
    };
  
    constructor(props) {
      super(props);
      this.state = {
        items: {}
      };
    }
  
    renderPage() {   

        const data = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ]

        const colors = [ 'rgb(138, 0, 230, 0.8)', 'rgb(173, 51, 255, 0.8)', 'rgb(194, 102, 255, 0.8)', 'rgb(214, 153, 255, 0.8)' ]
        const keys   = [ 'apples', 'bananas', 'cherries', 'dates' ]
       
        return (
            <ScrollView>
                <CardChart title='Stacked area'>
                    <AnterosChart.StackedAreaChartSVG
                        style={ { flex: 1 } }
                        contentInset={ { top: 10, bottom: 10 } }
                        data={ data }
                        keys={ keys }
                        colors={ colors }
                        curve={ shape.curveNatural }
                    >
                        <AnterosChart.GridSVG/>
                    </AnterosChart.StackedAreaChartSVG>
                    <AnterosChart.YAxisSVG
                        style={ { position: 'absolute', top: 0, bottom: 0 }}
                        data={ AnterosChart.StackedAreaChartSVG.extractDataPoints(data, keys) }
                        contentInset={ { top: 10, bottom: 10 } }
                        svg={ {
                            fontSize: 8,
                            fill: 'white',
                            stroke: 'black',
                            strokeWidth: 0.1,
                            alignmentBaseline: 'baseline',
                            baselineShift: '3',
                        } }
                    />
                </CardChart>                
            </ScrollView>
        )
    }
}

class BarChartExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Bar chart",
      showBackButton: true
    };
  
    constructor(props) {
      super(props);
      this.state = {
        items: {}
      };
    }
  
    renderPage() {   

       
        const data1 = [ 14, -1, 100, -95, -94, -24, -8, 85, -91, 35, -53, 53, -78, 66, 96, 33, -26, -32, 73, 8 ]
            .map((value) => ({ value }))
        const data2 = [ 24, 28, 93, 77, -42, -62, 52, -87, 21, 53, -78, -62, -72, -6, 89, -70, -94, 10, 86, 84 ]
            .map((value) => ({ value }))

        const barData = [
            {
                data: data1,
                svg: {
                    fill: '#FFD600',
                },
            },
            {
                data: data2,
            },
        ]

        const data3 = [
            {
                value: 50,
            },
            {
                value: 10,
                svg: {
                    fill: 'rgba(134, 65, 244, 0.5)',
                },
            },
            {
                value: 40,
                svg: {
                    stroke: 'purple',
                    strokeWidth: 2,
                    fill: 'white',
                    strokeDasharray: [ 4, 2 ],
                },
            },
            {
                value: 95,
                svg: {
                    fill: 'url(#gradient)',
                },
            },
            {
                value: 85,
                svg: {
                    fill: 'green',
                },
            },
        ]

        const data4 = [ 50, 10, 40, 95, 85 ]

        const data5 = [
            {
                value: 50,
                label: 'One',
            },
            {
                value: 10,
                label: 'Two',
            },
            {
                value: 40,
                label: 'Three',
            },
            {
                value: 95,
                label: 'Four',
            },
            {
                value: 85,
                label: 'Five',
            },
        ]

        const CUT_OFF = 50
        const Labels = ({  x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={ index }
                    x={ value > CUT_OFF ? x(0) + 10 : x(value) + 10 }
                    y={ y(index) + (bandwidth / 2) }
                    fontSize={ 14 }
                    fill={ value > CUT_OFF ? 'white' : 'black' }
                    alignmentBaseline={ 'middle' }
                >
                    {value}
                </Text>
            ))
        )

        const data6 = [ 10, 5, 25, 15, 20 ]

        const CUT_OFF1 = 20
        const Labels1 = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={ index }
                    x={ x(index) + (bandwidth / 2) }
                    y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
                    fontSize={ 14 }
                    fill={ value >= CUT_OFF ? 'white' : 'black' }
                    alignmentBaseline={ 'middle' }
                    textAnchor={ 'middle' }
                >
                    {value}
                </Text>
            ))
        )

        const data7 = [ 14, 80, 100, 55 ]
             
        return (
            <ScrollView>
                <CardChart title='Bar'>
                    <AnterosChart.BarChartSVG
                        style={ { height: 200 } }
                        data={ barData }
                        yAccessor={({ item }) => item.value}
                        svg={{
                            fill: 'rgb(221,44,0,4)',
                        }}
                        contentInset={ { top: 30, bottom: 30 } }
                        { ...this.props }
                    >
                        <AnterosChart.GridSVG/>
                    </AnterosChart.BarChartSVG>
                </CardChart>

                <CardChart title='Bar'>
                    <AnterosChart.BarChartSVG
                        style={ { height: 200 } }
                        data={ dataChart }
                        contentInset={ { top: 20, bottom: 20 } }
                        svg={ {
                            strokeWidth: 2,
                            fill: 'url(#gradient)',
                        } }
                    >
                        <AnterosChart.GridSVG/>
                        <Gradient/>
                    </AnterosChart.BarChartSVG>
                </CardChart>

                <CardChart title='Bar'>
                    <AnterosChart.BarChartSVG
                        style={{ height: 200 }}
                        data={data3}
                        gridMin={0}
                        svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                        yAccessor={({ item }) => item.value}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <AnterosChart.GridSVG/>
                        <Gradient/>
                    </AnterosChart.BarChartSVG>
                </CardChart>

                <CardChart title='Bar'>
                    <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                        <AnterosChart.BarChartSVG
                            style={{ flex: 1, marginLeft: 8 }}
                            data={data4}
                            horizontal={true}
                            svg={{ fill: 'rgba(194,24,91, 0.8)', }}
                            contentInset={{ top: 10, bottom: 10 }}
                            spacing={0.2}
                            gridMin={0}
                        >
                            <AnterosChart.GridSVG direction={AnterosChart.GridSVG.Direction.VERTICAL}/>
                        </AnterosChart.BarChartSVG>
                    </View>
                </CardChart>    

                <CardChart title='Bar'>
                    <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                        <AnterosChart.YAxisSVG
                            data={data5}
                            yAccessor={({ index }) => index}
                            scale={scale.scaleBand}
                            contentInset={{ top: 10, bottom: 10 }}
                            spacing={0.2}
                            formatLabel={(_, index) => data5[ index ].label}
                        />
                        <AnterosChart.BarChartSVG
                            style={{ flex: 1, marginLeft: 8 }}
                            data={data5}
                            horizontal={true}
                            yAccessor={({ item }) => item.value}
                            svg={{ fill: 'rgba(230,81,0, 0.8)' }}
                            contentInset={{ top: 10, bottom: 10 }}
                            spacing={0.2}
                            gridMin={0}
                        >
                            <AnterosChart.GridSVG direction={AnterosChart.GridSVG.Direction.VERTICAL}/>
                        </AnterosChart.BarChartSVG>
                    </View>
                </CardChart> 

                <CardChart title='Bar'>
                    <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                        <AnterosChart.BarChartSVG
                            style={{ flex: 1, marginLeft: 8 }}
                            data={data4}
                            horizontal={true}
                            svg={{ fill: 'rgba(121,85,72, 0.8)' }}
                            contentInset={{ top: 10, bottom: 10 }}
                            spacing={0.2}
                            gridMin={0}
                        >
                            <AnterosChart.GridSVG direction={AnterosChart.GridSVG.Direction.VERTICAL}/>
                            <Labels/>
                        </AnterosChart.BarChartSVG>
                    </View>
                </CardChart> 

                <CardChart title='Bar'>
                    <View style={{ flexDirection: 'row', height: 220, paddingVertical: 16 }}>
                        <AnterosChart.BarChartSVG
                            style={{ flex: 1 }}
                            data={data6}
                            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                            contentInset={{ top: 10, bottom: 10 }}
                            spacing={0.2}
                            gridMin={0}
                        >
                            <AnterosChart.GridSVG direction={AnterosChart.GridSVG.Direction.HORIZONTAL}/>
                            <Labels1/>
                        </AnterosChart.BarChartSVG>
                    </View>
                </CardChart> 

                <CardChart title='Bar'>
                    <View style={{ height: 220, padding: 20 }}>
                        <AnterosChart.BarChartSVG
                            style={{ flex: 1 }}
                            data={data7}
                            gridMin={0}
                            svg={{ fill: '#D32F2F' }}
                        />
                        <AnterosChart.XAxisSVG
                            style={{ marginTop: 10 }}
                            data={ data7 }
                            scale={scale.scaleBand}
                            formatLabel={ (value, index) => index }
                            labelStyle={ { color: 'black' } }
                        />
                    </View>
                </CardChart> 
            </ScrollView>
        )
    }
}

  
class MultiSeriesExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Multi series",
        showBackButton: true
    };

    renderPage(){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <AnterosText style={{fontSize: 40,color:'#3F51B5'}}>{'Multi series'}</AnterosText>
                <AnterosChart 
                    data={[
                    {
                        type: 'area',
                        data: [{value: 3.48}, {value: 1.38}, {value: 6.73}, {value: 4.62}, {value: 3.14}],
                        highCol: 'rgb(255,0,0)',
                        lowCol: 'rgb(255,165,0)'
                    },
                    {
                        type: 'bars',
                        data: [{value: 2.16}, {value: 4.83}, {value: 4.04}, {value: 4.30}, {value: 5.26}],
                        highCol: 'rgb(125,0,255)',
                        lowCol: 'rgb(0,255,0)'
                    },
                    {
                        type: 'line',
                        data: [{value: 4.47}, {value: 5.99}, {value: 1.21}, {value: 3.17}, {value: 4.24}],
                        lineColor: 'green'
                    },
                    {
                        type: 'spline',
                        data: [{value: 3.10}, {value: 2.61}, {value: 3.89}, {value: 1.54}, {value: 1.32}],
                        lineColor: 'rgba(255,255,0,.8)'
                }]}/>
            </View>)
    }
}

class StepExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Step",
        showBackButton: true
    };

    renderPage(){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <AnterosText style={{fontSize: 40,color:'#3F51B5'}}>{'Step'}</AnterosText>
                <AnterosChart
                    interactive={true}
                    animated={true}
                    pointsOnScreen={20}
                    data={[{
                        type: 'step',
                        lineColor: '#F57F17',
                        drawChart: true,
                        data: Array.from(Array(40)).map(() => {
                        let rand = Math.random() + 2;
                        return {value: rand, valueLow: rand - Math.random() - .5};
                        })}
                ]} />
            </View>)
    }
}

class AreaRangeExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Area range",
        showBackButton: true
    };

    renderPage(){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <AnterosText style={{fontSize: 40,color:'#3F51B5'}}>{'Area range'}</AnterosText>
                <AnterosChart
                    clickFeedback={true}
                    interactive={true}
                    animated={true}
                    data={[{
                        type: 'area-range',
                        lineColor: '#FFEA00',
                        highCol: 'rgb(255,0,0)',
                        lowCol: 'rgb(255,165,0)',
                        drawChart: true,
                        data: Array.from(Array(20)).map(() => {
                        let rand = Math.random() + 2;
                        return {value: rand, valueLow: rand - Math.random() - .5};
                        })}
                ]} />
            </View>)
    }
}

class BarsRangeExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Bars range",
        showBackButton: true
    };

    renderPage(){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <AnterosText style={{fontSize: 40,color:'#3F51B5'}}>{'Bars range'}</AnterosText>
                <AnterosChart
                    interactive={true}
                    clickFeedback={true}
                    animated={true}
                    data={[{
                        type: 'bars-range',
                        lineColor: '#9E9D24',
                        data: Array.from(Array(20)).map(() => {
                        let rand = Math.random() + 2;
                        return {value: rand, valueLow: rand - Math.random() - .5};
                        })}
                ]} />
            </View>)
    }
}

class Bars3DExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Bars 3D",
        showBackButton: true
    };

    renderPage(){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <AnterosText style={{fontSize: 40,color:'#3F51B5'}}>{'Bars 3D'}</AnterosText>
                <AnterosChart
                    animated={true}
                    interactive={true}
                    clickFeedback={true}
                    data={[{
                        type: 'bars-3d',
                        drawChart: true,
                        data: Array.from(Array(3)).map((u, idx) => {
                        let col = `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`;
                            return Array.from(Array(5)).map((u2, idx2) => {
                            let val = Math.random();
                            return {value: val, color: shadeColor(col, 1 - val)};
                            });
                        })
                    }
                ]} /> 
            </View>)
    }
}

class CandleStickExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Candle stick",
        showBackButton: true
    };

    renderPage(){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <AnterosText style={{fontSize: 40,color:'#3F51B5'}}>{'Candle stick'}</AnterosText>
                <AnterosChart
                    clickFeedback={true}
                    interactive={true}
                    animated={true}
                    data={[{
                        type: 'candlestick',
                        lineColor: '#01579B',
                        fillUp:  '#FFEB3B',
                        fillDown: 'rgba(0,0,0,0)',
                        drawChart: true,
                        data: Array.from(Array(20)).map(() => {
                            let rand = Math.random() + 2, open, close, low, high;
                            if (Math.random() > .5) {
                            open = rand + Math.random();
                            high = open + Math.random();
                            close = rand - Math.random();
                            low = close - Math.random();
                            } else {
                            open = rand - Math.random();
                            low = open - Math.random();
                            close = rand + Math.random();
                            high = close + Math.random();
                            }
                            return {open, close, low, high};
                        })},
                        {
                        type: 'candlestick',
                        lineColor: 'blue',
                        fillUp:  'green',
                        fillDown: 'red',
                        drawChart: true,
                        data: Array.from(Array(20)).map(() => {
                            let rand = Math.random() + 7, open, close, low, high;
                            if (Math.random() > .5) {
                            open = rand + Math.random();
                            high = open + Math.random();
                            close = rand - Math.random();
                            low = close - Math.random();
                            } else {
                            open = rand - Math.random();
                            low = open - Math.random();
                            close = rand + Math.random();
                            high = close + Math.random();
                            }
                            return {open, close, low, high};
                        })}
                ]} />
            </View>)
    }
}

class PieChartExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Pie",
        showBackButton: true
    };

    renderPage(){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <AnterosText style={{fontSize: 40,color:'#3F51B5'}}>{'Pie'}</AnterosText>
                <AnterosChart.PieChartART 
                    data={{
                    data: [
                        {value: .6, color: '#FBC02D'},
                        {value: 5, color: '#C0CA33'},
                        {value: 2, color: '#1976D2'},
                        {value: 3, color: '#F50057'}]
                }}/>
            </View>)
    }
}

class DonutChartExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Donut",
        showBackButton: true
    };

    renderPage(){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <AnterosText style={{fontSize: 40,color:'#3F51B5'}}>{'Donut'}</AnterosText>
                <AnterosChart.DonutChartART
                    style={{overflow: 'visible'}}
                        data={{
                        stackInnerRadius: 250,
                        stackOuterRadius: 400,
                        gap: 15,
                        data: [
                        {data: [{ value: 84, color: "rgba(255,255,0,.75)"}, {value: 16, color: "rgba(50,50,50,.75)"}]},
                        {data: [{value: 6, color: '#C0CA33'}, {value: 5, color: '#FFB300'}, {value: 3, color: '#CE93D8'}]},
                        {data: [{value: 3, color: '#F50057'}, {value: 15, color: '#5C6BC0'}, {value: 3, color: 'yellow'}]}
                        ]
                }}/>
            </View>)
    }
}

class ScatterExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Scatter and bubble",
        showBackButton: true
    };

    renderPage(){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <AnterosText style={{fontSize: 20,color:'#3F51B5'}}>{'Scatter'}</AnterosText>
                <AnterosChart.XYChartART 
                    showGrid={true} 
                    type="scatter"
                    pointRadius={3} 
                    data={Array.from(Array(20)).map(()=> {
                        return {x: Math.random()*20, y: Math.random()* 10
                        }})}/>
                <AnterosSeparator/>
                <AnterosText style={{fontSize: 20,color:'#3F51B5'}}>{'Bubble'}</AnterosText>
                <AnterosChart.XYChartART  
                    type="bubble" 
                    animated={true} 
                    data={Array.from(Array(20)).map(()=> { 
                    return {
                        x: Math.random()*20, 
                        y: Math.random()* 10, 
                        value: Math.random()* 20, 
                        color: `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)}, .5)` }
                    })}/> 
            </View>)
    }
}

class SparkPieExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Spark pie",
        showBackButton: true
    };

    renderPage(){
        return (
            <View style={{flex:1, justifyContent:'space-between', alignItems:'center'}}>
                <AnterosText style={{fontSize: 40,color:'#3F51B5'}}>{'Spark pie'}</AnterosText>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                    <AnterosChart.SparkyPieART
                        data={{data: Array.from(Array(5)).map(() => {
                            return {
                                value: Math.random(),
                                color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`
                            }
                        })}}
                            size={60}
                    />
                    <AnterosChart.SparkyPieART
                        data={{data: Array.from(Array(5)).map(() => {
                            return {
                                value: Math.random(),
                                color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`
                            }
                        })}}
                            size={60}
                    />
                    <AnterosChart.SparkyPieART
                        data={{data: Array.from(Array(5)).map(() => {
                            return {
                                value: Math.random(),
                                color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`
                            }
                        })}}
                            size={60}
                    />
                    <AnterosChart.SparkyPieART
                        data={{data: Array.from(Array(5)).map(() => {
                            return {
                                value: Math.random(),
                                color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`
                            }
                        })}}
                            size={60}
                    />
                    <AnterosChart.SparkyPieART
                        data={{data: Array.from(Array(5)).map(() => {
                            return {
                                value: Math.random(),
                                color: `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`
                            }
                        })}}
                            size={60}
                    />
                </View>
            </View>)
    }
}


class HeatmapExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Heatmap",
        showBackButton: true
    };

    renderPage(){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <AnterosText style={{fontSize: 40,color:'#3F51B5'}}>{'Heatmap'}</AnterosText>
                <AnterosChart.HeatmapChartART
                    data={[
                        [1,2,3,4,5,6],
                        [7,8,9,10,11,12],
                        [13,14,15,16,17,18],
                        [19,20,21,22,23,24]
                    ]} highColor="#E53935" lowColor="#FFCDD2" />
            </View>)
    }
}




class HistogramExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Heatmap",
        showBackButton: true
    };

    constructor(props){
        super(props);
        this.state = {
            data: [{}],
          }
    }

    UNSAFE_componentWillMount() {
      this.set_random_param()
    }

    set_random_param() {
      var row_datas = [];
      for (var i=0; i<500; i++) {
        row_datas[i] = Math.random() * 100;
      }
      this.setState({
        data: [
          { data: row_datas }
        ]
      })
    }

    renderPage() {
      return (
        <View style={stylesHistogram.container}>
          <AnterosText style={stylesHistogram.welcome}>
            Histogram Demo
          </AnterosText>
          <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
            <AnterosHistogram
              data={this.state.data}
              height={200}
              width={300}
              split={20}
              horizontal={false}
            />
          </View>
          <View style={{flex:1}}>
              <AnterosButton onPress={() => {this.set_random_param()}} title='Update'/>
          </View>
        </View>
      );
    }
  }
  
  var stylesHistogram = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      flex:1
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    button: {
      flex:1,
      height: 30,
      marginTop: 30,
      paddingTop: 6,
      paddingBottom: 6,
      borderRadius: 3,
      borderWidth: 1,
      backgroundColor: '#007AFF',
      borderColor: 'transparent',
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
    },
  });