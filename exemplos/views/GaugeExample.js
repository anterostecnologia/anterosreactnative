import {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';

import {AnterosNavigationPage, AnterosText, AnterosImage, AnterosGauge, AnterosPercentageCircle} from 'anteros-react-native';

export class GaugeExample extends AnterosNavigationPage {
  static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Gauge',
      showBackButton: true
  };

  constructor(props){
      super(props);
      this._handleGaugeChange = this._handleGaugeChange.bind(this);
      this.state = {percent:10};
  }

  _handleGaugeChange(){
      console.log('_handleGaugeChange');
  }

  

  renderPage(){
      return (<ScrollView>
                <View style={{flex:1, justifyContent:'space-between', alignItems:'center'}}>
                    <View style={{padding:20}}>
                        {/* {<AnterosGauge.AnimatedSemiCircular
                            chartWidth={100}
                            strokeWidth={10}
                            fill={20}
                            prefill={-50}/>} */}
                    </View>
                    {<AnterosGauge.ProgressLabel
                        progress={50}
                        startDegree={60}
                        progressWidth={8}
                        trackWidth={20}
                        cornersWidth={4}
                        size={100}
                        fillColor="blue"
                        trackColor="red"
                        progressColor="green"
                    />}
                    {<AnterosGauge.LineGauge min={0} max={100} value={42} onChange={this._handleGaugeChange} />}

                    {/* <AnterosGauge.Speedometer
                        value={50}
                        maxValue={150}
                        size={250}
                        outerColor="#d3d3d3"
                        internalColor="#ff0000"
                        showText
                        text="50.00"
                        textStyle={{ color: 'green' }}
                        showLabels
                        labelStyle={{ color: 'blue' }}
                        showPercent
                        percentStyle={{ color: 'red' }}
                    /> */}

                <AnterosGauge.AnimatedGaugeProgress
                    size={200}
                    width={15}
                    fill={100}
                    cropDegree={90}
                    tintColor="#4682b4"
                    backgroundColor="#b0c4de" />

                <View style={{flexDirection:'row'}}>
                    <AnterosGauge.AnimatedGaugeProgress
                        size={50}
                        width={3}
                        fill={100}
                        rotation={0}
                        cropDegree={90}
                        tintColor="#4682b4"
                        backgroundColor="#b0c4de" />
                    <AnterosGauge.AnimatedGaugeProgress
                        size={50}
                        width={3}
                        fill={100}
                        rotation={180}
                        cropDegree={90}
                        tintColor="#4682b4"
                        backgroundColor="#b0c4de" />
                    <AnterosGauge.AnimatedGaugeProgress
                        size={50}
                        width={3}
                        fill={100}
                        rotation={90}
                        cropDegree={0}
                        tintColor="#4682b4"
                        backgroundColor="#b0c4de" />
                    <AnterosGauge.AnimatedGaugeProgress
                        size={50}
                        width={3}
                        fill={100}
                        rotation={0}
                        cropDegree={180}
                        tintColor="#4682b4"
                        backgroundColor="#b0c4de" />
                    <AnterosGauge.AnimatedGaugeProgress
                        size={50}
                        width={3}
                        fill={100}
                        rotation={90}
                        cropDegree={180}
                        tintColor="#4682b4"
                        backgroundColor="#b0c4de"
                        strokeCap="circle" />
                    </View>     
              </View>

              <View style={styles.row}>
                    <View style={styles.item}>
                        <AnterosPercentageCircle radius={35} percent={50} color={"#3498db"}></AnterosPercentageCircle>
                        <AnterosText style={[styles.percentText]}> 50% </AnterosText>
                    </View>
                    <View style={styles.item}>
                    <AnterosPercentageCircle radius={35} percent={40} color={"#f39c12"}>
                        <AnterosText style={styles.checkin}>30</AnterosText>
                        <AnterosText style={styles.desc}>score</AnterosText>
                    </AnterosPercentageCircle>
                        <AnterosText style={[styles.percentText]}> 30% </AnterosText>
                    </View>
                    <View style={styles.item}>
                    <AnterosPercentageCircle radius={35} bgcolor="#fff" percent={75} color={"#2ecc71"}></AnterosPercentageCircle>
                        <AnterosText style={[styles.percentText]}> 75% </AnterosText>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <AnterosPercentageCircle radius={60} bgcolor="#fff" borderWidth={4} percent={90} color={"#34495e"}>
                            <View style={{marginLeft:30,alignItems:'center',flexDirection:'row'}}>
                                <AnterosImage style={{width:25,height:25}} source={require('../images/shoes.png')} />
                                <AnterosText style={{flex:1,fontSize:13}}>US$</AnterosText>
                            </View>
                            <View>
                                <AnterosText style={{fontSize:23,color:'#34495e'}}>20</AnterosText>
                            </View>
                        </AnterosPercentageCircle>
                        <AnterosText style={[styles.percentText]}> 90% </AnterosText>
                    </View>
                    <View style={styles.item}>
                        <AnterosPercentageCircle radius={60} percent={this.state.percent} color={"#9b59b6"}></AnterosPercentageCircle>
                        <AnterosText style={[styles.percentText]}> {this.state.percent} %</AnterosText>
                    </View>
                </View>                
              </ScrollView>
            );
  }
}





const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop:66,
      backgroundColor: '#fff',
    },
    welcome: {
      fontSize: 16,
      textAlign: 'center',
      margin: 20,
    },
    row:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'center',
      flexWrap:'wrap',
      marginBottom:40,
      marginTop:20
    },
    item:{
      flex:.33,
      justifyContent:'center',
      alignItems:'center',
    },
    percentText:{
      fontSize:15,
      paddingTop:10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  
    checkin: {
      fontSize:20,
      color: '#f39c12',
    },
    desc: {
      fontSize:12,
      color: '#999',
    },
  
  });