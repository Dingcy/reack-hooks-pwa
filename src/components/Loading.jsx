import React from 'react'
import { ActivityIndicator } from "antd-mobile";
import PropTypes from "prop-types";

export default function Loading(props) {
  const { height } = props;

  return (
    <div className="loading" style={{ height: height + "px" }}>
      <ActivityIndicator  color="white"></ActivityIndicator>
    </div>
  );
}

Loading.propTypes = {
  height: PropTypes.number
};

Loading.defaultProps = {
  height: 60
};
