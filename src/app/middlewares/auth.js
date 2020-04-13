import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import {Op} from 'sequelize'
import User from '../models/User';


export default async (req, res, next)=>{
  const authHeader = req.headers.authorization;


  if(!authHeader){
    return res.status(401).json ({error: 'token not provide.'});
  }

  const [, token] = authHeader.split(' ');
  try
  {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);
    req.idUsuario = decoded.id;
    return next();           
  }
  catch(err)
  {
    return res.status(401).json({error:'Invalid Token.'});
  }

};
