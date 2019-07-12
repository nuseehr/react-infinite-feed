import React, { Component } from "react";
import Feed from "./Feed";

import './App.css';
import { Layout, Row, Switch, Spin } from 'antd';

const { Content } = Layout;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      selectedFeeds: [],
      pages: 1,
      scrapNum: 0,
      scrapSwitch: false
    };
  }

  componentDidMount() {
    this._getFeeds(this.state.pages);
    window.addEventListener('scroll', this._infiniteScroll, true);
  }

  _getFeeds = async (pageNum) => {
    const feeds = await this._callApi(pageNum);
    const savedFeeds = JSON.parse(localStorage.getItem('scrapped'))

    if(savedFeeds !== null && savedFeeds.length !== 0) {
      const saved = savedFeeds.map(sf => {
        const idx = feeds.findIndex(f => f.id === sf.id)
        if(idx >= 0) feeds[idx] = sf
        else return sf
        return sf
      })

      this.setState({
        feeds: [...this.state.feeds, ...feeds],
        selectedFeeds: saved,
        scrapNum: saved[savedFeeds.length-1].scrapNum+1
      })
    }

    else {
      this.setState({
        feeds: [...this.state.feeds, ...feeds]
      })
    }
  }

  _callApi = (pageNum) => {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/cards/page_' + pageNum + '.json'; 
    return fetch(proxyurl + url)
    .then(res => res.json())
    .then(json => json)
    .catch( err => console.log(err));
  }

  _renderFeeds = (param) => {
    const feeds = param.map(feed => {
      return (
      <Feed
        image_url={feed.image_url}
        profile_image_url={feed.profile_image_url}
        nickname={feed.nickname}
        key={feed.id}
        id={feed.id}
        scrapNum={this._checkScrap(feed)}
        scrapPhoto={this._handleScrapFeeds}
        selectedFeeds={this.state.selectedFeeds}
      />
      );
    });
    
    return feeds;
  }
  
  _checkScrap = (feed) => {
    if(feed.scrapNum !== undefined) return feed.scrapNum

    else return this.state.scrapNum
  }

  _handleScrapFeeds = async (isSelected, selected) => {
    if(isSelected === 1) {
      await this.setState({
        scrapNum: this.state.scrapNum + isSelected,
        selectedFeeds: [...this.state.selectedFeeds, selected]
      })

      this._addSavedFeeds(this.state.selectedFeeds.length, selected) 
    }

    else if(isSelected === -1){
      await this.setState({
        scrapNum: this.state.scrapNum + isSelected,
        selectedFeeds: this.state.selectedFeeds.filter(f => f.id !== selected.id)
      })

      this._removeSavedFeeds(selected) 
    }
  }
 
  _addSavedFeeds = (isFirst, selected) => {
    if(isFirst === 1) {
      const savedFeeds = [ selected ]
      
      localStorage.setItem('scrapped', JSON.stringify(savedFeeds));
    }
    
    else {
      const savedFeeds = JSON.parse(localStorage.getItem('scrapped'))
      savedFeeds.push(selected)
      localStorage.setItem('scrapped', JSON.stringify(savedFeeds));
    }

  }

  _removeSavedFeeds = () => {
    const savedFeeds = this.state.selectedFeeds
    localStorage.setItem('scrapped', JSON.stringify(savedFeeds));
  }

  _infiniteScroll = () => {
    const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    const clientHeight = document.documentElement.clientHeight;
    if(scrollHeight - (scrollTop + clientHeight) < 1) {
      this.setState({
        pages: this.state.pages+1
      })
      this._getFeeds(this.state.pages);
    }
  }

  _onSwitch = (checked) => {
    this.setState({
      scrapSwitch: checked
    })    
    
  }

  render() {
    return (
      <Layout>
        <Content style={{ padding: '10% 10%' }}>
          <Row style={{ margin: '0% 0% 3% 0%' }}>
            <Switch 
              defaultChecked={false} 
              onClick={this._onSwitch}
              style={{ margin: '0% 1% 0% 0%' }}
              />
            <span>스크랩한 것만 보기 </span>
          </Row>
          <Row gutter={24}>
            {this.state.feeds.length ? 
              (this.state.scrapSwitch ? this._renderFeeds(this.state.selectedFeeds): this._renderFeeds(this.state.feeds))
              :<Spin 
                tip="Loading..."
                size="large"
                style={{ margin: '30% 50%' }}/>
            }
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;