# Agenda AAMAR 2027

Aplicativo web offline-first, sem frameworks de interface e sem chamadas a APIs. Os 20 eventos fornecidos estão embutidos em `app.js`.

## Testar no computador

1. Extraia a pasta do projeto.
2. Abra um terminal dentro dela.
3. Inicie um servidor local, por exemplo:
   - Python: `python -m http.server 8080`
   - Node: `npx http-server . -p 8080`
4. Acesse `http://localhost:8080`.

O Service Worker exige `localhost` ou HTTPS. Para testar a experiência offline, abra o app uma vez, aguarde o carregamento e desligue a conexão. No Android instalado via Capacitor, os arquivos são empacotados no próprio aplicativo. O CSS usa fontes do sistema e não depende de CDN, portanto o visual também funciona offline.

## Gerar APK Android com Capacitor

**Pré-requisitos:** Node.js LTS, Android Studio e Android SDK instalados. Java/JDK conforme a versão exigida pelo Android Gradle Plugin instalado pelo Capacitor.

Abra o terminal na pasta do projeto e execute:

```bash
npm install
npx cap init "Agenda AAMAR 2027" "br.org.aamar.agenda2027" --web-dir .
npx cap add android
npx cap sync android
npx cap open android
```

O arquivo `capacitor.config.json` já está incluído. Se executar `npx cap init`, confirme os mesmos valores de `appId`, `appName` e `webDir` para manter a configuração consistente. Se o Capacitor informar que o app já foi inicializado, não repita o `init`.

No Android Studio:
1. Aguarde o Gradle terminar a sincronização.
2. Selecione **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
3. Ao concluir, clique em **locate** na notificação do Android Studio. Normalmente o APK de debug fica em `android/app/build/outputs/apk/debug/app-debug.apk`.
4. Para distribuição, use **Build > Generate Signed Bundle / APK...** e gere um APK assinado.

Sempre que alterar `index.html`, `style.css` ou `app.js`, execute:

```bash
npx cap sync android
```

e gere novamente o APK.

## Observações técnicas

- Favoritos e eventos concluídos são salvos em `localStorage` no próprio aparelho.
- O status automático considera a data local do aparelho: Próximo, Em andamento ou Concluído. A marcação manual como concluído tem prioridade.
- O calendário contém somente os 20 registros informados. Eventos com período aparecem em todos os dias abrangidos no calendário.
- A data “DBV por 01 dia” foi mantida com a observação “Confirmar a data”.
- O Service Worker atende a versão web hospedada em localhost/HTTPS. No APK, os arquivos locais são fornecidos pelo próprio pacote nativo.
- Para uso totalmente offline, não há fontes externas, bibliotecas CDN, banco remoto ou requisições de API.
