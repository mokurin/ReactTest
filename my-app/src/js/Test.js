import React, { useState } from 'react';

const Test = () => {
    // 设置一个state属性content，初始值是字符串‘初始状态’
    // 初始值其实可以是任意类型的变量，包括字符串、boolean、列表、字典对象等等
    const [content, setContent] = useState('初始状态')
    return (
        <div onClick={() => {
            content === '初始状态' ? setContent('新的状态') : setContent('初始状态')
        }}>
            {content}
        </div>
    )
}
export default Test;