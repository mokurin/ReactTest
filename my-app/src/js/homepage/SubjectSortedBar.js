import React from 'react';
import styles from '../../css/Main.module.css'


//课程排序的课程元素
export default function SubjectSortedBar(props) {
    return (
        <>
            <div className={`${styles.draggableSubject} text-truncate`} draggable="true"
                id={props.id}
                onDragStart={(e) => {
                    e.dataTransfer.setData("Text", e.target.id);
                }}
                onDragOver={(e) => {
                    e.preventDefault()
                }}
                onDrop={(e) => {
                    let node = e.target;//目的地元素
                    //拖到字的情况
                    if (e.target.className === styles.smallSubjectTitle ||
                        e.target.className === styles.smallSubjectDot)
                        node = e.target.parentNode;

                    e.preventDefault()
                    let id = e.dataTransfer.getData('Text');
                    let pre = document.querySelector("#" + id);//拖动的元素
                    let table = document.querySelector("." + styles.myModalBodySorted);//整个表

                    // 目标元素
                    let rect = node.getBoundingClientRect()
                    let centerY = rect.y + rect.height / 2
                    //拖动元素
                    let mouseY = e.clientY

                    if (mouseY < centerY) {
                        table.insertBefore(pre, node)
                    } else {
                        table.insertBefore(pre, node.nextSibling)
                    }
                }
                }>
                <div className={`${styles.smallSubjectDot}`}></div>
                <div className={`${styles.smallSubjectTitle}`}>
                    {props.subjectName}
                </div>
            </div>
        </>
    )
}