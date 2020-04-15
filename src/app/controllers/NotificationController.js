import Notification from '../schemas/Notification';
import * as Yup from 'yup';



class NotificationController{
  async create(req, res){

    const schema = Yup.object().shape({
      user: Yup.number().required(),
      content: Yup.string().max(140).required(),
      link: Yup.string().max(30).required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }


    const {content, user, link } = req.body;
    
      const document = await Notification.create({
        content,
        link,        
        user
      })

      return res.status(200).json(document);
  }

  async index(req, res){    
      const notifications = await Notification.find(
        {
          user: req.idUsuario,
        }
        ).sort({
          createdAt: 'desc'
        }).limit(20);

        return res.json(notifications);
      }
      catch(err)
      {
        return res.status(401).json({error:'Invalid Token.'});
      }

  

  async update(req, res){
  // const notification = await Notification.findById(req.params.id);
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {read: true},
      {new:true}
    );

    return res.json(notification);
  }

}

export default new NotificationController();
