import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import './BookingModal.scss'
import ProfileDoctor from '../ProfileDoctor';
import { getProfileDoctorById } from '../../../../services/userService';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify'
import _ from 'lodash';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            brithday: '',
            selectGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            isShowLoading: false

        }
    }

    async componentDidMount() {
        this.props.fetchGender();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language

        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnchangInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            brithday: date[0]
        })
    }

    handleChangeSelected = (selectedOption) => {
        this.setState({
            selectGender: selectedOption
        })
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        // let object = {}
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`
        }
        return ''
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

            return name
        }
        return ''
    }

    handleConfirmBooking = async () => {
        //validate input
        let date = new Date(this.state.brithday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime);

        this.setState({
            isShowLoading: true
        })

        let res = await postPatientAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectGender: this.state.selectGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!')
            this.props.closeBookingModal();
            this.setState({
                isShowLoading: false
            })
        } else {
            toast.error('Booking a new appointment error!')
            this.setState({
                isShowLoading: false
            })
        }
    }

    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props
        let doctorId = ''
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }


        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <Modal
                        isOpen={isOpenModal} className='booking-modal-container'
                        size='lg' centered>

                        <div className='booking-modal-content'>
                            <div className='booking-modal-header'>
                                <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
                                <span className='right'><i className='fas fa-times' onClick={closeBookingModal}></i></span>
                            </div>

                            <div className='booking-modal-body'>
                                <div className='doctor-infor'>
                                    <ProfileDoctor
                                        doctorId={doctorId}
                                        isShowDescriptionDoctor={false}
                                        dataTime={dataTime}
                                        isShowLinkDetail={false}
                                        isShowPrice={true}
                                    />
                                </div>

                                <div className='row '>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.fullName' /></label>
                                        <input className='form-control' value={this.state.fullName}
                                            onChange={(event) => this.handleOnchangInput(event, 'fullName')} />
                                    </div>

                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.phoneNumber' /></label>
                                        <input className='form-control' value={this.state.phoneNumber}
                                            onChange={(event) => this.handleOnchangInput(event, 'phoneNumber')} />
                                    </div>

                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                        <input className='form-control' value={this.state.email}
                                            onChange={(event) => this.handleOnchangInput(event, 'email')} />
                                    </div>

                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                        <input className='form-control' value={this.state.address}
                                            onChange={(event) => this.handleOnchangInput(event, 'address')} />
                                    </div>

                                    <div className='col-12 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                        <input className='form-control' value={this.state.reason}
                                            onChange={(event) => this.handleOnchangInput(event, 'reason')} />
                                    </div>

                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                        <DatePicker className='form-control'
                                            onChange={this.handleOnchangeDatePicker}
                                            value={this.state.brithday}
                                        />
                                    </div>

                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.gender' /></label>
                                        <Select value={this.state.selectGender}
                                            onChange={this.handleChangeSelected}
                                            options={this.state.genders} />
                                    </div>
                                </div>
                            </div>

                            <div className='booking-modal-footer'>
                                <button className='btn-booking-confirm' onClick={() => this.handleConfirmBooking()}><FormattedMessage id='patient.booking-modal.btn-confirm' /></button>
                                <button className='btn-booking-cancel' onClick={closeBookingModal}><FormattedMessage id='patient.booking-modal.btn-cancel' /></button>
                            </div>
                        </div>
                    </Modal>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
