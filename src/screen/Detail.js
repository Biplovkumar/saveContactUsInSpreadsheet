import React from "react";
import { useLocation } from "react-router-dom";

function Detail() {
    let location = useLocation();

    const { name } = location.state

    console.log('name', name);
    return <div>detail</div>;
}

export default Detail;