import React, { Component } from 'react';

class FileData extends Component {

    constructor(props) {
        super(props);

        this.state = {uploadProgress: 0};
        this.upload = this.upload.bind(this);
    }

    upload() {
            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', progress => {
                this.setState({uploadProgress: (progress.loaded / (progress.total / 100)).toFixed(2)});
            }, false)

            xhr.upload.addEventListener('error', error => {
                console.error(error);
            });

            const formData = new FormData();
            formData.append('file', this.props.file);
            xhr.open('POST', 'upload');
            xhr.send(formData);
    }

    render() {
        return (
            <div>
                <b>Name: </b> {this.props.file.name} <b>Size:</b> {this.props.file.size} bytes <b>Upload progress: </b> {this.state.uploadProgress}
                <input type="button" value="upload" onClick={this.upload}/>
            </div>
        );
    }
}

export default FileData;