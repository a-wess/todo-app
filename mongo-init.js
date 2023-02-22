print('Start #################################################################');

db = db.getSiblingDB('todo_db');
db.createUser(
  {
    user: 'todo',
    pwd: 'todo',
    roles: [{ role: 'readWrite', db: 'todo_db' }],
  },
);
db.createCollection('users');
db.createCollection('tasks');
db.tasks.createIndex({ "text": "text" });
