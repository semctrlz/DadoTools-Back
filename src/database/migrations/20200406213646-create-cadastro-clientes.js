'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('cadastro_clientes', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        id_usuario: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'no action'
        },
        cnpj_cpf: {
          type: Sequelize.STRING(14),
          allowNull: false,
        },
        pessoa_juridica:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        data_nascimento:{
          type: Sequelize.DATE,
          allowNull: true,
        },
        nome_fantasia: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        razao_social: {
          type: Sequelize.STRING(60),
          allowNull: false,
        },
        cep: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        logradouro: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        numero: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        complemento: {
          type: Sequelize.STRING(25),
          allowNull: true,
        },
        bairro: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        municipio: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        estado: {
          type: Sequelize.STRING(2),
          allowNull: true,
        },
        pais: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        fone_principal: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        email_xml: {
          type: Sequelize.STRING(65),
          allowNull: false,
        },
        fone_comprador: {
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        email_comprador: {
          type: Sequelize.STRING(65),
          allowNull: true,
        },
        nome_comprador:{
          type: Sequelize.STRING(65),
          allowNull: true,
        },
        fone_financeiro: {
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        email_financeiro: {
          type: Sequelize.STRING(65),
          allowNull: true,
        },
        fone_fiscal: {
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        email_fiscal: {
          type: Sequelize.STRING(65),
          allowNull: true,
        },
        rota:{
          type: Sequelize.STRING(2),
          allowNull: false,
        },
        segmento:{
          type: Sequelize.STRING(2),
          allowNull: false,
        },
        forma_pagto:{
          type: Sequelize.STRING(3),
          allowNull: false,
        },
        cond_pagto:{
          type: Sequelize.STRING(3),
          allowNull: false,
        },
        valor_primeira_compra:{
          type: Sequelize.FLOAT,
          allowNull: false,
          default: 0
        },
        obs_vendedor: {
          type: Sequelize.STRING,
          allowNull:true,
        },
        status: {
          type: Sequelize.STRING(1),
          allowNull:false,
          default: 'P'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          default: 'now()',
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          default: 'now()',
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('cadastro_clientes');
  }
};
