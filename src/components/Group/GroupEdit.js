import React, { useState, useEffect, useContext } from 'react';
import {
    Col,
    Row,
    Form,
    Button
} from 'react-bootstrap';
import { GroupContext } from '../../context/GroupContext';
import { useForm } from 'react-hook-form';

import { useDropzone } from 'react-dropzone';
import Tag from '../../components/Tag/index';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PageLoading from '../PageLoading/pageLoading';

// api
import { uploadFile, getSignUrl } from '../../api/storageApi';
import { updateGroup } from '../../api/groupApi';
import { getAllTag } from '../../api/tagApi';


export default function GroupEdit(props) {
    // State
    const { grpInfo, activeCpn } = useContext(GroupContext);
    const [activeComponent, setActiveComponent] = activeCpn;
    const [groupInfo, setGroupInfo] = grpInfo;
    const [err, setErr] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading page
    const [allTag, setAllTag] = useState(null); // tất cả tag
    const [arrTag, setArrTag] = useState([]); // những tag được chọn
    const [checkedGrpPrivacy, setCheckedGrpPrivacy] = useState(false); // check group privacy

    const [masterFile, setMasterFile] = useState({
        file: null,
        preview: null,
        accessURL: null,
        uploadURL: null
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            // setMasterFile({
            //     ...masterFile,
            //     file: acceptedFiles[0]
            // });
            console.log("acceptedFiles", acceptedFiles);
            const objectUrl = URL.createObjectURL(acceptedFiles[0]);
            // get sign url
            let params = {
                type: acceptedFiles[0].type
            }
            getSignUrl(params)
                .then((res) => {
                    let data = res.data.data;
                    setMasterFile({
                        file: acceptedFiles[0],
                        preview: objectUrl,
                        accessURL: data.accessurl,
                        uploadURL: data.uploadurl
                    })
                })
                .catch((err) => {
                    console.log("error get url storage: ", err.message)
                });
        }
    });

    // add or remove tag in arrTag
    const handleClickTag = (tagId) => {
        if (arrTag.includes(tagId)) {
            setArrTag(arrTag.filter(item => item !== tagId));
        } else {
            setArrTag(oldArray => [...oldArray, tagId]);
        }
    }

    // validate
    const { register, errors, handleSubmit } = useForm();

    // submit form
    const onSubmit = async (formValues) => {
        await uploadFile(masterFile.uploadURL, masterFile)
            .then((res2) => {
                console.log("res upload is: ", res2)
            })
            .catch((err2) => {
                console.log("error: ", err2.message)
            });

        let data = {};
        if (masterFile.preview !== "") {
            data = {
                groupid: groupInfo._id,
                name: formValues.groupName,
                description: formValues.groupDescription,
                isprivate: formValues.groupPrivacy,
                avatar: masterFile.preview,
                tag: arrTag,
            };
        } else {
            data = {
                groupid: groupInfo._id,
                name: formValues.groupName,
                description: formValues.groupDescription,
                isprivate: formValues.groupPrivacy,
                tag: arrTag,
            };
        }

        console.log(data);
        await updateGroup(data)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Cập nhật thành công");
                    setGroupInfo(res.data.data);
                    setActiveComponent("detail");
                }
            })
            .catch((err) => {
                console.log("error: ", err.message)
            })
    }

    useEffect(
        () => {
            setLoading(true);
            if (groupInfo != null) {
                // gán những tag của group vào arrTag
                groupInfo.tag.map((tag) => {
                    setArrTag(oldArray => [...oldArray, tag._id]);
                });
                // gán ảnh avatar
                if (groupInfo.avatar != "") {
                    setMasterFile({
                        file: null,
                        preview: groupInfo.avatar,
                        accessURL: null,
                        uploadURL: null
                    });
                }
                // gán checked group privacy
                setCheckedGrpPrivacy(groupInfo.isprivate);

            }
            // get all tag
            getAllTag()
                .then((res) => {
                    if (res.status === 200) {
                        setAllTag(res.data.data);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("error: ", err.message);
                    setLoading(false);
                });
        },
        []
    )

    if (groupInfo != null) {
        return (
            <React.Fragment>
                { loading
                    ? <PageLoading />
                    : <React.Fragment>
                        <div className="btn-return-list-group">
                            <div className="btn-like-group mr-2">
                                <button type="button" onClick={() => {
                                    setActiveComponent("list");
                                }}>
                                    <ArrowBackIcon color="primary" />
                                </button>
                            </div>
                        </div>
                        <div className="create-group-content">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row className="mt-2 col-12">
                                    {err
                                        ? <div className="validation" style={{ color: 'red' }}>{message}</div>
                                        : null
                                    }
                                    <Form.Group controlId="formBasicEmail" style={{ width: "100%" }}>
                                        <Form.Label>Group name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter group name" name="groupName"
                                            defaultValue={groupInfo.name}
                                            ref={register({
                                                required: 'Group name is required'
                                            })} />
                                        {errors.groupName && (
                                            <p className="errorMsg">{errors.groupName.message}</p>
                                        )}
                                    </Form.Group>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={6} placeholder="Enter description" name="groupDescription"
                                                defaultValue={groupInfo.description}
                                                ref={register({
                                                    required: 'Group description is required'
                                                })} />
                                            {errors.groupDescription && (
                                                <p className="errorMsg">{errors.groupDescription.message}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Label>Upload Avatar</Form.Label>
                                        <div className="dropzone_frame">
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} />
                                                <img className="dropzone_img" src={masterFile.preview ? masterFile.preview : groupInfo.avatar} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row >

                                <Row className="d-flex flex-column mt-2 col-12">
                                    <Form.Label>Group tag</Form.Label>
                                    <div className="d-flex flex-wrap">
                                        {allTag &&
                                            allTag.map((tag) => (
                                                <Tag
                                                    bgColor={arrTag.includes(tag._id) ? "#FFA500" : "#C4C4C4"}
                                                    textColor={arrTag.includes(tag._id) ? "#FFF" : "#000"}
                                                    text={tag.name}
                                                    key={tag._id}
                                                    onClick={e => handleClickTag(tag._id)}
                                                />
                                            ))}
                                    </div>
                                </Row>
                                <Row className="d-flex flex-column mt-2 col-12">
                                    <Form.Label>Group privacy</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Check is private group"
                                        name="groupPrivacy"
                                        defaultChecked={checkedGrpPrivacy}
                                        onChange={() => setCheckedGrpPrivacy(!checkedGrpPrivacy)}
                                        ref={register()}
                                    />
                                </Row>
                                <Row className="mt-3 col-12 d-flex justify-content-end">
                                    <Button type="submit" className="custom-btn_ffa500">Submit</Button>
                                </Row>
                            </Form>
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    } else {
        setActiveComponent("list");
    }
}