import React from "react";

export default function MessageItem(props) {
  let key = 0;
  const messageItem = props.text.map((element)=>{
    return (<div className={"message " + (props.sender ? props.sender : "")} key={++key}>
    <div className="bubble-container">
        <div className="bubble" title={props.title}>
            {element.message}
        </div>
    </div>
</div>)
  })
  return (
    <React.Fragment>
      {messageItem}
    </React.Fragment>
  );
}
