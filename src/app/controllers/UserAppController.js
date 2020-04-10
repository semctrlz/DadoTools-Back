import * as Yup from 'yup';
import {Op} from 'sequelize'
import jwt from 'jsonwebtoken';

import {promisify} from 'util';

import App from '../models/App';
import UserApp from '../models/UserApp';

class UserAppController{
  async index(req, res){

    //Com o ID do usuário, listar os apps em que ele está

    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json ({error: 'token not provide.'});
    }

    const [, token] = authHeader.split(' ');

    try
    {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);



      const retorno = await UserApp.findAll({
        where:{
          id_usuario: decoded.id
        },attributes: ['is_admin'],
        include: [
          {
            model: App, as: 'Apps',
            attributes: ['rota', 'nome', 'descricao'],
            required: false
          }
        ]
      });


    return res.json(retorno);
  } catch(err){
    return res.status(401).json({error:'Invalid Token.'});
  }
}

  async store(req, res){
    const schema = Yup.object().shape({
      id_usuario: Yup.number().required(),
      id_app: Yup.number().required(),
      is_admin: Yup.boolean().default(false)
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json ({error: 'token not provide.'});
    }

    const [, token] = authHeader.split(' ');

    try
    {
      const decoded = await promisify(jwt.verify)(token, chaveToken.chave);

      // Verificar se o usuário que está fazendo a solicitação é admin do APP

      const userAdmin = await UserApp.findOne({
        where:
        {
          [Op.and]: [
            { id_usuario: decoded.id },
            { is_admin: true }
          ]
        }})


        if(!userAdmin){
          return res.status(401).json({error:'Você não tem permissão para cadastrar usuários.'});
        }



        //Verifica se o usuario já está cadastrado no sistema
        const userToAdd = await UserApp.findOne({
          where:
          {
            [Op.and]: [
              { id_usuario: req.body.id_usuario },
              { id_app: req.body.id_app }
            ]
          }})


          if(userToAdd && userToAdd.is_admin === req.body.is_admin)
          {
            return res.status(200).json({error:'Usuário Cadatrado.'});
          }

          if(!userToAdd){
            //Se não existir, cadastra

            //Verificar se o app e o usuarios são validos
            const existeUser = await UserApp.findOne(
              {
                where:
                {
                  id: req.body.id_usuario
                }
              }
            );

            if(!existeUser){
              return res.status(401).json({error:'Usuário informado não existe. Verifique.'});
            }

            const existeApp = await App.findOne(
              {
                where:
                {
                  id: req.body.id_app
                }
              });

              if(!existeApp){
                return res.status(401).json({error:'App informado não existe. Verifique.'});
              }

              const {id, id_usuario, id_app, is_admin} = UserApp.create(req.body);
              return res.json({
                id,
                id_usuario,
                id_app,
                is_admin
              });
          }
          else
          {
            //se existir altera administração
            const retorno = await UserApp.update(
              {
                is_admin: req.body.is_admin,
              },
              {
                where: {id_usuario: userToAdd.id}
              }

              );


              const {id_usuario,id_app, is_admin} = req.body;
            return res.json({
              id_usuario,
              id_app,
              is_admin
            });
          }
    }catch(err){
      console.log(err);
      return res.status(401).json({error:'Invalid Token.'});
    }

  }


}

export default new UserAppController();
