import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''

        }
    }

    componentDidMount() {
        let user = this.props.currentUser
        console.log('afnsnfds', user)
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        console.log('didmount edit modal : ', this.props.currentUser)
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (event, id) => {
        //good code 
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check inside loop : ', this.state[arrInput[i]], [arrInput[i]])
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter : ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api edit user modal
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
            // centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>EDIT A NEW USER</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' value={this.state.email} onChange={(event) => { this.handleOnchangeInput(event, 'email') }} disabled />
                        </div>

                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' value={this.state.password} onChange={(event) => { this.handleOnchangeInput(event, 'password') }} disabled />
                        </div>

                        <div className='input-container'>
                            <label>Firstname</label>
                            <input type='text' value={this.state.firstName} onChange={(event) => { this.handleOnchangeInput(event, 'firstName') }} />
                        </div>

                        <div className='input-container'>
                            <label>Lastname</label>
                            <input type='text' value={this.state.lastName} onChange={(event) => { this.handleOnchangeInput(event, 'lastName') }} />
                        </div>

                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <textarea type='text' value={this.state.address} onChange={(event) => { this.handleOnchangeInput(event, 'address') }} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>Save changes</Button>
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




