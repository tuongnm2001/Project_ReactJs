import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'

class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về Hỏi Dân IT
                </div>

                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI" title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                        </iframe>
                    </div>

                    <div className='content-right'>
                        <p>Welcome to the Liverpool ECHO's Thursday LIVE blog for all your very latest Liverpool FC news.

                            The ECHO will provide breaking stories, reaction and comment to all the big talking points from
                            Anfield as well as keeping tabs on the transfer market around the world.

                            Liverpool are reportedly interested in Bayern Munich star Jamal Musiala as a potential alternative to Jude Bellingham, while the Reds could be ready to launch a bid for Rennes and Ghana winger Kamaldeen Sulemana</p>
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
