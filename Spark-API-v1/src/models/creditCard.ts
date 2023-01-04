import database from '../db/db';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import { Response, NextFunction } from 'express';
import { CustomError } from '../middleware/errorHandler';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const creditCardModel = {};

export default creditCardModel;
