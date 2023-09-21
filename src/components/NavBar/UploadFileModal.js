import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import uploadImg from '../../assets/upload.png';
import ShowCSVdata from './ShowCSVdata';
import CloseIcon from '@mui/icons-material/Close';
import './NavBar.css';

const UploadFileModal = ({ show, onHide }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showCSVdataModal, setShowCSVdataModal] = useState(false);
    const [jsonData, setJsonData] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvData = event.target.result;
                const jsonData = convertCSVToJson(csvData);
                setJsonData(jsonData);
            };
            reader.readAsText(selectedFile);
        }
        onHide();
        setShowCSVdataModal(true);
    };

    const convertCSVToJson = (csvData) => {
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
        const jsonObjects = [];

        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].split(',');
            const jsonObject = {};

            for (let j = 0; j < headers.length; j++) {
                jsonObject[headers[j]] = currentLine[j];
            }

            jsonObjects.push(jsonObject);
        }

        return jsonObjects;
    };

    const handleOnClose = () => {
        setSelectedFile(null);
        onHide();
    };

    const handleCloseCSVModal = () => {
        setShowCSVdataModal(false);
    };

    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton className="custom-modal-header">
                    <Modal.Title id="contained-modal-title-vcenter">Upload your CSV file!</Modal.Title>
                <button className="close-button" onClick={onHide}><CloseIcon/></button>
                </Modal.Header>
                <Modal.Body className="uploadfile-box">
                    <div className="uploadfile-modalbody">
                        <div className="uploadfile-text">
                            <img src={uploadImg} alt="upload here" />
                            <h5>Upload your file</h5>
                        </div>
                        <div className="file-input-field">
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

            {jsonData && (
                <ShowCSVdata
                    show={showCSVdataModal}
                    onHide={handleCloseCSVModal}
                    data={jsonData}
                />
            )}
        </div>
    );
};

export default UploadFileModal;