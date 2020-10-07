import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        sobrenome: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        email: Sequelize.STRING,
        codigo_cigam: Sequelize.STRING,
        cargo: Sequelize.STRING,
        is_ativo: Sequelize.BOOLEAN,
        is_sales: Sequelize.BOOLEAN,
        is_adm: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });

    this.hasMany(models.InfoCadastroClientes, {
      foreignKey: 'id_usuario',
      as: 'dadosUsuario',
    });
    this.hasMany(models.UserApp, { foreignKey: 'id_usuario', as: 'userApp' });

    this.hasMany(models.GrupoUserTicket, {
      foreignKey: 'id_usuario',
      as: 'user_grupo',
    });
    this.hasMany(models.CadastroClientes, {
      foreignKey: 'id_usuario',
      as: 'criadorCadastro',
    });

    this.hasMany(models.Ticket, { foreignKey: 'id_usuario', as: 'criador' });
    this.hasMany(models.Ticket, {
      foreignKey: 'id_destinatario',
      as: 'destinatario',
    });
    this.hasMany(models.TicketsUpdates, {
      foreignKey: 'id_usuario',
      as: 'criador_update',
    });

    this.hasMany(models.FiltrosTabelasPrecos, {
      foreignKey: 'id_usuario',
      as: 'criador_config',
    });

    this.hasMany(models.EncerramentoTicket, {
      foreignKey: 'id_usuario',
      as: 'criador_encerramento',
    });
    this.hasMany(models.AvaliacaoTicket, {
      foreignKey: 'id_usuario',
      as: 'usuario_avaliador',
    });
    this.hasMany(models.TicketsGrupos, {
      foreignKey: 'id_usuario',
      as: 'criador_grupo',
    });
    this.hasOne(models.TicketCategoriaAutoEncs, {
      foreignKey: 'id_usuario',
      as: 'usuario_enc',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
