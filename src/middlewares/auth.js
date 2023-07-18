import jwt from 'jsonwebtoken';
import { userModel } from '../daos/mongodb/models/UsersModels.js';
import config from '../../config.js';

const PRIVATE_KEY = config.PRIVATE_KEY;

export const generateToken = (user) => {
  
  const payload = {
    userId: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age,
    cart: user.cart
  };
  
  const token = jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: '20m',    
  });
  return token;
};

export const checkAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  // console.log('authHeader------------------', authHeader);
  if (!authHeader) return res.status(401).json({ msg: 'Unauthorized' });

  try {
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(
      token,
      PRIVATE_KEY
    );
    console.log('TOKEN DECODIFICADO');
    console.log(decode);
    const user = await userModel.findById(decode.userId);

    if (!user) return res.status(400).json({ msg: 'Unauthorized' });
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: 'Unauthorized' });
  }
};

