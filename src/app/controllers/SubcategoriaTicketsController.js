import * as Yup from 'yup';
import { Op } from 'sequelize';

import IsTicketAdmin from '../middlewares/AdminTickets';

import SubcategoriaTickets from '../models/SubcategoriaTickets';

class SubcategoriaTicketsController {
  async index(req, res) {
    const schema = Yup.object().shape({
      categoria: Yup.number().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const subCategorias = await SubcategoriaTickets.findAll({
      order: [['nome']],
      where: {
        id_categoria: req.query.categoria,
      },
      attributes: [
        'id',
        'nome',
        'descricao',
        'ativo',
        'created_at',
        'updated_at',
      ],
    });

    return res.json(subCategorias);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id_categoria: Yup.number().required(),
      nome: Yup.string().max(64).required(),
      descricao: Yup.string().max(255),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!IsTicketAdmin(req.idUsuario)) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para essa operação.' });
    }

    const nomeNormal = String(req.body.nome).toLowerCase().trim();

    const nomeExiste = await SubcategoriaTickets.findOne({
      where: {
        [Op.and]: [
          { nome: nomeNormal },
          { id_categoria: req.body.id_categoria },
        ],
      },
    });

    req.body.nome = nomeNormal;

    if (nomeExiste) {
      return res.status(400).json({
        error:
          'Já existe uma subcategoria com este nome dentro desta categoria. Verifique.',
      });
    }

    const subcategoria = await SubcategoriaTickets.create(req.body);

    return res.json(subcategoria);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id_subcategoria: Yup.number().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!IsTicketAdmin(req.idUsuario)) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para essa operação.' });
    }

    await SubcategoriaTickets.destroy({
      where: {
        id: req.query.id_subcategoria,
      },
    });
    return res.json({ message: 'Subcategoria deletada com sucesso!' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      nome: Yup.string().max(64).required(),
      descricao: Yup.string(255),
      ativo: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!IsTicketAdmin(req.idUsuario)) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para essa operação.' });
    }

    const nomeNormal = String(req.body.nome).toLowerCase().trim();

    const { id_categoria } = await SubcategoriaTickets.findByPk(req.body.id);

    const nomeExiste = await SubcategoriaTickets.findOne({
      where: {
        [Op.and]: [
          { nome: nomeNormal },
          { id_categoria },
          {
            [Op.not]: [{ id: req.body.id }],
          },
        ],
      },
    });

    req.body.nome = nomeNormal;

    if (nomeExiste) {
      return res.status(400).json({
        error: 'Já existe uma categoria com este nome. Verifique.',
      });
    }

    await SubcategoriaTickets.update(
      {
        nome: req.body.nome,
        descricao: req.body.descricao,
        ativo:
          req.body.ativo !== null
            ? req.body.ativo
            : schema.fields.ativo.default(),
      },
      {
        where: { id: req.body.id },
      }
    );

    const novos_dados = await SubcategoriaTickets.findByPk(req.body.id);

    return res.json(novos_dados);
  }
}

export default new SubcategoriaTicketsController();
