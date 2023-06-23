import React from 'react';
import styles from '../../css/Main.module.css'


//课程排序的课程元素
export default function SubjectSortedBar(props) {
    const { noArchivedSub, setNoArchivedSub } = props;
    const index = Number(props.id.substring(5));

    return (
        <>
            <div className={`${styles.draggableSubject} text-truncate`} draggable="true"
                id={props.id}
                onDragStart={(e) => {
                    e.dataTransfer.setData("Index", Number(e.target.id.substring(5)));
                }}
                onDragOver={(e) => {
                    e.preventDefault()
                }}
                onDrop={(e) => {
                    e.preventDefault()

                    //获取拖动元素和目标元素的index值
                    let preIndex = e.dataTransfer.getData('Index');
                    let nodeIndex = index;

                    //进行交换
                    let newArray = [...noArchivedSub];
                    let temp = newArray[preIndex];
                    newArray[preIndex] = newArray[nodeIndex];
                    newArray[nodeIndex] = temp;
                    //更新noArchivedSub数组
                    setNoArchivedSub(newArray);
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