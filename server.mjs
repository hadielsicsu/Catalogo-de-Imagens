import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import specs from './swaggerConfig.mjs'; 
import rotaImage from './rotas/rotaImage.mjs'; 


const app = express();
const PORT = process.env.PORT || 5502;

app.use(bodyParser.json());

app.use('/images', rotaImage); 

app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
