import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils'
import { createNewSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkDown: ''
        }
    }

    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    hanldeOnchangInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkDown: text
        })
    }

    handleOnchangImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                // previewImgURL: objectUrl,
                imageBase64: base64
            })
        }
    }

    handleSaveSpecialty = async () => {
        let res = await createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new Specialty Succees')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkDown: ''
            })
        } else {
            toast.error('Something wrongs...')
            console.log('check response : ', res)
        }
    }

    render() {

        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'><FormattedMessage id='specialty.title-speciality' /></div>


                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='specialty.manage-specialty' /></label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.hanldeOnchangInput(event, 'name')}
                        />
                    </div>

                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='specialty.img-speciality' /></label>
                        <input className='form-control-flie' type='file'
                            onChange={(event) => this.handleOnchangImage(event)} />
                    </div>

                    <div className='col-12'>
                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                            value={this.state.descriptionMarkDown} onChange={this.handleEditorChange} />
                    </div>

                    <div className='col-12'>
                        <button className='btn-save-specialty' onClick={() => this.handleSaveSpecialty()}>Save</button>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
