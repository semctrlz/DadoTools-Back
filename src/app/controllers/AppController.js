import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import {promisify} from 'util';

import App from '../models/App';
import UserApp from '../models/UserApp';
import {Op} from 'sequelize'


class AppController{
  async index(req, res){

    const apps = await App.findAll({});

    return res.json(apps);
  }

  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().max(25).required(),
      descricao: Yup.string(255).required(),
      rota: Yup.string().min(3).max(15).required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const rotaExiste = await App.findOne({
      where:
      {
        [Op.or]: [{nome: req.body.nome}, {rota: req.body.rota}]
      }})

    if(rotaExiste){
      return res.status(400).json({
        error: "Impossível criar esta rota. O nome da rota e o caminho da rota devem ser únicos.",
      });
    }

    const {id, nome, descricao, rota} = await App.create(req.body);

    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json ({error: 'token not provide.'});
    }

    const [, token] = authHeader.split(' ');


    try{
      //Colocar usuario atual como admin
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);

      await UserApp.create({
        id_usuario: decoded.id,
        id_app: id,
        is_admin: true
      })

      return res.json({
        id,
        nome,
        descricao,
        rota
      });
    }catch(err){

    }
  }

  async delete(req, res){
    const schema = Yup.object().shape({
      id_app: Yup.number().required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json ({error: 'token not provide.'});
    }

    const [, token] = authHeader.split(' ');


    try{
      const decoded = await promisify(jwt.verify)(token, chaveToken.chave);


      const adminApp = await UserApp.findOne({
        where: {
          [Op.and]: [
            { id_usuario: decoded.id },
            { id_app: req.body.id_app},
            { is_admin: true}
          ]
        }
      });


      if(!adminApp){
        return res.status(401).json({message: "Você precisa de acesso de administrador para deletar um APP."});
      }

      App.destroy({
        where: {
          id: req.body.id_app
        }
      });
      res.json({message: "App deletado com sucesso!"});
    }catch(err){
      console.log(err)
      res.status(401).json({message: "Erro ao excluir App. Verifique os dados informados e tente novamente."});
    }

  }

  async update(req, res){
    const schema = Yup.object().shape({
      id_app: Yup.number().required(),
      nome: Yup.string().max(25).required(),
      descricao: Yup.string(255).required(),
      rota: Yup.string().min(3).max(15).required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json ({error: 'token not provide.'});
    }

    const [, token] = authHeader.split(' ');


    try{
      const decoded = await promisify(jwt.verify)(token, chaveToken.chave);


      const adminApp = await UserApp.findOne({
        where: {
          [Op.and]: [
            { id_usuario: decoded.id },
            { id_app: req.body.id_app},
            { is_admin: true}
          ]
        }
      });


      if(!adminApp){
        return res.status(401).json({message: "Você precisa de acesso de administrador para alterar um APP."});
      }


      const retorno = await App.update(
        {
          nome: req.body.nome,
          descricao: req.body.descricao,
          rota: req.body.rota
        },
        {
          where: {id: req.body.id_app}
        }
      );

      res.json({
        id: req.body.id_app,
        nome: req.body.nome,
        descricao: req.body.descricao,
        rota: req.body.rota
      });
    }catch(err){
      console.log(err)
      res.status(401).json({message: "Erro ao alterar App. Verifique os dados informados e tente novamente."});
    }

  }
}

export default new AppController();
