import Mock from 'mockjs';

Mock.mock('/api/query_common_credit', {
    "ret":0,
    "data":[{
        secName:'比亚迪',secCode:'000556'
      },{
        secName:'中国银联',secCode:'600000'
      }]
    
});

Mock.mock('/api/query_item', {
    "ret":0,
    "data":'我是被请求到的数据'
    
});