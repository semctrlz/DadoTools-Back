import * as Yup from 'yup';
import Sintegra from '../../utils/Sintegra';

import CadastroClientes from '../models/CadastrosClientes';
import CigamCadastroStatus from '../models/CigamCadastroStatus';

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
        ],
      });
      return res.json(cadastros);
    }
    const cadastros = await CadastroClientes.findByPk(idEmpresa);
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
}

export default new CadastroClientesController();
