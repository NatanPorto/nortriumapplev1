# NORTRIUM — versão PWA (iPhone)

## 1) Publicar (uma vez)
O PWA precisa estar num endereço **HTTPS**. Opções gratuitas:
- **Netlify** (mais fácil): app.netlify.com > Add new site > Deploy manually > arraste esta pasta (descompactada).
- **Cloudflare Pages** > Upload assets > envie esta pasta.
- **GitHub Pages**: suba os arquivos para um repositório e ative Pages (Settings > Pages).

Não precisa de Mac nem de conta de desenvolvedor da Apple.

## 2) Instalar no iPhone
1. Abra o endereço no **Safari** (tem que ser o Safari).
2. Toque em Compartilhar > **Adicionar à Tela de Início**.
3. Abra sempre pelo ícone. Os dados do ícone ficam separados dos do Safari comum.

## 3) Backup (importante)
O iOS pode apagar os dados de sites que ficam muito tempo sem uso, e apaga tudo se você remover o ícone.
- **Ajustes > Salvar backup** abre o menu de compartilhar: escolha *Salvar em Arquivos* (iCloud Drive) ou o app do Drive.
- **Ajustes > Restaurar / importar** lê o arquivo de volta (também aceita backups da versão Android).
- **Ajustes > Google Drive**: backup automático numa pasta do Drive (o app envia ao abrir, no máximo a cada 12 h). Exige criar uma vez o mini-script no Google Apps Script; a própria tela explica o passo a passo e tem o botão "Copiar script".
- O app avisa ao abrir quando faz 7 dias ou mais sem backup.

## 4) Atualizar o app
Depois de publicar uma versão nova, mude `VERSAO` em `sw.js` (ex.: `nortrium-pwa-2`). Sem isso o iPhone continua usando os arquivos guardados.
O iPhone atualiza na próxima vez que o app é aberto com internet (às vezes só na segunda abertura).

## O que foi removido em relação ao app Android
Widgets da tela inicial, notificações e lembretes (Meus avisos, avisos da Agenda e das aulas, lembrete de água), leitura do relógio/Health Connect, backup automático em Documentos e escolha de pasta nativa. Nada disso funciona em PWA no iPhone.
Os dados desses recursos continuam no arquivo de backup (para você poder voltar ao Android), mas ficam ocultos no PWA.

## Estrutura
index.html · manifest.webmanifest · sw.js · css/ · js/ · img/ (ícones) · video/intro.mp4
