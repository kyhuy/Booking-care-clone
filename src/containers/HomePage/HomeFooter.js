import React, { Component } from "react";

import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; 2021 HHHHHHHHHHH. More infomation, please
          <a
            target="_blank"
            href="https://www.rapidtables.com/web/html/html-codes/html-code-copyright.html"
          >
            {" "}
            ... &#8594; Click here &#8592;
          </a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    //inject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
