import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";

class ManageSchedule extends Component {
   constructor(props) {
      super(props);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      this.state = {
         listDoctors: [],
         selectedDoctor: {},
         currentDate: currentDate,
         rangeTime: [],
      };
   }
   componentDidMount() {
      this.props.fetchAllDoctors();
      this.props.fetchAllScheduleTime();
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.allDoctors !== this.props.allDoctors) {
         let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
         this.setState({
            listDoctors: dataSelect,
         });
      }
      if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
         console.log(
            "check range time from manageschedule : ",
            this.props.allScheduleTime
         );
         let data = this.props.allScheduleTime;
         if (data && data.length > 0) {
            data = data.map((item) => {
               item.isSelected = false;
            });
         }
         this.setState({
            rangeTime: this.props.allScheduleTime,
         });
      }
      // if (prevProps.language !== this.props.language) {
      //    let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      //    this.setState({
      //       listDoctors: dataSelect,
      //    });
      // }
   }
   buildDataInputSelect = (inputData) => {
      let result = [];
      let { language } = this.props;

      if (inputData && inputData.length > 0) {
         inputData.map((item, index) => {
            let object = {};
            let labelVi = `${item.lastName} ${item.firstName}`;
            let labelEn = `${item.firstName} ${item.lastName}`;
            object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            object.value = item.id;
            result.push(object);
         });
      }
      return result;
   };
   handleChangeSelect = async (selectedOptions) => {
      this.setState({ selectedDoctor: selectedOptions });
   };
   handleOnchangeDatePicker = (date) => {
      this.setState({
         currentDate: date[0],
      });
   };
   render() {
      console.log("check state from ManageSchedule : ", this.state);
      let { rangeTime } = this.state;
      let { language } = this.props;
      return (
         <div className="manage-schedule-manage">
            <div className="m-s-title">
               <FormattedMessage id="manage-schedule.title" />
            </div>
            <div className="container">
               <div className="row">
                  <div className="col-6 form-group">
                     <label>
                        {" "}
                        <FormattedMessage id="manage-schedule.choose-doctor" />
                     </label>
                     <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChangeSelect}
                        options={this.state.listDoctors}
                     />
                  </div>
                  <div className="col-6 form-group">
                     <label>
                        {" "}
                        <FormattedMessage id="manage-schedule.choose-date" />
                     </label>
                     <DatePicker
                        onChange={this.handleOnchangeDatePicker}
                        className="form-control"
                        value={this.state.currentDate}
                        minDate={new Date()}
                     />
                  </div>
                  <div className="col-12 pick-hour-container">
                     {rangeTime &&
                        rangeTime.length > 0 &&
                        rangeTime.map((item, index) => {
                           return (
                              <button className="btn btn-schedule" key={index}>
                                 {language === LANGUAGES.VI
                                    ? item.valueVi
                                    : item.valueEn}
                              </button>
                           );
                        })}
                  </div>
                  <div className="col-12">
                     {" "}
                     <button className="btn btn-primary btn-save-schedule">
                        <FormattedMessage id="manage-schedule.save" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
      allDoctors: state.admin.allDoctors,
      allScheduleTime: state.admin.allScheduleTime,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
      fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
