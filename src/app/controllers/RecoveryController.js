import * as Yup from 'yup';
import crypto from 'crypto';
import { Op } from 'sequelize';
import Recoverys from '../models/Recoverys';
import User from '../models/User';
import Mail from '../../utils/Mailer';

class RecoveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string('Formato inválido').required(
        'O campo E-mail é obrigatório'
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    // Verificar se o e-mail existe e retornar o id do dono desse email
    const { id: id_usuario, nome } = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const token = crypto
      .createHash('sha1')
      .update(req.body.email + String(new Date()))
      .digest('hex');

    if (id_usuario) {
      // desativa todos os tokens para o usuario
      await Recoverys.update(
        {
          ativo: false,
        },
        {
          where: {
            id_usuario,
          },
        }
      );

      // Cria um novo token
      await Recoverys.create({ id_usuario, token });

      await Mail.sendMail({
        to: `${nome} <${req.body.email}>`,
        subject: 'Recuperação de senha Dado Tools',
        template: 'recovery',
        context: {
          nome,
          token,
          site: process.env.HOST,
        },
      });
    }

    return res.json({ response: 'Solicitação processada com sucesso!' });
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      token: Yup.string('Formato inválido').required(
        'O campo E-mail é obrigatório'
      ),
    });

    if (!(await schema.isValid(req.params))) {
      return res.json({ sucesso: false });
    }

    // Buscar o token no banco para verificar se é válido
    const { token } = req.params;

    const data = new Date();

    const id_usuario = await Recoverys.findOne({
      where: {
        [Op.and]: [
          { token },
          { ativo: true },
          {
            created_at: {
              [Op.gte]: new Date(data - 10 * 60000),
            },
          },
        ],
      },
    });

    if (id_usuario) {
      return res.json({
        sucesso: true,
      });
    }
    return res.json({
      sucesso: false,
    });
  }

  async alterarSenha(req, res) {
    const schema = Yup.object().shape({
      token: Yup.string('Formato inválido').required(
        'O campo E-mail é obrigatório'
      ),
      password: Yup.string('Formato inválido').required(
        'O campo nova_senha é obrigatório'
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { token, password } = req.body;

    const data = new Date();

    const dadosToken = await Recoverys.findOne({
      where: {
        [Op.and]: [
          { token },
          { ativo: true },
          {
            created_at: {
              [Op.gte]: new Date(data - 10 * 60000),
            },
          },
        ],
      },
    });

    if (dadosToken) {
      const user = await User.findByPk(dadosToken.id_usuario);

      await user.update({ password });

      await Recoverys.update(
        {
          ativo: false,
        },
        { where: { id: dadosToken.id } }
      );
      return res.json({ sucesso: true });
    }

    return res.json({ sucesso: false });
  }
}

export default new RecoveryController();
