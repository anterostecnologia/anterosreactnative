import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import AnterosRefreshableScrollView from '../ScrollView/AnterosRefreshableScrollView'
import {AnterosText} from '../Text/AnterosText';
import {AnterosLocalDatasource, AnterosRemoteDatasource, dataSourceEvents} from '../Datasource/AnterosDatasource'

const { width, height } = Dimensions.get('window')
const PaginationStatus = {
  firstLoad: 0,
  waiting: 1,
  allLoaded: 2
}

export class AnterosListView extends Component {
  static defaultProps = {
    initialNumToRender: 10,
    horizontal: false,

    firstLoader: true,
    scrollEnabled: true,
    onFetch: null,
    enableEmptySections: true,

    // Custom View
    header: null,
    item: null,
    paginationFetchingView: null,
    paginationAllLoadedView: null,
    paginationWaitingView: null,
    emptyView: null,
    separator: null,

    // Refreshable
    refreshable: true,
    refreshableMode: 'basic', // basic or advanced

    // RefreshControl
    refreshableTitle: null,
    refreshableColors: ['dimgray', 'tomato', 'limegreen'],
    refreshableProgressBackgroundColor: 'white',
    refreshableSize: undefined,
    refreshableTintColor: 'lightgray',
    customRefreshControl: null,

    // Advanced RefreshView
    refreshableTitlePull: 'Pull to refresh',
    refreshableTitleRefreshing: 'Loading...',
    refreshableTitleRelease: 'Release to load',
    customRefreshView: null,
    displayDate: false,
    dateFormat: 'yyyy-MM-dd hh:mm',
    dateTitle: 'Last updated: ',
    arrowImageSource: require('../../assets/images/downArrow.png'),
    arrowImageStyle: undefined,
    refreshViewStyle: undefined,
    dateStyle: undefined,
    refreshViewHeight: 80,

    // Pagination
    pagination: true,
    autoPagination: true,
    allLoadedText: 'End of List',

    // Spinner
    spinnerColor: undefined,
    fetchingSpinnerSize: 'large',
    waitingSpinnerSize: 'small',
    waitingSpinnerText: 'Loading...',

    // Pagination Button
    paginationBtnText: 'Load more...',

    // GridView
    numColumns: 1,

    pageLimit : 10
   
  }

  static propTypes = {
    initialNumToRender: PropTypes.number,
    horizontal: PropTypes.bool,

    firstLoader: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    onFetch: PropTypes.func,
    enableEmptySections: PropTypes.bool,

    // Custom ListView
    header: PropTypes.func,
    item: PropTypes.func,
    paginationFetchingView: PropTypes.func,
    paginationAllLoadedView: PropTypes.func,
    paginationWaitingView: PropTypes.func,
    emptyView: PropTypes.func,
    separator: PropTypes.func,

    // Refreshable
    refreshable: PropTypes.bool,
    refreshableMode: PropTypes.string,

    // RefreshControl
    refreshableTitle: PropTypes.string,
    refreshableColors: PropTypes.array,
    refreshableProgressBackgroundColor: PropTypes.string,
    refreshableSize: PropTypes.string,
    refreshableTintColor: PropTypes.string,
    customRefreshControl: PropTypes.func,

    // Advanced RefreshView
    refreshableTitlePull: PropTypes.string,
    refreshableTitleRefreshing: PropTypes.string,
    refreshableTitleRelease: PropTypes.string,
    customRefreshView: PropTypes.func,
    displayDate: PropTypes.bool,
    dateFormat: PropTypes.string,
    dateTitle: PropTypes.string,
    arrowImageSource: PropTypes.any,
    arrowImageStyle: PropTypes.object,
    refreshViewStyle: PropTypes.object,
    dateStyle: PropTypes.object,
    refreshViewHeight: PropTypes.number,


    // Pagination
    pagination: PropTypes.bool,
    autoPagination: PropTypes.bool,
    allLoadedText: PropTypes.string,

    // Spinner
    spinnerColor: PropTypes.string,
    fetchingSpinnerSize: PropTypes.any,
    waitingSpinnerSize: PropTypes.any,
    waitingSpinnerText: PropTypes.string,

    // Pagination Button
    paginationBtnText: PropTypes.string,

    // GridView
    numColumns: PropTypes.number,

    pageLimit : PropTypes.number,

    //dataSource
    dataSource: PropTypes.oneOfType([
        PropTypes.instanceOf(AnterosLocalDatasource),
        PropTypes.instanceOf(AnterosRemoteDatasource)
    ]),
  }

  constructor(props) {
    super(props)
    this.getRows = this.getRows.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onPaginate = this.onPaginate.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.setPage = this.setPage.bind(this);
    this.getPage = this.getPage.bind(this);
    this.setRows = this.setRows.bind(this);
    this.getRows = this.getRows.bind(this);
    this.sleep = this.sleep.bind(this);
    this.refresh = this.refresh.bind(this);
    this.scrollToOffset = this.scrollToOffset.bind(this);
    this.scrollToIndex = this.scrollToIndex.bind(this);
    this.scrollToItem = this.scrollToItem.bind(this);
    this.scrollToEnd = this.scrollToEnd.bind(this);
    this.postRefresh = this.postRefresh.bind(this);
    this.endFetch = this.endFetch.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.postPaginate = this.postPaginate.bind(this);
    this.updateRows = this.updateRows.bind(this);
    this.paginationWaitingView = this.paginationWaitingView.bind(this);
    this.paginationFetchingView = this.paginationFetchingView.bind(this);
    this.paginationAllLoadedView = this.paginationAllLoadedView.bind(this);
    this.paginationWaitingView = this.paginationWaitingView.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderEmptyView = this.renderEmptyView.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderScrollComponent = this.renderScrollComponent.bind(this);
    this.renderRefreshControl = this.renderRefreshControl.bind(this);

    this.setPage(1);
    this.setRows([]);

    this.state = {
      dataSource: [],
      isRefreshing: false,
      paginationStatus: PaginationStatus.firstLoad
    }
  }

  componentDidMount() {
    this.mounted = true
    if (this.props.firstLoader) {
      this.onFetch(this.getPage(), this.postRefresh, this.endFetch)
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  onRefresh(){
    if (this.mounted) {
      this.setState({
        isRefreshing: true
      })
      this.setPage(1)
      this.onFetch(this.getPage(), this.postRefresh, this.endFetch)
    }
  }

  onPaginate(){
    if (this.state.paginationStatus !== PaginationStatus.allLoaded && !this.state.isRefreshing) {
      this.setState({ paginationStatus: PaginationStatus.waiting })
      this.onFetch(this.getPage() + 1, this.postPaginate, this.endFetch)
    }
  }

  onEndReached = () => {
    if (this.props.pagination && this.props.autoPagination && this.state.paginationStatus === PaginationStatus.waiting) {
      this.onPaginate()
    }
  }

  applyFilter(){
    this.setState({...this.state,isRefreshing: false,dataSource: this.getRows()});
  }

  setPage(page){
    this.page = page;
  }

  getPage(){
    return this.page;
  }

  setRows(rows) {
    this.rows = rows;
  }

  getRows(){
    if (this.props.filter){
      return this.rows.filter(this.props.filter);
    } else {
      return this.rows;
    }
  }

  sleep(time){
    return new Promise(resolve => setTimeout(() => resolve(), time));
  }

  refresh() {
    this.onRefresh()
  }

  scrollToOffset(option){
    this._flatList.scrollToOffset(option)
  }

  scrollToIndex(option){
    this._flatList.scrollToIndex(option)
  }

  scrollToItem(option) {
    this._flatList.scrollToItem(option)
  }

  scrollToEnd(option) {
    this._flatList.scrollToEnd(option)
  }

  postRefresh(rows = [], pageLimit){
    if (this.mounted) {
      let paginationStatus = PaginationStatus.waiting
      if (rows.length < pageLimit) {
        paginationStatus = PaginationStatus.allLoaded
      }
      this.updateRows(rows, paginationStatus)
    }
  }

  endFetch() {
    if (this.mounted) {
      this.setState({ isRefreshing: false })
      if (this.props.refreshableMode === 'advanced' && this._flatList._listRef._scrollRef.onRefreshEnd) {
        this._flatList._listRef._scrollRef.onRefreshEnd()
      }
    }
  }

  postPaginate(rows = [], pageLimit){
    this.setPage(this.getPage() + 1)
    let mergedRows
    let paginationStatus
    if (rows.length === 0) {
      paginationStatus = PaginationStatus.allLoaded
    } else {
      mergedRows = this.getRows().concat(rows)
      paginationStatus = PaginationStatus.waiting
    }

    this.updateRows(mergedRows, paginationStatus);
  }

  updateRows(rows, paginationStatus){
    if (rows) {
      this.setRows(rows)
      this.setState({
        dataSource: this.getRows(),
        isRefreshing: false,
        paginationStatus
      })
    } else {
      this.setState({
        dataSource: this.getRows().slice(),
        isRefreshing: false,
        paginationStatus
      })
    }

    if (this.props.refreshableMode === 'advanced') {
      this.endFetch()
    }
  }

  updateDataSource(rows = []) {
    this.setRows(rows)
    this.setState({
      dataSource: this.getRows()
    })
  }

  paginationFetchingView() {
    if (this.props.paginationFetchingView) {
      return this.props.paginationFetchingView()
    }

    return (
      <View style={styles.fetchingView}>
        <AnterosText style={styles.paginationViewText}>{this.props.waitingSpinnerText}</AnterosText>
      </View>
    )
  }

  paginationAllLoadedView() {
    if (this.props.pagination) {
      if (this.props.paginationAllLoadedView) {
        return this.props.paginationAllLoadedView()
      }

      return (
        <View style={styles.paginationView}>
          <AnterosText style={styles.allLoadedText}>
            {this.props.allLoadedText}
          </AnterosText>
        </View>
      )
    }

    return null
  }

  paginationWaitingView(paginateCallback){
    if (this.props.pagination) {
      if (this.props.autoPagination) {
        if (this.props.paginationWaitingView) {
          return this.props.paginationWaitingView(paginateCallback)
        }

        return (
          <View style={styles.paginationView}>
            <ActivityIndicator color={this.props.spinnerColor} size={this.props.waitingSpinnerSize} />
            <AnterosText style={[styles.paginationViewText, { marginLeft: 5 }]}>
              {this.props.waitingSpinnerText}
            </AnterosText>
          </View>
        )
      }
    }

    return null
  }

  renderHeader(){
    if (this.props.header) {
      return this.props.header()
    }

    return null
  }

  renderItem({ item, index, separators }){
    if (this.props.item) {
      return this.props.item(item, index, separators)
    }

    return null
  }

  renderSeparator(){
    if (this.props.separator) {
      if (this.props.numColumns > 1) {
        return null
      }

      return this.props.separator()
    }

    return null
  }

  renderEmptyView() {
    if (this.state.paginationStatus !== PaginationStatus.firstLoad && this.props.emptyView) {
      return this.props.emptyView()
    }

    return null
  }

  renderFooter() {
    // if (this.state.paginationStatus === PaginationStatus.firstLoad) {
    //   return this.paginationFetchingView()
    // } else if (this.state.paginationStatus === PaginationStatus.waiting && this.props.autoPagination === false) {
    //   return this.paginationWaitingView(this.onPaginate)
    // } else if (this.state.paginationStatus === PaginationStatus.waiting && this.props.autoPagination === true) {
    //   return this.paginationWaitingView()
    // } else if (this.getRows().length !== 0 && this.state.paginationStatus === PaginationStatus.allLoaded) {
    //   return this.paginationAllLoadedView()
    // }

    return null
  }

  renderScrollComponent(props) {
    if (this.props.refreshable && this.props.refreshableMode === 'advanced') {
      return (
        <AnterosRefreshableScrollView
          {...props}
          insideOfUltimateListView
          onRefresh={this.onRefresh}
          ref={ref => this.scrollView = ref}
        />
      )
    }

    return (
      <ScrollView
        {...props}
        ref={ref => this.scrollView = ref}
      />
    )
  }

  renderRefreshControl(){
    if (this.props.refreshable && this.props.refreshableMode === 'basic') {
      if (this.props.customRefreshControl) {
        return this.props.customRefreshControl(this.state.isRefreshing, this.onRefresh)
      }

      return (
        <RefreshControl
          onRefresh={this.onRefresh}
          refreshing={this.state.isRefreshing}
          colors={this.props.refreshableColors}
          progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
          size={this.props.refreshableSize}
          tintColor={this.props.refreshableTintColor}
          title={this.props.refreshableTitle}
        />
      )
    }

    return null
  }

  onFetch = (page = 1, startFetch, abortFetch) => {
    try {
        
        let pageLimit = this.props.pageLimit ? this.props.pageLimit : 10
        let itens = this.props.dataSource ? this.props.dataSource.data : this.props.itens

        let rowData = [...itens];
  
        if (page === 10) {
          rowData = []
        }
  
        startFetch(rowData, pageLimit)
      } catch (err) {
        abortFetch() 
      }
  }

  render() {
    const { numColumns } = this.props
    return (
      <FlatList
        renderScrollComponent={this.renderScrollComponent}
        key={numColumns}
        onEndReachedThreshold={0.1}
        {...this.props}
        ref={ref => this._flatList = ref}
        data={this.props.dataSource ? this.props.dataSource.data : this.props.itens}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmptyView}
        onEndReached={this.onEndReached}
        refreshControl={this.renderRefreshControl()}
        numColumns={numColumns}
        onFetch={this.onFetch}
      />
    )
  }
}

const styles = StyleSheet.create({
  fetchingView: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationView: {
    flex: 0,
    width,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationViewText: {
    fontSize: 16
  },
  paginationViewSpinner: {
    marginRight: 5
  },
  paginationBtn: {
    backgroundColor: 'tomato',
    margin: 10,
    borderRadius: 20,
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationBtnText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  separator: {
    height: 0.5,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'lightgray'
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  allLoadedText: {
    alignSelf: 'center',
    color: '#bfbfbf'
  },
  gridItem: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  }
})