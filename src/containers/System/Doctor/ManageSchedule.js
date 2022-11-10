import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import './ManageSchedule.scss'
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify'
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService'
import LoadingOverlay from 'react-loading-overlay';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
            isShowLoading: false
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, PrevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item, isSelected: false
                }))
            }

            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let lableVi = `${item.lastName} ${item.firstName}`
                let lableEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? lableVi : lableEn;
                object.value = item.id
                result.push(object)
            })
        }
        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickButtonTime = (time) => {
        let { rangeTime } = this.state;
        console.log('check rangetime before : ', rangeTime)

        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id)
                    item.isSelected = !item.isSelected;

                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
            console.log('check rangetime after', rangeTime)
        }
    }

    handleSaveSchedule = async () => {

        this.setState({
            isShowLoading: true
        })

        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];

        if (!currentDate) {
            toast.error('Invalid date !')
            this.setState({
                isShowLoading: false
            })
            return;
        }

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid Selected Doctor !')
            return;
        }

        //let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let formatedDate = moment(currentDate).unix()
        let formatedDate = new Date(currentDate).getTime();
        // console.log(data)

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formatedDate
                    object.timeType = schedule.keyMap
                    result.push(object)
                })

            } else {
                toast.error('Invalid Selected time !')

                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: '' + formatedDate
        })

        if (res && res.errCode === 0) {
            toast.success('Save infor succed!')
            this.setState({
                isShowLoading: false
            })
        } else {
            toast.error('error saveBulkScheduleDoctor')
            console.log('saveBulkScheduleDoctor >>> res : ', res)
            this.setState({
                isShowLoading: false
            })
        }
    }


    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='manage-schedule-container'>
                        <div className='m-s-title'>
                            <FormattedMessage id='manage-schedule.title' />
                        </div>

                        <div className='container'>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                                    <Select
                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.listDoctors}
                                    />
                                </div>

                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                                    <DatePicker className='form-control' onChange={this.handleOnchangeDatePicker}
                                        value={this.state.currentDate}
                                        minDate={yesterday} />
                                </div>

                                <div className='col-12 pick-hour-container'>
                                    {
                                        rangeTime && rangeTime.length > 0 &&
                                        rangeTime.map((item, index) => {
                                            return (
                                                <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'} key={index}
                                                    onClick={() => this.handleClickButtonTime(item)}>
                                                    {
                                                        language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                                    }
                                                </button>
                                            )
                                        })
                                    }
                                </div>

                                <div className='col-12'>
                                    <button onClick={() => this.handleSaveSchedule()} className='btn btn-primary btn-save-schedule'>
                                        <FormattedMessage id='manage-schedule.save' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
