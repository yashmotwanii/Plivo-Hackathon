const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3011;

mongoose.connect('mongodb://localhost:27017/event_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// const bulkReminderSchema = new mongoose.Schema({
//   phoneNumbers: [String],
//   description: String,
//   date: String,
//   time: String,
//   countryCode: String,
//   image: String
// });

const reminderSchema = new mongoose.Schema({
  phoneNumber: String,
  description: String,
  date: String,
  time: String,
  countryCode: String,
  image: String
});

// const userSchema = new mongoose.Schema({
//   countryCode: {
//     type: String,
//     required: true,
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });
// const User = mongoose.model('User', userSchema);
// const BulkReminder = mongoose.model('BulkReminder', bulkReminderSchema);

const Reminder = mongoose.model('Reminder', reminderSchema);
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// app.post('/bulk', async (req, res) => {
//   const formData = req.body;

//   try {
//     const newBulkReminder = new BulkReminder(formData);
//     await newBulkReminder.save();

//     console.log('Data saved to MongoDB:', newBulkReminder);

//     res.status(200).json({ message: 'Data received and saved successfully' });
//   } catch (error) {
//     console.error('Error saving data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.post('/api', async (req, res) => {
  const formData = req.body;

  try {
    const newReminder = new Reminder(formData);
    await newReminder.save();

    console.log('Data saved to MongoDB:', newReminder);

    res.status(200).json({ message: 'Data received and saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/login', async (req, res) => {
  const { countryCode, phoneNumber, password } = req.body;
  if (password === 'yash12345') {
  console.log(`Input received from frontend: ${JSON.stringify(req.body)}`);

  // Check if the provided password is the specific value you want
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/signup', async(req, res) => {
  const { countryCode, phoneNumber, password } = req.body;

  console.log(`Input stored successfully for signup: ${JSON.stringify(req.body)}`);

  res.status(200).json({ message: 'Input received successfully' });
});
// app.post('/signup', async (req, res) => {
//   const { countryCode, phoneNumber, password, confirmPassword } = req.body;

//   // Create a new User document
//   const newUser = new User({
//     countryCode,
//     phoneNumber,
//     password
//   });

//   try {
//     // Save the user to the database
//     await newUser.save();
//     console.log('User registered:', newUser);
//     res.status(200).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});