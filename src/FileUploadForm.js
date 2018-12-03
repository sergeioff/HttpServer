import React, { Component } from 'react';
import FileData from './FileData';

class FileUploadForm extends Component {

    constructor(props) {
        super(props);

        this.state = {filesToUpload: []};
        
        this.upload = this.upload.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
    }

    onFilesChange() {
        const files = document.getElementById('filesToUpload').files;

        const filesToUpload = [];
        for (let i = 0; i < files.length; i++) {
            files[i].index = i;
            filesToUpload.push(files[i]);
        }

        this.setState({filesToUpload: filesToUpload});
    }

    upload() {
        this.state.filesToUpload.forEach(file => {

            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', progress => {
                this.setState((state, props) => {
                    state.filesToUpload[file.index].progress = (progress.loaded / (progress.total / 100)).toFixed(2)
    
                    return {filesToUpload: state.filesToUpload};
                });
            }, false)

            xhr.upload.addEventListener('error', error => {
                console.error(error);
            });

            const formData = new FormData();
            formData.append('file', file);
            xhr.open('POST', 'upload');
            xhr.send(formData);
        });
    }

    render() {
        const files = this.state.filesToUpload.map(file => <li key={file.name}><FileData file={file}/></li>);

        return (
            <div>
                <form>
                    <input type="file" multiple id="filesToUpload" name="filesToUpload" onChange={this.onFilesChange}/>
                    <input type="button" value="Click" onClick={this.upload}/>
                </form>

                <ul>
                    {files}
                </ul>
            </div>
        );
    }
}

export default FileUploadForm;