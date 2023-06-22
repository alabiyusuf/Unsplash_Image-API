const express = require('express');
const app = express();
const router = require('./unsplashRoutes/unsplashRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/imageUploader', router);

const port = 3000;
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is connected and listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
