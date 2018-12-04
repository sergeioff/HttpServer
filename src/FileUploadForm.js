import React, { Component } from 'react';
import FileData from './FileData';

class FileUploadForm extends Component {

    constructor(props) {
        super(props);

        this.state = {filesToUpload: []};
        
        this.onFilesChange = this.onFilesChange.bind(this);
        this.click = this.click.bind(this);
    }

    onFilesChange() {
        const files = document.getElementById('filesToUpload').files;

        const filesToUpload = [];
        for (let i = 0; i < files.length; i++) {
            filesToUpload.push(files[i]);
        }

        this.setState({filesToUpload: filesToUpload});

        this.childComponents = [];
        for (let i = 0; i < filesToUpload.length; i++) {
            this.childComponents[i] = React.createRef();
        }
    }

    click() {
        this.childComponents.forEach(childComponent => {
            childComponent.current.upload();
        })
    }

    render() {
        const files = this.state.filesToUpload.map((file, idx) => <li key={file.name}><FileData ref={this.childComponents[idx]} file={file}/></li>);

        return (
            <div>
                <form>
                    <input type="file" multiple id="filesToUpload" name="filesToUpload" onChange={this.onFilesChange}/>
                    <input type="button" value="Click" onClick={this.click}/>
                </form>

                <ul>
                    {files}
                </ul>
            </div>
        );
    }
}

export default FileUploadForm;