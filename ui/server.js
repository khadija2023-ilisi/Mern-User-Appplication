const express = require('express');
const app = express();
const connectDb = require('./src/connection');
const User = require('./src/User.model');
const cors = require('cors');

app.use(cors());