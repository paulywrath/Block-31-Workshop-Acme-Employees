const client = require('./client.cjs');
const createEmployee = require('./employees.cjs')

const dropTables = async() => {
  try {
    await client.query(`DROP TABLE IF EXISTS employees;`);
  } catch(e) {
    console.log(e);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR (50) NOT NULL,
        is_admin BOOLEAN NOT NULL
      );  
    `);
  } catch(e) {
    console.log(e);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log(`connected`);

  await dropTables();
  console.log(`dropped table`);

  await createTables();
  console.log(`created table`);

  await createEmployee(`Charlie`, false);
  console.log(`created employee`);

  await createEmployee(`Maury`, true);
  console.log(`created employee`);

  await client.end();
  console.log(`disconnected`);
}

syncAndSeed();