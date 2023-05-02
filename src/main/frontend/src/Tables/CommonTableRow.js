import React from 'react';

const CommonTableRow = ({ children }) => {
    const movePage= ()=>{
        document.location.href="/pages/OtherPage2";
    }
    return (
        <tr className="common-table-row" onClick={movePage}>
            {
                children
            }
        </tr>
    )
}

export default CommonTableRow;