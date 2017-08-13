/* eslint import/no-unresolved: 0 */
import jwt from 'jsonwebtoken';
import db from '../models';
import * as dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
//const secretKey = 'louisdante9'
const Authenticate = {
  /**
   * Verify auth middleware
   *
   * @param {Object} req request object payload
   * @param {Object} res response object
   * @param {Function} next callback function
   */
  verifyToken(req, res, next) {
    // console.log(secretKey);
    const token = req.headers.authorization || req.headers['x-access-token'];

    if (!token) {
      return res.status(401).send({ message: 'Unauthorized Access' });
    }

    jwt.verify(token, secretKey, (err, result) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.decoded = result;
      next();
    });
  },
}
export default Authenticate;