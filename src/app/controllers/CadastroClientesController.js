/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Op } from 'sequelize';
import * as Yup from 'yup';
import { differenceInBusinessDays, parseISO } from 'date-fns';
import Sintegra from '../../utils/Sintegra';

import CadastroClientes from '../models/CadastrosClientes';
import User from '../models/User';
import CigamCadastroStatus from '../models/CigamCadastroStatus';
import InfoCadastroClientes from '../models/InfoCadastroClientes';
import CadastrosFile from '../models/CadastrosFile';
import userAppsHelper from './Helpers/UserApps';

const aws = require('aws-sdk');

const s3 = new aws.S3();

class CadastroClientesController {
  async index(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    let idEmpresa = req.params.id;

    if (!(await schema.isValid(req.params))) {
      idEmpresa = 0;
    }

    if (idEmpresa === 0) {
      const cadastros = await CadastroClientes.findAll({
        where: {
          id_usuario: req.idUsuario,
        },
        include: [
          {
            model: CigamCadastroStatus,
            as: 'status_cigam',
          },
          {
            model: CadastrosFile,
            as: 'anexos',
          },
        ],
      });
      return res.json(cadastros);
    }

    const cadastros = await CadastroClientes.findOne({
      where: { id: idEmpresa },
      include: [
        {
          model: CadastrosFile,
          as: 'anexos',
        },
      ],
    });
    return res.json(cadastros);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      cnpj_cpf: Yup.string()
        .required()
        .when('pessoa_juridica', (pessoa_juridica, field) =>
          pessoa_juridica === true ? field.length(14) : field.length(11)
        ),
      pessoa_juridica: Yup.boolean().required(),
      data_nascimento: Yup.string().when(
        'pessoa_juridica',
        (pessoa_juridica, field) =>
          !pessoa_juridica ? field.required() : field
      ),
      nome_fantasia: Yup.string().required().max(20),
      razao_social: Yup.string().required().max(60),
      cep: Yup.string().length(8).required(),
      logradouro: Yup.string().max(40),
      numero: Yup.string().max(10).required(),
      complemento: Yup.string().max(25),
      bairro: Yup.string().max(20),
      municipio: Yup.string().max(30),
      estado: Yup.string().max(2),
      pais: Yup.string().max(10),
      fone_principal: Yup.string().max(15).required(),
      email_xml: Yup.string().max(65).required(),
      fone_comprador: Yup.string().max(15),
      email_comprador: Yup.string().max(65),
      nome_comprador: Yup.string().max(65),
      fone_financeiro: Yup.string().max(15),
      email_financeiro: Yup.string().max(65),
      fone_fiscal: Yup.string().max(15),
      email_fiscal: Yup.string().max(65),
      rota: Yup.string().max(2).required(),
      segmento: Yup.string(),
      atividade: Yup.string(),
      tabela: Yup.string(),
      forma_pagto: Yup.string().max(3).required(),
      cond_pagto: Yup.string().max(3).required(),
      status: Yup.string().default('P'),
      valor_primeira_compra: Yup.string(),
      obs_vendedor: Yup.string().max(255),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const cnpjExiste = await CadastroClientes.findOne({
      where: {
        cnpj_cpf: req.body.cnpj_cpf,
      },
    });

    if (cnpjExiste) {
      return res.status(400).json({
        error:
          'Já existe solicitação de cadastro para esta empresa / pessoa. Verifique com o setor de cadastro.',
      });
    }

    try {
      // Convert o valor primeira compra para numero

      if (req.body.valor_primeira_compra === '') {
        req.body.valor_primeira_compra = '0';
      }

      if (req.body.data_nascimento === '') {
        req.body.data_nascimento = new Date();
      }

      req.body.valor_primeira_compra = parseFloat(
        req.body.valor_primeira_compra
      );

      const data = { ...req.body, ...{ id_usuario: req.idUsuario } };

      const resultado = await CadastroClientes.create(data);

      // No caso de ter anexos, inserir o id do cadastro criado nos ids de anexo informados
      const { uploads = '' } = req.body;

      if (uploads !== '') {
        const idUploads = uploads.split(',');
        for (const idUpload of idUploads) {
          const idCadastro = Number(idUpload);
          if (!isNaN(idCadastro)) {
            const cadastroUpload = await CadastrosFile.findOne({
              where: { id: Number(idUpload) },
            });
            cadastroUpload.id_cadastro_clientes = resultado.id;
            await cadastroUpload.save();
          }
        }
      }

      const { pessoa_juridica, cnpj_cpf, data_nascimento = '' } = req.body;

      if (pessoa_juridica) {
        Sintegra.Consulta(resultado.id, cnpj_cpf);
      } else {
        Sintegra.Consulta(resultado.id, cnpj_cpf, data_nascimento);
      }

      return res.json(resultado);
    } catch (err) {
      return res.status(401).json({
        message: `Erro ao cadastrar cliente. Verifique os dados informados e tente novamente. Erro: ${err}`,
      });
    }
  }

  async delete(req, res) {
    res.json({ message: 'A implementar' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      cnpj_cpf: Yup.string()
        .required()
        .when('pessoa_juridica', (pessoa_juridica, field) =>
          pessoa_juridica === true ? field.length(14) : field.length(11)
        ),
      pessoa_juridica: Yup.boolean().required(),
      data_nascimento: Yup.string().when(
        'pessoa_juridica',
        (pessoa_juridica, field) =>
          !pessoa_juridica ? field.required() : field
      ),
      nome_fantasia: Yup.string().required().max(20),
      razao_social: Yup.string().required().max(60),
      cep: Yup.string().length(8).required(),
      logradouro: Yup.string().max(40),
      numero: Yup.string().max(10).required(),
      complemento: Yup.string().max(25),
      bairro: Yup.string().max(20),
      municipio: Yup.string().max(30),
      estado: Yup.string().max(2),
      pais: Yup.string().max(10),
      fone_principal: Yup.string().max(15).required(),
      email_xml: Yup.string().max(65).required(),
      fone_comprador: Yup.string().max(15),
      email_comprador: Yup.string().max(65),
      nome_comprador: Yup.string().max(65),
      fone_financeiro: Yup.string().max(15),
      email_financeiro: Yup.string().max(65),
      fone_fiscal: Yup.string().max(15),
      email_fiscal: Yup.string().max(65),
      rota: Yup.string().max(2).required(),
      segmento: Yup.string(),
      atividade: Yup.string(),
      tabela: Yup.string(),
      forma_pagto: Yup.string().max(3).required(),
      cond_pagto: Yup.string().max(3).required(),
      status: Yup.string().default('P'),
      valor_primeira_compra: Yup.number(),
      obs_vendedor: Yup.string().max(255),
      id: Yup.number().required(),
      id_usuario: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (req.body.id_usuario !== req.idUsuario || req.body.status !== 'P') {
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para alterar este cadastro.' });
    }

    const dadosAlterados = await CadastroClientes.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    return res.json(dadosAlterados);
  }

  async changeStatus(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      status: Yup.string().length(1).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { id: id_cadastro, status } = req.body;

    await CadastroClientes.update(
      {
        status,
      },
      {
        where: {
          id: id_cadastro,
        },
      }
    );

    return res.json({ message: 'Ok' });
  }

  async getCadastros(req, res) {
    const schema = Yup.object().shape({
      status: Yup.string(),
      apelido: Yup.string(),
      nome: Yup.string(),
      cnpjCpf: Yup.string(),
      or: Yup.string(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      status = '',
      apelido: nome_fantasia = '',
      nome: razao_social = '',
      cnpjCpf: cnpj_cpf = '',
      or = 'false',
    } = req.query;

    const consulta = [];

    if (status !== '') consulta.push({ status: status.split(',') });
    if (nome_fantasia !== '')
      consulta.push({ nome_fantasia: { [Op.like]: `%${nome_fantasia}%` } });
    if (razao_social !== '')
      consulta.push({ razao_social: { [Op.like]: `%${razao_social}%` } });
    if (cnpj_cpf !== '')
      consulta.push({ cnpj_cpf: { [Op.like]: `%${cnpj_cpf}%` } });

    if (or === 'true') {
      const cadastros = await CadastroClientes.findAll({
        where: {
          [Op.and]: [{ id_usuario: req.idUsuario }, { [Op.or]: consulta }],
        },
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: CigamCadastroStatus,
            as: 'status_cigam',
          },
          {
            model: InfoCadastroClientes,
            as: 'messages',
            include: [
              {
                model: User,
                as: 'criador_update',
                required: false,
                attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
              },
            ],
          },
          {
            model: CadastrosFile,
            as: 'anexos',
          },
        ],
      });
      return res.json(cadastros);
    }
    const cadastros = await CadastroClientes.findAll({
      where: {
        [Op.and]: [{ id_usuario: req.idUsuario }, ...[consulta]],
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: CigamCadastroStatus,
          as: 'status_cigam',
        },
        {
          model: InfoCadastroClientes,
          as: 'messages',
          include: [
            {
              model: User,
              as: 'dadosUsuario',
              required: false,
              attributes: ['id', 'nome', 'sobrenome', 'email', 'cargo'],
            },
          ],
        },
        {
          model: CadastrosFile,
          as: 'anexos',
        },
      ],
    });
    return res.json(cadastros);
  }

  async upload(req, res) {
    // Verifica se existe id de cadastro, caso não, exluir o upload
    const schema = Yup.object().shape({
      id_cadastro_clientes: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verificar se o usuário tem acesso aos cadastros para poder realizar os uploads
    const { idUsuario } = req;
    const minLevel = 1;
    const userLevel = await userAppsHelper.GetAppLevel(idUsuario, 'cadastros');
    if (userLevel < minLevel)
      return res
        .status(401)
        .json({ message: 'Sem acesso para executar essa função' });

    const { id_cadastro_clientes = 0 } = req.body;

    const { originalname: name, size, key, location: url = '' } = req.file;

    // Se não for informado o id do cadastro salvar o anexo como orfão (sem id de cadastro de cliente)
    if (id_cadastro_clientes > 0) {
      const upload = await CadastrosFile.create({
        id_cadastro_clientes,
        id_anexo: key,
        nome: name,
        size,
        url,
      });

      return res.json(upload);
    }
    const upload = await CadastrosFile.create({
      id_anexo: key,
      nome: name,
      size,
      url,
    });

    return res.json(upload);
  }

  async deleteUpload(req, res) {
    const schema = Yup.object().shape({
      id_upload: Yup.number(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id_upload: idu = '0' } = req.query;
    const id_upload = Number(idu);
    // Verificar se o usuário tem acesso aos cadastros para poder remover os uploads
    const { idUsuario } = req;

    console.log(id_upload);

    const minLevel = 1;
    const userLevel = await userAppsHelper.GetAppLevel(idUsuario, 'cadastros');
    if (userLevel < minLevel)
      return res
        .status(401)
        .json({ message: 'Sem acesso para executar essa função' });

    const upload = await CadastrosFile.findOne({ where: { id: id_upload } });

    if (!upload) return res.json({ Message: 'Arquivo inexistente' });

    // Caso o upload ainda não está ligado a um cadastro (upload feitos durante um cadastro)
    if (!upload.id_cadastro_clientes) {
      await s3
        .deleteObject({
          Bucket: `${process.env.AWS_BUCKET_NAME}/cadastros`,
          Key: upload.id_anexo,
        })
        .promise();
      await upload.destroy();
      return res.json({ message: 'Arquivo deletado com sucesso!' });
    }

    const cadastro = await CadastroClientes.findOne({
      where: {
        id_usuario: req.idUsuario,
      },
      include: [
        {
          model: CadastrosFile,
          as: 'anexos',
          where: { id: id_upload },
        },
      ],
    });

    // Caso o usuário que realizou o cadastro verifica se pode remover
    if (cadastro || userLevel >= 3) {
      // Verificar se o cadastro foi feito a menos que 2 dias úteis
      const dias = differenceInBusinessDays(
        new Date(),
        parseISO(upload.createdAt)
      );
      if (dias > 2 && userLevel < 3)
        return res.json({ message: 'O arquivo não pode mais ser exluído' });

      await s3
        .deleteObject({
          Bucket: `${process.env.AWS_BUCKET_NAME}/cadastros`,
          Key: upload.id_anexo,
        })
        .promise();
      await upload.destroy();
    }

    return res.json({ message: 'Arquivo deletado com sucesso!' });
  }

  async DeleteFileS3(key) {
    return s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
      .promise();
  }
}

export default new CadastroClientesController();
