import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('Not Authorized.');
        }

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username
        });
    },

    'tasks.remove'(taskId) {
        check(taskId, String);

        const task = Tasks.findOne(taskdId);

        if (!this.userId || task.owner !== this.userId) {
            throw new Meteor.Error('Not Authorized.');
        }

        Tasks.remove(taskId);
    },

    'tasks.setChecked'(taskId, isChecked) {
        check(taskId, String);
        check(isChecked, Boolean);

        const task = Tasks.findOne(taskId);

        if (!this.userId || task.owner !== this.userId) {
            throw new Meteor.Error('Not Authorized.');
        }

        Tasks.update(taskId, {
            $set: {
                isChecked
            }
        });
    },

    'tasks.setPrivate'(taskId, isPrivate) {
        check(taskId, String);
        check(isPrivate, Boolean);

        const task = Tasks.findOne(taskId);

        if (!this.userId || task.owner !== this.userId) {
            throw new Meteor.Error('Not Authorized.');
        }

        Tasks.update(taskId, {
            $set: {
                isPrivate
            }
        });
    }
});

if (Meteor.isServer) {
    Meteor.publish('tasks', () => {
        return Tasks.find({
            $or: [
                { isPrivate: { $ne: true } },
                { owner: this.userId }
            ]
        });
    });
}
