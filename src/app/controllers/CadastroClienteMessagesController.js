import * as Yup from 'yup';

import InfoCadastroClientes from '../models/InfoCadastroClientes';
import CadastrosClientes from '../models/CadastrosClientes';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

class CadastroClienteMessagesController{
  async store(req, res){
    const schema = Yup.object().shape({
      id_cadastro: Yup.number().required(),
      mensagem: Yup.string().max(255).required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const {id_cadastro, mensagem} = req.body;

    const retorno = await InfoCadastroClientes.create({
      id_usuario: req.idUsuario,
      id_cadastro,
      mensagem
    })

    const {id_usuario: donoCadastro, nome_fantasia, razao_social} = await CadastrosClientes.findByPk(id_cadastro);

    if(donoCadastro !== req.idUsuario){

      const mensagemNot = `Você recebeu uma mensagem no cadastro de ${nome_fantasia}`;
      const response = await Notification.create({
        content: mensagemNot,
        user: donoCadastro
      })

    }


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

    return res.json({
      mensagem:retorno,
      usuario
    })
  }
}
export default new CadastroClienteMessagesController();

