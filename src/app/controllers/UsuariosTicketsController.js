// import * as Yup from 'yup';
import User from '../models/User';
import UserApp from '../models/UserApp';
import App from '../models/App';

class UsuariosTicketsController {
  async index(req, res) {
    const retorno = await User.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email'],
      include: [
        {
          model: UserApp,
          as: 'userApp',
          attributes: ['nivel'],
          where: { id_app: 2 },
          include: [
            {
              model: App,
              as: 'Apps',
              attributes: ['rota', 'nome', 'descricao'],
              required: false,
            },
          ],
        },
      ],
    });

    return res.json(retorno);
  }

  // const validate = await schema.validate(req.query, {
  //   abortEarly: false,
  // });
}

export default new UsuariosTicketsController();
