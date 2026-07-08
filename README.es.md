# Higgs Noti

[English](README.md) | [한국어](README.ko.md) | [简体中文](README.zh-CN.md) | [Русский](README.ru.md) | **Español** | [Português (BR)](README.pt-BR.md) | [日本語](README.ja.md)

Un userscript de navegador que te avisa cuando termina la generación de un vídeo en Higgsfield ([higgsfield.ai](https://higgsfield.ai)).
El tiempo de generación varía cada vez, así que ya no tienes que estar pendiente de la pestaña.

> ⚠️ Herramienta **no oficial**. Sin relación alguna con Higgsfield.
> Solo lee la página (DOM) para mostrar un aviso; no recopila ni redistribuye contenido, ni elude ningún pago.

## Funciones

- **Banner en pantalla** — sin permisos, siempre visible
- **Sonido** — se reproduce una vez que has hecho clic en la página al menos una vez (política de reproducción automática del navegador)
- **Notificación de escritorio** — si se permiten las notificaciones del SO/navegador
- **Marca ✅ en el título de la pestaña** — visible aunque estés en otra pestaña

## Instalación

1. Instala [Tampermonkey](https://www.tampermonkey.net/) en tu navegador
2. ★ **Activa "Permitir userscripts (Allow User Scripts)"** — obligatorio en Chrome/Edge/Whale recientes
   `Administrar extensiones → Modo de desarrollador ON → Detalles de Tampermonkey → Permitir userscripts ON`
   (si está desactivado, el script no se ejecutará en absoluto)
3. Abre [`higgs-noti.user.js`](higgs-noti.user.js) para instalarlo → recarga la pestaña de Higgsfield (F5)
4. Funciona si aparece un banner `🎬 Notifier running (active N)` en la esquina superior derecha

## Cómo funciona

Las tarjetas que se están generando llevan un **atributo de estado de tarea** como `data-job-status="queued"`/`"processing"`.
Cuando una tarjeta "en curso" desaparece, lanza un aviso **solo si el resto de la lista (vista) se mantuvo igual**, es decir, una finalización real.
Si toda la lista cambia porque cambiaste de carpeta o te desplazaste, se distingue de una finalización, así que no hay falsas alarmas.

## Solución de problemas

- **Ni siquiera aparece el banner** → "Permitir userscripts" está desactivado o el script está deshabilitado.
  Comprueba el registro `[힉스알림] 시작, 진행중 = N` en la consola (F12).
- **Solo falta la notificación del SO** → desactiva el Asistente de concentración de Windows y pon las notificaciones del sitio en "Permitir".
  (si el banner/sonido funcionan, el script en sí está bien)
- **No se detecta la finalización** → Higgsfield cambió el atributo/valor `data-job-status`.
  Inspecciona (F12) una tarjeta en generación, comprueba el atributo real y ajusta la regex/selector `ACTIVE` del script.

## Donación

Si esta herramienta te ha sido útil, considera apoyarla 🙏

[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-db61a2?logo=githubsponsors)](https://github.com/sponsors/happybinnyy)

- GitHub Sponsors: https://github.com/sponsors/happybinnyy

También puedes patrocinar con el botón **♥ Sponsor** en la parte superior del repositorio.

## Licencia

[MIT](LICENSE)

---

<sub>Higgs Noti es la primera herramienta del próximo proyecto **AI Field**, que reunirá varias herramientas útiles de IA.</sub>
