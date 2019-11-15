import React, { Component } from "react";
import { Modal, DatePickerView } from "antd-mobile";
import "components/DateMonthPicker.scss";

class DateMonthPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "选择月份"
    };
  }

  componentDidMount() {
    switch (this.props.type) {
      case "month":
        this.setState({
          title: "选择月份"
        });
        break;
      case "date":
        this.setState({
          title: "选择日期"
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { showModal, onClose, type } = this.props;
    return (
      <div>
        <Modal
          className={"geekthings-datetimePicker"}
          popup
          visible={showModal}
          animationType="slide-up"
        >
          <div className="header">
            <p className="header-cancel" onClick={() => onClose()}>
              取消
            </p>
            <p className="header-title">{this.state.title}</p>
            <p></p>
          </div>
          {type === 'date' && (
            <div className="choice">
              <input
                className="choice-input"
                type="text"
                placeholder="开始日期"
              />
              <span className="choice-middle"></span>
              <input
                className="choice-input"
                type="text"
                placeholder="结束日期"
              />
            </div>
          )}

          {/* <DatePickerView
            cols={1}
            title={this.state.title}
            mode={"month"}
          ></DatePickerView> */}
        </Modal>
      </div>
    );
  }
}

export default DateMonthPicker;
