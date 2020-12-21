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
  custos: {
    nome: 'custos',
    descricao: 'Armazenar os custos de cada produto',
  },
  fretes: {
    nome: 'fretes',
    descricao: 'Armazenar os fretes diretos e distribuição para os produtos',
  },
  despesas: {
    nome: 'despesas',
    descricao: 'Armazenar as despesas que serão deduzidas da receita',
  },
  marketing: {
    nome: 'marketing',
    descricao: 'Armazenar as despesas de marketing',
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
    const imp = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.impostos.nome,
      },
      limit: 1,
    });
    const impostos = imp.length === 0 ? {} : imp[0];
    return res.json({ impostos, success: true });
  }

  async custos(req, res) {
    const cus = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.custos.nome,
      },
      limit: 1,
    });
    const custos = cus.length === 0 ? {} : cus[0];
    return res.json({ custos, success: true });
  }

  async despesas(req, res) {
    const desp = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.despesas.nome,
      },
      limit: 1,
    });
    const despesas = desp.length === 0 ? {} : desp[0];
    return res.json({ despesas, success: true });
  }

  async marketing(req, res) {
    const desp = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.marketing.nome,
      },
      limit: 1,
    });
    const marketing = desp.length === 0 ? {} : desp[0];
    return res.json({ marketing, success: true });
  }

  async fretes(req, res) {
    const fre = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.fretes.nome,
      },
      limit: 1,
    });
    const fretes = fre.length === 0 ? {} : fre[0];
    return res.json({ fretes, success: true });
  }

  async parametros(req, res) {
    const imp = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.impostos.nome,
      },
      limit: 1,
    });
    const impostos = imp.length === 0 ? {} : imp[0];

    const cus = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.custos.nome,
      },
      limit: 1,
    });
    const custos = cus.length === 0 ? {} : cus[0];

    const prod = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.produtos.nome,
      },
      limit: 1,
    });

    const produtos = prod.length === 0 ? [] : prod[0];

    const fre = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.fretes.nome,
      },
      limit: 1,
    });

    const fretes = fre.length === 0 ? [] : fre[0];

    const des = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.despesas.nome,
      },
      limit: 1,
    });

    const despesas = des.length === 0 ? [] : des[0];

    const mkt = await Configs.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nome_config: nomes.marketing.nome,
      },
      limit: 1,
    });

    const marketing = mkt.length === 0 ? [] : mkt[0];

    return res.json({
      impostos,
      custos,
      produtos,
      fretes,
      despesas,
      marketing,
      success: true,
    });
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
