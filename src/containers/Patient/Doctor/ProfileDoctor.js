import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils'
import NumberFormat from 'react-number-format'
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })


    }

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
        }
    }

    // capitalizeFirstLetter(string) {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        // let object = {}
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            // object.label = this.capitalizeFirstLetter(date)

            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div><FormattedMessage id='patient.booking-modal.priceBooking' /></div>
                </>
            )
        }
        return <></>
    }

    // handleViewDetailDoctor = (a) => {
    //     if (this.props.history) {
    //         this.props.history.push(`/detail-doctor/${a.id}`)
    //     }
    // }

    render() {
        let { dataProfile } = this.state
        let { language, isShowDescriptionDoctor, dataTime, isShowLinkDetail, isShowPrice, doctorId } = this.props
        console.log('check state : ', this.state)

        let { nameVi, nameEn } = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} , ${dataProfile.lastName} ${dataProfile.firstName} `
            nameEn = `${dataProfile.positionData.valueEn} , ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        console.log('check props data time : ', dataTime)
        console.log('check data profile 12 : ', dataProfile)
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left' style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>

                    </div>

                    <div className='content-right'>
                        <div className='up' >
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>

                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        &&
                                        <>
                                            <span>
                                                {dataProfile.Markdown.description}
                                            </span>
                                            <div className='position'>
                                                <div><i className="fas fa-map-marker-alt"></i>
                                                    {dataProfile.Doctor_Infor.provinceTypeData.valueVi}
                                                </div>

                                            </div>
                                        </>
                                    }

                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                {
                    isShowLinkDetail === true &&
                    <div className='view-detail-doctor'>
                        <Link to={`/detail-doctor/${doctorId}`} > Xem thêm</Link>

                    </div>
                }
                {
                    isShowPrice === true &&
                    <div className='price'>
                        <FormattedMessage id='patient.booking-modal.price' />:
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                            <NumberFormat className='currency'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true} suffix={' VNĐ'} />

                        }

                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&

                            <NumberFormat className='currency'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true} suffix={' USD'} />
                        }
                    </div>
                }
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor));
