import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  render() {
    console.log("check child props", this.props);
    console.log("check child open modal", this.props.isOpen);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          CREAT A NEW USER
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <lable>Email</lable>
              <input type="text" />
            </div>
            <div className="input-container">
              <lable>Password</lable>
              <input type="password" />
            </div>
            <div className="input-container">
              <lable>First Name</lable>
              <input type="text" />
            </div>
            <div className="input-container">
              <lable>Last Name</lable>
              <input type="text" />
            </div>
            <div className="input-container ">
              <lable>Phone number</lable>
              <input type="text" />
            </div>
            <div className="input-container ">
              <lable>Gender</lable>
              <select className="">
                <option value="1" selected>
                  Male
                </option>
                <option value="0">Female</option>
              </select>
            </div>
            <div className="input-container max-width-input">
              <lable>Address</lable>
              <input type="text" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Save changes
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
