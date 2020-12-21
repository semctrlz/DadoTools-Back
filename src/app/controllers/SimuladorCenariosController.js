import * as Yup from 'yup';
import { Op } from 'sequelize';
import Cenarios from '../models/SimuladorCenarios';
import User from '../models/User';

class SimuladorCenariosController {
  // Comuns
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      ano: Yup.number().integer().min(2021).max(2030).required(),
      mes: Yup.number().integer().min(1).max(12).required(),
      desc_conced: Yup.number().required(),
      marketing: Yup.number().required(),
      json: Yup.string().required(),
      publico: Yup.boolean(),
      somente_leitura: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ message: 'Validation fails', success: false });
    }

    const {
      json,
      publico = true,
      somente_leitura = false,
      nome,
      ano,
      mes,
      desc_conced,
      marketing,
    } = req.body;

    // Verificar se existe o nome inserido com o ano

    const nomeTratado = nome.trim();

    const cenarioExistente = await Cenarios.findAll({
      where: { nome: nomeTratado, ano },
    });

    if (cenarioExistente.length > 0) {
      return res.json({
        message: 'Já existe um cenário com este nome',
        success: false,
      });
    }

    const id_usuario = req.idUsuario;

    const usuarios = await User.findOne({ where: { id: id_usuario } });

    // Como é uma criação do cenário, criar somente a entrada de criação
    const historico_updates = [
      {
        data: new Date(),
        id_usuario,
        nome: usuarios.nome,
        sobrenome: usuarios.sobrenome,
        email: usuarios.email,
        tipo: 'Criação',
      },
    ];

    const cenario = await Cenarios.create({
      id_usuario,
      ano,
      mes,
      desc_conced,
      marketing,
      nome: nomeTratado,
      publico,
      somente_leitura,
      json: JSON.stringify(json),
      historico_updates: JSON.stringify(historico_updates),
    });

    return res.json({ cenario, success: true });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ message: 'Validation fails', success: false });
    }
    const { id } = req.body;
    const id_usuario = req.idUsuario;
    // VErificar se o usuário é dono do cenário
    const cenario = await Cenarios.findOne({ where: { id } });

    if (cenario) {
      if (cenario.id_usuario === id_usuario) {
        await cenario.destroy();
        return res.json({
          success: true,
          message: 'Cenário Excluído com sucesso',
        });
      }
    }

    return res.json({ success: false, message: 'Erro ao excluir cenário' });
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number(),
      nome: Yup.string(),
      ano: Yup.number().when('nome', (nome, field) =>
        nome ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.query))) {
      return res
        .status(400)
        .json({ message: 'Validation fails', success: false });
    }

    // verificar se a consulta é por id, nome e ano ou total
    const { id = 0, nome = '', ano = 0 } = req.query;
    const id_usuario = req.idUsuario;
    // caso o ID tenha sindo informado buscamos os dados através dele
    if (id > 0) {
      const cenario = await Cenarios.findOne({
        where: {
          [Op.and]: [{ id }, { [Op.or]: [{ id_usuario }, { publico: true }] }],
        },
        include: [
          {
            model: User,
            as: 'cenarios_user',
            attributes: ['nome', 'sobrenome', 'email', 'cargo'],
          },
        ],
      });
      return res.json({ cenario, success: true });
    }
    if (ano !== 0 && nome !== '') {
      // Encontra o cenario que tenha o ano e nome igual ao informado
      const cenario = await Cenarios.findOne({
        where: {
          [Op.and]: [
            { ano },
            { nome },
            { [Op.or]: [{ id_usuario }, { publico: true }] },
          ],
        },
        include: [
          {
            model: User,
            as: 'cenarios_user',
            attributes: ['nome', 'sobrenome', 'email', 'cargo'],
          },
        ],
      });
      return res.json({ cenario, success: true });
    }
    if (ano === 0) {
      return res.json({
        message:
          'Informe o ID do cenário, ano e nome ou somente o ano para consultar',
      });
    }

    const cenario = await Cenarios.findAll({
      where: {
        [Op.and]: [{ ano }, { [Op.or]: [{ id_usuario }, { publico: true }] }],
      },
      include: [
        {
          model: User,
          as: 'cenarios_user',
          attributes: ['nome', 'sobrenome', 'email', 'cargo'],
        },
      ],
    });
    return res.json({ cenario, success: true });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      nome: Yup.string().required(),
      json: Yup.string().required(),
      mes: Yup.number().integer().min(1).max(12).required(),
      desc_conced: Yup.number().required(),
      marketing: Yup.number().required(),
      publico: Yup.boolean(),
      somente_leitura: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, {
        abortEarly: false,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'erro de validação',
        errors: error.inner,
      });
    }

    const id_usuario = req.idUsuario;

    const {
      id,
      nome,
      json,
      publico,
      somente_leitura,
      mes,
      marketing,
      desc_conced,
    } = req.body;

    const CenarioEdicao = await Cenarios.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'cenarios_user',
          attributes: ['nome', 'sobrenome', 'email', 'cargo'],
        },
      ],
    });

    if (!CenarioEdicao) {
      return res.json({
        message: 'Cenário inválido.',
        success: false,
      });
    }

    if (
      (CenarioEdicao.somente_leitura || !CenarioEdicao.publico) &&
      CenarioEdicao.id_usuario !== id_usuario
    ) {
      return res.json({
        message: 'Você não pode alterar este cenário',
        success: false,
      });
    }

    // Verificar se o cenario alterou o nome
    const nomeTratado = nome.trim();

    const cenariosExist = await Cenarios.findAll({
      where: {
        [Op.and]: [
          { nome: nomeTratado },
          { ano: CenarioEdicao.ano },
          { [Op.not]: { id } },
        ],
      },
    });

    if (cenariosExist.length > 0) {
      return res.json({
        message:
          'Já existe um cenário com este nome para este ano, selecione outro nome.',
        success: false,
      });
    }

    const alteracoesAnteriores = JSON.parse(CenarioEdicao.historico_updates);

    // Cria o objeto de alteração atual
    const historico_updates = [
      ...alteracoesAnteriores,
      {
        data: new Date(),
        id_usuario,
        nome: CenarioEdicao.cenarios_user.nome,
        sobrenome: CenarioEdicao.cenarios_user.sobrenome,
        email: CenarioEdicao.cenarios_user.email,
        tipo: 'Alteração',
      },
    ];

    await CenarioEdicao.update({
      nome:
        CenarioEdicao.id_usuario !== id_usuario
          ? CenarioEdicao.nome
          : nomeTratado,
      publico:
        CenarioEdicao.id_usuario !== id_usuario
          ? CenarioEdicao.publico
          : publico,
      somente_leitura:
        CenarioEdicao.id_usuario !== id_usuario
          ? CenarioEdicao.somente_leitura
          : somente_leitura,
      json: JSON.stringify(json),
      mes: CenarioEdicao.id_usuario !== id_usuario ? CenarioEdicao.mes : mes,
      marketing:
        CenarioEdicao.id_usuario !== id_usuario
          ? CenarioEdicao.marketing
          : marketing,
      desc_conced:
        CenarioEdicao.id_usuario !== id_usuario
          ? CenarioEdicao.desc_conced
          : desc_conced,
      historico_updates: JSON.stringify(historico_updates),
    });

    return res.json({ success: true, cenario: CenarioEdicao });
  }
}

export default new SimuladorCenariosController();
