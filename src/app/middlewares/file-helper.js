const fs = require('fs'),
      sharp = require('sharp');
    
      exports.compressImage = (file, size) => {
        
        const newPath = file.path.split('.')[0] + '.webp';
        const arquivoAntigo = file.path;
        
        return sharp(file.path)
            .resize(size, size, {fit:"cover", position: "top"})
            .jpeg({
              quality: 100,
              chromaSubsampling: '4:4:4'
            }
              )
            .toBuffer()
            .then(data => {
    
                // Deletando o arquivo antigo
                // O fs.acess serve para testar se o arquivo realmente existe, evitando bugs
                fs.access(arquivoAntigo, (err) => {
    

                    // Um erro significa que a o arquivo não existe, então não tentamos apagar
                    if (!err) {                      
                        //Se não houve erros, tentamos apagar
                        fs.unlink(arquivoAntigo, err => {    
                            // Não quero que erros aqui parem todo o sistema, então só vou imprimir o erro, sem throw.
                            if(err) console.log(err)
                        })
                    }
                });
                
                const novoCaminho = newPath.split('.')[0] + '.jpg';

                //Agora vamos armazenar esse buffer no novo caminho
                fs.writeFile(novoCaminho, data, err => {
                    if(err){
                        // Já aqui um erro significa que o upload falhou, então é importante que o usuário saiba.
                        throw err;
                    }
                });
    
                // Se o código chegou até aqui, deu tudo certo, então vamos retornar o novo caminho
                return newPath;
            })
    }