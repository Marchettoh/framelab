# Report finale — redesign framelabweb.it

**Branch:** `redesign/framelab-v2` (da `main` @ `267fb75`). Niente push, niente merge, niente modifiche a DNS o hosting.
**Data:** 27 novembre 2026

Documenti collegati: [audit iniziale](audit-iniziale.md) · [direzione creativa](direzione-creativa.md) · [dati da confermare](dati-da-confermare.md) · screenshot [prima](screenshots/prima/) e [dopo](screenshots/dopo/).

---

## 1. Cosa è cambiato

### Home
- **H1 in italiano** che dice cosa fa Frame Lab e per chi ("Gestionali, app e piattaforme web progettati sui processi della tua azienda."). "Ideas into reality." resta come firma sotto la hero.
- **Nuova sequenza:** Servizi → Prodotti e lavori → Metodo → Studio → Contatti. Le sezioni hanno indici numerati con l'angolo a L del logo come motivo ricorrente ("il telaio").
- **Carosello orizzontale prodotti e lavori** (ispirato per il tipo di interazione a inserzionisti.com, codice e grafica originali). Ha cinque schede: Nexogo, Gestora, Cashflow, TurboMastin e una scheda finale "Il prossimo progetto può essere il tuo" che porta al form.
  - Lo scorrimento è nativo (scroll-snap, trascinamento, trackpad, tastiera).
  - Frecce, contatore 01/05 e barra di avanzamento si attivano solo con JS.
  - Non c'è autoplay.
- **Screenshot reali dei prodotti**, catturati dalle pagine pubbliche dei siti (autorizzato). Il sito prima non mostrava nessun software.
- **Form contatti accessibile:**
  - etichette visibili;
  - messaggi d'errore in italiano collegati ai campi;
  - focus sul primo campo errato;
  - stato "Invio in corso…" e protezione dal doppio invio;
  - messaggio di conferma al ritorno da FormSubmit (`?inviato=1`);
  - campo honeypot anti-spam.
- **Menu mobile riscritto:**
  - a schermo intero;
  - chiusura con Esc e focus restituito al pulsante;
  - resto della pagina inerte mentre il menu è aperto.
- **Header** trasparente sulla hero, con sfondo pieno dopo il primo scroll. Evidenzia la sezione in cui ci si trova.

### Pagine prodotto, policy, 404
- Header e footer uguali su tutte le pagine (prima c'erano tre varianti di footer).
- **Nexogo e Gestora:** hero con screenshot, funzionalità, sezione "perché", invito finale al contatto.
- **Cashflow:** rimossi tutti i link a `cashflow.framelabweb.it`, che **non esiste** (NXDOMAIN). Al loro posto c'è "Chiedi informazioni" verso il form e un segnaposto dichiarato per l'anteprima.
- **Privacy policy:** è una bozza. La versione pubblicata diceva che il sito non raccoglie dati tramite form, il che è falso. Ora descrive il modulo, FormSubmit e l'hosting. I segnaposto sono evidenziati in giallo.
- **Cookie policy:** allineata allo stato reale (solo storage tecnico, font ospitati sul sito).
- **404:** percorsi assoluti, quindi funziona a qualsiasi profondità di URL. Niente stili inline.

### Tecnica, SEO, accessibilità
- Font **in self-hosting** (Inter, Space Grotesk, Comfortaa; licenza OFL; 77 KB in tutto). Nessuna richiesta a Google Fonts.
- **Content Security Policy** restrittiva in ogni pagina: niente script o stili inline, form solo verso FormSubmit.
- Skip link "Vai al contenuto", focus visibile, `prefers-reduced-motion` rispettato ovunque.
- Il sito funziona **senza JavaScript**: contenuti visibili, nav leggibile, form inviabile.
- Title, description, canonical, Open Graph e dati strutturati `Organization` sulla home. Sitemap con `lastmod`.
- **Banner cookie** ridotto a semplice informativa con "Ok", come da tua scelta. Non ci sono tracciamenti da autorizzare.
- Stili di stampa.

## 2. File toccati
| File | Modifica |
|---|---|
| `index.html` | riscritto |
| `styles.css` | riscritto (≈36 KB non minificato) |
| `main.js` | riscritto (≈10 KB): header, menu, reveal, nav attiva, carosello, form, banner |
| `prodotti/nexogo.html`, `gestora.html`, `cashflow.html` | riscritti |
| `privacy-policy.html`, `cookie-policy.html`, `404.html` | riscritti |
| `sitemap.xml` | aggiunto `lastmod` |
| `assets/fonts/*` | nuovi (woff2 + licenze) |
| `assets/img/*` | nuovi screenshot prodotti e TurboMastin |
| `README.md` | nuovo |
| `docs/*` | nuovi (audit, direzione creativa, dati da confermare, screenshot, questo report) |

Invariati: `CNAME`, `robots.txt`, `manifest.webmanifest`, icone, logo e `googlebb128b8b82c6b0a7.html` (verifica Search Console, non toccare).

## 3. Decisioni di design
- **Il marchio resta il protagonista.** Ho conservato la palette navy/viola e la "F" a due tratti. Il tratto viola della F si disegna in hero (una sola volta, niente se è attivo il movimento ridotto).
- **Un solo motivo grafico**, l'angolo a L del logo. Compare negli indici di sezione, negli angoli delle schede al passaggio e al focus, nei punti elenco e nelle barre di avanzamento.
- **Dinamico ma sobrio:**
  - ingressi brevi, solo opacità e posizione;
  - riempimento progressivo della timeline del metodo;
  - carosello controllato dall'utente;
  - niente loader, cursore personalizzato, scroll bloccato o animazioni continue.
- **Nessuna informazione solo al passaggio del mouse.**

## 4. Contenuti rimossi o spostati, e perché
| Cosa | Perché |
|---|---|
| Statistiche "24/7", "100 %", "360°", "1 obiettivo" | erano slogan presentati come dati; rimosse su tua indicazione |
| Elenchi di funzionalità nelle card prodotto della home | spazio ridotto nel carosello; restano completi nelle pagine prodotto |
| Link esterni a Cashflow | il dominio non esiste: portavano a un errore |
| Link a TurboMastin dentro la descrizione del servizio "Siti Web" | ora punta alla scheda TurboMastin nel carosello, che ha il link "Visita il sito" |
| Google Fonts da CDN | sostituito dal self-hosting (stessi font) |

Nessuna pagina, form o funzionalità è stata eliminata. Non c'erano tracciamenti.

## 5. Dipendenze
Nessuna nuova libreria e nessun pacchetto npm. Gli unici file aggiunti sono i font in self-hosting.

## 6. Test eseguiti (Playwright, Chromium, server locale)
| Controllo | Esito |
|---|---|
| Overflow orizzontale su 7 pagine × 6 larghezze (320, 375, 390, 768, 1024, 1440) | nessuno |
| Errori in console e risorse fallite | nessuno (a parte il 404 voluto della pagina di prova `/non-esiste`) |
| Tastiera: primo Tab → skip link; Invio → salto al contenuto | ok |
| Carosello: frecce, contatore, stato disabilitato alla fine, freccia → da tastiera | ok |
| Menu mobile 375: apertura, focus sulla prima voce, `main` inerte, Esc chiude e restituisce il focus | ok |
| Form vuoto: 3 errori, focus sul primo campo, nessun invio | ok |
| Email non valida: messaggio specifico | ok |
| Conferma `?inviato=1` | ok |
| Movimento ridotto: tutti i 27 elementi animati visibili subito | ok |
| Senza JS (home e Nexogo a 375): 0 elementi nascosti, 5 schede, 4 voci di nav, form con action FormSubmit | ok |

**Il form non è mai stato inviato davvero.** Durante i test le richieste a formsubmit.co erano bloccate.

**Non eseguiti:**
- Lighthouse: non installato, e installarlo avrebbe richiesto dipendenze pesanti. Puoi lanciarlo da Chrome DevTools sulla anteprima.
- Validatore W3C.
- Test con screen reader reale.
- Safari/iOS e Firefox.
- Misure di prestazione sul sito pubblicato.

Non riporto punteggi che non ho misurato.

## 7. Problemi residui
- **Cashflow:** manca il dominio dell'app e manca uno screenshot.
- **Privacy e cookie policy** sono bozze. Vanno completate con ragione sociale e P.IVA e fatte validare da un professionista, soprattutto sul trasferimento dati di FormSubmit fuori dall'UE. Non posso garantire la conformità legale.
- Header e footer sono duplicati a mano in ogni pagina: chi modifica una voce deve aggiornarla ovunque.
- La sezione `docs/` (≈ 11 MB con gli screenshot) verrebbe pubblicata da GitHub Pages con il merge. Vedi sotto.
- I testi della home sono ripresi in gran parte dal sito attuale. Alcune affermazioni restano da confermare: metodo, assistenza post-lancio, "25/30 %" dei marketplace.

## 8. Dati da confermare
Elenco completo in [dati-da-confermare.md](dati-da-confermare.md). I più urgenti:
1. dominio di Cashflow;
2. ragione sociale e P.IVA per footer e policy;
3. permesso di mostrare TurboMastin come lavoro;
4. prezzo Nexogo (IVA inclusa o esclusa?);
5. fonte del "25/30 %".

## 9. Pubblicazione (quando lo decidi tu)
1. Rivedi il branch in locale: `npx --yes http-server -p 5500 -c-1` dalla cartella del progetto.
2. Decidi cosa fare di `docs/`. Le opzioni:
   - spostarla fuori dal repository pubblicato;
   - rimuoverla nel commit di merge;
   - lasciarla (è innocua, ma pubblica audit e screenshot).
3. Completa i segnaposto delle policy (cerca `todo` in `privacy-policy.html` e `cookie-policy.html`).
4. Apri una pull request da `redesign/framelab-v2` verso `main` e fai il merge. GitHub Pages pubblica in pochi minuti.
5. Dopo la pubblicazione:
   - prova il form con un invio reale;
   - controlla la prima email di FormSubmit: potrebbe chiedere una nuova conferma dell'indirizzo;
   - lancia Lighthouse;
   - reinvia la sitemap da Search Console.

## 10. Rollback
`main` non è stato toccato. Se il sito pubblicato dà problemi, basta un `git revert` del commit di merge su `main` (oppure ripristinare `main` a `267fb75`) e un push: GitHub Pages ripubblica la versione precedente. DNS e `CNAME` non cambiano.
