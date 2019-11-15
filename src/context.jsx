import React, { Component } from "react";
import SlideTable from "./components/slideTableHook.jsx";
import MoneyFlow from './components/moneyflow/MoneyFlow.jsx';

import "./assets/css/common.scss";

// const CountContext = createContext();

// class Bar extends Component {
//   render() {
//     return (
//       <div>
//         <CountContext.Consumer>
//           {count => <h1>数量为{count}</h1>}
//         </CountContext.Consumer>
//       </div>
//     );
//   }
// }

// function Bar2() {
//   const count = useContext(CountContext);
//   return (
//     <div>
//       <h1>数量为{count}</h1>
//     </div>
//   );
// }

// class Bar3 extends Component {
//   static contextType = CountContext;
//   render() {
//     const count = this.context;
//     return (
//       <div>
//        <h1>数量为{count}</h1>
//       </div>
//     );
//   }
// }

export default class Context extends Component {
  state = {
    columns: [
      {
        title: "名称/代码",
        code: "sec_name",
        template:
          '<p class="name-code"><span style="font-size:15px;color:#121C32;">{{ sec_name }}</span><span style="color: #5D667A;font-size:12px;font-weight:100">{{ secu_code }}</span></p>',
        fixed: "left",
        textAlign: "left",
        width: "25%"
      },
      {
        title: "最新价",
        code: "real_price_temp",
        width: "20%",
        textAlign: "right",
        sortable: true,
        desc: true,
        isSorted: false,
        clickheadable: true
      },
      {
        title: "涨跌幅",
        code: "updown_range_temp",
        width: "25%",
        textAlign: "right",
        sortable: true,
        desc: true,
        isSorted: false
      },
      {
        title: "换手率",
        code: "turnover_rate_temp",
        width: "25%",
        textAlign: "right",
        sortable: true,
        desc: true,
        isSorted: false
      },
      {
        title: "量比",
        code: "volume_ratio_temp",
        width: "25%",
        textAlign: "right",
        sortable: true,
        desc: true,
        isSorted: false
      },
      {
        title: "五日涨幅",
        code: "five_updown_range_temp",
        width: "25%",
        textAlign: "right",
        sortable: true,
        desc: true,
        isSorted: false
      },
      {
        title: "十日涨幅",
        code: "ten_updown_range_temp",
        width: "25%",
        textAlign: "right",
        sortable: true,
        desc: true,
        isSorted: false
      }
    ],
    dataSource: [
      {
        volume_ratio: 1.27,
        five_updown_range: 4.63,
        sec_name: "东方中科",
        turnover_rate: 12.43,
        secu_code: "002819",
        ten_updown_range: 5.53,
        real_price: 27.12,
        updown_range: 10.02,
        real_price_temp: '<p style="font-weight:bold" class="red">27.12</p>',
        updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+10.02%</p>',
        turnover_rate_temp:
          '<p style="font-size:15px;font-weight:bold;">12.43%</p>',
        volume_ratio_temp:
          '<p style="font-size:15px;font-weight:bold;">1.27</p>',
        five_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+4.63%</p>',
        ten_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+5.53%</p>'
      },
      {
        volume_ratio: 3.98,
        five_updown_range: 11.07,
        sec_name: "安迪苏",
        turnover_rate: 0.77,
        secu_code: "600299",
        ten_updown_range: 12.9,
        real_price: 11.64,
        updown_range: 10.02,
        real_price_temp: '<p style="font-weight:bold" class="red">11.64</p>',
        updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+10.02%</p>',
        turnover_rate_temp:
          '<p style="font-size:15px;font-weight:bold;">0.77%</p>',
        volume_ratio_temp:
          '<p style="font-size:15px;font-weight:bold;">3.98</p>',
        five_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+11.07%</p>',
        ten_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+12.90%</p>'
      },
      {
        volume_ratio: 5.25,
        five_updown_range: 7.12,
        sec_name: "飞亚达Ａ",
        turnover_rate: 5.21,
        secu_code: "000026",
        ten_updown_range: 7.12,
        real_price: 8.58,
        updown_range: 8.47,
        real_price_temp: '<p style="font-weight:bold" class="red">8.58</p>',
        updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+8.47%</p>',
        turnover_rate_temp:
          '<p style="font-size:15px;font-weight:bold;">5.21%</p>',
        volume_ratio_temp:
          '<p style="font-size:15px;font-weight:bold;">5.25</p>',
        five_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+7.12%</p>',
        ten_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+7.12%</p>'
      },
      {
        volume_ratio: 3.52,
        five_updown_range: 15.33,
        sec_name: "佛塑科技",
        turnover_rate: 7.97,
        secu_code: "000973",
        ten_updown_range: 17.91,
        real_price: 4.74,
        updown_range: 7.97,
        real_price_temp: '<p style="font-weight:bold" class="red">4.74</p>',
        updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+7.97%</p>',
        turnover_rate_temp:
          '<p style="font-size:15px;font-weight:bold;">7.97%</p>',
        volume_ratio_temp:
          '<p style="font-size:15px;font-weight:bold;">3.52</p>',
        five_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+15.33%</p>',
        ten_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+17.91%</p>'
      },
      {
        volume_ratio: 0.96,
        five_updown_range: 5.45,
        sec_name: "洛阳玻璃",
        turnover_rate: 3.94,
        secu_code: "600876",
        ten_updown_range: 0.31,
        real_price: 12.77,
        updown_range: 7.76,
        real_price_temp: '<p style="font-weight:bold" class="red">12.77</p>',
        updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+7.76%</p>',
        turnover_rate_temp:
          '<p style="font-size:15px;font-weight:bold;">3.94%</p>',
        volume_ratio_temp:
          '<p style="font-size:15px;font-weight:bold;">0.96</p>',
        five_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+5.45%</p>',
        ten_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+0.31%</p>'
      },
      {
        volume_ratio: 3.47,
        five_updown_range: 4.4,
        sec_name: "深 赛 格",
        turnover_rate: 9.22,
        secu_code: "000058",
        ten_updown_range: -2.73,
        real_price: 7.83,
        updown_range: 7.55,
        real_price_temp: '<p style="font-weight:bold" class="red">7.83</p>',
        updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+7.55%</p>',
        turnover_rate_temp:
          '<p style="font-size:15px;font-weight:bold;">9.22%</p>',
        volume_ratio_temp:
          '<p style="font-size:15px;font-weight:bold;">3.47</p>',
        five_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+4.40%</p>',
        ten_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="green">-2.73%</p>'
      },
      {
        volume_ratio: 2.03,
        five_updown_range: 4.46,
        sec_name: "许继电气",
        turnover_rate: 1.4,
        secu_code: "000400",
        ten_updown_range: 1.37,
        real_price: 9.61,
        updown_range: 5.95,
        real_price_temp: '<p style="font-weight:bold" class="red">9.61</p>',
        updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+5.95%</p>',
        turnover_rate_temp:
          '<p style="font-size:15px;font-weight:bold;">1.40%</p>',
        volume_ratio_temp:
          '<p style="font-size:15px;font-weight:bold;">2.03</p>',
        five_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+4.46%</p>',
        ten_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+1.37%</p>'
      },
      {
        volume_ratio: 3.96,
        five_updown_range: 6.43,
        sec_name: "安道麦A",
        turnover_rate: 1.86,
        secu_code: "000553",
        ten_updown_range: 7.96,
        real_price: 9.77,
        updown_range: 5.28,
        real_price_temp: '<p style="font-weight:bold" class="red">9.77</p>',
        updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+5.28%</p>',
        turnover_rate_temp:
          '<p style="font-size:15px;font-weight:bold;">1.86%</p>',
        volume_ratio_temp:
          '<p style="font-size:15px;font-weight:bold;">3.96</p>',
        five_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+6.43%</p>',
        ten_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+7.96%</p>'
      },
      {
        volume_ratio: 1.32,
        five_updown_range: 1.21,
        sec_name: "新集能源",
        turnover_rate: 1.43,
        secu_code: "601918",
        ten_updown_range: 12.46,
        real_price: 3.34,
        updown_range: 5.03,
        real_price_temp: '<p style="font-weight:bold" class="red">3.34</p>',
        updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+5.03%</p>',
        turnover_rate_temp:
          '<p style="font-size:15px;font-weight:bold;">1.43%</p>',
        volume_ratio_temp:
          '<p style="font-size:15px;font-weight:bold;">1.32</p>',
        five_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+1.21%</p>',
        ten_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+12.46%</p>'
      },
      {
        volume_ratio: 2.42,
        five_updown_range: 5.61,
        sec_name: "*ST沈机",
        turnover_rate: 1.24,
        secu_code: "000410",
        ten_updown_range: 6.44,
        real_price: 6.78,
        updown_range: 4.95,
        real_price_temp: '<p style="font-weight:bold" class="red">6.78</p>',
        updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+4.95%</p>',
        turnover_rate_temp:
          '<p style="font-size:15px;font-weight:bold;">1.24%</p>',
        volume_ratio_temp:
          '<p style="font-size:15px;font-weight:bold;">2.42</p>',
        five_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+5.61%</p>',
        ten_updown_range_temp:
          '<p style="font-size:15px;font-weight:bold;" class="red">+6.44%</p>'
      }
    ],
    money:[
      {
        secName: "格力电器",
        netFlow: -2600
      },
      {
        secName: "中国联通",
        netFlow: -1500
      },
      {
        secName: "三维工程",
        netFlow: 800
      }
    ]
  };

  render() {
    const tapHead = params => {
      const { code } = params;
      console.log(code);
    };
    return (
      <div className="geekthings">
        {/* <CountContext.Provider value="60">
          <Bar3></Bar3>
        </CountContext.Provider> */}
        {/* <SlideTable
          tapHead={tapHead}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
        ></SlideTable> */}

        <MoneyFlow moneyFlowData = {this.state.money}></MoneyFlow>
      </div>
    );
  }
}
