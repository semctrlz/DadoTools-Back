import Sequelize, { Model } from 'sequelize';

class Ticket extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: Sequelize.INTEGER,
        id_destinatario: Sequelize.INTEGER,
        categoria: Sequelize.STRING,
        subcategoria: Sequelize.STRING,
        prioridade: Sequelize.STRING,
        assunto: Sequelize.STRING,
        prazo: Sequelize.DATE,
        vencido: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.prazo) {
              return new Date(this.prazo) < new Date();
            }
            return false;
          },
        },
        texto: Sequelize.STRING,
        status: Sequelize.STRING,
        prioridade_ext: {
          type: Sequelize.VIRTUAL,
          get() {
            switch (this.prioridade) {
              case 'U':
                return 'Urgente';
              case 'B':
                return 'Baixa';
              case 'A':
                return 'Alta';
              default:
                return 'Normal';
            }
          },
        },
        prioridade_num: {
          type: Sequelize.VIRTUAL,
          get() {
            switch (this.prioridade) {
              case 'U':
                return 1;
              case 'B':
                return 4;
              case 'A':
                return 2;
              default:
                return 3;
            }
          },
        },
        status_ext: {
          type: Sequelize.VIRTUAL,
          get() {
            switch (this.status) {
              case 'I':
                return 'Inicial';
              case 'F':
                return 'Finalizado';
              case 'E':
                return 'Excluído';
              case 'S':
                return 'Fechado';
              default:
                return '';
            }
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'id_usuario',
      as: 'criador',
    });
    this.belongsTo(models.User, {
      foreignKey: 'id_destinatario',
      as: 'destinatario',
    });
    this.hasOne(models.TicketsFormatado, {
      foreignKey: 'id_ticket',
      as: 'formatado',
    });
    this.hasMany(models.TicketsFile, {
      foreignKey: 'id_ticket',
      as: 'anexos',
    });
    this.hasMany(models.TicketsUpdates, {
      foreignKey: 'id_ticket',
      as: 'updates',
    });
    this.hasMany(models.EncerramentoTicket, {
      foreignKey: 'id_ticket',
      as: 'encerramentos',
    });
    this.hasOne(models.AvaliacaoTicket, {
      foreignKey: 'id_ticket',
      as: 'avaliacao',
    });
  }
}

export default Ticket;
