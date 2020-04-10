import User from '../models/User'
import File from '../models/File'

class SalesController {
  async index(req, res){
    const sales = await User.findAll({
      where: {is_sales: true},
      attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'codigo_cigam'
        ],
        include: [
          {
            model: File, as: 'avatar',
            attributes: ['id','nome','path','url']

          }
        ]
      }
    )
    return res.json(sales);
  }

}

export default new SalesController()
