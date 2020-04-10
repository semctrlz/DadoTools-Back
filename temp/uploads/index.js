fs = require('fs');
path = require('path');
module.exports = async function DeletarImagem(nome){
  try
  {
    const caminho = path.resolve(__dirname,nome);
    fs.unlinkSync(caminho);
    return true;
  }
  catch(err)
  {
    return false;
  }
}
