import database from '../db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import { Response, NextFunction } from 'express';
import { CustomError } from '../middleware/errorHandler';
import { v4 as uuid } from 'uuid';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

// generate a unique API key
const apiKey = uuid();
// save the API key to the .env file
require('dotenv').config({ path: '.env', env: { API_KEY: apiKey } });

const apiKeyModel = {};

export default apiKeyModel;
