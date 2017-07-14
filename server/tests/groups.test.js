import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from '../../app';
import { loginUser } from './helpers/user.helper';
import { groupDetails, updateInfo, noGrpName } from './helpers/group.helper';

const server = supertest.agent(app);
