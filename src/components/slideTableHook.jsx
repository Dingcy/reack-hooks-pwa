import React, { useState, useEffect, useRef } from "react";
import "../assets/css/slideTable.scss";
import "../assets/css/iconfont/iconfont.css";
import BScroll from "better-scroll";
import PropTypes from "prop-types";

function SlideTable(props) {
  const { width, columns,tapHead ,dataSource,tapRow,tapColumn} = props;

  const [tableWidth, settableWidth] = useState(width);
  const [hasHeader] = useState(props.hasHeader || true);
  const [leftFixedColumns, setleftFixedColumns] = useState([]);
  const [leftFixedWidth, setleftFixedWidth] = useState(0);
  const [textAlign] = useState("center");
  const [sortIndex, setsortIndex] = useState(null); //当前排序的列索引
  const [asc, setasc] = useState(false);
  const [desc, setdesc] = useState(false);
  const [portableWidth, setportableWidth] = useState(0);
  const [portableColumns, setportableColumns] = useState([]);
  const [picScroll, setpicScroll] = useState(null);
  const [showScrollRight, setshowScrollRight] = useState(true);

  const tableWrap = useRef();
  const portableWrapper = useRef();

  const computeColumnWidth = (percent) => {
    if (!percent) {
      //等分宽度
      return Math.floor(tableWidth / props.columns.length);
    }

    const num = parseInt(
      percent.indexOf("%") > -1
        ? percent.substr(0, percent.length - 1)
        : percent
    );
    return Math.floor((num / 100) * tableWidth);
  }

  const hasdata = (data) => {
    if (data === false) {
      return false;
    } else {
      return true;
    }
  }

  const setColumnSort = ({ sortIndex, asc, desc }) => {
    setsortIndex(sortIndex);
    if (asc && desc) {
      setasc(false);
      setdesc(false);
    } else {
      setasc(asc => !!asc);
      setdesc(desc => !!desc);
    }
  }

  const columnSort = (columnitem, index) => {
    columnitem.isSorted = true;
    const sortable = columnitem.sortable;
    const clickheadable = columnitem.clickheadable;
    const code = columnitem.code;
    
    if (!sortable) return;
    if (sortIndex === index) {
      setasc(!asc);
      setdesc(!desc);
      columnitem.desc = !columnitem.desc;
    } else {
      setsortIndex(index)
      setasc(false);
      setdesc(true);
      columnitem.desc = true;
    }
    if (clickheadable) tapHead({
      index,
      code,
      asc: asc,
      desc: desc
    });
  }

  const initScroll = () => {
    if (!picScroll) {
      const picScrollDom = new BScroll(portableWrapper.current, {
        scrollX: true,
        eventPassthrough: "vertical",
        bounce: false,
        probeType: 3
      });
      picScrollDom.on('scroll', (pos) => {
        // console.log(pos.x,picScrollDom.maxScrollX)
        // console.log(leftFixedWidth)
        if (leftFixedWidth === 0) {
          setshowScrollRight(false);
        } else {
          if (pos.x === picScrollDom.maxScrollX) {
            setshowScrollRight(false);
          } else{
            setshowScrollRight(true);
          }
        }
      })
      setpicScroll(picScrollDom);
    } else {
      picScroll.refresh();
    }
  }

  // computeTableWidth
  const computeTableWidth  = () => {
    if (width) {
      const tableWidth = parseInt(
        width.indexOf("px") > -1 ? width.substr(0, width.length - 2) : width
      );
      settableWidth(tableWidth);
    } else {
      settableWidth(tableWrap.current.clientWidth);
    }
  }

  const computeLeftFixedColumns = () => {
    let sum = 0;
    const cols = columns.filter(columnitem => {
      return columnitem.fixed === "left";
    });

    cols.forEach(columnitem => {
      columnitem.computedWidth = computeColumnWidth(columnitem.width);
      sum += columnitem.computedWidth;
    });
    // console.log(sum);
    setleftFixedWidth(sum);
    setleftFixedColumns(cols);
  }

  const computePortableColumns = () => {
    let sum = 0;
    const cols = columns.filter(columnitem => {
      return !columnitem.fixed;
    });

    cols.forEach((columnitem, index) => {
      if ((columnitem.asc || columnitem.desc) && columnitem.sortable) {
        setColumnSort({
          sortIndex: index,
          asc: columnitem.asc,
          desc: columnitem.desc
        });
      }
      columnitem.computedWidth = computeColumnWidth(columnitem.width);
      sum += columnitem.computedWidth;
    });
    setportableWidth(sum);
    setportableColumns(cols);
  }

  const computeDataSource = () => {
    let innerSource = dataSource.slice(0);
    if(innerSource === []) return false;
    columns.forEach(columnitem => {
      if (columnitem.template) {
        innerSource.forEach(dataitem => {
          dataitem[`template_${columnitem.code}__`] = columnitem.template.replace(/{{\s*(\w*)\s*}}/gm, function(str,$0) {
            return dataitem[$0];
          });
        });
      }
    });
    return innerSource;
  }

  const tapRowChild = (index) => {
    tapRow(index)
  }

  const tapColumnChild = (currentColumn, dataitem) => {
    tapColumn({currentColumn, dataitem})
  }


  useEffect(() => {
    computeTableWidth();
  }, []);

  useEffect(() => {
    computeLeftFixedColumns();
    computePortableColumns();
  }, [tableWidth]);

  useEffect(() => {
    initScroll();
    return () => {
      setpicScroll(null);
    };
  }, [leftFixedWidth]);

  return (
    <div style={{ backgroundColor: props.backgroundColor || "#fff" }}>
      <div className="table-wrap" ref={tableWrap}>
        <div className="left-fixed" style={{ width: `${leftFixedWidth}px` }}>
          <table className="table">
            {hasHeader && (
              <thead>
                <tr className="table-head">
                  {leftFixedColumns.map((columnitem, index) => (
                    <th
                      className="cur table-th ui-border-b"
                      style={{
                        width: `${columnitem.computedWidth}px`,
                        textAlign: columnitem.textAlign || textAlign
                      }}
                      key={index}
                    >
                      <span>{columnitem.title}</span>
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            {
              hasdata(computeDataSource()) && (
              <tbody>
                {
                computeDataSource().map((dataitem, index) => (
                  <tr className="table-body" onClick={() => tapRowChild(index)} key={index}>
                    {
                      leftFixedColumns.map((columnitem,index) => (
                        <td className="cur table-td ui-border-b" style={{ width: `${columnitem.width}px`,
                        paddingTop: columnitem.paddingTop,
                        paddingBottom: columnitem.paddingBottom,
                        paddingLeft:columnitem.paddingLeft,
                        color: columnitem.color,
                        textAlign: columnitem.textAlign || textAlign}} key={index}>
                          {
                            columnitem.template && <div dangerouslySetInnerHTML={{__html: dataitem[`template_${columnitem.code}__`]}} onClick={() => tapColumnChild(columnitem.tapColumn, dataitem)}></div>
                          }
                          {
                            !columnitem.template && <div dangerouslySetInnerHTML={{__html: dataitem[columnitem.code] || '--'}} onClick={() => tapColumnChild(columnitem.tapColumn, dataitem)}></div>
                          }
                        </td>
                      ))
                    }
                  </tr>
                ))
                }
              </tbody>)
            }
          </table>
        </div>
        <div
          className="portable"
          style={{ padding: `0  0  0 ${leftFixedWidth}px` }}
        >
          {
            showScrollRight &&  <span className="iconfont icon--huadong scroll-right-icon"></span>
          }
          <div className="innertable" ref={portableWrapper}>
            <table className="table" style={{ width: `${portableWidth}px` }}>
              {hasHeader && (
                <thead>
                  <tr className="table-head">
                    {portableColumns.map((columnitem, index) => (
                      <th
                        onClick={() => columnSort(columnitem, index)}
                        className={`cur table-th ui-border-b ${
                          sortIndex === index ? "asc" : ""
                        }${sortIndex === index ? "desc" : ""}`}
                        key={index}
                        style={{
                          width: `${columnitem.computedWidth}px`,
                          textAlign: columnitem.textAlign || textAlign
                        }}
                      >
                        <span>
                          {columnitem.title}
                          {columnitem.isSorted && index === sortIndex && (
                            <i
                              className={`row iconfont ${
                                columnitem.desc
                                  ? "icon--paixujiangxu"
                                  : "icon--paixushengxu"
                              }`}
                            ></i>
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              {
                hasdata(computeDataSource()) && (
                  <tbody>
                    {
                    computeDataSource().map((dataitem, index) => (
                      <tr className="table-body" onClick={() => tapRowChild(index)} key={index}>
                        {
                          portableColumns.map((columnitem,index) => (
                            <td className="cur table-td ui-border-b" style={{ 
                            width: `${columnitem.width}px`,
                            paddingTop: columnitem.paddingTop,
                            paddingBottom: columnitem.paddingBottom,
                            paddingLeft:columnitem.paddingLeft,
                            color: columnitem.color,
                            textAlign: columnitem.textAlign || textAlign}}
                            key={index}>
                              {
                                columnitem.template && <div dangerouslySetInnerHTML={{__html: dataitem[`template_${columnitem.code}__`]}} onClick={() => tapColumnChild(columnitem.tapColumn, dataitem)}></div>
                              }
                              {
                                !columnitem.template && <div dangerouslySetInnerHTML={{__html: dataitem[columnitem.code] || '--'}} onClick={() => tapColumnChild(columnitem.tapColumn, dataitem)}></div>
                              }
                            </td>
                          ))
                        }
                      </tr>
                    ))
                    }
                  </tbody>)
              }
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
SlideTable.propTypes = {
  width: PropTypes.string,
  columns: PropTypes.array.isRequired,
  tapHead:PropTypes.func,
  dataSource:PropTypes.array.isRequired,
  tapRow:PropTypes.func,
  tapColumn:PropTypes.func,
};
export default SlideTable;
