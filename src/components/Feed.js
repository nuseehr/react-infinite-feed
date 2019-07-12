import React, { Component } from 'react';
import './Feed.css';
import { Col, Button, Badge, Popover } from 'antd';

class Feed extends Component {

  state = {
    isScrap: 0,
    visible: false
  };

  componentWillMount() {
    this._markScrap()
  }

  _markScrap= () => {
    if(this.props.scrapNum < this.props.selectedFeeds.length) {
      this.setState({
        isScrap: this.props.scrapNum+1
      })
    }
  }

  _handleScrap = () => {
    if(this.state.isScrap >= 1) {
      this.setState({
        isScrap: 0
      })
      this.props.scrapPhoto(-1, this.props)
    }

    else {
      this.setState({
        isScrap: this.props.scrapNum + 1,
      })
      this.props.scrapPhoto(1, this.props)
    }
  }

  _handleVisibleChange = (visible) => {
    this.setState({ visible });
    setTimeout(() => {
      this.setState({ 
        visible: false
      });
    }, 1000);
  }

  render() {
    return (
      <Col sm={12} md={8} lg={6} style={{ position: 'relative' }} >
        <img className="Profile" src={this.props.profile_image_url} alt={this.props.nickname} />
        <span className="UserName"> {this.props.nickname} </span>
        <img className="Photo" src={this.props.image_url} alt={this.props.nickname} />
        <Popover
        content="Scrap!"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this._handleVisibleChange}
        >
          <Badge count={this.state.isScrap} style={{ backgroundColor: '#FECE32' }} >
            <Button 
              shape="circle" 
              icon="heart-o" 
              ghost
              onClick={this._handleScrap}
              >
            </Button>
          </Badge>
        </Popover>
      </Col>
    );
  }
}
  
  export default Feed;
