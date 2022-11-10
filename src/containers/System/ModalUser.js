import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''

        }
        this.litenToEmitter();
    }

    litenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (event, id) => {
        // bad code

        // this.state[id] = event.target.value
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log('check : ', event.target.value, 1)
        // })

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

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api create modal
            this.props.createNewUser(this.state);
        }
    }

    render() {
        console.log('check child props : ', this.props);
        console.log('check child open modal : ', this.props.isOpen)

        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
            // centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>CREATE A NEW USER</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' value={this.state.email} onChange={(event) => { this.handleOnchangeInput(event, 'email') }} />
                        </div>

                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' value={this.state.password} onChange={(event) => { this.handleOnchangeInput(event, 'password') }} />
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
                    <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>Add New</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




