import React, { useState, useEffect, memo, useRef,useCallback } from "react";
import PropTypes from "prop-types";
import { addSymbol, getMaxAbs } from "common/utils.js";
import Loading from "components/Loading";
import "./MoneyFlow.scss";
const F2 = require("@antv/f2");

// 主力detail
const MainForceDetail = memo(function MainForceDetail(props) {
  const { idx, secCode } = props;
  const [showLoading, setShowLoading] = useState(false);
  const [chartData, setchartData] = useState([
    {
      time: "2016-08-08 00:00:00",
      value: 10,
      type: "预期收益率"
    },
    {
      time: "2016-08-08 00:10:00",
      value: 22,
      type: "预期收益率"
    },
    {
      time: "2016-08-08 00:30:00",
      value: 16,
      type: "预期收益率"
    },
    {
      time: "2016-08-09 00:35:00",
      value: 26,
      type: "预期收益率"
    },
    {
      time: "2016-08-09 01:00:00",
      value: 12,
      type: "预期收益率"
    },
    {
      time: "2016-08-09 01:20:00",
      value: 26,
      type: "预期收益率"
    },
    {
      time: "2016-08-10 01:40:00",
      value: 18,
      type: "预期收益率"
    },
    {
      time: "2016-08-10 02:00:00",
      value: 26,
      type: "预期收益率"
    },
    {
      time: "2016-08-10 02:20:00",
      value: 12,
      type: "预期收益率"
    },
    {
      time: "2016-08-08 00:00:00",
      value: 4,
      type: "实际收益率"
    },
    {
      time: "2016-08-08 00:10:00",
      value: 3,
      type: "实际收益率"
    },
    {
      time: "2016-08-08 00:30:00",
      value: 6,
      type: "实际收益率"
    },
    {
      time: "2016-08-09 00:35:00",
      value: -12,
      type: "实际收益率"
    },
    {
      time: "2016-08-09 01:00:00",
      value: 1,
      type: "实际收益率"
    },
    {
      time: "2016-08-09 01:20:00",
      value: 9,
      type: "实际收益率"
    },
    {
      time: "2016-08-10 01:40:00",
      value: 13,
      type: "实际收益率"
    },
    {
      time: "2016-08-10 02:00:00",
      value: -3,
      type: "实际收益率"
    },
    {
      time: "2016-08-10 02:20:00",
      value: 11,
      type: "实际收益率"
    }
  ]);
  const [flow, setflow] = useState({
    flowIn: "--",
    flowOut: "--",
    netFlowIn: "--"
  });

  const timer = useRef(null);
  const chart = useRef(null);

   //绘制图形
  const renderChart = useCallback(() => {
    chart.current = new F2.Chart({
      id: `moneyFlow${idx}`,
      pixelRatio: window.devicePixelRatio
    });
    chart.current.tooltip({
      showTitle: true,
      layout: "vertical",
      background: {
        radius: 2,
        fill: "#25243A",
        padding: [6, 10]
      },
      offsetY: 50
    });
    chart.current.source(chartData, {
      time: {
        type: "timeCat",
        tickCount: 3,
        mask: "hh:mm",
        range: [0, 1]
      },
      value: {
        tickCount: 3,
        formatter: function formatter(ivalue) {
          return ivalue + "%";
        }
      }
    });
    chart.current.axis("time", {
      line: null,
      label: function label(text, index, total) {
        var textCfg = {};
        if (index === 0) {
          textCfg.textAlign = "left";
        } else if (index === total - 1) {
          textCfg.textAlign = "right";
        }
        return textCfg;
      }
    });
    chart.current.axis("tem", {
      grid: function grid(text) {
        if (text === "0%") {
          return {
            lineDash: null,
            lineWidth: 1
          };
        }
      }
    });
    chart.current.legend({
      position: "top",
      align: "center",
      marker: {
        symbol: "square",
        radius: 5
      },
      nameStyle: {
        textAlign: "start",
        fill: "#6F7584",
        fontSize: "12"
      }
    });
    chart.current
      .line()
      .position("time*value")
      .color("type", ["#DF2BFD", "#FFAF38", "#4976FF"]);
    chart.current.render();
  },[chartData,idx]);
   
  useEffect(() => {
    setShowLoading(true);
    timer.current = setTimeout(() => {
      setflow({
        flowIn: 35446.6,
        flowOut: -37576.1,
        netFlowIn: -2129
      });
      setShowLoading(false);
      renderChart();
    }, 2000);
    return () => {
      clearTimeout(timer.current);
      chart.current.destroy();
    };
  }, [renderChart]);

  return (
    <div className="money_flow_detail">
      {showLoading && <Loading></Loading>}
      {!showLoading && (
        <div className="">
          <div className="flex_ar">
            <div className="shuxian tc width_33">
              <p className="black_2 f14 margin_b10">主力流入</p>
              <p className="white f14">{flow.flowIn}</p>
            </div>
            <div className="shuxian tc width_33">
              <p className="black_2 f14 margin_b10">主力流出</p>
              <p className="white f14">{flow.flowOut}</p>
            </div>
            <div className="width_33 tc">
              <p className="black_2 f14 margin_b10">主力净流入</p>
              <p
                className={`f14 ${
                  flow.netFlowIn > 0
                    ? "red"
                    : flow.netFlowIn < 0
                    ? "green"
                    : "white"
                }`}
              >
                {flow.netFlowIn}
              </p>
            </div>
          </div>
          <p className="chart_title tc margin_t20 margin_b20">
            近30日资金流向<span className="chart_title_unit">(万元)</span>
          </p>
          <canvas
            id={`moneyFlow${idx}`}
            style={{ height: "200px", width: "100%" }}
          ></canvas>
        </div>
      )}
    </div>
  );
});

MainForceDetail.propTypes = {
  idx:PropTypes.number.isRequired,
}

// 单个资金流向
const MoneyFlowItem = memo(function MoneyFlowItem(props) {
  const { secName, netFlow, secCode, maxAbs, onOpen, isOpen, idx } = props;
  const [isFirst, setIsFirst] = useState(true);

  const toggleIsFirst = () => {
    setIsFirst(false);
  }

  return (
    <div>
      <div className="flex_bt moneyflow_item" onClick={() => onOpen(idx)}>
        <p className="f14 black_1 width_20 tl">{secName}</p>
        <p className="process_bar width_60 tc">
          <span
            className={`${
              netFlow > 0 ? "process_bar_red" : "process_bar_green"
            }`}
            style={{
              width: `${((Math.abs(netFlow) / maxAbs) * 100).toFixed(2)}%`
            }}
          ></span>
        </p>
        <p
          className={`f12 width_20 tr ${
            netFlow > 0 ? "red" : netFlow < 0 ? "green" : "white"
          }`}
        >
          <span className="margin_r3">{addSymbol(netFlow)}</span>
          <span
            className={`iconfont black_2 f10 ${
              isOpen ? "icon--shanglajiantou" : "icon--xialajiantou"
            }`}
          ></span>
        </p>
      </div>
      {isOpen && <MainForceDetail idx={idx} isFirst={isFirst} toggleIsFirst={toggleIsFirst}></MainForceDetail>}
    </div>
  );
});
// 资金流向
const MoneyFlow = memo(function MoneyFlow(props) {
  const { moneyFlowData } = props;

  const [maxAbs] = useState(() => {
    return getMaxAbs(moneyFlowData, "netFlow");
  });

  const [initOpenStatus, setinitOpenStatus] = useState(() => {
    let initStatus = [];
    moneyFlowData.forEach((ele, index) => {
      index === 0 ? (initStatus[index] = true) : (initStatus[index] = false);
    });
    return initStatus;
  });

  const onOpen = idx => {
    let temp = initOpenStatus.slice();
    temp[idx] = !temp[idx];
    setinitOpenStatus(temp);
  };

  return (
    <div className="black_theme moneyflow_container padding_lr_16">
      {moneyFlowData.map((item, index) => (
        <MoneyFlowItem
          {...item}
          maxAbs={maxAbs}
          key={index}
          onOpen={onOpen}
          isOpen={initOpenStatus[index]}
          idx={index}
        />
      ))}
    </div>
  );
});

MoneyFlow.propTypes = {
  moneyFlowData: PropTypes.array.isRequired
};

export default MoneyFlow;
