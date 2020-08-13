import React from 'react';
import classnames from 'classnames';
import { Tasks } from '../api/tasks';

export default Task = ({ task, onCheckboxClick, onDeleteClick, onTogglePrivateClick }) => {
    const classes = classnames('task', {
        'checked': Boolean(task.isChecked)
    });

    return (
        <li className={ classes }>
            <button onClick={ () => onDeleteClick(task) }>&times;</button>
            <button onClick={ () => onTogglePrivateClick(task) }>{ task.isPrivate ? 'Private' : 'Public' }</button>
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