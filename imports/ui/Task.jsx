import React from 'react';
import classnames from 'classnames';

export default Task = ({ task, onCheckboxClick, onDeleteClick }) => {
    const classes = classnames('task', {
        'checked': Boolean(task.isChecked)
    });

    return (
        <li className={ classes }>
            <button onClick={ () => onDeleteClick(task) }>&times;</button>
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