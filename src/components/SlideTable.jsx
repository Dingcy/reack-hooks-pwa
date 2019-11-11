import React, { Component } from "react";
import "../assets/css/slideTable.scss";
import BScroll from "better-scroll";

class SlideTable extends Component() {
  // static defaultProps = {
  //   backgroundColor: "#fff",
  //   hasHeader: true
  // };

  constructor(props) {
    super(props);
    this.state = {
      picScroll: null,
      tableWidth: 375,
      textAlign: "center",
      leftFixedColumns: [],
      leftFixedWidth: 0,
      portableWidth: 0,
      portableColumns: [],
      sortIndex: null, //当前排序的列索引
      asc: false,
      desc: false
    };
  }

  computeColumnWidth = percent => {
    if (!percent) {
      //等分宽度
      return Math.floor(this.state.tableWidth / this.props.columns.length);
    }

    const num = parseInt(
      percent.indexOf("%") > -1
        ? percent.substr(0, percent.length - 1)
        : percent
    );
    return Math.floor((num / 100) * this.state.tableWidth);
  };

  hasdata = data => {
    if (data === false) {
      return false;
    } else {
      return true;
    }
  };

  setColumnSort = ({ sortIndex, asc, desc }) => {
    this.setState({
      sortIndex: sortIndex
    });
    if (asc && desc) {
      this.setState({
        asc: false,
        desc: false
      });
    } else {
      this.setState({
        asc: !!this.state.asc,
        desc: !!this.state.desc
      });
    }
  };

  columnSort = (columnitem, index) => {
    // console.log(columnitem,index)
  };

  initScroll = () => {
    if (this.refs.portableWrapper) {
      return;
    }
    if (!this.state.picScroll) {
      this.setState({
        picScroll: new BScroll(this.refs.portableWrapper, {
          scrollX: true,
          eventPassthrough: "vertical",
          bounce: false,
          probeType: 3
        })
      });
    } else {
      this.state.picScroll.refresh();
    }
  };

  // computeTableWidth
  computeTableWidth = () => {
    if (this.props.width) {
      const tableWidth = parseInt(
        this.props.width.indexOf("px") > -1
          ? this.props.width.substr(0, this.props.width.length - 2)
          : this.props.width
      );
      this.setState({
        tableWidth: tableWidth
      });
    } else {
      console.log("tableWrap", this.refs.tableWrap);
      this.setState({
        tableWidth: this.refs.tableWrap.current.clientWidth
      });
    }
  };

  computeLeftFixedColumns = () => {
    // 获取 leftFixedColumns
    const leftFixedColumns = this.props.columns;
    let sum = 0;
    const cols = leftFixedColumns.filter(columnitem => {
      return columnitem.fixed === "left";
    });
    cols.forEach(columnitem => {
      columnitem.width = this.computeColumnWidth(columnitem.width);
      sum += columnitem.width;
    });
    this.setState({
      leftFixedWidth: sum
    });
    this.setState({
      leftFixedColumns: cols
    });
  };

  computePortableColumns = () => {
    //  computePortableColumns
    let sum = 0;
    const cols = this.props.columns.filter(columnitem => {
      return !columnitem.fixed;
    });
    cols.forEach((columnitem, index) => {
      if ((columnitem.asc || columnitem.desc) && columnitem.sortable) {
        this.setColumnSort({
          sortIndex: index,
          asc: columnitem.asc,
          desc: columnitem.desc
        });
      }
      columnitem.width = this.computeColumnWidth(columnitem.width);
      sum += columnitem.width;
    });
    this.setState({
      portableWidth: sum,
      portableColumns: cols
    });
  };

  
  componentDidMount() {
    this.computeTableWidth();
    this.computeLeftFixedColumns();
    this.computePortableColumns();
  }
  

  render() {
    return (
      <div style={{ backgroundColor: this.props.backgroundColor }}>
        <div className="table-wrap" ref="tableWrap">
          <div className="left-fixed" style={{ width: `${this.state.leftFixedWidth}px` }}>
            <table className="table">
              {this.props.hasHeader && (
                <thead>
                  <tr className="table-head">
                    {this.state.leftFixedColumns.map((columnitem, index) => (
                      <th
                        className="cur table-th ui-border-b"
                        style={{
                          width: `${columnitem.width}px`,
                          textAlign:
                            columnitem.textAlign || this.state.textAlign
                        }}
                        key={index}
                      >
                        <span>{columnitem.title}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              {}
            </table>
          </div>
          <div
            className="portable"
            style={{ padding: `0  0  0 ${this.state.leftFixedWidth}px` }}
          >
            <div className="innertable" ref="portableWrapper">
              <table
                className="table"
                style={{ width: `${this.state.portableWidth}px` }}
              >
                {this.props.hasHeader && (
                  <thead>
                    <tr className="table-head">
                      {this.state.portableColumns.map((columnitem, index) => (
                        <th
                          className="cur table-th ui-border-b"
                          onClick={this.columnSort(columnitem, index)}
                          className={{
                            asc: this.state.sortIndex === index ? this.state.asc : false,
                            desc: this.state.sortIndex === index ? this.state.desc : false
                          }}
                          key={index}
                          style={{
                            width: `${columnitem.width}px`,
                            textAlign:
                              columnitem.textAlign || this.state.textAlign
                          }}
                        >
                          <span>
                            {columnitem.title}
                            {columnitem.isSorted &&
                              index === this.state.sortIndex && (
                                <i
                                  className="row iconfont"
                                  className={
                                    columnitem.desc
                                      ? "icon--paixujiangxu"
                                      : "icon--paixushengxu"
                                  }
                                ></i>
                              )}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SlideTable;

// "paddingTop":`${columnitem.paddingTop}`,
// "paddingBottom": columnitem.paddingBottom,
// "paddingLeft":columnitem.paddingLeft,
// "color": columnitem.color,
