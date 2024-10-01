// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { connect } = require('./Database_mongoose.js');
const authMiddleware = require('./middleware/auth');
const accountController = require('./controllers/accountController');
const User = require('./models/user.js');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


// Initialize authentication middleware
authMiddleware();

// Connect to MongoDB
connect()
  .then((connectedClient) => {
    client = connectedClient;
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the application if the database connection fails
  });

// Passport initialization
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
app.use(passport.initialize());

// Routes
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => { res.send('Introduction JWT Auth') });
app.get('/api/profile', passport.authenticate('jwt', { session: false }), accountController.profile);
app.post('/api/login', passport.authenticate('local', { session: false }), accountController.login);
app.post('/api/register', accountController.register);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
