import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import {promisify} from 'util';

import User from '../models/User';
import File from '../models/File';
import chaveToken from '../../credentials/Jwt';

class SessionController{
  async store(req, res){
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const {email, password} = req.body;

    const user = await User.findOne({
      where:{email},
        include: [
          {
            model: File, as: 'avatar',
            attributes: ['id','nome','path','url'],
          }
        ]
    });

    const error = 'Combinação de usuário/senha inválida. Por favor, verifique.';

    if(!user){
      return res.status(401).json({error});
    }

    if(!(await user.checkPassword(password)))
    {
      return res.status(401).json({error});
    }

    const {id, nome, sobrenome, codigo_cigam, is_sales, cargo, is_adm, avatar} = user;

    return res.json({
      user:{
        id,
        nome,
        sobrenome,
        email,
        codigo_cigam,
        is_sales,
        cargo,
        is_adm,
        avatar

      },
      token: jwt.sign({ id }, chaveToken.chave, {
       expiresIn: chaveToken.expiresIn,
    }),
  });
  }

  async verify(req, res){
    const authHeader = req.headers.authorization;
    if(!authHeader){
      return res.status(401).json ({error: 'token not provide.'});
    }

    const [, token] = authHeader.split(' ');
    try
    {
      const decoded = await promisify(jwt.verify)(token, chaveToken.chave);
      req.idUsuario = decoded.id;
      res.status(200).json({message: "Valid Token"});

    }
    catch(err)
    {
      return res.status(401).json({error:'Invalid Token.'});
    }
  }
}

export default new SessionController();
