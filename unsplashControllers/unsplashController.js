const fs = require('fs');
const path = require('path');
const multer = require('multer');

const folderPath = '../Unsplash Api/folderPath';
// const folderPath = '../images';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'folderPath');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('THIS FILE IS NOT A PICTURE'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const getAllImages = async (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      res.status(400).json({
        message: 'There is an error in fetching images.',
      });
      console.log(err);
    } else {
      res.send(files);
    }
  });
};

// const getImage = async (req, res) => {
//   const filename = req.params.filename;
//   const filepath = path.join(folderPath, filename);

//   fs.readFile(filepath, (err, data) => {
//     if (err) {
//       console.log('There is an error in getting image', err);
//       res.send('There is an error in getting image');
//     } else if (!filepath) {
//       res.send('the image you searched for does not exist', 200);
//     }
//     res.writeHead(200, { 'Content-type': 'image/png' || 'image/jpg' });
//     res.end(data);
//   });
// };

// const getImage = async (req, res) => {
//   const filename = req.params.filename;
//   const filepath = path.join(__dirname, folderPath, filename);

//   fs.readFile(filepath, (err, data) => {
//     if (err) {
//       console.log('There is an error in getting image', err);
//       res.send('There is an error in getting image');
//     } else if (!data) {
//       res.send('The image you searched for does not exist');
//     } else {
//       const fileExtension = path.extname(filename).toLowerCase();
//       const contentType = getContentType(fileExtension);
//       res.writeHead(200, { 'Content-Type': contentType });
//       res.end(data);
//     }
//   });
// };

const getImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(folderPath, filename);
    // const filepath = path.join(__dirname, '..', folderPath, filename);

    fs.readFile(filepath, (err, data) => {
      if (err) {
        console.log('There is an error in getting the image:', err);
        res.status(400).send('There is an error in getting the image');
      } else if (!data) {
        res.send('The image you searched for does not exist');
      } else {
        const fileExtension = path.extname(filename).toLowerCase();
        const contentType = getContentType(fileExtension);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

function getContentType(extension) {
  switch (extension) {
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
}

const deleteImage = async (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(folderPath, filename);

  fs.unlink(filepath, (err) => {
    if (err) {
      console.log('Image cannot be deleted:', err);
      res.send(`Image cannot be deleted [${filepath}].`);
    }
    res.send(`Image deleted successfully [${filename}].`);
  });
};

const imageUploadMsg = async (req, res) => {
  try {
    res.status(200).json({
      msg: `Image has been uploaded successfully`,
    });
  } catch (error) {
    res.status(404).json({ msg: `Error in uploading Image` });
    console.log(error);
  }
};

// const imageUpload = async (req, res) => {
//   upload.single('image');
// };

const imageUpload = async (req, res) => {
  try {
    upload.single('image')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred during the upload process
        res.status(400).json({ msg: 'Error uploading image' });
      } else if (err) {
        // An unknown error occurred during the upload process
        res.status(500).json({ msg: 'Error uploading image' });
        console.log(err);
      } else {
        // File upload was successful
        res.status(200).json({ msg: 'Image uploaded successfully' });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error uploading image' });
    console.log(error);
  }
};

module.exports = {
  getAllImages,
  getImage,
  deleteImage,
  imageUploadMsg,
  imageUpload,
};
