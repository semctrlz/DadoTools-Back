import * as Yup from 'yup';
import { Op } from 'sequelize';

import IsTicketAdmin from '../middlewares/AdminTickets';

import CategoriaTickets from '../models/CategoriaTickets';
import SubcategoriaTickets from '../models/SubcategoriaTickets';

class CategoriaTicketsController {
  async index(req, res) {
    const categorias = await CategoriaTickets.findAll({
      order: [['nome']],
      attributes: [
        'id',
        'nome',
        'descricao',
        'ativo',
        'created_at',
        'updated_at',
      ],
      where: { ativo: true },
      include: [
        {
          model: SubcategoriaTickets,
          as: 'subcategorias',
          order: [['nome']],
          attributes: [
            'id',
            'nome',
            'descricao',
            'ativo',
            'dias_prazo',
            'created_at',
            'updated_at',
          ],
          where: { ativo: true },
          separate: true,
          required: false,
        },
      ],
    });

    return res.json(categorias);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
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

    const nomeExiste = await CategoriaTickets.findOne({
      where: {
        nome: nomeNormal,
      },
    });

    req.body.nome = nomeNormal;

    if (nomeExiste) {
      return res.status(400).json({
        error: 'Já existe uma categoria com este nome. Verifique.',
      });
    }

    await CategoriaTickets.create(req.body);

    const categorias = await CategoriaTickets.findAll({
      order: [['nome']],
      attributes: [
        'id',
        'nome',
        'descricao',
        'ativo',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: SubcategoriaTickets,
          as: 'subcategorias',
          order: [['nome']],
          attributes: [
            'id',
            'nome',
            'descricao',
            'ativo',
            'dias_prazo',
            'created_at',
            'updated_at',
          ],
          separate: true,
          required: false,
        },
      ],
    });

    return res.json(categorias);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id_categoria: Yup.number().required(),
    });

    // const validate = await schema.validate(req.query, {
    //   abortEarly: false,
    // });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!IsTicketAdmin(req.idUsuario)) {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para essa operação.' });
    }

    await CategoriaTickets.destroy({
      where: {
        id: req.query.id_categoria,
      },
    });

    const categorias = await CategoriaTickets.findAll({
      order: [['nome']],
      attributes: [
        'id',
        'nome',
        'descricao',
        'ativo',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: SubcategoriaTickets,
          as: 'subcategorias',
          order: [['nome']],
          attributes: [
            'id',
            'nome',
            'descricao',
            'ativo',
            'dias_prazo',
            'created_at',
            'updated_at',
          ],
          separate: true,
          required: false,
        },
      ],
    });

    return res.json(categorias);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      nome: Yup.string().max(25).required(),
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
    const nomeExiste = await CategoriaTickets.findOne({
      where: {
        [Op.and]: [
          { nome: nomeNormal },
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

    await CategoriaTickets.update(
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

    const categorias = await CategoriaTickets.findAll({
      order: [['nome']],
      attributes: [
        'id',
        'nome',
        'descricao',
        'ativo',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: SubcategoriaTickets,
          as: 'subcategorias',
          order: [['nome']],
          attributes: [
            'id',
            'nome',
            'descricao',
            'ativo',
            'dias_prazo',
            'created_at',
            'updated_at',
          ],
          separate: true,
          required: false,
        },
      ],
    });

    return res.json(categorias);
  }
}

export default new CategoriaTicketsController();
