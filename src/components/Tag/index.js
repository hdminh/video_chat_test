import React from "react";

export default function Tag(props) {
  return (
    <div className="tag">
      <button
        type="button"
        className="tag-button"
        href="#"
        style={{ backgroundColor: props.bgColor, color: props.textColor }}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
}
