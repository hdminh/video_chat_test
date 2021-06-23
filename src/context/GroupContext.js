import React, { useState, createContext } from "react";

export const GroupContext = createContext(null);

export const GroupProvider = ({ children }) => {
    const [idGroup, setIdGroup] = useState(""); // for view detail group
    const [groupInfo, setGroupInfo] = useState({});
    const [listGroup, setListGroup] = useState([]);

    const [activeComponent, setActiveComponent] = useState("list");

    return (
        <GroupContext.Provider
            value={{
                activeCpn: [activeComponent, setActiveComponent], // switch component group
                idGrp: [idGroup, setIdGroup],
                grpInfo: [groupInfo, setGroupInfo],
                listGrp: [listGroup, setListGroup]
            }}
        >
            {children}
        </GroupContext.Provider>
    );
};
