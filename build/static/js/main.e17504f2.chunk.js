(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t,a){e.exports=a(173)},105:function(e,t,a){},159:function(e,t,a){},173:function(e,t,a){"use strict";a.r(t);var n=a(37),s=a.n(n),r=a(33),c=a(68),i=a(45),o=a(46),l=a(50),p=a(47),u=a(51),d=a(0),m=a.n(d),h=(a(105),a(181)),f=a(176),g=a(178),S=a(179),_=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).state={isScrap:0,visible:!1},a._markScrap=function(){a.props.scrapNum<a.props.selectedFeeds.length&&a.setState({isScrap:a.props.scrapNum+1})},a._handleScrap=function(){a.state.isScrap>=1?(a.setState({isScrap:0}),a.props.scrapPhoto(-1,a.props)):(a.setState({isScrap:a.props.scrapNum+1}),a.props.scrapPhoto(1,a.props))},a._handleVisibleChange=function(e){a.setState({visible:e}),setTimeout(function(){a.setState({visible:!1})},1e3)},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentWillMount",value:function(){this._markScrap()}},{key:"render",value:function(){return m.a.createElement(h.a,{sm:12,md:8,lg:6,style:{position:"relative"}},m.a.createElement("img",{className:"Profile",src:this.props.profile_image_url,alt:this.props.nickname}),m.a.createElement("span",{className:"UserName"}," ",this.props.nickname," "),m.a.createElement("img",{className:"Photo",src:this.props.image_url,alt:this.props.nickname}),m.a.createElement(f.a,{content:"Scrap!",trigger:"click",visible:this.state.visible,onVisibleChange:this._handleVisibleChange},m.a.createElement(g.a,{count:this.state.isScrap,style:{backgroundColor:"#FECE32"}},m.a.createElement(S.a,{shape:"circle",icon:"heart-o",ghost:!0,onClick:this._handleScrap}))))}}]),t}(d.Component),v=(a(159),a(177)),b=a(180),k=a(174),w=a(175),F=v.a.Content,y=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e)))._getFeeds=function(){var e=Object(c.a)(s.a.mark(function e(t){var n,c,i;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a._callApi(t);case 2:n=e.sent,null!==(c=JSON.parse(localStorage.getItem("scrapped")))&&0!==c.length?(i=c.map(function(e){var t=n.findIndex(function(t){return t.id===e.id});return t>=0?(n[t]=e,e):e}),a.setState({feeds:[].concat(Object(r.a)(a.state.feeds),Object(r.a)(n)),selectedFeeds:i,scrapNum:i[c.length-1].scrapNum+1})):a.setState({feeds:[].concat(Object(r.a)(a.state.feeds),Object(r.a)(n))});case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a._callApi=function(e){return fetch("https://cors-anywhere.herokuapp.com/"+("https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/cards/page_"+e+".json")).then(function(e){return e.json()}).then(function(e){return e}).catch(function(e){return console.log(e)})},a._renderFeeds=function(e){return e.map(function(e){return m.a.createElement(_,{image_url:e.image_url,profile_image_url:e.profile_image_url,nickname:e.nickname,key:e.id,id:e.id,scrapNum:a._checkScrap(e),scrapPhoto:a._handleScrapFeeds,selectedFeeds:a.state.selectedFeeds})})},a._checkScrap=function(e){return void 0!==e.scrapNum?e.scrapNum:a.state.scrapNum},a._handleScrapFeeds=function(){var e=Object(c.a)(s.a.mark(function e(t,n){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(1!==t){e.next=6;break}return e.next=3,a.setState({scrapNum:a.state.scrapNum+t,selectedFeeds:[].concat(Object(r.a)(a.state.selectedFeeds),[n])});case 3:a._addSavedFeeds(a.state.selectedFeeds.length,n),e.next=10;break;case 6:if(-1!==t){e.next=10;break}return e.next=9,a.setState({scrapNum:a.state.scrapNum+t,selectedFeeds:a.state.selectedFeeds.filter(function(e){return e.id!==n.id})});case 9:a._removeSavedFeeds(n);case 10:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a._addSavedFeeds=function(e,t){if(1===e){var a=[t];localStorage.setItem("scrapped",JSON.stringify(a))}else{var n=JSON.parse(localStorage.getItem("scrapped"));n.push(t),localStorage.setItem("scrapped",JSON.stringify(n))}},a._removeSavedFeeds=function(){var e=a.state.selectedFeeds;localStorage.setItem("scrapped",JSON.stringify(e))},a._infiniteScroll=function(){Math.max(document.documentElement.scrollHeight,document.body.scrollHeight)-(Math.max(document.documentElement.scrollTop,document.body.scrollTop)+document.documentElement.clientHeight)<1&&(a.setState({pages:a.state.pages+1}),a._getFeeds(a.state.pages))},a._onSwitch=function(e){a.setState({scrapSwitch:e})},a.state={feeds:[],selectedFeeds:[],pages:1,scrapNum:0,scrapSwitch:!1},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this._getFeeds(this.state.pages),window.addEventListener("scroll",this._infiniteScroll,!0)}},{key:"render",value:function(){return m.a.createElement(v.a,null,m.a.createElement(F,{style:{padding:"10% 10%"}},m.a.createElement(b.a,{style:{margin:"0% 0% 3% 0%"}},m.a.createElement(k.a,{defaultChecked:!1,onClick:this._onSwitch,style:{margin:"0% 1% 0% 0%"}}),m.a.createElement("span",null,"\uc2a4\ud06c\ub7a9\ud55c \uac83\ub9cc \ubcf4\uae30 ")),m.a.createElement(b.a,{gutter:24},this.state.feeds.length?this.state.scrapSwitch?this._renderFeeds(this.state.selectedFeeds):this._renderFeeds(this.state.feeds):m.a.createElement(w.a,{tip:"Loading...",size:"large",style:{margin:"30% 50%"}}))))}}]),t}(d.Component),E=a(7),N=a.n(E);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));N.a.render(m.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[102,1,2]]]);
//# sourceMappingURL=main.e17504f2.chunk.js.map