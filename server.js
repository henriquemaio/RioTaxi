//npm init ** Iniciar o npm na pasta 
//npm -i --save-dev express ** Instalar o servidor node Express
//npm install --save ejs ** Mudou de ideia!
//o postinstal do package.json é script do npm a ser executado toda vez que for rodado o npm install 

var express = require("express") 
var app = express() 

var port = process.env.PORT || 8080 //Definindo a porta

//app.set("view engine", "ejs") definindo ejs como view engine
//Pegar todos os arquivos que estao na pagina e servir para o navegador sem processar, dizer pro express usar o diretorio estatico no diretorio atual/public. Como é tudo estatico, vai colocar tudo na /app
//Arquivos movidos para dentro de App. Criado o .bowerrc para que o bower_components fique no lugar certo, sem eu ter que mudar em todos os arquivos o diretorio

app.use(express.static(__dirname + "/app"))
app.listen(port)
console.log("Server listening port: " + port)

