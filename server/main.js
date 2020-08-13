import { Meteor } from 'meteor/meteor';
// import { LinksCollection } from '/imports/api/links';
import TasksCollection from '/imports/api/tasks';

// function insertLink({ title, url }) {
//   LinksCollection.insert({title, url, createdAt: new Date()});
// }

const sample_tasks = [
  'First Task',
  'Second Task',
  'Third Task',
  'Fourth Task',
  'Fifth Task',
  'Sixth Task',
  'Seventh Task'
];

function insertTask(task) {
  console.log(task);
  TasksCollection.insert({ text: task, isChecked: false, createdAt: new Date() });
}

Meteor.startup(() => {
  if (!Accounts.findUserByUsername('admin')) {
    Accounts.createUser({
      username: 'admin',
      password: 'admin'
    });
  }
  // If the Tasks collection is empty, add some data.
  if (TasksCollection.find().count() === 0) {
    sample_tasks.forEach(insertTask);
  }
});
