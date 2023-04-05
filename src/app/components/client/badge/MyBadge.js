import React from "react";

import "@/app/app.css";

export default function MyBadge(props) {

    if (["green", "success"].includes(props.variant)) {
        return (
            <div className="badge success" style={{ margin: 5, display: "inline-block", fontSize: "15px", verticalAlign: "middle", cursor: "pointer" }}>
            </div>
        )
    } else if (["red", "error"].includes(props.variant)) {
        return (
            <div className="badge error" style={{ margin: 5, display: "inline-block", fontSize: "15px", verticalAlign: "middle", cursor: "pointer" }}></div>
        )
    } else if (["blue", "processing"].includes(props.variant)) {
        return (
            <div className="badge processing" style={{ margin: 5, display: "inline-block", fontSize: "15px", verticalAlign: "middle", cursor: "pointer" }}></div>
        )
    } else if (["yellow", "warning"].includes(props.variant)) {
        return (
            <div className="badge warning" style={{ margin: 5, display: "inline-block", fontSize: "15px", verticalAlign: "middle", cursor: "pointer" }}></div>
        )
    }

    return (
        <div className="badge" style={{ margin: 5, display: "inline-block", padding: 5, fontSize: "15px", verticalAlign: "middle", cursor: "pointer" }}></div>
    )
}