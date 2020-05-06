import * as Yup from 'yup';
import { Op } from 'sequelize';

import Ticket from '../models/Ticket';
// import TicketsFile from '../models/TicketsFile';
import User from '../models/User';
import File from '../models/File';
import TicketsUpdates from '../models/TicketsUpdates';
import TicketsUpdatesFormatados from '../models/TicketsUpdatesFormatados';
import TicketsUpdatesFile from '../models/TicketsUpdatesFile';
import Notification from '../schemas/Notification';

class TicketUpdatesController {
  async index(req, res) {
    // Lista os tickets, anexos, texto formatado, criador e destinatário
    const schema = Yup.object().shape({
      id_ticket: Yup.number('Formato inválido').required(
        'O campo é obrigatório'
      ),
      id_update: Yup.number('Formato inválido'),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });
    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verificar se o usuario é destinatario ou remetente do ticket
    const { id_ticket, id_update } = req.query;
    const id_usuario = req.idUsuario;

    const ticket = await Ticket.findOne({
      where: {
        [Op.and]: [
          {
            id: id_ticket,
          },
          {
            [Op.or]: [
              {
                id_destinatario: id_usuario,
              },
              {
                id_usuario,
              },
            ],
          },
        ],
      },
    });

    if (ticket) {
      // Verificar se queremos um update específico ou todos
      if (id_update) {
        const update = await TicketsUpdates.findByPk(id_update, {
          include: [
            {
              model: User,
              as: 'criador_update',
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
            {
              model: TicketsUpdatesFormatados,
              as: 'update_formatado',
              required: false,
            },
            {
              model: TicketsUpdatesFile,
              as: 'anexos_update',
              required: false,
            },
          ],
        });
        return res.json(update);
      }

      const update = await TicketsUpdates.findAll({
        where: {
          id_ticket,
        },
        include: [
          {
            model: User,
            as: 'criador_update',
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
          {
            model: TicketsUpdatesFormatados,
            as: 'update_formatado',
            required: false,
          },
          {
            model: TicketsUpdatesFile,
            as: 'anexos_update',
            required: false,
          },
        ],
      });
      return res.json(update);
    }
    return res
      .status(401)
      .json({ error: 'VocÊ não tem permissão para acessar este update' });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id_ticket: Yup.number('Formato inválido').required(
        'O campo id_ticket é obrigatório'
      ),
      texto: Yup.string('Formato inválido')
        .max(1000, 'Tamanho máximo para o campo: 1000 caracteres')
        .required('O campo texto é obrigatório'),

      texto_json: Yup.string('Formato inválido').required(
        'O campo texto_json é obrigatório'
      ),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Insere o ticket e pega os dados

    const { id_ticket, texto, texto_json } = req.body;

    const id_usuario = req.idUsuario;

    const ticketUpdate = await TicketsUpdates.create({
      id_usuario,
      id_ticket,
      texto,
    });

    const { id: id_ticket_update } = ticketUpdate;

    await TicketsUpdatesFormatados.create({
      id_ticket_update,
      texto_json,
    });

    const update = await TicketsUpdates.findByPk(id_ticket_update, {
      include: [
        {
          model: User,
          as: 'criador_update',
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
        {
          model: TicketsUpdatesFormatados,
          as: 'update_formatado',
          required: false,
        },
      ],
    });

    const ticketBase = await Ticket.findByPk(id_ticket, {
      include: [
        {
          model: User,
          as: 'criador',
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
        {
          model: User,
          as: 'destinatario',
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

    const idUsuarioNot =
      req.idUsuario === ticketBase.criador.id
        ? ticketBase.destinatario.id
        : ticketBase.criador.id;

    const nomeUsuarioNot =
      req.idUsuario === ticketBase.criador.id
        ? ticketBase.destinatario.nome
        : ticketBase.criador.nome;

    const link =
      req.idUsuario === ticketBase.criador.id
        ? `tickets/inbox/${id_ticket}`
        : `tickets/enviados/${id_ticket}`;

    await Notification.create({
      content: `${nomeUsuarioNot} enviou uma atualização para o ticket #${id_ticket}. `,
      link,
      user: idUsuarioNot,
    });

    return res.json(update);
  }
}

export default new TicketUpdatesController();
