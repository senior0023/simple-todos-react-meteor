import React from 'react';
import Task from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import TasksCollection from '/imports/api/tasks';
import { TaskForm } from './TaskForm';

const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

export const App = () => {

  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <ul>
        { tasks.map(task => <Task key={ task._id } task={ task } onCheckboxClick={ toggleChecked }/>) }
      </ul>
      
      <TaskForm/>
    </div>
  );
};
