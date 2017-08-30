import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import factory from './helpers/auth.helper';
import db from '../models';

const expect = chai.expect;
const request = supertest(app);

let token, wrongUser, userParams;

