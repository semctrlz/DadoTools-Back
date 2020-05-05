import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email, is_ativo: true },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'nome', 'path', 'url'],
        },
      ],
    });

    const error =
      'Combinação de usuário/senha inválida ou usuário inativo. Por favor, verifique.';

    if (!user) {
      return res.status(401).json({ error });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error });
    }

    const {
      id,
      nome,
      sobrenome,
      codigo_cigam,
      is_sales,
      cargo,
      is_adm,
      avatar,
    } = user;

    return res.json({
      user: {
        id,
        nome,
        sobrenome,
        email,
        codigo_cigam,
        is_sales,
        cargo,
        is_adm,
        avatar,
      },
      token: jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
      }),
    });
  }

  async verify(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'token not provide.' });
    }

    const [, token] = authHeader.split(' ');

    if (token === process.env.HASH_MASTER) {
      return res.status(200).json({ message: 'Valid Token' });
    }
    try {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);
      req.idUsuario = decoded.id;

      return res.status(200).json({ message: 'Valid Token' });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: 'Invalid Token.' });
    }
  }
}

export default new SessionController();
