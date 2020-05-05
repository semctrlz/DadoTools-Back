import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      sobrenome: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      codigo_cigam: Yup.string().max(6),
      cargo: Yup.string().max(20),
      is_sales: Yup.number().max(1),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({
        error: 'Usuário já existe.',
      });
    }

    const {
      id,
      nome,
      sobrenome,
      email,
      codigo_cigam,
      is_sales,
      cargo,
    } = await User.create(req.body);
    return res.json({
      id,
      nome,
      sobrenome,
      email,
      codigo_cigam,
      is_sales,
      cargo,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      nome: Yup.string(),
      sobrenome: Yup.string(),
      password: Yup.string().min(6),
      codigo_cigam: Yup.string().max(6),
      is_sales: Yup.boolean(),
      cargo: Yup.string(),
      adm: Yup.boolean().default(false),
      oldPassword: Yup.string().when('password', (password, field) =>
        password ? field.required() : field
      ),
      confirmPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password
            ? field
                .required()
                .min(6)
                .oneOf([Yup.ref('password')])
            : field
        ),
    });

    /*
        const validate = await schema.validate(req.body, {
          abortEarly: false,
        });
    console.log(validate)
    */

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const {
      nome,
      sobrenome,
      email,
      codigo_cigam,
      is_sales,
      is_adm,
      oldPassword,
    } = req.body;

    const user = await User.findByPk(req.idUsuario);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(401).json({
          error: 'Já existe um usuário com o e-mail informado.',
        });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha inválida!' });
    }

    // Caso o usuário esteja tentando passar o valor de adm como verdadeiro, precisa ser adm
    if (is_adm) {
      try {
        const { is_adm: isAdmin } = await User.findByPk(req.idUsuario);

        if (!isAdmin) {
          req.body.is_adm = false;
        }
      } catch (err) {
        req.body.is_adm = false;
      }
    }

    const { id: user_id } = await user.update(req.body);

    const { id, cargo, avatar } = await User.findByPk(user_id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    const { is_adm: isAdm } = req.body;

    return res.json({
      id,
      nome,
      sobrenome,
      email,
      codigo_cigam,
      is_sales,
      is_adm: isAdm,
      cargo,
      avatar,
    });
  }
}

export default new UserController();
