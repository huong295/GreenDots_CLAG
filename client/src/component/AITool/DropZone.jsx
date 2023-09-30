import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import ImageWithRectangles from './ImageWithRectangles';


const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT


const DropZone = (props) => {

    let [hasFile, setHasFile] = useState(false);
    let [isUploaded, setIsUploaded] = useState(false);
    let [dataReceived, setDataReceived] = useState({});
    let [displayText, setDisplayText] = useState('Drag and drop your image here, or click to select an image')

    // send files to the server
    function handleUpload(event) {

        // read file from event
        console.log(event)
        const file = event[0];

        setDisplayText(`Reading ${file.name}`)
        // check if the given file is an image
        if ( typeof file === 'undefined' || file.type.split('/')[0] != "image" ) {
            alert('Invalid file. Please only upload JPEG or PNG files');
            return;
        };
        
        setHasFile(true); // means that there is a file is waiting for uploading
        setIsUploaded(false); // the file has not been uploaded 
        
        setDisplayText(`Uploading ${file.name}`)
        // create form data to upload to multer 
        const data = new FormData();
        data.append('file', event[0]);
        
        // using Axios to POST 
        axios.post(`${API_ENDPOINT}/upload`, data,)
        .then((res) => {
            
                setDataReceived({
                    filename: res.data.filename,
                    bboxes: res.data.bboxes,
                })
                
                // send data to parent node 
                props.sendData({
                    classNames: [... res.data.classNames],
                })

                setIsUploaded(true);
                
            }) // end postprocessing
            .catch((err) => {
                alert(`${err}. Please try again.`);
                // window.location.reload(false);
            }); // end catching error
            
            setHasFile(false); 
            
            setDisplayText(`Displaying ${file.name}`);

        };// end handleUpload


    // config dropzone 
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({

        accept: { // only accept images 
            'image/png': ['.png', '.PNG'],
            'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG']
        },
        onDrop: handleUpload,
        onChange: handleUpload,
        multiple: false, // not allow multiple files 

    }); // end useDropzone

    
    // switch to displaying trash's information
    function changeToInfo(event) { 
        
        props.readState({
            isInfo: true
        });

    }; // end changeToInfo

    // switch to displaying locations
    function changeToRecommendations(event) { 

        props.readState({
            isInfo: false
        });

    }; // end changeToRecommendations

    return (
        <div className='AITool-result-left'>
            {
                // hide buttons 
                isUploaded && !isDragActive ?
                <>
                    <div className='AITool-result-buttons'>
                        <button className='AITool-result-button' 
                                onClick={changeToInfo}
                        >
                            More Information
                        </button>
                        <button className='AITool-result-button'
                                onClick={changeToRecommendations}
                        >
                            Find Campaigns
                        </button>
                    </div>
                </>
                : <></>
            }
            <div className='dropzone' {...getRootProps()}>
            {
                hasFile
                ? (
                    <input type='file' name='file' {...getInputProps()} />
                )
                : (<>
                    {
                        isUploaded && !isDragActive ? 
                        (<>

                            <div className='AITool-result-content'>
                                <div className='AITool-result-image'>
                                    <ImageWithRectangles 
                                        imgSrc={`${API_ENDPOINT}/image/${dataReceived.filename}`} 
                                        bboxes={dataReceived.bboxes}
                                    />
                                </div>
                                <div className='AITool-result-newimg' onClick={handleUpload}>
                                    <p>Click to upload another image</p>
                                </div>
                            </div>
                        </>) :
                        (<>
                        {
                            isDragActive ? <p>Drop your image here ...</p> : <p>{displayText}</p>
                        }
                        </>)
                    }
                </>)
            }
            </div>
        </div>
    )
};

export default DropZone;