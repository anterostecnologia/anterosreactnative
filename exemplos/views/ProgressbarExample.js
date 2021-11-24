'use strict';

import {Component} from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';

import {AnterosNavigationPage, AnterosProgressBar, AnterosProgressCircle, AnterosAnimatedProgressbar,
    AnterosCircularProgress} from 'anteros-react-native';


export class ProgressbarExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Progressbar',
    showBackButton: true
  };

  state = {
    progress1: 0,
    progress2: 0
  };

  componentDidMount() {
    const interval = setInterval(() => {
      if (this.state.progress1 > 0.9) return clearInterval(interval);

      this.setState(state => {
        return {...this.state,
          progress1: state.progress1 + 0.1,
        };
      });
    }, 1000);

    var time = 150;
    var count = 0;
    setInterval(() => {
      if (++count < 15){
        return;
      }
      var progress2 = this.state.progress2 + Math.round((Math.random() * 4));
      if (progress2 >100) {
        progress2 = 0;
        count = 0;
      }
      this.setState(state => {
        return {...this.state,
          progress2: progress2
        };
      });
    }, time);
  }

  renderPage(){
    var innerDisplay = (
        <View style={{width: 200, height: 200, flex:1, justifyContent: 'center',
            alignItems: 'center', backgroundColor: '#036282'}}>
          <Text style={{fontSize: 30}}>{this.state.progress2 + "%"}</Text>
        </View>
      );

      return (
        <ScrollView style={{margin: 10}}>
        <View style={{alignItems:'center'}}>
            <AnterosProgressBar progress={200} size={1000} height={40} margin={10}  />
            <AnterosProgressBar height={40} progress={200} size={1000} margin={10}/>
            <AnterosProgressBar height={30} width={100} progress={200} size={1000} margin={10}/>
            <AnterosProgressBar 
                width={250} 
                height={25} 
                progress={200} 
                size={1000} 
                color={'#CDDC39'}
                style={{ borderWidth: 1, backgroundColor: '#eee' }} 
                margin={10}/>
            <AnterosProgressBar 
                width={250} 
                height={40} 
                progress={300} 
                size={1000} 
                color={'#AFB42B'}
                style={{ borderWidth: 1, backgroundColor: '#eee' }} 
                hideProgressText={true} 
                margin={10}/>
            <AnterosProgressBar 
                width={250} 
                height={40} 
                progress={200} 
                size={1000}
                color={'#827717'}
                onProgress={(progressValue) => this.setState({ progressValue })} 
                style={{ borderWidth: 1, backgroundColor: '#eee' }} 
                hideProgressText={true} 
                margin={10}/>
            <Text style={{margin:10}}>Progress: {this.state.progressValue}%</Text>
            <AnterosProgressBar 
                width={250} 
                height={22} 
                progress={200} 
                size={1000} 
                color={'#FBC02D'} 
                style={{ borderWidth: 1, backgroundColor: '#eee' }} 
                margin={10}/>
            <AnterosProgressBar 
                width={250} 
                height={40} 
                progress={200} 
                size={1000} 
                color={'#FFB74D'} 
                style={{ borderRadius: 1, borderWidth: 0, backgroundColor: '#eee' }} 
                margin={10}/>
            <AnterosProgressBar 
                width={170} 
                height={40} 
                progress={200} 
                size={1000} 
                color={'#3F51B5'} 
                style={{ borderRadius: 1, borderWidth: 0.5, backgroundColor: '#fff', borderColor: '#3F51B5' }} 
                margin={10}/>
             <AnterosProgressCircle
                percent={30}
                margin={10}
                radius={50}
                borderWidth={8}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff">
                    <Text style={{ fontSize: 18 }}>{'30%'}</Text>
             </AnterosProgressCircle>   
             <AnterosProgressCircle
                percent={80}
                margin={10}
                radius={50}
                borderWidth={8}
                color="green"
                shadowColor="#999"
                bgColor="#fff">
                    <Text style={{ fontSize: 18 }}>{'80%'}</Text>
             </AnterosProgressCircle>  
             <View>
                <AnterosCircularProgress.Hollow size={200}
                        progressBarWidth={20} outlineWidth={0} outlineColor={'black'}
                        backgroundColor={'orange'} progressBarColor={'#02BAF7'}
                        innerComponent={innerDisplay} rotate={((this.state.progress2/100)*360)}/>
             </View>
             <View>
                <Text>No configuration</Text>
                <AnterosAnimatedProgressbar progress={this.state.progress1} />
             </View>

            <View>
                <Text>Config Options</Text>
                <AnterosAnimatedProgressbar
                    progress={this.state.progress1}
                    height={50}
                    borderColor="#DDD"
                    fillColor="tomato"
                    barColor="red"
                    borderRadius={5}
                />
            </View>

            <View>
                <Text>No Animation. No Border</Text>
                <AnterosAnimatedProgressbar
                    progress={this.state.progress1}
                    height={20}
                    borderColor="#DDD"
                    barColor="tomato"
                    borderRadius={5}
                    borderWidth={1}
                    animate={false}
                />
                </View>
            <View>
                <Text>Auto Sizing in a Column</Text>
                <AnterosAnimatedProgressbar
                    progress={this.state.progress1}
                    height={null}
                    borderColor="#DDD"
                    barColor="tomato"
                    borderRadius={5}
                    borderWidth={5}
                    duration={500}
                >
                    <View style={[styles.row, styles.center]}>
                    <Text style={[styles.barText, { fontSize: 30 }]}>
                        {Math.round(this.state.progress1 * 100)}%
                    </Text>
                    </View>
                </AnterosAnimatedProgressbar>
            </View>

            <View>
                <Text>Longer duration on transition</Text>
                <AnterosAnimatedProgressbar
                    progress={this.state.progress1}
                    height={20}
                    borderColor="#DDD"
                    barColor="tomato"
                    borderRadius={5}
                    borderWidth={5}
                    duration={500}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.rowText}>Progress with Children: </Text>
                <AnterosAnimatedProgressbar
                    progress={this.state.progress1}
                    height={40}
                    borderColor="#DDD"
                    barColor="tomato"
                    borderRadius={5}
                    borderWidth={5}
                    duration={500}
                    row>
                    <View style={[styles.row, styles.center, { flex: 1 }]}>
                    <Text style={styles.barText}>
                        {Math.round(this.state.progress1 * 100)}%
                    </Text>
                </View>
            </AnterosAnimatedProgressbar>
            </View>
            <View style={styles.row}>
                <Text style={styles.rowText}>Auto Sizing to Children on Row: </Text>
                <AnterosAnimatedProgressbar
                    progress={this.state.progress1}
                    height={null}
                    borderColor="#DDD"
                    barColor="tomato"
                    borderRadius={5}
                    borderWidth={5}
                    duration={500}
                    row>
                    <View style={[styles.row, styles.center]}>
                    <Text style={[styles.barText, { fontSize: 30 }]}>
                        {Math.round(this.state.progress1 * 100)}%
                    </Text>
                    </View>
                </AnterosAnimatedProgressbar>
            </View> 
            </View>            
        </ScrollView>
      );
  }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      paddingHorizontal: 30,
      justifyContent: "space-around",
    },
    rowText: {
      marginRight: 20,
    },
    row: {
      flexDirection: "row",
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
    barText: {
      backgroundColor: "transparent",
      color: "#FFF",
    },
  });
  