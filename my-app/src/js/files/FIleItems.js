import React from 'react';
//组件
import File from './MiniMap'
//图标
import icon_word from '../../img/file-earmark-word.svg'
import icon_PDF from '../../img/file-earmark-pdf.svg'
import icon_excel from '../../img/file-earmark-excel.svg'
import icon_file from '../../img/file.svg'

const icons = {
    'doc': icon_word,
    'docx': icon_word,
    'pdf': icon_PDF,
    'xlsx': icon_excel,
    'xls': icon_excel
}


export default function FileItems(props) {
    const { filePaths } = props;

    //获取归档课程的组件列表
    const getFileItems = () => {
        let items = filePaths.map(
            (filePath, index) => {
                const filename = filePath.split('~')[1];
                const fileType = filename.split('.')[filename.split('.').length - 1];
                let icon = (fileType in icons) ? icons[fileType] : icon_file;
                return <File filePath={filePath} filename={filename} icon={icon} key={index} id={`subject${props.index}-${index}`} parentIndex={props.index} index={index} />;
            }
        )
        return items;
    }

    return (
        getFileItems()
    );
}

