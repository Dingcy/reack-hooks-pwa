import React, { memo, useState, useEffect, useReducer } from 'react';
import '../../assets/js/mock';
import axios from 'axios';


const JishuFenXiItem = memo(function JishuFenXiItem(props) {
  const { secName, secCode ,isFirstOpen} = props;
  const [isOpen, setIsOpen] = useState(isFirstOpen);

  function requestreducer(state, action) {
    switch (action.type) {
      case 'requestData':
        return {
          ...state,
          isFirst: false,
          data:'我是被请求到的数据'
        }
      default:
        return state;
    }
  }
  const initStatus = { isFirst: true, data: '初始数据' }
  const [initFirstStatus, dispatch] = useReducer(requestreducer, initStatus);

  const onOpen = () => {
    setIsOpen(isOpen => !isOpen);
  }

  useEffect(() => {
    if(isOpen){
      console.log('开始请求');
      dispatch({type:'requestData'});
    }
  }, [isOpen])
  

  return <div>
    <div className="flex_bt" style={{ height: '60px' }}>
      <p>
        <span>{secName}</span>
        <span>{secCode}</span>
      </p>
      <p>
        <span onClick={onOpen}>
          {isOpen ? '关闭' : '打开'}
        </span>
      </p>
    </div>
    {
      isOpen && <div style={{ background: 'yellow', height: '100px' }}>
        {initFirstStatus.data}
      </div>
    }

  </div>
})


const JishuFenXi = memo(function JishuFenXi(props) {

  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    axios.get('/api/query_common_credit').then((res) => {
      console.log(res);
      setDataArray(res.data.data);
    })
  }, [])

  return <div>
    {
      dataArray.map((item,index) => (
        <JishuFenXiItem {...item} isFirstOpen={index===0} key={item.secCode} />
      )
      )
    }
  </div>
})

export default JishuFenXi;