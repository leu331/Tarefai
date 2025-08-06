para o jwt token, vamos utilizar o nest jwt e passaport
passaport: bilioteca de autenticação;
jwt: formato do token
guards: a protecão às rotas que só autenticados podem acessar

como instalar: 
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/passport-jwt

vamos precisar também dos seguintes arquivos:
dto de login: validar os dados do corpo;

auth service: verifica se o usuário existe no banco e concede o token;

auth controller: é a rota, recebe os dados e chama o service que executa;

jwt module: configura o segredo do token e o tempo que ele fica ativo;

jwt strategy: fala para o nest como extrair e validar o token

guards: vai proteger as rotas