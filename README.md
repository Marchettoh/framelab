# Frame Lab — sito web

Sito istituzionale di Frame Lab (software house, Verona), pubblicato su https://www.framelabweb.it tramite GitHub Pages.

## Stack

- HTML statico, un foglio di stile (`styles.css`) e uno script (`main.js`) in JavaScript vanilla.
- Nessun build, nessun framework e nessuna dipendenza npm.
- Font in self-hosting: Inter, Space Grotesk, Comfortaa (licenza SIL OFL), in `assets/fonts/`.
- Modulo contatti: FormSubmit (`formsubmit.co`), nessun backend proprio.
- Nessuno strumento di analisi o tracciamento.

## Struttura

```
index.html              home (servizi, carosello prodotti e lavori, metodo, studio, contatti)
prodotti/*.html         pagine prodotto (Nexogo, Gestora, Cashflow)
privacy-policy.html     informativa privacy (bozza da validare)
cookie-policy.html      cookie policy (bozza da validare)
404.html                pagina di errore (percorsi assoluti)
styles.css              stili: token, componenti, responsive, stampa
main.js                 miglioramenti progressivi: menu, carosello, form, reveal, banner
assets/fonts, assets/img  font e screenshot dei prodotti
icons/, *.svg           favicon, icone PWA, logo
sitemap.xml, robots.txt, manifest.webmanifest, CNAME
googlebb128b8b82c6b0a7.html  verifica Google Search Console: non modificare né rimuovere
docs/                   audit, direzione creativa, dati da confermare, report (documenti interni)
```

## Sviluppo locale

Basta un qualsiasi server statico dalla cartella del progetto, per esempio:

```powershell
npx --yes http-server -p 5500 -c-1
```

Poi apri http://localhost:5500. Aprire i file direttamente con `file://` funziona solo in parte: la 404 usa percorsi assoluti.

## Regole tecniche da rispettare

- **CSP restrittiva** (meta in ogni pagina): niente script o stili inline, niente attributi `style=""`. Le variabili CSS dinamiche si impostano da JS con `style.setProperty`.
- **Senza JavaScript il sito resta completo**: `main.js` aggiunge la classe `js` a `<html>` e solo allora si attivano animazioni, carosello con frecce e menu mobile.
- **Movimento ridotto**: tutte le animazioni rispettano `prefers-reduced-motion`.
- Header e footer sono ripetuti in ogni pagina: se cambi una voce di menu, aggiornala ovunque.

## Pubblicazione

GitHub Pages pubblica il branch `main`. Prima del merge leggi `docs/report-finale.md` (sezione pubblicazione e rollback); la cartella `docs/` verrebbe pubblicata anch'essa se non esclusa.
