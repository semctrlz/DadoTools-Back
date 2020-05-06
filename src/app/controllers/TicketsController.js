import * as Yup from 'yup';
import { Op } from 'sequelize';
import Ticket from '../models/Ticket';
import TicketsFile from '../models/TicketsFile';
import TicketsFormatado from '../models/TicketsFormatado';
import User from '../models/User';
import File from '../models/File';
import TicketsUpdates from '../models/TicketsUpdates';
import TicketsUpdatesFormatados from '../models/TicketsUpdatesFormatados';
import UserApp from '../models/UserApp';
import TicketsUpdatesFile from '../models/TicketsUpdatesFile';
import Notification from '../schemas/Notification';

class TicketsController {
  async index(req, res) {
    // Lista os tickets, anexos, texto formatado, criador e destinatário
    const tickets = await Ticket.findAll({
      order: [['createdAt', 'DESC']],
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
        {
          model: TicketsFormatado,
          as: 'formatado',
          required: false,
        },
        {
          model: TicketsFile,
          as: 'anexos',
          required: false,
        },
        {
          model: TicketsUpdates,
          order: [['createdAt', 'DESC']],
          as: 'updates',
          required: false,
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
        },
      ],
    });

    return res.json(tickets);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id_destinatario: Yup.number('Formato inválido').required(
        'O campo é obrigatório'
      ),
      categoria: Yup.string('Formato inválido')
        .required('Campo obrigatório')
        .max(20, 'Tamanho máximo para o campo: 20 caracteres.'),
      subcategoria: Yup.string('Formato inválido').max(
        20,
        'Tamanho máximo para o campo: 20 caracteres.'
      ),
      prioridade: Yup.string('Formato inválido')
        .max(1, 'Tamanho máximo para o campo: 1 caractere')
        .required('O campo é obrigatório'),
      assunto: Yup.string('Formato inválido')
        .max(64, 'Tamanho máximo para o campo: 64 caracteres')
        .required('O campo é obrigatório'),
      prazo: Yup.date('Formato inválido'),
      texto: Yup.string('Formato inválido')
        .max(1000, 'Tamanho máximo para o campo: 1000 caracteres')
        .required('O campo é obrigatório'),
      status: Yup.string('Formato inválido').max(
        1,
        'Tamanho máximo para o campo: 1 caractere'
      ),
      texto_json: Yup.string('Formato inválido').required(
        'O campo é obrigatório'
      ),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Insere o ticket e pega os dados

    const {
      id_destinatario,
      categoria,
      subcategoria,
      prioridade,
      assunto,
      prazo,
      texto,
      texto_json,
    } = req.body;

    const ticket = await Ticket.create({
      id_usuario: req.idUsuario,
      id_destinatario,
      categoria,
      subcategoria,
      prioridade,
      assunto,
      prazo,
      texto,
    });

    const user = await User.findByPk(req.idUsuario);

    await Notification.create({
      content: `Você recebeu um ticket de ${user.nome}. `,
      link: `tickets/inbox/${ticket.id}`,
      user: id_destinatario,
    });

    const { id: id_ticket } = ticket;

    await TicketsFormatado.create({
      id_ticket,
      texto_json,
    });

    return res.json(ticket);
  }

  async criaUsuario(req, res) {
    const nivelNecessario = 4;

    const schema = Yup.object().shape({
      email: Yup.string('Formato de Email inválido').required(
        'O campo Email é obrigatório'
      ),
      nome: Yup.string('Formato de Nome inválido').required(
        'O campo Nome é obrigatório'
      ),
      sobrenome: Yup.string('Formato de Nome inválido'),
      password: Yup.string('Formato de Senha inválido')
        .min(6, 'O tamanho mínimo para a senha é de 6 caracteres')
        .required('O campo senha é obrigatório'),
      nivel: Yup.number('O campo nivel está com formato inválido').required(
        'O campo nível é obrigatório'
      ),
      cargo: Yup.string('O campo cargo está com formato inválido'),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { nivel: userNivel } = await User.findByPk(req.idUsuario);

    if (userNivel < nivelNecessario) {
      return res
        .status(401)
        .json({ error: 'Você não tem acesso à criação de usuários' });
    }

    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const {
      nome,
      sobrenome = '',
      email,
      cargo = '',
      password,
      nivel,
    } = req.body;

    if (!user) {
      user = await User.create({
        nome,
        sobrenome,
        email,
        password,
        cargo,
      });
    }

    // Verificar  se o usuario já está no app tickets

    const userApp = await UserApp.findOne({
      where: {
        id_app: 2,
        id_usuario: user.id,
      },
    });

    if (!userApp) {
      await UserApp.create({
        id_usuario: user.id,
        id_app: 2,
        nivel,
      });
    } else {
      await UserApp.update(
        {
          nivel: req.body.nivel,
        },
        {
          where: {
            [Op.and]: [{ id_app: 2 }, { id_usuario: user.id }],
          },
        }
      );
    }

    return res.json({ message: 'Usuário criado com sucesso!' });
  }

  async alterarPrazo(req, res) {
    const schema = Yup.object().shape({
      prazo: Yup.date('Formato inválido').required(
        'O campo prazo é obrigatório'
      ),
      id_ticket: Yup.number('Formato inválido').required(
        'O campo id_ticket é obrigatório'
      ),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verificar se o usuário é dono do ticket e se o mesmo encontra-se aberto

    const { id_ticket, prazo } = req.body;

    const ticket = await Ticket.findOne({
      where: {
        [Op.and]: [
          { id_usuario: req.idUsuario },
          { id: id_ticket },
          { status: 'I' },
        ],
      },
    });

    if (!ticket) {
      return res.status(401).json({
        error:
          'Impossível realizar esta operação. Verifique se o solicitante é o criador do ticket e se este ticket se encontra aberto (status = I)',
      });
    }

    await Ticket.update(
      {
        prazo,
      },
      {
        where: {
          id: id_ticket,
        },
      }
    );

    const novoTicket = await Ticket.findByPk(id_ticket, {
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
        {
          model: TicketsFormatado,
          as: 'formatado',
          required: false,
        },
        {
          model: TicketsFile,
          as: 'anexos',
          required: false,
        },
        {
          model: TicketsUpdates,
          order: [['createdAt', 'DESC']],
          as: 'updates',
          required: true,
          separate: true,
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
        },
      ],
    });

    return res.json(novoTicket);
  }
}

export default new TicketsController();
