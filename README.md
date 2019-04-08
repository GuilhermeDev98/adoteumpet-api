# adoteumpet

**Objetivo**
_Criar um site onde será possível expor um animal para que seja adotado_

## Análise de Requisítos

* Autenticação
- [ ] Criar página de cadastro
- [ ] Criar página de login

* Pagina Principal
- [ ] Criar formulário de busca
- [ ] Criar lista de pets para adoção

* Perfil
- [ ] Criar Página de visualização de perfil
- [ ] Criar Página de edição de perfil
- [ ] Criar Pagina de exclusão de perfil

* Pet

- [ ] Criar página de adição de pet
- [ ] Criar página de edição de pet
- [ ] Criar página de exclusão de pet

* Administração

- [ ] Criar página para administração de perfis
- [ ] Criar página para edição de perfis
- [ ] Criar página para exclusão de perfis

- [ ] Criar página para administração de pets
- [ ] Criar página para edição de pets
- [ ] Criar página para exclusão de pets


## Tipos de dados

#### User
- displayName - string - requerido
- email - string - requerido
- password - string - requerido
- photoURL - string -requerido
- cep - number - requerido
- cel - number - requerido
- status - enum(admin, user) - default(user)

#### Pet
- name - string - requerido
- age - number - requerido
- type - enum(cat, dog) - requerido
- sex - enum(male, female) - requerido
- user_uid - integer - requerido
- state - string - requerido
- city - string - requerido
- cep - number - optional
- photos - json - requerido
- isAdoted - boolean - default(0)
- createdAt - date - required
- adotedAt - date - optional


## Técnologias utilizadas

[Firebase](https://firebase.google.com/) - Authentication, Database, Storage
[VueJs](https://vuejs.org/index.html) - Página Web