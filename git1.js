const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;

const upload = multer({ dest: 'uploads/' });

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Parse urlencoded form data
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', upload.single('profilePic'), (req, res) => {
  // Log data
  console.log('--- Form Submission ---');
  console.log(req.body);
  if (req.file) {
    console.log('Profile Pic:', req.file.originalname, req.file.path);
  }

  // Render submitted details page
  res.render('details', {
    data: req.body,
    file: req.file ? req.file.filename : null,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
