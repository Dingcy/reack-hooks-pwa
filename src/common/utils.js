const addSymbol = (value,ifAdd = true,ifMinus = true) => {
  const currentValue = Number(value);
  if(currentValue > 0){
    return ifAdd? `+${currentValue}`:`${currentValue}`
  }else if(currentValue === 0){
    return 0;
  }else{
    return ifMinus?`${currentValue}`:`${currentValue.slice(0)}`
  }
}

const getMaxAbs = (value,params) => {
  return Math.max.apply(Math,value.map(item => { return Math.abs(item[`${params}`]) }))
}


export {
  addSymbol,
  getMaxAbs
}