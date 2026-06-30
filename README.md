# 🐉 RyuKan - Página de Gerenciamento de Usuários
Uma página de gerenciamento dos usuários de um sistema, limitada a operações de visualização destes.

## Recursos utilizados
### Front-End
HTML5, CSS3, JavaScript

### Back-End
Node.JS, Express, PostgreSQL

## Pré-requisitos
Para que o projeto funcione, é essencial ter  
* [NodeJS](https://nodejs.org/en)  
* [Express](https://expressjs.com/en/)  
* [pg](https://www.npmjs.com/package/pg) Libraria PG / Cliente PostgreSQL   
* [PostgreSQL](https://www.postgresql.org/)  
* [Git](https://git-scm.com/)  

## Status do Projeto  
O projeto se encontra em uma fase muito inicial, com apenas uma página funcionando, entretanto, o design já apresente indícios de permanência.  

### Funcionalidades  
-Atualizar a visualização atual dos usuários  
-Pesquisar usuários pelo nome  
-Pesquisar usuários pelo cargo (role)  

# Como executar o projeto
Siga os passos abaixo no seu terminal:

```bash
# 1. Clone este repositório
git clone https://github.com/gleversonrafael/gleverson_2bim_kan

# 2. Acesse a pasta do projeto
# 3. Inicie o node e o NPM em modo testes
npm init -y

# 4. Instale as dependências
npm install express
npm install pg
npm install dotenv

# 5. Inicie um banco de dados relacional PostgreSQL
# 6. Crie um arquivo .env e insira as seguintes credenciais
ENV_IS_CONNECTED=The connection with the environment variables has been a success. 
DB_HOST=(insira onde o servidor responsável pelo banco está hospedado)  
DB_PORT=(insira a aplicação em que está hospedado)
DB_NAME=(insira o nome do banco)
DB_USER=(insira o nome do usuário responsável por ele)
DB_PASSWORD=(insira a senha do usuário responsável por ele)
PORT=(insira a porta do servidor. Por padrão, insira 3000)

# 7. Abra a página index.html
# 8. Insira o seguinte código para inicializar o servidor, em um terminal que possua acesso à pasta js, onde server.js se encontra.
node server.js

# 9. Aperte ctrl C no terminal caso queira encerrar o servidor.

``` 
# Como o projeto funciona
### Seções 
Há uma seção introdutória na direita e uma seção na esquerda.  
A seção na esquerda é a principal e inclui conteúdo como a tabela de usuários e operações que possam ser realizadas com ela.

### Como pesquisar
Clique no ícone da engrenagem, que irá abrir um popup.  
Altere o critério que será utilizado ao pesquisar usuários, na seção search by.   
Por exemplo, alternando-se essa configuração para role (cargo) e digitar 'A' na barra de pesquisa, aparecerão todos os usuários cujos cargos possuem a em seu nome.  
Caso queira visualizar todos os usuários ou atualizar a visualização atual, clique no símbolo de Update.