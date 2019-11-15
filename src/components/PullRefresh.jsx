import React ,{ Component}from 'react'

class demo extends Component {
  constructor(props) {
     super(props);
     this.state = {
         finished: false,//是否全部加载完毕
         isFoot: true,   //阻止用户频繁上拉调接口
     }
     this._page = 1;              //分页页码                           
     this.val = '';               //搜索框的值
     this._page_size = 5;         //每页显示个数 
     this.startx;                 //触摸起始点x轴坐标
     this.starty;                 //触摸起始点y轴坐标 
 }
 //接触屏幕
 touchStart(e) {
     this.startx = e.touches[0].pageX;
     this.starty = e.touches[0].pageY;
 }
 //离开屏幕（[e.changedTouches][2]）
 touchEnd(e) {
     let endx, endy;
     endx = e.changedTouches[0].pageX;
     endy = e.changedTouches[0].pageY;
     let direction = this.getDirection(this.startx, this.starty, endx, endy);
     switch (direction) {
         case 0:
             console.log("未滑动！");
             break;
         case 1:
             console.log("向上！");
             this.loadData();
             break;
         case 2:
             console.log("向下！");
             break;
         case 3:
             console.log("向左！");
             break;
         case 4:
             console.log("向右！");
             break;
         default:
     }
 }
 //触摸点和离开点连线与[x轴角度][3]
 getAngle(angx,angy) {
     return Math.atan2(angy, angx) * 180 / Math.PI;
 }
 //根据接触和离开判断方向 1向上 2向下 3向左 4向右 0未发生滑动（[Math.abs][4]）
 getDirection(startx, starty, endx, endy) {
     let angx = endx - startx;
     let angy = endy - starty;
     let result = 0;

      //如果滑动距离太短
      if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
         return result;
     }
     let angle = this.getAngle(angx, angy);
     if (angle >= -135 && angle <= -45) {
         result = 1;
     } else if (angle > 45 && angle < 135) {
         result = 2;
     } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
         result = 3;
     } else if (angle >= -45 && angle <= 45) {
         result = 4;
     }

     return result;
 }
 //**向上滑动时（在这里才真正的判断是否到最底部）**
 loadData() {
     console.log("数据的高-------------------------", this.refs.onPullUp.clientHeight);
     console.log("滚动的高------------------------", document.documentElement.scrollTop);
     console.log("滚动的高------------------------", document.body.scrollTop);
     console.log("屏幕的高------------------------", document.documentElement.clientHeight);
     let { meActs } = this.props;
     let dataHeight = this.refs.onPullUp.clientHeight;
     let scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
     let screenHeight = document.documentElement.clientHeight;
     const h = 10;//自定义距离底部多少时concat数据
     if (dataHeight - scrollHeight - h < screenHeight && this.state.isFoot) {
         this.setState({
             isFoot: false,
         });
         console.log("应该只显示1次");
         let params = {
             value: this.val,
             page_index: this._page,
             page_size: this._page_size,
         }
         meActs.getRecentReadList(this.accessKey, this.accessID, params).then((res) => {
             if (res.data.code === 10000 && res.data.data.list.length > 0) {
                 this.setState({
                     isFoot: true,
                 });
                 this._page++;
             }
             //数据加载完毕
             if (res.data.code === 10000 && res.data.data.list.length == 0) {
                 this.setState({
                     finished: true,
                 })
             }
         });
     }
 }
 
 render() {
     return(
          <div className='recentRead paddingTop90' ref="onPullUp">
             <TitleBar title="历史阅读" onClickBack={this.onClickBack.bind(this)} />
             <SearchBar
                 onSubmit={this.onSearch.bind(this)}
                 onCancel={this.onSearchCancel.bind(this)}
                 placeholder='搜索'
                 ref="searchBar"
             />
             <div className="touch-box" onTouchStart={this.touchStart.bind(this)} onTouchEnd={this.touchEnd.bind(this)}>
                 {listItems}
             </div>
             <div className="common-bottomTotal">
                 {
                     this.state.finished ? <span>我是有底线的</span> :
                         recentReadList.list.length > 0 ? this.state.isFoot ? <span >上拉加载更多</span> : <ActivityIndicator text="请稍等..." /> :
                             <span className='iconfont icon-taidu2'>暂无信息</span>
                 }
             </div>
         </div>
     )
 }
}

export default demo;