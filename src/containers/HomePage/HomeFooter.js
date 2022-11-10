import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'

class HomeFooter extends Component {

    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2022 Nguyen Minh Tuong. More infomation , please visit my Github .<a target='_blank' href='https://github.com/tuongnm2001'> Click here</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
