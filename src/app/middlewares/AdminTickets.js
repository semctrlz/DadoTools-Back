import { Op } from 'sequelize';
import UserApp from '../models/UserApp';

export default async function IsTicketAdmin(idUsuario) {
  const adminApp = await UserApp.findOne({
    where: {
      [Op.and]: [{ id_usuario: idUsuario }, { id_app: 2 }, { is_admin: true }],
    },
  });

  if (adminApp) {
    return true;
  }
  return false;
}
