# Audit iniziale — framelabweb.it

**Data:** 27 novembre 2026
**Branch:** `redesign/framelab-v2` (creato da `main` @ `267fb75`)
**Ambiente di analisi:** repository locale + sito pubblicato `https://www.framelabweb.it` (raggiungibile; l'HTML della home pubblicata è identico byte per byte a `index.html` del repository).
**Strumenti usati:** lettura del codice, Playwright (Chromium) su sito live, `curl` per header HTTP, script Node per i contrasti WCAG.
**Non eseguiti in questa fase:** Lighthouse (non installato nel progetto; previsto in Fase 4), validatore W3C, screen reader reale, test su Safari/iOS e Firefox, invio reale del form (eviterebbe un'email vera a info@).

Screenshot "prima" in [`docs/screenshots/prima/`](screenshots/prima/).

---

## A. Quadro generale

### Stack e architettura
- **Sito statico puro**: HTML + un solo `styles.css` (~19 KB) + un solo `main.js` (~3,6 KB). Nessun build, nessun framework, nessuna dipendenza npm.
- **Hosting**: GitHub Pages (`Server: GitHub.com`, file `CNAME` → `www.framelabweb.it`), repository `Marchettoh/framelab`.
- **Font**: Google Fonts da CDN (Inter, Space Grotesk, Comfortaa).
- **Form contatti**: servizio esterno FormSubmit (`formsubmit.co`).
- **Nessun README, `.gitignore`, `package.json`, lint o test.** Non c'è niente da "buildare": lo stato di build è "n/d", il sito funziona servendo i file così come sono.

### Pagine
| Pagina | File | Note |
|---|---|---|
| Home (one-page: hero, servizi, processo, prodotti, chi siamo, contatti) | `index.html` | unica con canonical e Open Graph |
| Nexogo | `prodotti/nexogo.html` | |
| Gestora | `prodotti/gestora.html` | |
| Cashflow | `prodotti/cashflow.html` | |
| Cookie policy | `cookie-policy.html` | non carica `main.js` |
| Privacy policy | `privacy-policy.html` | non carica `main.js` |
| 404 | `404.html` | |
| Verifica Search Console | `googlebb128b8b82c6b0a7.html` | **da non toccare** |

### Componenti ricorrenti
Header/nav (duplicato a mano in 6 file), logo SVG inline (duplicato 12+ volte), card servizio, step processo, card prodotto, griglia statistiche, box CTA con form, footer (3 varianti diverse), banner cookie (generato da JS).

### Dipendenze
Nessuna dipendenza npm. Unica "dipendenza" esterna: Google Fonts (3 famiglie, 7 pesi caricati realmente) e FormSubmit.

### Punti di forza da conservare
1. **Marchio "F" a due tratti** (bianco + viola, inclinato): semplice, riconoscibile, funziona da 16 px a 460 px. È l'asset più forte del sito.
2. **Palette navy + viola** coerente e già distintiva.
3. **Leggerezza**: zero framework, pochissimi file, ottimo punto di partenza per le prestazioni.
4. **Prodotti reali e funzionanti** (Nexogo, Gestora, Cashflow, più il caso TurboMastin): sono la prova di competenza più credibile che il sito possiede.
5. **Testi dei prodotti** concreti e specifici (es. "4 passaggi guidati, GPS in background, funzionamento offline").
6. Già presenti: `prefers-reduced-motion` parziale, sitemap, robots, OG image, manifest, favicon multi-formato.
7. Contatti multipli (form, email, WhatsApp, telefono) a portata di mano.

---

## B. Grafica e UX

### Identità visiva attuale
- **Colori**: navy `#0B1020`, viola `#7C3AED`, ciano `#22D3EE`, grigio `#F3F4F6`, testo `#1A2032` / `#5B6478`.
- **Tipografia**: Space Grotesk (titoli), Inter (testo), Comfortaa (solo per la scritta "FRAME LAB"). Tre famiglie per un sito di una pagina sono una in più del necessario: Comfortaa è usata solo nel wordmark, che potrebbe essere un SVG (in `logo-lockup.svg` esiste già in tracciati).
- **Iconografia**: icone stile Feather/Lucide in riquadri viola sfumati, tutte uguali.
- **Immagini**: nessuna fotografia, nessuno screenshot dei prodotti. Il sito parla di software ma non ne mostra mai uno.

### Gerarchia e messaggio sopra la piega
- Titolo **"Ideas into reality."** in inglese, su un sito interamente in italiano rivolto ad aziende locali (Verona). È un claim di brand, ma **non dice cosa fa Frame Lab né per chi**. Chi arriva deve leggere il sottotitolo per capirlo.
- L'eyebrow ripete il nome ("Frame Lab | Software & Digital Solutions") già presente nel logo.
- I tag sotto la hero ("Software su misura · Prodotti digitali · Consulenza tecnologica") sono la parte più informativa, ma sono in maiuscoletto grigio piccolo, il livello di enfasi più basso.
- Su desktop il banner cookie copre parte della hero alla prima visita (vedi `home-1440.png`).

### Percorso verso il contatto
- CTA primaria coerente ("Avvia il tuo progetto" / "Parliamone") → ancora `#contatti`. Bene.
- Il form è in fondo alla pagina, dentro un box scuro: è l'unico punto di conversione e funziona, ma:
  - non ha **etichette visibili** (solo placeholder, che spariscono durante la digitazione);
  - non dice **cosa succede dopo** (tempi di risposta, chi risponde);
  - la conferma d'invio dipende da un redirect `?inviato=1` gestito da JS.
- Le pagine prodotto hanno CTA incoerenti: in **Gestora** il box dice "Scrivici per una demo" ma il bottone porta al sito esterno, non al form.

### Incoerenze e punti poco curati
- **Statistiche decorative** "100 % su misura / 360° di supporto / 24/7 monitoring / 1 obiettivo: il tuo": non sono dati, ma vengono presentate con contatori animati come se lo fossero. "24/7 monitoring" è anche un **impegno di servizio** dichiarato: va confermato o rimosso (vedi `dati-da-confermare.md`, da creare).
- "Siamo un team di designer, sviluppatori e consulenti" — da confermare (composizione reale del team).
- Card servizi: 5 card in griglia `auto-fit` → a 1440 px risultano 4 + 1 orfana sulla seconda riga.
- Card tutte identiche (stessa icona in riquadro viola, stesso hover di sollevamento): servizi, step, prodotti e statistiche usano lo stesso linguaggio "card che si alza", nessuna gerarchia tra di loro.
- Tre footer diversi: home (completo), prodotti (senza link legali né contatti), policy (solo copyright).
- Le pagine policy non hanno navigazione né link incrociati.
- Uso del carattere "|" come separatore ovunque, anche in frasi ("0% commissioni | abbonamento fisso mensile"): leggibile ma poco curato tipograficamente.
- Mancano **dati aziendali** (ragione sociale, P.IVA, indirizzo). Per un'attività italiana la P.IVA sul sito è in genere richiesta: da verificare con il commercialista.

### Esperienza mobile
- **A 320 px c'è scroll orizzontale** sulla home: le card prodotto hanno `minmax(320px, 1fr)` e diventano più larghe del viewport (verificato: `scrollWidth > innerWidth`).
- **Menu mobile rotto dopo lo scroll** (verificato a 375 px): quando l'header ha la classe `.scrolled`, il suo `backdrop-filter` diventa il contenitore dei figli `position: fixed`, quindi il pannello del menu è alto **64 px invece di 800**; le voci si sovrappongono al contenuto della pagina (vedi `menu-mobile-scrolled-375.png`). Il menu funziona solo in cima alla pagina.
- Il menu non si chiude con **Esc**, non blocca lo scroll del body, e da chiuso le sue voci restano **raggiungibili col tasto Tab** pur essendo fuori schermo (focus invisibile, verificato).
- Sulle pagine prodotto l'header nasce con `.scrolled`, ma `main.js` lo rimuove in cima alla pagina: comportamento diverso da quello voluto nell'HTML.

---

## C. Dinamicità e interazione

### Dove il sito appare statico
- Dopo la hero, ogni sezione è una griglia di card con lo stesso ingresso dal basso: il ritmo è uniforme e la pagina sembra un template.
- Le sezioni Processo e Chi siamo sono testo puro, senza alcun elemento che le distingua.
- I prodotti non hanno nessun elemento visivo (screenshot, mockup, icona di prodotto).

### Dove il movimento aiuterebbe
- **Hero**: il disegno del marchio "F" è già un buon elemento distintivo; può diventare il filo conduttore (es. il tratto che "inquadra" i contenuti — *frame*).
- **Processo**: una linea di avanzamento che collega i 4 step allo scroll spiega la sequenza meglio di 4 card identiche.
- **Menu mobile**: oggi scivola dall'alto senza stagger, senza gestione focus.
- **Form**: stati di focus, validazione inline, stato "invio in corso" e conferma.
- **Link prodotto**: transizione verso la pagina di dettaglio (View Transitions API, con fallback nullo).

### Dove l'animazione è dannosa o superflua
- **Contenuti nascosti finché JS non parte**: tutti i 32 elementi `.reveal` (incluso l'**H1**) hanno `opacity: 0` via CSS. Con JavaScript disattivato la home è **completamente vuota** sotto l'header (verificato: `home-1440-senza-js.png`). Anche negli screenshot a pagina intera alcune sezioni non risultano rivelate: il meccanismo è fragile.
- **H1 animato**: il Largest Contentful Paint misurato è proprio lo `<span class="reveal">` del titolo, a ~1,0 s su desktop con cache: l'animazione ritarda l'elemento principale.
- **Contatori animati** su numeri che non sono metriche: senza JS mostrano "0", "0", "0", "0"; con `prefers-reduced-motion` continuano ad animarsi.
- **Glow sfumati in movimento continuo** (`drift` 14–18 s infinito): consumano GPU (blur 120 px) per un effetto poco percepibile.
- Hover di sollevamento identico su tutte le card, anche quelle non cliccabili (servizi, step, statistiche): suggerisce un'interazione che non esiste.

---

## D. Qualità tecnica

### HTML semantico
- Buona base: `header`, `nav`, `main`, `section`, `article`, `footer`, `ol` per i passaggi.
- Struttura titoli della home corretta (1 H1 → H2 per sezione → H3). Nelle pagine prodotto l'H1 è il nome prodotto: ok.
- Le sezioni non hanno `aria-labelledby`; il logo-link `href="#top"` punta a `<main id="top">` invece che all'inizio della pagina.
- Policy: `<nav class="nav-links">` senza `aria-label`.

### Accessibilità
| Verifica | Esito |
|---|---|
| Skip link | **Assente** |
| Focus visibile | Solo l'outline di default del browser; nei campi del form `outline: none` con solo cambio bordo |
| Label form | **Assenti** (3 campi con solo placeholder; verificato `labels.length = 0`) |
| `autocomplete` nei campi | Assente |
| Menu mobile | `aria-expanded` presente; manca `aria-controls`, chiusura con Esc, gestione focus |
| Contenuto senza JS | **Invisibile** |
| Reduced motion | Rispettato per reveal, glow e disegno logo; **non** per i contatori |
| Contrasti (WCAG AA 4,5:1 testo normale) | vedi tabella sotto |

Contrasti calcolati (script Node, colori dal CSS, alpha composto su `#0B1020`):

| Coppia | Rapporto | Esito AA |
|---|---|---|
| Viola `#7C3AED` su grigio `#F3F4F6` (eyebrow) | 5,18 | ok |
| Muted `#5B6478` su grigio | 5,39 | ok |
| Bianco 72 % su navy (sottotitolo hero) | 9,99 | ok |
| Bianco 55 % su navy (tag hero) | 6,18 | ok |
| Bianco su viola (bottone primario) | 5,70 | ok |
| **Viola su navy** (link email/telefono nel footer, breadcrumb pagine prodotto) | **3,32** | **non conforme** |
| **Bianco 35 % su navy** (copyright footer) | **3,20** | **non conforme** |
| **Bianco 40 % su navy** (placeholder, usati come unica etichetta) | **3,83** | **non conforme** |
| Bianco 45 % su navy ("Verona, IT") | 4,53 | limite |

### Prestazioni (misure reali, Chromium desktop, cache calda, rete non limitata)
- Risorse caricate: 8; DOMContentLoaded ~111 ms; **CLS = 0,0000**; **LCP ~1,0 s** (causato dal ritardo dell'animazione, non dal peso).
- Il peso è basso: CSS 19 KB, JS 3,6 KB, nessuna immagine nel contenuto, OG image 40 KB.
- Punti migliorabili:
  - Google Fonts: 2 connessioni a domini terzi + CSS bloccante; 7 pesi di 3 famiglie. Self-hosting di 2 famiglie in WOFF2 sottoinsieme latino ridurrebbe richieste e risolverebbe anche il punto privacy.
  - `filter: blur(120px)` animato all'infinito su due elementi grandi: costo GPU su mobile.
  - `logo-lockup.svg` importa Google Fonts anche se il testo è già in tracciati.
- **Non misurato**: Lighthouse, rete 4G simulata, dispositivo mobile reale. Da fare in Fase 4.

### SEO tecnica
| Elemento | Stato |
|---|---|
| Title / description | Presenti e unici su tutte le pagine (404 senza description, corretto con `noindex`) |
| H1 home | "Ideas into reality." — **nessuna parola chiave** (software house, gestionali, Verona…) |
| Canonical | **Solo in home**; mancante su prodotti e policy |
| Open Graph / Twitter | **Solo in home**; le pagine prodotto condivise usano anteprime generiche |
| Sitemap / robots | Presenti e corretti; sitemap senza `lastmod` |
| Dati strutturati | **Assenti** (Organization / LocalBusiness / SoftwareApplication possibili solo con dati verificati) |
| URL | Link interni a `index.html` e `../index.html#…` oltre a `/`: due URL per la stessa home |
| Lingua | `lang="it"` ok; titolo e OG description in parte in inglese |
| **Pagina 404** | **Rotta su percorsi annidati**: usa percorsi relativi (`styles.css`, `favicon.svg`, `index.html`). Su `/prodotti/non-esiste` il CSS va in 404 e la pagina appare senza stile (verificato, vedi `404-375.png`/`404-1440.png`) |

### Errori console e risorse
- Home e pagine prodotto: **nessun errore console**, nessuna risorsa rotta.
- 404 annidata: `prodotti/styles.css` e `prodotti/favicon.svg` → 404.
- Link esterni con `target="_blank"` hanno tutti `rel="noopener"`: ok.

### Sicurezza di base
- HTTPS attivo (GitHub Pages). Header di sicurezza non configurabili su GitHub Pages (niente HSTS esplicito, CSP, X-Frame-Options nelle risposte osservate). Una CSP via `<meta>` è possibile e consigliata.
- Il form invia a FormSubmit con **`_captcha=false`** e senza honeypot: esposto a spam.
- Il redirect `_next` è un URL assoluto fisso: corretto.
- Il banner cookie usa `localStorage` senza `try/catch`: in contesti dove lo storage è bloccato lo script lancia un'eccezione (non verificato su browser reali, rischio basso).

### Form, cookie e script di terze parti
Richieste osservate al caricamento della home: solo `www.framelabweb.it`, `fonts.googleapis.com`, `fonts.gstatic.com`. Nessun cookie impostato. `localStorage` usato solo dopo il click sul banner (`fl_cookie_consent`).

Problemi rilevati (da far verificare a un professionista privacy, **non** è un parere legale):
1. **La Privacy Policy dice che il sito "non raccoglie dati personali attraverso form"**, ma il sito ha un form che invia nome, email e messaggio a **FormSubmit**, servizio di terze parti (non menzionato tra i destinatari). Incoerenza da correggere.
2. **Google Fonts** viene caricato prima di qualsiasi scelta e trasmette l'IP a Google. La cookie policy lo dichiara, ma il self-hosting eliminerebbe la questione alla radice.
3. **Il banner cookie offre "Solo necessari" e "Accetta", che fanno esattamente la stessa cosa** (salvano solo la scelta). Dato che non esistono cookie non tecnici, il banner è superfluo e la doppia scelta può risultare fuorviante. Proposta: eliminarlo o trasformarlo in una semplice informativa, previa conferma.
4. Pagine prodotto: footer senza link a privacy e cookie policy.
5. Mancano gli estremi del titolare (ragione sociale, P.IVA, indirizzo) nelle policy.

---

## E. Priorità

Legenda impatto/difficoltà: **A** alto · **M** medio · **B** basso.

### Critici
| # | Problema | Dove | Perché conta | Soluzione proposta | Impatto | Difficoltà |
|---|---|---|---|---|---|---|
| C1 | Contenuto invisibile senza JS (H1 incluso) | `styles.css` `.reveal`, `main.js` | Se lo script fallisce o tarda, la pagina è vuota; fragile anche per crawler e strumenti di anteprima | Nascondere solo se JS è attivo (`html.js .reveal`), H1 sempre visibile | A | B |
| C2 | Menu mobile rotto dopo lo scroll | `styles.css` `.nav.scrolled` + `.nav-links` fixed | Su mobile la navigazione è inutilizzabile a metà pagina | Spostare il pannello fuori dall'elemento con `backdrop-filter` o applicare il blur a uno pseudo-elemento | A | B |
| C3 | Form senza label, focus poco visibile, nessuno skip link | `index.html` form, CSS | Accessibilità di base del punto di conversione principale | Label visibili, `autocomplete`, `:focus-visible` marcato, skip link | A | B |
| C4 | Privacy policy in contraddizione con il form (FormSubmit non dichiarato) | `privacy-policy.html` | Informativa non veritiera sul trattamento dati | Aggiornare il testo (bozza da far validare) | A | B |
| C5 | Statistiche non verificabili presentate come dati ("24/7 monitoring" ecc.) | home, sezione prodotti | Promessa di servizio forse non reale; credibilità | Rimuovere o sostituire con fatti verificati | A | B |

### Importanti
| # | Problema | Dove | Perché conta | Soluzione | Impatto | Difficoltà |
|---|---|---|---|---|---|---|
| I1 | Hero non dice cosa fate e per chi | `index.html` hero | Primo impatto, SEO dell'H1 | H1 in italiano descrittivo; "Ideas into reality" resta come firma di brand | A | B |
| I2 | 404 senza stile su percorsi annidati | `404.html` | Esperienza rotta, immagine poco curata | Percorsi assoluti `/…` | M | B |
| I3 | Scroll orizzontale a 320 px | `.products` `minmax(320px…)` | Layout rotto su telefoni piccoli | `minmax(min(320px,100%),1fr)` | M | B |
| I4 | Canonical e OG mancanti su prodotti/policy | pagine secondarie | Condivisioni e indicizzazione | Aggiungere per ogni pagina | M | B |
| I5 | Contrasti insufficienti (footer, placeholder, breadcrumb) | CSS | WCAG AA | Viola chiaro per link su navy, alpha ≥ 0,6 | M | B |
| I6 | Menu: niente Esc, focus su voci nascoste, scroll non bloccato | `main.js`, CSS | Tastiera e screen reader | `inert`/`visibility`, Esc, focus al primo link, blocco scroll | M | B |
| I7 | Nessuna prova visiva dei prodotti | home, pagine prodotto | Il sito vende software senza mostrarlo | Screenshot reali dei prodotti (da fornire) | A | M |
| I8 | Form esposto a spam, nessun feedback di stato | form | Affidabilità contatti | Honeypot `_honey`, stato di invio, testo "cosa succede dopo" | M | B |
| I9 | Footer e header duplicati e incoerenti tra pagine | tutti gli HTML | Coerenza e manutenzione | Uniformare il markup (stesso footer completo ovunque) | M | B |
| I10 | Dati aziendali assenti (P.IVA, ragione sociale) | footer, policy | Requisito da verificare; fiducia | Inserire con dati forniti dal cliente | M | B |

### Miglioramenti
| # | Problema | Soluzione | Impatto | Difficoltà |
|---|---|---|---|---|
| M1 | 3 famiglie di font da Google | Self-hosting Inter + Space Grotesk in WOFF2; wordmark come SVG | M | M |
| M2 | Card tutte uguali con hover ovunque | Linguaggi diversi per servizi / processo / prodotti; hover solo su elementi cliccabili | M | M |
| M3 | Banner cookie superfluo e ambiguo | Rimuoverlo (previa conferma) o renderlo informativo | M | B |
| M4 | Contatori animati senza senso | Eliminati insieme alle statistiche | B | B |
| M5 | Glow animati infiniti con blur | Gradienti statici, niente animazione continua | B | B |
| M6 | CTA Gestora incoerente | "Richiedi una demo" → form contatti | M | B |
| M7 | Link interni a `index.html` | Usare `/` e `/#sezione` | B | B |
| M8 | Dati strutturati assenti | `Organization` con soli dati verificati | B | B |
| M9 | Separatore "\|" nei testi | Punteggiatura italiana corretta | B | B |
| M10 | Manca README / `.gitignore` | Aggiungerli (CLAUDE.md aziendale li richiede) | B | B |

### Idee facoltative
- Sezione "Lavori" con TurboMastin e i tre prodotti come casi reali (con screenshot e contesto).
- Linea di avanzamento animata sulla sezione Processo.
- View Transitions tra home e pagine prodotto.
- CSP via `<meta>`.
- Pagina dedicata "Siti web" se il servizio è strategico.
- Versione inglese (solo se ci sono clienti esteri).

---

## Sintesi delle priorità principali
1. **Rendere il sito robusto**: contenuti visibili senza JS, menu mobile funzionante ovunque, 404 corretta, niente scroll orizzontale.
2. **Rendere il contatto accessibile e affidabile**: form con label, focus, antispam, feedback.
3. **Eliminare ciò che non è vero o verificabile**: statistiche decorative, frasi sul team, incoerenza della privacy policy.
4. **Dire subito cosa fa Frame Lab**: hero in italiano, specifica.
5. **Mostrare il lavoro**: i prodotti sono la prova più forte, ma oggi sono solo testo.
