const app = require('./app');
const port = 3000;
// const start = async () => {
try {
  app.listen(port, () => {
    console.log(
      `Server is connected succesfully and listening on port ${port}`
    );
  });
} catch (error) {
  console.log(error);
}
// };
// start();

// module.exports = start;
