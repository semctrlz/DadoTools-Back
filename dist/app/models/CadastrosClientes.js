"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);


class CadastroClientes extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: _sequelize2.default.INTEGER,
        cnpj_cpf: _sequelize2.default.STRING,
        pessoa_juridica: _sequelize2.default.BOOLEAN,
        data_nascimento: _sequelize2.default.DATE,
        nome_fantasia: _sequelize2.default.STRING,
        razao_social: _sequelize2.default.STRING,
        cep: _sequelize2.default.INTEGER,
        logradouro: _sequelize2.default.STRING,
        numero: _sequelize2.default.STRING,
        complemento: _sequelize2.default.STRING,
        bairro: _sequelize2.default.STRING,
        municipio: _sequelize2.default.STRING,
        estado: _sequelize2.default.STRING,
        pais: _sequelize2.default.STRING,
        fone_principal: _sequelize2.default.STRING,
        email_xml: _sequelize2.default.STRING,
        fone_comprador: _sequelize2.default.STRING,
        email_comprador: _sequelize2.default.STRING,
        nome_comprador: _sequelize2.default.STRING,
        fone_financeiro: _sequelize2.default.STRING,
        email_financeiro: _sequelize2.default.STRING,
        fone_fiscal: _sequelize2.default.STRING,
        email_fiscal:  _sequelize2.default.STRING,
        rota: _sequelize2.default.STRING,
        segmento: _sequelize2.default.STRING,
        forma_pagto:_sequelize2.default.STRING,
        cond_pagto: _sequelize2.default.STRING,
        status: _sequelize2.default.STRING,
        valor_primeira_compra:_sequelize2.default.FLOAT,
        obs_vendedor: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.InfoCadastroClientes, {
      foreignKey: 'id_cadastro',
      as: 'messages'
    });
  }
}

exports. default = CadastroClientes;
