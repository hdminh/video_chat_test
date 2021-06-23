import React, { useEffect, useState, useContext } from "react";
import {
    Row
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GroupContext } from "../../context/GroupContext";
import Chip from "../Chip/index";

// api
import { getGroupOfUser, getListGroup } from '../../api/groupApi';

export default function GroupFilter(props) {
    const { activeCpn, grpInfo, listGrp } = useContext(GroupContext);
    const [activeComponent, setActiveComponent] = activeCpn;
    const [groupInfo, setGroupInfo] = grpInfo;
    const [listGroup, setListGroup] = listGrp;

    const [listMyGroup, setListMyGroup] = useState([]);
    const [currentType, setCurrentType] = useState("");
    const [search, setSearch] = useState("");

    const pressBtnChip = (newValue, value, setValue) => {
        setGroupInfo(newValue);
        if (newValue._id === value) {
            setValue(null);
        } else {
            setValue(newValue);
            setActiveComponent("detail");
        }
    };

    useEffect(() => {
        // my group
        getGroupOfUser()
            .then((res) => {
                if (res.status === 200) {
                    let result = res.data;
                    setListMyGroup(result.data.groups);
                }
            })
            .catch((error) => {
                // setListMyGroup([])
            });
    }, [activeComponent]);

    return (
        <React.Fragment>
            <Row>
                <div className="heading-filter">
                    <h3 className="heading-filter__fs15">Groups</h3>
                </div>
                <div className="btn-create-group d-flex justify-content-center">
                    <button type="button" onClick={() => {
                        setActiveComponent("create");
                    }}>
                        <FontAwesomeIcon icon="plus-square" size="sm" color="#FFA500" />
                    </button>
                </div>
            </Row>

            <Row className="d-flex search-bar-new">
                <input type="text" className="input-search-bar" placeholder="Search"
                    onChange={e => setSearch(e.target.value)} value={search}
                />
                <button type="button" className="icon-search-bar" onClick={() => searchGroup(search, setActiveComponent, setListGroup)}>
                    <FontAwesomeIcon icon="search" size="1x" color="#FFF" />
                </button>
            </Row>
            <Row className="mt-3">
                Groups You've Joined
            </Row>
            <Row className="mt-3">
                <div className="list-my-group">
                    {listMyGroup &&
                        listMyGroup.map((group) => (
                            <div className="chip-group-item"
                                onClick={() => pressBtnChip(group, currentType, setCurrentType)}
                                key={group._id}
                            >
                                <Chip
                                    linkAvatar={group.avatar}
                                    label={group.name}
                                    chipStyle={currentType === group._id ? "active" : ""}
                                />
                            </div>
                        ))}
                </div>
            </Row>
        </React.Fragment>
    )
}

function searchGroup(searchTxt, setActiveComponent, setListGroup) {
    let params = {
        'page': 1,
        'rowsperpage': 10,
    };
    if (searchTxt !== "") {
        params.textsearch = searchTxt;
    }
    // chuyển về view list group
    setActiveComponent("list");
    // search list group
    getListGroup(params)
        .then((res) => {
            if (res.status === 200) {
                console.log("search ne: ", searchTxt, res.data);
                setListGroup(res.data.data.groups);
            }
        })
        .catch((err) => {
            return null;
        });
    // search my group
}
