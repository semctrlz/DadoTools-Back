import Sequelize, { Model } from 'sequelize';

class CadastroClientes extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: Sequelize.INTEGER,
        cnpj_cpf: Sequelize.STRING,
        pessoa_juridica: Sequelize.BOOLEAN,
        data_nascimento: Sequelize.DATE,
        nome_fantasia: Sequelize.STRING,
        razao_social: Sequelize.STRING,
        cep: Sequelize.INTEGER,
        logradouro: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        bairro: Sequelize.STRING,
        municipio: Sequelize.STRING,
        estado: Sequelize.STRING,
        pais: Sequelize.STRING,
        fone_principal: Sequelize.STRING,
        email_xml: Sequelize.STRING,
        fone_comprador: Sequelize.STRING,
        email_comprador: Sequelize.STRING,
        nome_comprador: Sequelize.STRING,
        fone_financeiro: Sequelize.STRING,
        email_financeiro: Sequelize.STRING,
        fone_fiscal: Sequelize.STRING,
        email_fiscal: Sequelize.STRING,
        rota: Sequelize.STRING,
        segmento: Sequelize.STRING,
        forma_pagto: Sequelize.STRING,
        cond_pagto: Sequelize.STRING,
        status: Sequelize.STRING,
        valor_primeira_compra: Sequelize.FLOAT,
        obs_vendedor: Sequelize.STRING,
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
      as: 'messages',
    });
  }
}

export default CadastroClientes;
