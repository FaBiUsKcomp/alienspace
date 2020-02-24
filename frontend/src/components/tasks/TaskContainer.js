import React from 'react'

export default props => 
    <div className={props.mt ? `taskContainer ${props.mt}` : `taskContainer`}>
        {props.children}
    </div>