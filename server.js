const mongoose = require('mongoose');
const dotenv = require('dotenv');

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

dotenv.config({ path: './config.env' });
const app = require('./app');

let DB_URL = process.env.DATABASE_LOCAL;

if (process.env.NODE_ENV === 'production') {
  DB_URL = process.env.DATABASE_PROD;
}

// const DB = process.env.DATABASE_CLUSTER.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_CLUSTER_PASSWORD
// )

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DATABASE_PROD)
  .then(() => console.log('\t🚀 DB connection successful!!🚀'))
  .catch(err => console.log(err));

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`  ################################################
       🛡️  Server listening on port: ${port} 🛡️
  🗎🗎  Docs available at http://localhost:${port}/swagger 🗎🗎
  ################################################`)

});

// process.on('unhandledRejection', err => {
//   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });