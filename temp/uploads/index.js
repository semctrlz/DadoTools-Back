import fs from 'fs';
import path from 'path';
export default async function DeletarImagem(nome){
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
