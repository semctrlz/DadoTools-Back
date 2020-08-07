import * as Yup from 'yup';

import InfoCadastroClientes from '../models/InfoCadastroClientes';
import CadastrosClientes from '../models/CadastrosClientes';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';
import Utils from '../../utils/utils';
import Mail from '../../utils/Mailer';

class CadastroClienteMessagesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id_cadastro: Yup.number().required(),
      mensagem: Yup.string().max(255).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id_cadastro, mensagem } = req.body;

    const retorno = await InfoCadastroClientes.create({
      id_usuario: req.idUsuario,
      id_cadastro,
      mensagem,
    });

    const {
      id_usuario: donoCadastro,
      cnpj_cpf,
      nome_fantasia,
      razao_social,
      criadorCadastro,
    } = await CadastrosClientes.findByPk(id_cadastro, {
      include: [
        {
          model: User,
          as: 'criadorCadastro',
        },
      ],
    });

    const usuario = await User.findByPk(req.idUsuario, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
      attributes: ['nome', 'cargo'],
    });

    if (donoCadastro !== req.idUsuario) {
      const mensagemNot = `Você recebeu uma mensagem no cadastro de ${nome_fantasia}`;
      Notification.create({
        content: mensagemNot,
        user: donoCadastro,
      });

      Mail.sendMail({
        to: `${criadorCadastro.nome} <${criadorCadastro.email}>`,
        subject: 'Você recebeu um ticket',
        template: 'NovaMensagemCadastro',
        context: {
          nome: criadorCadastro.nome,
          criador: usuario.nome,
          body: mensagem,
          razao: razao_social,
          link: `${process.env.HOST}/cadastros/view/${id_cadastro}`,
          cnpj: Utils.FormatCnpjCpf(cnpj_cpf),
        },
      });
    }

    return res.json({
      mensagem: retorno,
      usuario,
    });
  }
}
export default new CadastroClienteMessagesController();
