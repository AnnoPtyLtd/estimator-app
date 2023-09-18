import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import uploadImg from '../../assets/upload.png'
import './NavBar.css'


const UploadFileModal = ({ show, onHide }) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        console.log(selectedFile);
    };

    const handleOnClose = () => {
        setSelectedFile(null);
        onHide();
    };
    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Upload your CSV file!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="uploadfile-box">
                    <div className="uploadfile-modalbody">
                        <div className="uploadfile-text">
                            <img src={uploadImg} alt="upload here" />
                            <h5>Upload your file</h5>
                        </div>
                        <div className='file-input-field'>
                            <input type="file" accept=".csv" onChange={handleFileChange} />
                        </div>
                        <Button onClick={handleUpload} disabled={!selectedFile}>
                            Upload
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleOnClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UploadFileModal
