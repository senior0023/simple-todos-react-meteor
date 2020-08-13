import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import Task from './Task';
import TasksCollection from '/imports/api/tasks';
import { TaskForm } from './TaskForm';

const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

const deleteTask = ({ _id }) => TasksCollection.remove(_id);

export const App = () => {
  const filter = {};

  const [hideCompleted, setHideCompleted] = useState(false);

  if (hideCompleted) {
    _.set(filter, 'isChecked', { $ne: true });
  }

  const { tasks, incompleteTasksCount } = useTracker(() => ({
    tasks: TasksCollection.find(filter, { sort: { createdAt: -1 } }).fetch(),
    incompleteTasksCount: TasksCollection.find({ isChecked: { $ne: true }}).count()
  }));

  return (
    <div className="simple-todos-react">
      <h1>Todo List ({ incompleteTasksCount })</h1>

      <div className="filters">
        <label>
          <input
            type="checkbox"
            readOnly
            checked={ Boolean(hideCompleted) }
            onClick={ () => setHideCompleted(!hideCompleted) }
            />
            Hide Completed
        </label>
      </div>

      <ul className="tasks">
        { 
          tasks.map(task => 
            <Task 
              key={ task._id } 
              task={ task } 
              onCheckboxClick={ toggleChecked }
              onDeleteClick={ deleteTask }
            />) }
      </ul>
      
      <TaskForm/>
    </div>
  );
};
