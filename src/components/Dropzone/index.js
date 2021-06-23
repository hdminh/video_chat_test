import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { getSignUrl } from '../../api/storageApi';

export default function Dropzone({ selectedFile, setSelectedFile }) {

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setSelectedFile({
                ...selectedFile,
                file: acceptedFiles[0]
            })
        }
    });

    useEffect(
        () => {
            if (!selectedFile.file) {
                setSelectedFile({
                    ...selectedFile,
                    preview: undefined,
                    accessURL: undefined,
                    uploadURL: undefined
                })
                return;
            }
            const objectUrl = URL.createObjectURL(selectedFile.file)
            // get accessURL
            let params = {
                type: selectedFile.file.type
            }
            getSignUrl(params)
                .then((res) => {
                    let data = res.data.data;
                    setSelectedFile({
                        ...selectedFile,
                        preview: objectUrl,
                        accessURL: data.accessurl,
                        uploadURL: data.uploadurl
                    })
                })
                .catch((err) => {
                    console.log("error get url storage: ", err.message)
                });
            
        },
        [selectedFile.file]
    );


    return (
        <div className="dropzone_frame">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <img className="dropzone_img" src={selectedFile.preview} />
            </div>
        </div>
    );
}