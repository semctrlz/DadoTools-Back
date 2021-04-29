import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO, format } from 'date-fns';
import Ticket from '../models/Ticket';
import TicketsFile from '../models/TicketsFile';
import TicketsFormatado from '../models/TicketsFormatado';
import User from '../models/User';
import File from '../models/File';
import TicketsUpdates from '../models/TicketsUpdates';
import TicketsUpdatesFormatados from '../models/TicketsUpdatesFormatados';
import TicketsUpdatesFile from '../models/TicketsUpdatesFile';
import Notification from '../schemas/Notification';
import Mail from '../../utils/Mailer';
import UserApp from '../models/UserApp';
import TicketsEncaminhados from '../models/TicketsEncaminhados';
import CategoriaTickets from '../models/CategoriaTickets';
import TicketCategoriaAutoEncs from '../models/TicketCategoriaAutoEncs';
import Upload from '../schemas/Upload';

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
        .max(50, 'Tamanho máximo para o campo: 20 caracteres.'),
      subcategoria: Yup.string('Formato inválido').max(
        50,
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
      anexo1: Yup.object(),
      anexo2: Yup.object(),
      anexo3: Yup.object(),
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
      link: `tickets?tela=inbox&id=${ticket.id}`,
      user: id_destinatario,
    });

    const userDest = await User.findByPk(id_destinatario);

    let priori = 'Normal';

    switch (prioridade) {
      case 'U':
        priori = 'Urgente';
        break;
      case 'B':
        priori = 'Baixa';
        break;
      case 'A':
        priori = 'Alta';
        break;
      default:
        priori = 'Normal';
        break;
    }

    Mail.sendMail({
      to: `${userDest.nome} <${userDest.email}>`,
      subject: 'Você recebeu um ticket',
      template: 'NewTicket',
      context: {
        nome: userDest.nome,
        titulo: assunto,
        body: texto,
        link: `${process.env.HOST}/tickets?tela=inbox&id=${ticket.id}`,
        categoria,
        subcategoria,
        prioridade: priori,
        prazo: prazo ? format(parseISO(prazo), 'dd/MM/YYY HH:mm') : 'sem prazo',
        criador: user.nome,
      },
    });

    const { id: id_ticket } = ticket;

    await TicketsFormatado.create({
      id_ticket,
      texto_json,
    });

    // Verificar encaminhamentos
    // Encaminharemos o ticket para todos os encaminhamentos na categoria
    // exceto para o remetente e destinatario do ticket
    const cat = await CategoriaTickets.findOne({
      where: { nome: categoria },
      include: [
        {
          model: TicketCategoriaAutoEncs,
          as: 'encaminhamentos',
          include: [
            {
              model: User,
              as: 'usuario_enc',
              attributes: [
                'id',
                'nome',
                'sobrenome',
                'email',
                'created_at',
                'updated_at',
              ],
            },
          ],
        },
      ],
    });

    if (cat.encaminhamentos) {
      if (cat.encaminhamentos.length > 0) {
        const encaminhar = cat.encaminhamentos.filter(enc => {
          return (
            enc.id_usuario !== req.idUsuario &&
            enc.id_usuario !== id_destinatario
          );
        });

        if (encaminhar.length > 0) {
          encaminhar.forEach(element => {
            TicketsEncaminhados.create({
              id_usuario: element.id_usuario,
              id_destinatario: req.idUsuario,
              id_ticket,
            });
            // Enviar email para cada pessoa que está em cópia
            Mail.sendMail({
              to: `${element.usuario_enc.nome} <${element.usuario_enc.email}>`,
              subject: 'Você está em cópia de um novo ticket',
              template: 'NewTicketEnc',
              context: {
                nome: userDest.nome,
                titulo: assunto,
                body: texto,
                link: `${process.env.HOST}/tickets?tela=encaminhados&id=${ticket.id}`,
                categoria,
                subcategoria,
                prioridade: priori,
                prazo: prazo
                  ? format(parseISO(prazo), 'dd/MM/YYY HH:mm')
                  : 'sem prazo',
                criador: user.nome,
              },
            });
          });
        }
      }
    }

    if (req.body.anexo1) {
      await TicketsFile.create({
        id_ticket,
        id_anexo: req.body.anexo1.idupload,
        nome: req.body.anexo1.nome,
        size: req.body.anexo1.tamanho,
        url: req.body.anexo1.url,
      });
    }
    if (req.body.anexo2) {
      await TicketsFile.create({
        id_ticket,
        id_anexo: req.body.anexo2.idupload,
        nome: req.body.anexo2.nome,
        size: req.body.anexo2.tamanho,
        url: req.body.anexo2.url,
      });
    }
    if (req.body.anexo3) {
      await TicketsFile.create({
        id_ticket,
        id_anexo: req.body.anexo3.idupload,
        nome: req.body.anexo3.nome,
        size: req.body.anexo3.tamanho,
        url: req.body.anexo3.url,
      });
    }

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

      await Mail.sendMail({
        to: `${nome} <${email}>`,
        subject: 'Novo acesso Dado Tools',
        template: 'newUser',
        context: {
          nome,
          link: `${process.env.HOST}`,
          email,
          senha: password,
        },
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
      prazo: Yup.date('Formato inválido'),
      id_ticket: Yup.number('Formato inválido').required(
        'O campo id_ticket é obrigatório'
      ),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });
    if (!(await schema.isValid(req.body))) {
      return res.json({ message: 'Validation fails', success: false });
    }

    // Verificar se o usuário é dono do ticket e se o mesmo encontra-se aberto

    const { id_ticket, prazo: prazoAlt = '' } = req.body;

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
      return res.json({
        message:
          'Impossível realizar esta operação. Verifique se o solicitante é o criador do ticket e se este ticket se encontra aberto (status = I)',
        success: false,
      });
    }

    const { prazo: prazoAnterior = '' } = ticket;

    await Ticket.update(
      {
        prazo: prazoAlt === '' ? null : prazoAlt,
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

    // Verificar se o prazo foi alterado, inserido ou removido

    let updateText = '';

    if (prazoAnterior === null && novoTicket.prazo !== null) {
      updateText = `${
        novoTicket.criador.nome
      } definiu o prazo deste tícket para ${format(
        novoTicket.prazo,
        'dd/MM/yyy'
      )}`;
    } else if (prazoAnterior !== null && novoTicket.prazo === null) {
      updateText = `${novoTicket.criador.nome} removeu o prazo deste ticket`;
    } else if (prazoAnterior !== novoTicket.prazo) {
      updateText = `${
        novoTicket.criador.nome
      } alterou o prazo deste ticket de ${format(
        prazoAnterior,
        'dd/MM/yyy'
      )} para ${format(novoTicket.prazo, 'dd/MM/yyy')}`;
    }

    if (updateText !== '') {
      await TicketsUpdates.create({
        id_usuario: req.idUsuario,
        id_ticket,
        texto: updateText,
      });
    }

    return res.json({ ticket: novoTicket, success: true });
  }

  async encaminharTicket(req, res) {
    const schema = Yup.object().shape({
      id_ticket: Yup.number('Formato inválido').required(
        'O campo prazo é obrigatório'
      ),

      email_destinatario: Yup.string('Formato inválido').required(
        'O campo id_ticket é obrigatório'
      ),
    });

    // const validate = await schema.validate(req.body, {
    //   abortEarly: false,
    // });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const ticket = await Ticket.findByPk(req.body.id_ticket);

    // Obter o id do destinatário
    const { id: idDestinatario = 0, nome, email } = await User.findOne({
      where: { email: req.body.email_destinatario },
    });

    // obter ticket
    if (!ticket || ticket.id_usuario === idDestinatario) {
      return res.json({ message: 'Erro ao encaminhar', success: false });
    }

    // Altera o destinatário do Ticket
    await ticket.update({
      id_destinatario: idDestinatario,
    });

    // Criar Update informando que houve o encaminhamento

    const texto = 'Ticket encaminhado para @nome - @email';
    const mensagem = texto.replace('@nome', nome).replace('@email', email);

    const ticketUpdate = await TicketsUpdates.create({
      id_usuario: req.idUsuario,
      id_ticket: ticket.id,
      texto: mensagem,
    });

    const msgFormatada =
      '{"blocks":[{"key":"374ql","text":"Ticket encaminhado para @nome - @email","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":23,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}';
    const mensagemFormatada = msgFormatada
      .replace('@nome', nome)
      .replace('@email', email);

    const { id: id_ticket_update } = ticketUpdate;

    await TicketsUpdatesFormatados.create({
      id_ticket_update,
      texto_json: mensagemFormatada,
    });

    if (idDestinatario === 0) {
      return res.json({ message: 'Erro ao encaminhar', success: false });
    }

    await TicketsEncaminhados.create({
      id_usuario: req.idUsuario,
      id_destinatario: idDestinatario,
      id_ticket: ticket.id,
    });

    return res.json({
      message: 'Ticket encaminhado com sucesso',
      success: true,
    });
  }

  async deletaAnexo(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.body;
    const id_usuario = req.idUsuario;
    const upload = await TicketsFile.findOne({ where: { id } });

    if (upload) {
      const ticket = await Ticket.findOne({
        where: { [Op.and]: [{ id: upload.id_ticket }, { id_usuario }] },
      });
      if (!ticket)
        return res
          .status(400)
          .json({ success: false, error: 'Erro ao deletar anexo' });
      try {
        const uploads3 = await Upload.findById(upload.id_anexo);
        if (uploads3) {
          await uploads3.remove();
        }

        upload.destroy();

        return res.json({ success: true });
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, error: 'Erro ao deletar anexo' });
      }
    }
    return res
      .status(400)
      .json({ success: false, error: 'Erro ao deletar anexo' });
  }
}

export default new TicketsController();
