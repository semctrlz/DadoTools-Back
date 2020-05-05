/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import * as Yup from 'yup';
import CadastroClientes from '../models/CadastrosClientes';
import InfoCadastroClientes from '../models/InfoCadastroClientes';
import CondicoesPagto from '../models/CondicoesPagto';
import Segmentos from '../models/Segmento';
import Responsabilidades from '../models/Responsabilidades';
import FormasPagto from '../models/FormasPagto';
import User from '../models/User';
import File from '../models/File';

class DetalhesClientesController {
  async index(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res
        .status(400)
        .json({ error: 'Insira um indíce válido para consultar.' });
    }

    const clientes = await CadastroClientes.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: InfoCadastroClientes,
          as: 'messages',
        },
      ],
    });

    const formaPagto = await FormasPagto.findOne({
      where: {
        cod_forma_pagto: clientes.forma_pagto,
      },
      attributes: [
        ['cod_forma_pagto', 'cod'],
        ['nome_forma_pagto', 'descricao'],
      ],
    });

    const condPagto = await CondicoesPagto.findOne({
      where: {
        cod_condicao_pagto: clientes.cond_pagto,
      },
      attributes: [
        ['cod_condicao_pagto', 'cod'],
        ['nome_condicao_pagto', 'descricao'],
      ],
    });
    const segmento = await Segmentos.findOne({
      where: {
        cod_segmento: clientes.segmento,
      },
      attributes: [
        ['cod_segmento', 'cod'],
        ['nome_segmento', 'descricao'],
      ],
    });
    const Rota = await Responsabilidades.findOne({
      where: {
        cod_rota: clientes.rota,
      },
      attributes: [
        ['cod_rota', 'cod'],
        ['nome_rota', 'descricao'],
      ],
    });

    const mensagensAlteradas = [];

    for (const {
      id,
      id_usuario,
      id_cadastro,
      mensagem,
      createdAt,
      updatedAt,
    } of clientes.messages) {
      const { nome, cargo, avatar } = await User.findByPk(id_usuario, {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['path', 'url'],
          },
        ],
      });

      mensagensAlteradas.push({
        id,
        id_usuario,
        nome,
        cargo,
        avatar,
        id_cadastro,
        mensagem,
        createdAt,
        updatedAt,
      });
    }

    const {
      id: idEmpresa,
      id_usuario,
      cnpj_cpf,
      pessoa_juridica,
      data_nascimento,
      nome_fantasia,
      razao_social,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      municipio,
      estado,
      pais,
      fone_principal,
      email_xml,
      fone_comprador,
      email_comprador,
      nome_comprador,
      fone_financeiro,
      email_financeiro,
      fone_fiscal,
      email_fiscal,
      status,
      valor_primeira_compra,
      obs_vendedor,
      createdAt,
      updatedAt,
    } = clientes;

    const retorno = {
      id: idEmpresa,
      id_usuario,
      cnpj_cpf,
      pessoa_juridica,
      data_nascimento,
      nome_fantasia,
      razao_social,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      municipio,
      estado,
      pais,
      fone_principal,
      email_xml,
      fone_comprador,
      email_comprador,
      nome_comprador,
      fone_financeiro,
      email_financeiro,
      fone_fiscal,
      email_fiscal,
      rota: Rota,
      segmento,
      forma_pagto: formaPagto,
      cond_pagto: condPagto,
      status,
      valor_primeira_compra,
      obs_vendedor,
      message: mensagensAlteradas,
      createdAt,
      updatedAt,
    };

    return res.json(retorno);
  }
}

export default new DetalhesClientesController();
