import React from 'react';
import Tr from './Tr';

const Table = ({tableData}) => {
    
    return (
            <table>
                {tableData.map((index) => (
                    <Tr tableData={tableData} rowData={index}/>
                ))}
            </table>
    );
}

export default Table;