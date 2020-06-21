import React from 'react';
import Td from './Td';

const Tr = ({ tableData, rowData }) => {
    return (
        <>
            <tr>
                {tableData.map(() => (
                    <Td tableData={tableData} />
                ))}
            </tr>
        </>

    );
}

export default Tr;