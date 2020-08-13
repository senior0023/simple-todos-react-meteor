import React from 'react';

export default Task = ({ task, onCheckboxClick }) => {
    return (
        <li>
            <input
                type="checkbox"
                checked={ Boolean(task.isChecked) }
                onClick={ () => onCheckboxClick(task) }
                readOnly
            />
            <span>{ task.text }</span>
        </li>
    );
};