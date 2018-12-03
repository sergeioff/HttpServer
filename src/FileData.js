import React, { Component } from 'react';

class FileData extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <b>index</b> {this.props.file.index} <b>Name: </b> {this.props.file.name} <b>Size</b> {this.props.file.size} bytes; <b>Upload progress: </b> {this.props.file.progress}
            </div>
        );
    }
}

export default FileData;