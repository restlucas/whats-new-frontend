# What's New

Este é o frontend de um sistema de notícias responsivo, desenvolvido com React e tecnologias para garantir performance, acessibilidade e facilidade de uso.

## 🚀 Tecnologias Utilizadas

- React - Biblioteca para construção de interfaces de usuário
- Vite - Build tool para otimização e rapidez no desenvolvimento
- TypeScript - Tipagem estática para maior segurança e produtividade
- Tailwind CSS - Estilização eficiente e responsiva
- React Query - Gerenciamento de estado assíncrono
- Context API - Gerenciamento de estado global
- React Router DOM - Navegação entre páginas
- Zod - Validação de formulários e dados
- Tiptap - Editor de texto rico para publicação de notícias
- Date-fns - Manipulação de datas
- React Helmet - SEO e metadados dinâmicos
- Phosphor Icons - Conjunto de ícones modernos e personalizáveis

## 📦 Instalação

Clone o repositório e instale as dependências:

```
# Clone o repositório
git clone https://github.com/restlucas/whatsnew-frontend.git
cd whatsnew-frontend

# Instale as dependências
npm install  # ou yarn install
```

## ▶️ Execução

Para iniciar o projeto em ambiente de desenvolvimento, execute:

```
npm run dev  # ou yarn dev
```

O frontend estará disponível em http://localhost:5173 (ou porta configurada).

## 🛠 Configuração do Ambiente

Crie um arquivo .env na raiz do projeto e adicione as variáveis necessárias seguindo de exemplo o arquivo .env.example:

```
VITE_WHATSNEW_API_URL=your_api_url
VITE_WHATSNEW_CLIENT_URL=http://localhost:5173/
```

Importante: caso não queira configurar o back-end utilize o valor de `VITE_WHATSNEW_API_URL` como sendo `https://whatsnew-backend.up.railway.app/v1/api`

Link do repositório back-end: https://github.com/restlucas/whatsnew-backend

##

💡 Feedbacks são bem-vindos! Se tiver sugestões, deixe um comentário ou abra uma issue. 🚀
