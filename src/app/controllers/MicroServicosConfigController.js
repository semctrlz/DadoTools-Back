/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { Op } from 'sequelize';
import AcessoMicroservicos from '../models/AcessoMicroservicos';
import ConfigsMicroservicos from '../models/ConfigsMicroservicos';

import UserApp from '../models/UserApp';
import App from '../models/App';

class MicroServicoConfigController {
  async index(req, res) {
    const schema = Yup.object().shape({
      microservico: Yup.string('Formato inválido')
        .required('Campo obrigatório')
        .max(20, 'Tamanho máximo para o campo: 20 caracteres.'),
      config: Yup.string('Formato inválido').max(20),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { microservico, config = null } = req.query;

    const acesso = await AcessoMicroservicos.findOne({
      where: { id_usuario: req.idUsuario },
    });

    const { acessos_obj } = acesso;

    if (!acessos_obj.find(acess => acess.microservico === microservico))
      return res.status(401).json({ error: 'Acesso não permitido' });

    if (config) {
      const configs = await ConfigsMicroservicos.findAll({
        where: {
          [Op.and]: [{ microservico }, { config }],
        },
        order: [['createdAt', 'DESC']],
        limit: 1,
      });
      return res.json(configs);
    }
    const configs = await ConfigsMicroservicos.findAll({
      where: { microservico },
      order: [['createdAt', 'DESC']],
      limit: 1,
    });
    return res.json(configs);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      config: Yup.string('Formato inválido')
        .required('Campo obrigatório')
        .max(20, 'Tamanho máximo para o campo: 20 caracteres.'),
      microservico: Yup.string('Formato inválido')
        .required('Campo obrigatório')
        .max(20, 'Tamanho máximo para o campo: 20 caracteres.'),
      json: Yup.string().required(),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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

    const nivelMinimo = 3;

    const { config, microservico, json } = req.body;
    const { idUsuario: id_usuario } = req;
    const acesso = await AcessoMicroservicos.findOne({
      where: { id_usuario },
    });

    const { acessos_obj } = acesso;

    if (!acessos_obj.find(acess => acess.microservico === microservico))
      return res.status(401).json({ error: 'Acesso não permitido' });

    if (acessos_obj.nivel < nivelMinimo)
      return res.status(401).json({ error: 'Acesso não permitido' });

    const config_salva = await ConfigsMicroservicos.create({
      microservico,
      config,
      json,
      created_by: id_usuario,
    });

    return res.json(config_salva);
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

export default new MicroServicoConfigController();
