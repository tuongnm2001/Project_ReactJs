import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import './About.scss'

class About extends Component {

    render() {
        return (
            <div className='section-about'>
                <div className='section-about-header' style={{ fontSize: '22px', fontWeight: "600" }}>
                    Địa chỉ
                </div>

                <div className='section-about-content'>
                    <div className='content-left'>
                        {/* <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI" title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                        </iframe> */}
                        <iframe style={{ height: "400px", width: "100%", border: "0" }} frameBorder="0" src="https://www.google.com/maps/embed/v1/place?q=Ho+Chi+Minh,+Ho+Chi+Minh+City,+Vietnam&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                    </div>

                    <div className='content-right'>
                        <div className='content-right-address'>
                            <div className='title-address'>Trụ sở tại Hà Nội</div>
                            <div className='content-address'>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>

                            <div className='title-address'>Văn phòng tại TP Hồ Chí Minh</div>
                            <div className='content-address'>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</div>

                            <div className='title-address'> Hỗ trợ khách hàng</div>
                            <div className='content-address'>support@bookingcare.vn (7h - 18h)</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
