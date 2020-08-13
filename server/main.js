import { Meteor } from 'meteor/meteor';
import '/imports/api/tasks';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername('admin')) {
    Accounts.createUser({
      username: 'admin',
      password: 'admin'
    });
  }
});
