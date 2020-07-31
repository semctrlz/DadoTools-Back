import * as Yup from 'yup';
import { Op } from 'sequelize';
import CadastrosClientes from '../models/CadastrosClientes';
import InfoCadastroClientes from '../models/InfoCadastroClientes';
import SintegraConsultas from '../models/SintegraConsultas';
import UserApp from '../models/UserApp';
import CadastrosDadosConsolidados from '../models/CadastrosDadosConsolidados';
import User from '../models/User';
import File from '../models/File';

class GerenciarCadastroController {
  async index(req, res) {
    // Listar os cadastros que ainda não foram finalizados

    const dados = await CadastrosClientes.findAll({
      where: {
        status: {
          [Op.or]: ['A', 'P'],
        },
      },
      include: [
        {
          model: User,
          as: 'criadorCadastro',
        },
        {
          model: InfoCadastroClientes,
          as: 'messages',
          include: [
            {
              model: User,
              as: 'dadosUsuario',
              include: [
                {
                  model: File,
                  as: 'avatar',
                },
              ],
            },
          ],
        },
        {
          model: SintegraConsultas,
          as: 'constultaSintegra',
        },
        {
          model: CadastrosDadosConsolidados,
          as: 'dadosConsolidados',
        },
      ],
    });

    res.json(dados);
  }

  async salvaConsolidado(req, res) {
    const schema = Yup.object().shape({
      id_cadastro: Yup.number().required(),
      dados: Yup.string().required(),
      status: Yup.string().required(),
    });

    const userApp = await UserApp.findOne({
      where: {
        id_app: 1,
        id_usuario: req.idUsuario,
      },
    });

    if (userApp.nivel === undefined || userApp.nivel <= 3) {
      return res
        .status(400)
        .json({ error: 'Sem permissão para salvar este registro.' });
    }

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Insira um indíce válido para consultar.' });
    }
    const { id_cadastro, dados, status } = req.body;

    const existente = await CadastrosDadosConsolidados.findOne({
      where: { id_cadastro },
    });

    // Alterar o Status do pedido para A

    await CadastrosClientes.update(
      {
        status,
      },
      {
        where: {
          id: id_cadastro,
        },
      }
    );

    if (existente) {
      await existente.update({ dados });
    } else {
      await CadastrosDadosConsolidados.create({
        id_cadastro,
        dados,
      });
    }

    const cadastro = await CadastrosClientes.findByPk(id_cadastro, {
      include: [
        {
          model: User,
          as: 'criadorCadastro',
        },
        {
          model: InfoCadastroClientes,
          as: 'messages',
          include: [
            {
              model: User,
              as: 'dadosUsuario',
              include: [
                {
                  model: File,
                  as: 'avatar',
                },
              ],
            },
          ],
        },
        {
          model: SintegraConsultas,
          as: 'constultaSintegra',
        },
        {
          model: CadastrosDadosConsolidados,
          as: 'dadosConsolidados',
        },
      ],
    });

    return res.json(cadastro);
  }

  async Exportar(req, res) {
    const schema = Yup.object().shape({
      ids: Yup.array().required(),
    });

    const userApp = await UserApp.findOne({
      where: {
        id_app: 1,
        id_usuario: req.idUsuario,
      },
    });

    if (userApp.nivel === undefined || userApp.nivel <= 3) {
      return res
        .status(400)
        .json({ error: 'Sem permissão para salvar este registro.' });
    }

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Insira um indíce válido para consultar.' });
    }

    const { ids } = req.body;

    await CadastrosClientes.update(
      {
        status: 'E',
      },
      {
        where: {
          id: ids,
        },
      }
    );

    const dados = await CadastrosClientes.findAll({
      where: {
        status: {
          [Op.or]: ['A', 'P'],
        },
      },
      include: [
        {
          model: User,
          as: 'criadorCadastro',
        },
        {
          model: InfoCadastroClientes,
          as: 'messages',
          include: [
            {
              model: User,
              as: 'dadosUsuario',
              include: [
                {
                  model: File,
                  as: 'avatar',
                },
              ],
            },
          ],
        },
        {
          model: SintegraConsultas,
          as: 'constultaSintegra',
        },
        {
          model: CadastrosDadosConsolidados,
          as: 'dadosConsolidados',
        },
      ],
    });

    return res.json(dados);
  }
}

export default new GerenciarCadastroController();
