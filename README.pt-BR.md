# Higgs Noti

[English](README.md) | [한국어](README.ko.md) | [简体中文](README.zh-CN.md) | [Русский](README.ru.md) | [Español](README.es.md) | **Português (BR)** | [日本語](README.ja.md)

Um userscript de navegador que avisa quando a geração de um vídeo termina no Higgsfield ([higgsfield.ai](https://higgsfield.ai)).
O tempo de geração varia a cada vez, então você não precisa mais ficar de olho na aba.

> ⚠️ Ferramenta **não oficial**. Sem qualquer vínculo com a Higgsfield.
> Ela apenas lê a página (DOM) para exibir um aviso; não coleta nem redistribui conteúdo, nem burla nenhum pagamento.

## Recursos

- **Banner na tela** — sem permissão, sempre visível
- **Som** — toca depois que você clicar na página pelo menos uma vez (política de reprodução automática do navegador)
- **Notificação na área de trabalho** — quando as notificações do SO/navegador são permitidas
- **Marca ✅ no título da aba** — perceptível mesmo quando você está em outra aba

## Instalação

1. Instale o [Tampermonkey](https://www.tampermonkey.net/) no seu navegador
2. ★ **Ative "Permitir userscripts (Allow User Scripts)"** — obrigatório em Chrome/Edge/Whale recentes
   `Gerenciar extensões → Modo de desenvolvedor ON → Detalhes do Tampermonkey → Permitir userscripts ON`
   (se estiver desativado, o script não roda de forma alguma)
3. Abra [`higgs-noti.user.js`](higgs-noti.user.js) para instalar → atualize a aba do Higgsfield (F5)
4. Funciona se um banner `🎬 Notifier running (active N)` aparecer no canto superior direito

## Como funciona

Os blocos que estão gerando têm um **atributo de status da tarefa** como `data-job-status="queued"`/`"processing"`.
Quando um bloco "em andamento" desaparece, ele dispara um aviso **somente se o restante da lista (tela) permaneceu igual** — ou seja, uma conclusão real.
Se a lista inteira muda porque você trocou de pasta ou rolou, isso é distinguido de uma conclusão, então não há alarmes falsos.

## Solução de problemas

- **Nem o banner aparece** → "Permitir userscripts" está desativado ou o script está desabilitado.
  Verifique o log `[힉스알림] 시작, 진행중 = N` no console (F12).
- **Só falta a notificação do SO** → desative o Assistente de foco do Windows e defina as notificações do site como "Permitir".
  (se o banner/som funcionam, o script em si está OK)
- **A conclusão não é detectada** → a Higgsfield mudou o atributo/valor `data-job-status`.
  Inspecione (F12) um bloco em geração, confira o atributo real e ajuste a regex/seletor `ACTIVE` do script.

## Doação

Se esta ferramenta te ajudou, considere apoiá-la 🙏

[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-db61a2?logo=githubsponsors)](https://github.com/sponsors/happybinnyy)

- GitHub Sponsors: https://github.com/sponsors/happybinnyy

Você também pode apoiar pelo botão **♥ Sponsor** no topo do repositório.

## Licença

[MIT](LICENSE)

---

<sub>O Higgs Noti é a primeira ferramenta do futuro projeto **AI Field**, que reunirá várias ferramentas de conveniência de IA.</sub>
