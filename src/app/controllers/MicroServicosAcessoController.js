/* eslint-disable no-unused-vars */

import * as Yup from 'yup';
import { Op } from 'sequelize';
import AcessoMicroservicos from '../models/AcessoMicroservicos';

import User from '../models/User';
import File from '../models/File';
import UserApp from '../models/UserApp';
import App from '../models/App';

class TicketsController {
  async index(req, res) {
    // Lista os acessos que o usuário tem acesso bem como o nível de cada
    const [acessos] = await AcessoMicroservicos.findAll({
      where: { id_usuario: req.idUsuario },
      order: [['createdAt', 'DESC']],
      limit: 1,
      include: [
        {
          model: User,
          as: 'acesso_ms_user',
          required: false,
          attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'nome', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(acessos || {});
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id_usuario: Yup.number('Formato inválido').required(
        'O campo id_usuário é obrigatório'
      ),
      grupo: Yup.string('Formato inválido')
        .required('Campo obrigatório')
        .max(20, 'Tamanho máximo para o campo: 20 caracteres.'),
      microservico: Yup.string('Formato inválido')
        .required('Campo obrigatório')
        .max(20, 'Tamanho máximo para o campo: 20 caracteres.'),
      nivel: Yup.number('Formato inválido').required('Campo nivel obrigatório'),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id_usuario, microservico, nivel, grupo } = req.body;

    let nivelApp = nivel;
    if (nivelApp > 5) nivelApp = 5;
    if (nivelApp < 0) nivelApp = 0;

    // Verifica o nivel do app do usuário

    const { id: id_app } = await App.findOne({
      where: { rota: 'microservicos' },
    });

    const adminApp = await UserApp.findOne({
      where: {
        [Op.and]: [
          { id_usuario: req.idUsuario },
          { id_app },
          { nivel: { [Op.gte]: 4 } },
        ],
      },
    });

    if (!adminApp)
      return res
        .status(401)
        .json({ message: 'Você não tem acesso para acessar esta função' });

    // Obtem os acessos que o usuário já tem

    const acessos = await AcessoMicroservicos.findOne({
      where: { id_usuario },
    });

    let acessos_atuais = [];

    if (acessos) {
      acessos_atuais = JSON.parse(acessos.acessos).filter(
        ms => ms.microservico !== microservico
      );
    }

    if (nivelApp > 0)
      acessos_atuais.push({
        microservico,
        grupo,
        nivel: nivelApp,
      });

    if (acessos) {
      await AcessoMicroservicos.update(
        {
          acessos: JSON.stringify(acessos_atuais),
        },
        { where: { id: acessos.id } }
      );
      const acessos_novos = await AcessoMicroservicos.findOne({
        where: { id_usuario },
      });
      return res.json(acessos_novos);
    }
    if (nivelApp > 0) {
      const acessos_cadastro = await AcessoMicroservicos.create({
        id_usuario,
        acessos: JSON.stringify(acessos_atuais),
      });
      return res.json(acessos_cadastro);
    }
    return res.json({});
  }

  async deletaAnexo(req, res) {
    // const schema = Yup.object().shape({
    //   id: Yup.number().required(),
    // });
    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Validation fails' });
    // }
    // const { id } = req.body;
    // const id_usuario = req.idUsuario;
    // const upload = await TicketsFile.findOne({ where: { id } });
    // if (upload) {
    //   const ticket = await Ticket.findOne({
    //     where: { [Op.and]: [{ id: upload.id_ticket }, { id_usuario }] },
    //   });
    //   if (!ticket)
    //     return res
    //       .status(400)
    //       .json({ success: false, error: 'Erro ao deletar anexo' });
    //   try {
    //     const uploads3 = await Upload.findById(upload.id_anexo);
    //     if (uploads3) {
    //       await uploads3.remove();
    //     }
    //     upload.destroy();
    //     return res.json({ success: true });
    //   } catch (err) {
    //     return res
    //       .status(400)
    //       .json({ success: false, error: 'Erro ao deletar anexo' });
    //   }
    // }
    // return res
    //   .status(400)
    //   .json({ success: false, error: 'Erro ao deletar anexo' });
  }
}

export default new TicketsController();
