import File from '../models/File';
import User from '../models/User';
import sharp from 'sharp';
import fs from 'fs';


class FileController{
  async store(req,res){    
    if(req.file){
      
      const arquivo = req.file;     

      try{

      const newPath = arquivo.path.split('.')[0] + '.webp';
      const arquivoAntigo = arquivo.path;
      const tamanho = 120;

      const imagemNova = await sharp(arquivo.path)
      .resize(tamanho, tamanho, {fit:"cover", position: "top"})
      .jpeg({
        quality: 100,
        chromaSubsampling: '4:4:4'
      }
        )
      .toBuffer(); 
     
        fs.unlink(arquivoAntigo, err => {    
          // Não quero que erros aqui parem todo o sistema, então só vou imprimir o erro, sem throw.
          if(err) console.log(err)
      });      

      const novoCaminho = newPath.split('.')[0] + '.jpg';
      //Agora vamos armazenar esse buffer no novo caminho
      fs.writeFile(novoCaminho, imagemNova, err => {
          if(err){
              // Já aqui um erro significa que o upload falhou, então é importante que o usuário saiba.
              return res.status(400).json({error: "Ocorreu um erro ao salvar sua imagem, tente novamente."});
          }
      });
      
      const { originalname: nome, } = req.file;

      const file = await File.create({
        nome,
        path: arquivo.filename.split('.')[0] + '.jpg'
      });
      //Update usuário
      User.update({
        avatar_id: file.id,      
      },
      {
        where: {id: req.idUsuario}
      })

        return res.json(file);
          
      }catch(err){
        res.status(400).json({err: "Erro ao atualizar imagem. Tente novamente mais tarde"})
      }      
    }
  }
}

export default new FileController();
