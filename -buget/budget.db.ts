import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./budget.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    db.run('CREATE TABLE IF NOT EXISTS budgets (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, amount REAL)');
  }
});

export default db;
