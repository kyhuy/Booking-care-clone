import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions/userActions";
class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userName: "Ethan Winter",
         password: "",
         isShowPaassword: false,
         errMessage: ``,
      };
   }
   handleOnChangeUserName = (event) => {
      this.setState({
         userName: event.target.value,
      });
   };
   handleOnChangePassword = (event) => {
      this.setState({
         password: event.target.value,
      });
   };
   handleLogin = async () => {
      this.setState({ errMessage: `` });
      try {
         let data = await handleLoginApi(
            this.state.userName,
            this.state.password
         );
         if (data && data.errCode !== 0) {
            this.setState({ errMessage: data.message });
         }
         if (data && data.errCode === 0) {
            this.props.userLoginSuccess(data.user);
         }
      } catch (error) {
         if (error.response) {
            if (error.response.data) {
               this.setState({
                  errMessage: error.response.data.message,
               });
            }
         }
      }
   };
   handleShowHidePassword = () => {
      this.setState({
         isShowPaassword: !this.state.isShowPaassword,
      });
   };
   handleKeyDown = (event) => {
      console.log("check keydown event Login.js : ", event);
      if (event.key === "Enter" || event.keyCode === 13) {
         this.handleLogin();
      }
   };
   render() {
      return (
         <div className="login-background">
            <div className="login-container">
               <div className="login-content row">
                  <div className="col-12 login-text">Login</div>
                  <div className="col-12 form-group login-input">
                     <label>User name</label>
                     <input
                        placeholder="Enter your user name"
                        type="text"
                        className="form-control"
                        value={this.state.userName}
                        onChange={(event) => this.handleOnChangeUserName(event)}
                     />
                  </div>
                  <div className="col-12 form-group login-input">
                     <label>Password</label>
                     <div className="custom-input-password">
                        <input
                           className="form-control"
                           placeholder="Enter your password"
                           type={
                              this.state.isShowPaassword ? "text" : "password"
                           }
                           onChange={(event) =>
                              this.handleOnChangePassword(event)
                           }
                           onKeyDown={(event) => this.handleKeyDown(event)}
                        />
                        <span
                           onClick={() => {
                              this.handleShowHidePassword();
                           }}
                        >
                           <i
                              className={
                                 this.state.isShowPaassword
                                    ? "fas fa-eye"
                                    : "fas fa-eye-slash"
                              }
                           ></i>
                        </span>
                     </div>
                  </div>
                  <div className="col-12" style={{ color: "red" }}>
                     {this.state.errMessage}
                  </div>
                  <div className="col-12">
                     <button
                        className="btn-login"
                        onClick={() => {
                           this.handleLogin();
                        }}
                     >
                        Login
                     </button>
                  </div>

                  <div className="col-12">
                     <span className="forgot-password">
                        Forgot your password?
                     </span>
                  </div>
                  <div className="col-12 text-center mt-3">
                     <span className="text-other-login">Or Login with:</span>
                  </div>
                  <div className="col-12 social-login">
                     <i className="fab fa-google-plus google"></i>
                     <i className="fab fa-facebook facebook"></i>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      navigate: (path) => dispatch(push(path)),

      // adminLoginFail: () => dispatch(actions.adminLoginFail()),
      userLoginSuccess: (userInfo) =>
         dispatch(actions.userLoginSuccess(userInfo)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
