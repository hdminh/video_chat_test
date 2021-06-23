import React, { useContext } from 'react';
import { Col } from 'react-bootstrap';
import { GroupContext, GroupProvider } from "../../context/GroupContext";

import GroupFilter from '../../components/Group/GroupFilter';
import GroupList from '../../components/Group/GroupList';
import GroupDetail from '../../components/Group/GroupDetail';
import GroupCreate from '../../components/Group/GroupCreate';
import GroupEdit from '../../components/Group/GroupEdit';
import EventCreate from '../../components/Group/Event/EventCreate';
import EventEdit from '../../components/Group/Event/EventEdit';
import EventDetail from '../../components/Group/Event/EventDetail';

export default function Group() {
    return (
        <GroupProvider>
            <GroupChild />
        </GroupProvider>
    );
}

function GroupChild(props) {
    const { idGrp, activeCpn } = useContext(GroupContext);
    const [activeComponent, setActiveComponent] = activeCpn;
    const [idGroup, setIdGroup] = idGrp;
    console.log("Group layout render");
    return (
        <React.Fragment>
            <Col sm={3} style={{ padding: '0px' }}>
                <div className="info-container">
                    <GroupFilter />
                </div>
            </Col>
            <Col sm={8}>

                {
                    activeComponent === "list" ? (
                        <GroupList />
                    ) : activeComponent === "detail" ? (
                        <GroupDetail />
                    ) : activeComponent === "create" ? (
                        <GroupCreate />
                    ) : activeComponent === "edit" ? (
                        <GroupEdit />
                    ) : activeComponent === "event-create" ? (
                        <EventCreate />
                    ) : activeComponent === "event-edit" ? (
                        <EventEdit />
                    ) : activeComponent === "event-detail" ? (
                        <EventDetail />
                    ) : null
                }

            </Col>
        </React.Fragment>
    )
}
