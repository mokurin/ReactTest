import React, { useState } from 'react';

import { Send } from './Connect';

const Test = () => {
    function handleClick() {
        const msg = {
            api: "echo",
            content: '我的回显数据'
        }
        Send(msg, (msg) => {
            const node = document.querySelector('#content');
            if (msg.status) {
                node.innerHTML = msg.content;
            } else node.innerHTML = msg.err_code;
        })
    }

    return (
        <>
            <button onClick={handleClick} className="btn btn-secondary" type="button">
                Test
            </button>
            <span id='content'>
            </span>
        </>
    )
}
export default Test;