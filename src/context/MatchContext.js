import React from 'react'

const MatchContext = React.createContext({
    isProcessMatching: false,
    matchInfor: {},
    setIsProcessMatching: ()=>{},
    setMatchInfor: () => {}
})

export default MatchContext;