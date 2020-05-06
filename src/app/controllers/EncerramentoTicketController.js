import * as Yup from 'yup';
import { Op } from 'sequelize';

import EncerramentoTicket from '../models/EncerramentoTicket';
import Ticket from '../models/Ticket';
import TicketsUpdates from '../models/TicketsUpdates';
import TicketsUpdatesFormatados from '../models/TicketsUpdatesFormatados';
import User from '../models/User';
import File from '../models/File';
import AvaliacaoTicket from '../models/AvaliacaoTicket';
import Notification from '../schemas/Notification';

class TicketUpdatesController {
  async index(req, res) {
    // Lista os tickets, anexos, texto formatado, criador e destinatário
    const schema = Yup.object().shape({
      id_ticket: Yup.number('Formato inválido').required(
        'O campo é obrigatório'
      ),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });
    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verificar se o usuario é destinatario ou remetente do ticket
    const { id_ticket } = req.query;
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

      const encerramentos = await Ticket.findByPk(id_ticket, {
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
            model: EncerramentoTicket,
            as: 'encerramentos',
            required: false,
          },
        ],
      });
      return res.json(encerramentos);
    }
    return res
      .status(401)
      .json({ error: 'VocÊ não tem permissão para acessar este ticket' });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id_ticket: Yup.number('Formato inválido').required(
        'O campo id_ticket é obrigatório'
      ),
      texto: Yup.string('Formato inválido').max(
        1000,
        'Tamanho máximo para o campo: 1000 caracteres'
      ),
      avaliacao: Yup.number().min(0).max(5),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Insere o ticket e pega os dados
    const { avaliacao = 0, id_ticket, texto = '' } = req.body;

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
      // Usuário é o criador
      let status = '';

      const mensagemFormatada_C =
        '{"blocks":[{"key":"374ql","text":"ENCERRAMENTO: @mensagem","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}';
      const mensagemFormatada_D =
        '{"blocks":[{"key":"br3sr","text":"SOLICITAÇÃO DE ENCERRAMENTO: @mensagem","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":28,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}';

      let mensagem = '';

      if (ticket.id_usuario === id_usuario) {
        status = 'F';
        mensagem = mensagemFormatada_C.replace('@mensagem', texto);
      } else {
        status = 'S';
        mensagem = mensagemFormatada_D.replace('@mensagem', texto);
      }
      // Criar um update com a mensagem
      const ticketUpdate = await TicketsUpdates.create({
        id_usuario,
        id_ticket,
        texto,
      });

      const { id: id_ticket_update } = ticketUpdate;

      await TicketsUpdatesFormatados.create({
        id_ticket_update,
        texto_json: mensagem,
      });

      await EncerramentoTicket.create({
        id_usuario,
        id_ticket,
        texto,
      });

      // Alterar o status do ticket para E = Encerrado

      await Ticket.update({ status }, { where: { id: id_ticket } });

      if (ticket.id_usuario === id_usuario && avaliacao > 0) {
        const avaliacaoExistente = await AvaliacaoTicket.findOne({
          where: {
            id_ticket,
          },
        });
        if (avaliacaoExistente) {
          AvaliacaoTicket.update(
            {
              id_usuario,
              nota: avaliacao,
            },
            {
              where: {
                id_ticket,
              },
            }
          );
        } else {
          await AvaliacaoTicket.create({
            id_usuario,
            id_ticket,
            nota: avaliacao,
          });
        }
      } else if (ticket.id_usuario === id_usuario && avaliacao === 0) {
        await AvaliacaoTicket.destroy({
          where: {
            id_ticket,
          },
        });
      }

      const user = await User.findByPk(id_usuario);

      if (ticket.id_usuario === id_usuario) {
        // Mensagem para o Destinatario do ticket informando que o criador o fechou
        await Notification.create({
          content: `${user.nome} finalizou o ticket #${id_ticket}. `,
          link: `tickets/concluidos/${ticket.id}`,
          user: ticket.id_destinatario,
        });
      } else {
        // Mensagem para o criador do ticket informando que o destinatário encerrou
        await Notification.create({
          content: `${user.nome} encerrou o ticket #${id_ticket}. `,
          link: `tickets/concluidos/${ticket.id}`,
          user: ticket.id_usuario,
        });
      }

      return res.json({ message: 'Solicitação enviada com sucesso!' });
    }

    // Usuário é o destinatário

    return res
      .status(401)
      .json({ error: 'VocÊ não tem permissão para acessar este ticket' });
  }
}

export default new TicketUpdatesController();
