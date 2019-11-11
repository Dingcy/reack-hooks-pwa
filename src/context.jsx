import React, { Component, createContext,useContext } from "react";
import SlideTable from  './components/slideTable_temp.jsx';

const CountContext = createContext();

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
    columns:[{
      title: "上榜时间",
      code: "cal_date",
      template: '<p class="name-code"><span style="font-size:15px;color:#121C32;font-weight:bold;">{{ cal_date }}</span></p>',
      fixed: "left",
      textAlign: "left",
      width: "45%",
    },
    {
      title: "上榜1日后涨跌幅",
      code: "next_1d_rate_temp",
      textAlign: "right",
      width: "48%",
    },
    {
      title: "上榜5日后涨跌幅",
      code: "next_5d_rate_temp",
      width: "48%",
      textAlign: "right",
    },
    {
      title: "上榜10日后涨跌幅",
      code: "next_10d_rate_temp",
      width: "48%",
      textAlign: "right",
    },
  ],
  }
  render() {
    return (
      <div>
        {/* <CountContext.Provider value="60">
          <Bar3></Bar3>
        </CountContext.Provider> */}
        <SlideTable columns={this.state.columns}></SlideTable>
      </div>
    );
  }
}
