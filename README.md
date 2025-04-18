# Chonfez - Site de Curso de Japonês

## Checkpoint V1

Este é o primeiro checkpoint do site Chonfez, uma plataforma de ensino de japonês focada em aprendizado através de animes e cultura pop japonesa.

### Arquivos do Checkpoint

- `index.html` - Arquivo principal do site
- `styles.css` - Estilos atuais do site
- `index_backup_v1.html` - Backup do HTML no checkpoint
- `styles_backup_v1.css` - Backup do CSS no checkpoint

### Características Principais

1. **Design Visual**
   - Tema japonês com imagens de alta qualidade
   - Paleta de cores moderna (rosa, azul e branco)
   - Efeitos visuais suaves e elegantes
   - Layout responsivo para todas as telas

2. **Seções do Site**
   - Hero com chamada principal
   - Metodologia com 3 cards
   - Planos de assinatura
   - Depoimentos com slider
   - FAQ expansível
   - Formulário de contato

3. **Elementos Visuais**
   - Imagens temáticas do Japão
   - Ícones e emojis relacionados
   - Gradientes e efeitos de transparência
   - Animações suaves

4. **Performance**
   - Otimização de imagens
   - Rolagem suave
   - Carregamento otimizado
   - Responsividade fluida

### Como Usar o Checkpoint

Para voltar a este estado do site:
1. Copie o conteúdo de `index_backup_v1.html` para `index.html`
2. Copie o conteúdo de `styles_backup_v1.css` para `styles.css`

### Próximos Passos Planejados

- Adicionar mais funcionalidades interativas
- Expandir seções com mais conteúdo
- Melhorar a acessibilidade
- Otimizar para diferentes dispositivos

# Chonfez Website

Site de ensino de japonês Chonfez.

## Estrutura do Projeto
```
/
├── index.html          # Página principal
├── styles.css         # Estilos CSS
├── auth.html         # Página de autenticação
├── auth.css         # Estilos da autenticação
├── dashboard.html   # Página do dashboard
└── dashboard.css    # Estilos do dashboard
```

## Como publicar no GitHub Pages

1. Criar uma conta no GitHub (se ainda não tiver)
2. Criar um novo repositório privado chamado `chonfez-website`
3. Fazer upload dos arquivos
4. Ir em Settings > Pages
5. Em "Source", selecionar "main" e clicar em "Save"
6. Aguardar alguns minutos e o site estará online

## Domínio Personalizado (Opcional)

Para usar um domínio personalizado (www.chonfez.com):

1. Comprar o domínio em um registrador (ex: GoDaddy, Hostgator)
2. No GitHub, ir em Settings > Pages
3. Em "Custom domain", adicionar seu domínio
4. Configurar os registros DNS conforme instruções do GitHub

## Como executar o site localmente

1. Certifique-se de que o Node.js está instalado:
   ```bash
   node --version
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```

4. Acesse o site:
   - No seu computador: http://localhost:3000
   - Em outros dispositivos na mesma rede:
     1. Descubra seu IP local usando o comando `ipconfig` no Windows
     2. Acesse `http://SEU_IP:3000` nos outros dispositivos

## Desenvolvimento

Para desenvolvimento com reload automático:
```bash
npm run dev
``` 