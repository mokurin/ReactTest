import React, { useState } from 'react';

import styles from '../css/HomeworkPreview.module.css'

const WorkPreviewNav = (props) => {

    return (<>
        <div className={`${styles.workPreviewNav}`}>
            <div>

            </div>
        </div>
    </>)
}

export default function HomeworkPreview() {
    return (<>
        <div className={`${styles.HomeworkPreview}`}>
            <WorkPreviewNav />
        </div>
    </>)
}