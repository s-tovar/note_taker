const express = require('express');
const fs = require('fs');
const path = require('path');
// const { v4: uuidv4 } = require('uuid'); this generates unique ids for notes?

const app = express();
const PORT = process.env.PORT || 3000;