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
  // If the Links collection is empty, add some data.
  /*
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
    });

    insertLink({
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com'
    });

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com'
    });

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com'
    });
  }
  */
  if (TasksCollection.find().count() === 0) {
    sample_tasks.forEach(insertTask);
  }
});
