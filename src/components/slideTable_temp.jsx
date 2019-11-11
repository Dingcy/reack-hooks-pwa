import React, { useState, useEffect,useRef } from "react";
import "../assets/css/slideTable.scss";
import BScroll from 'better-scroll';



function SlideTable(props) {
  const [hasHeader, setHasHeader] = useState(props.hasHeader || true);
  const [tableWidth, settableWidth] = useState(0);
  const [leftFixedColumns, setleftFixedColumns] = useState([]);
  const [leftFixedWidth, setleftFixedWidth] = useState(0);
  const [textAlign, settextAlign] = useState("center");
  const [sortIndex, setsortIndex] = useState(null); //当前排序的列索引
  const [asc, setasc] = useState(false);
  const [desc, setdesc] = useState(false);
  const [portableWidth, setportableWidth] = useState(0);
  const [portableColumns, setportableColumns] = useState([]);
  const [picScroll,setpicScroll] = useState(null);

  const tableWrap = useRef();
  const portableWrapper = useRef();

  function computeColumnWidth(percent) {
    if (!percent) {
      //等分宽度
      return Math.floor(tableWidth / props.columns.length);
    }
    
    const num = parseInt(
      percent.indexOf("%") > -1
        ? percent.substr(0, percent.length - 1)
        : percent
    );
    console.log(num,tableWidth)
    return Math.floor((num / 100) * tableWidth);
  }

  function hasdata(data) {
    if (data === false) {
      return false;
    } else {
      return true;
    }
  }

  function setColumnSort({ sortIndex, asc, desc }) {
    setsortIndex(sortIndex);
    if (asc && desc) {
      setasc(false);
      setdesc(false);
    } else {
      setasc(asc => !!asc);
      setdesc(desc => !!desc);
    }
  }

  function columnSort(columnitem, index) {
    // console.log(columnitem,index)
  }

  function initScroll() {
    if(portableWrapper){
      return
    }
    if(!picScroll){
      setpicScroll(
        new BScroll(portableWrapper, {
          scrollX: true,
          eventPassthrough: 'vertical',
          bounce: false,
          probeType: 3
        })
      )
    }else{
      picScroll.refresh()
    }
  } 

  // computeTableWidth
  useEffect(() => {
    if (props.width) {
      const tableWidth = parseInt(
        props.width.indexOf("px") > -1
          ? props.width.substr(0, props.width.length - 2)
          : props.width
      );
      settableWidth(tableWidth);
    } else {
      console.log("tableWrap", tableWrap.current.clientWidth);
      settableWidth(tableWrap.current.clientWidth);
    }
  },[]);

  useEffect(() => {
    // 获取 leftFixedColumns
    const leftFixedColumns = props.columns;
    let sum = 0;
    const cols = leftFixedColumns.filter(columnitem => {
      return columnitem.fixed === "left";
    });
    cols.forEach(columnitem => {
      columnitem.width = computeColumnWidth(columnitem.width);
      sum += columnitem.width;
    });
    console.log(sum)
    setleftFixedWidth(sum);
    setleftFixedColumns(cols);
  }, []);

  useEffect(() => {
    //  computePortableColumns
    let sum = 0;
    const cols = props.columns.filter(columnitem => {
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
      columnitem.width = computeColumnWidth(columnitem.width);
      sum += columnitem.width;
    });
    setportableWidth(sum);
    setportableColumns(cols);
  }, []);

 

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
                        width: `${columnitem.width}px`,
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
            {}
          </table>
        </div>
        <div className="portable" style={{padding:`0  0  0 ${leftFixedWidth}px`}}>
          <div className="innertable" ref={portableWrapper}>
            <table className="table" style={{width:`${portableWidth}px`}}>
              {
                hasHeader && (
                  <thead>
                    <tr className="table-head">
                      {
                        portableColumns.map((columnitem, index) => (
                          <th className="cur table-th ui-border-b" onClick={columnSort(columnitem, index)} className={{'asc':(sortIndex === index) ? asc : false,'desc':(sortIndex === index) ? desc : false}} key={index} style={{width:`${columnitem.width}px`,textAlign:columnitem.textAlign || textAlign}}>
                            <span>
                              {columnitem.title}
                              {
                                columnitem.isSorted && index === sortIndex && <i className="row iconfont" className={columnitem.desc ? 'icon--paixujiangxu' : 'icon--paixushengxu'}></i>
                              }
                              
                            </span>
                          </th>
                        ))
                      }
                    </tr>
                  </thead>
                )
              }        
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideTable;

// "paddingTop":`${columnitem.paddingTop}`,
// "paddingBottom": columnitem.paddingBottom,
// "paddingLeft":columnitem.paddingLeft,
// "color": columnitem.color,
