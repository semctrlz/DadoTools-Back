import * as Yup from 'yup';

import Configs from '../models/Configs';

const nomes = {
  produtos: {
    nome: 'produtos',
    descricao:
      'Armazenar produtos atuais com dados ligados a cada um, inclusive pautas',
  },
  produtosBase: {
    nome: 'produtosBase',
    descricao: 'Produtos ativos constantes no CIGAM',
  },
  impostos: {
    nome: 'impostos',
    descricao:
      'Armazenar impostos atuais atuais com dados ligados a cada estado',
  },
};

class ConfisController {
  // Comuns
  async store(req, res) {
    const schema = Yup.object().shape({
      nome_config: Yup.string().required(),
      json: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ message: 'Validation fails', success: false });
    }

    const { nome_config, json } = req.body;
    const id_usuario = req.idUsuario;

    const config = await Configs.create({
      nome_config,
      json,
      id_usuario,
    });

    return res.json({ config, success: true });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res
        .status(400)
        .json({ message: 'Validation fails', success: false });
    }

    const config = await Configs.findByPk(req.body.id);

    if (config) {
      await config.destroy();
    }
    return res.json({ success: true });
  }

  // Retornar configurações mais recentes
  async produtos(req, res) {
    const prod = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.produtos.nome,
      },
      limit: 1,
    });

    const produtos = prod.length === 0 ? [] : prod[0];
    return res.json({ produtos, success: true });
  }

  async impostos(req, res) {
    const prod = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      attributes: [['json_obj', 'config']],
      where: {
        nome_config: nomes.impostos.nome,
      },
      limit: 1,
    });

    const produtos = prod.length === 0 ? [] : prod[0];
    return res.json({ produtos, success: true });
  }

  async produtosBase(req, res) {
    const prodBase = await Configs.findOne({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.produtosBase.nome,
      },
      limit: 1,
    });

    return res.json({ prodBase, success: true });
  }
}

export default new ConfisController();
