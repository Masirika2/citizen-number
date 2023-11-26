const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb+srv://masirika:goma2023.com@cluster0.hqy9pky.mongodb.net/ID_GEN?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const YourModel = require('./models');

// Display stored IDs and form in a tabular view
app.get('/', async (req, res) => {
  const ids = await YourModel.find();

  // Render the 'index' template with the data
  res.render('index', { ids });
});

app.get('/display-ids', async (req, res) => {
  const ids = await YourModel.find();

  // Render the 'display-ids' template with the data
  res.render('display-ids', { ids });
});

// Generate ID, store in the database, and redirect to the home page
app.post('/generate-id', async (req, res) => {
  const { gender } = req.body;
  const generatedId = generateId(gender);

  // Store the generated ID in MongoDB
  const document = new YourModel({ generatedId });
  try {
    await document.save();
    console.log('Generated ID and saved in the database:', generatedId); // Add this line for debugging
  } catch (error) {
    console.error('Error saving ID:', error.message);
  }

  // Redirect to the home page to show both the form and stored IDs
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function generateId(gender) {
  const currentYear = new Date().getFullYear();
  const genderPrefix = gender === 'Male' ? 'M' : 'F';
  const uniqueNumerals = generateUniqueNumerals();

  // Modified: Include a random year between 2023 and 2030
  const randomYear = Math.floor(Math.random() * (2030 - 2023 + 1)) + 2023;

  return `${randomYear}/${genderPrefix}/${uniqueNumerals}`;
}

function generateUniqueNumerals() {
  return Math.floor(100000 + Math.random() * 900000);
}
