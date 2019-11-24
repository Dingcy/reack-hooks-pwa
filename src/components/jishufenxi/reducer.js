import {
    RECEIVE_GOODSLIST,
    REQUEST_GOODSLIST,
} from "./action.js";


const fetchReducer=(state,action)=>{
    switch (action.type) {
        case REQUEST_GOODSLIST:
            return Object.assign({},state,{
                isFetching: true
            });
        case RECEIVE_GOODSLIST:
            return Object.assign({},state,{
                isFetching:false,
                goodsList:state.goodsList.concat(action.goodsList)
            });
        default:
            return state;
    }
};

export {
    fetchReducer
}