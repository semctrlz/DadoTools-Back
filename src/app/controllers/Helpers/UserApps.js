import { Op } from 'sequelize';
import UserApp from '../../models/UserApp';
import Apps from '../../models/App';

class UserAppsHelper {
  async GetAppLevel(idUser, appRoute) {
    // Obtem o id do APP
    const app = await Apps.findOne({ where: { rota: appRoute } });

    // Caso um App com a rota informada não exista, retorna 0
    if (!app) return 0;

    // Busca o registro do usuário no app informado
    const userApp = await UserApp.findOne({
      where: { [Op.and]: [{ id_app: app.id }, { id_usuario: idUser }] },
    });

    // CAso não encontre registro retorna 0
    if (!userApp) return 0;

    // Caso encontre registro, retorna o nivel cadastrado
    return userApp.nivel;
  }
}

export default new UserAppsHelper();
