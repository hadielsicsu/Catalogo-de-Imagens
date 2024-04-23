import ImageDAO from '../persistencia/imageDAO.mjs';

const imageDAO = new ImageDAO('./database/database.json'); 

export default class ImageController {
    static cadastrarImagem(req, res) {
    const { id, title, description, imageUrl, author, category } = req.body;
    if (!id || !title || !description || !imageUrl || !author) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const createdAt = Date.now(); 

    const newImage = {
        id,
        title,
        description,
        imageUrl,
        author,
        createdAt,
        category 
    };

    imageDAO.addImage(newImage);
    res.status(201).json({ message: 'Imagem cadastrada com sucesso' });
    }

  static listaImagens(req, res) {
    const images = imageDAO.loadImagesFromDatabase();
    res.json(images);
  }

  static atualizarImagem(req, res) {
    const imageId = req.params.id;
    const {  description, imageUrl } = req.body;
    const existingImage = imageDAO.findImageById(imageId);
    if (!existingImage) {
      return res.status(404).json({ error: 'Imagem não encontrada' });
    }

    const updatedImage = {
      id: imageId,      
      description: description || existingImage.description,
      imageUrl: imageUrl || existingImage.imageUrl,      
    };

    if (imageDAO.updateImage(updatedImage)) {
      res.json({ message: 'Imagem atualizada com sucesso' });
    } else {
      res.status(500).json({ error: 'Erro ao atualizar a imagem' });
    }
  }

  static excluirImagem(req, res) {
    const imageId = req.params.id;
    const existingImage = imageDAO.findImageById(imageId);
    if (!existingImage) {
      return res.status(404).json({ error: 'Imagem não encontrada' });
    }

    imageDAO.deleteImage(imageId);
    res.json({ message: 'Imagem excluída com sucesso' });
  }
}
