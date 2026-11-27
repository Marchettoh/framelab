# Direzione creativa — Frame Lab v2

Riferimento: [audit-iniziale.md](audit-iniziale.md). Questo documento definisce il sistema visivo del redesign. Non è un rebranding: marchio, colori principali e tono restano quelli attuali, ma usati con più precisione.

---

## 1. Concept: "Il telaio"

Il marchio Frame Lab è una **F fatta di due tratti**: quello superiore curva verso il basso, quello inferiore è un angolo a L. Due angoli, cioè **i due pezzi di una cornice**.

Da qui viene il concept: Frame Lab **inquadra il problema e gli dà una struttura**. Il sito usa l'angolo a L del marchio come unico elemento grafico ricorrente:

- **Indice di sezione**: ogni sezione si apre con un piccolo angolo viola, un numero e un nome (`01 Servizi`, `02 Prodotti`…). Così la pagina si orienta da sola, senza badge decorativi.
- **Cornice della hero**: il marchio si disegna una sola volta al caricamento, poi resta fermo.
- **Stato attivo**: card cliccabili e campi del form "si inquadrano" (due angoli che compaiono agli spigoli) all'hover e al focus.
- **Linea del processo**: il tratto del marchio diventa la linea che collega i 4 passaggi e si riempie con lo scroll.

Un solo motivo, usato con coerenza, al posto di glow, sfumature e card tutte uguali.

**Tono visivo:** tecnico, preciso, calmo. Più "studio di progettazione" che "startup con neon".

---

## 2. Palette

Si tengono navy e viola. Il ciano passa da colore decorativo a **colore di stato** (successo, "online", focus su fondo scuro). Si aggiunge un viola chiaro, indispensabile per testo e link su fondo scuro: oggi il viola standard su navy è a 3,32:1, sotto la soglia AA.

| Token | Hex | Uso |
|---|---|---|
| `--navy` | `#0B1020` | fondo scuro principale, testo titoli su chiaro |
| `--navy-2` | `#141B33` | superfici su fondo scuro (card prodotto, form) |
| `--line-dark` | `#2A3352` | bordi e divisori su scuro (decorativo, non testo) |
| `--violet` | `#7C3AED` | colore del marchio, bottone primario, accenti su chiaro |
| `--violet-strong` | `#6D28D9` | hover del primario, link su chiaro |
| `--violet-light` | `#A78BFA` | testo/link/accenti viola **su fondo scuro** |
| `--cyan` | `#22D3EE` | solo stati: successo, focus su scuro, indicatore "attivo" |
| `--paper` | `#F4F4F7` | fondo chiaro di sezione |
| `--white` | `#FFFFFF` | card su chiaro |
| `--ink` | `#0B1020` | testo principale su chiaro |
| `--ink-2` | `#4B5468` | testo secondario su chiaro |
| `--mist` | `#C9CDD8` | testo principale su scuro |
| `--mist-2` | `#9AA1B4` | testo secondario su scuro (sostituisce bianco al 35–45 %) |
| `--error` (su chiaro) | `#B91C1C` | messaggi di errore |
| `--error` (su scuro) | `#F87171` | messaggi di errore nel form scuro |

### Contrasti verificati (formula WCAG 2.x, script Node)

| Testo | Fondo | Rapporto | AA testo normale |
|---|---|---|---|
| `#0B1020` ink | `#F4F4F7` paper | 17,25 | ✔ |
| `#4B5468` ink-2 | `#F4F4F7` paper | 6,91 | ✔ |
| `#4B5468` ink-2 | `#FFFFFF` | 7,59 | ✔ |
| `#7C3AED` violet | `#F4F4F7` paper | 5,19 | ✔ |
| `#6D28D9` violet-strong | `#FFFFFF` | 7,10 | ✔ |
| `#FFFFFF` | `#7C3AED` (bottone) | 5,70 | ✔ |
| `#FFFFFF` | `#6D28D9` (bottone hover) | 7,10 | ✔ |
| `#C9CDD8` mist | `#0B1020` navy | 11,91 | ✔ |
| `#9AA1B4` mist-2 | `#0B1020` navy | 7,33 | ✔ |
| `#9AA1B4` mist-2 | `#141B33` navy-2 | 6,59 | ✔ |
| `#A78BFA` violet-light | `#0B1020` navy | 6,96 | ✔ |
| `#A78BFA` violet-light | `#141B33` navy-2 | 6,25 | ✔ |
| `#22D3EE` cyan | `#0B1020` navy | 10,48 | ✔ |
| `#F87171` error | `#0B1020` navy | 6,84 | ✔ |
| `#B91C1C` error | `#FFFFFF` | 6,47 | ✔ |
| `#7C3AED` violet | `#0B1020` navy | 3,32 | ✘ → solo per elementi grafici grandi (marchio), mai testo |

**Regole:** niente gradienti viola→ciano sul testo (oggi su "reality.", numeri, step). Il viola pieno basta. Un solo sfondo sfumato ammesso: un alone statico e molto morbido dietro al marchio nella hero.

---

## 3. Tipografia

- **Space Grotesk** (titoli, numeri, etichette): resta, è già il carattere "tecnico" del sito.
- **Inter** (testo): resta.
- **Comfortaa**: esce dal caricamento dei font. Il wordmark "FRAME LAB" diventa SVG/testo inline con la stessa resa, *oppure* si carica un sottoinsieme di sole 7 lettere. **Il disegno del wordmark non cambia.**
- Pesi caricati: da 7 a 4 (Inter 400/500, Space Grotesk 500/700).
- **Self-hosting in WOFF2** (licenza SIL OFL, uso libero) al posto di Google Fonts CDN: meno richieste a terzi, nessun IP trasmesso a Google, `font-display: swap` sotto controllo. *Richiede di scaricare i file dei font: da confermare.*

### Scala (fluida, `clamp`)

| Ruolo | Dimensione | Peso | Interlinea | Tracking |
|---|---|---|---|---|
| Display (H1 hero) | `clamp(2.4rem, 5.6vw, 4.6rem)` | 700 | 1.04 | −0.03em |
| H2 sezione | `clamp(1.9rem, 3.6vw, 2.9rem)` | 700 | 1.1 | −0.02em |
| H3 | `1.25rem` | 600→700 | 1.25 | −0.01em |
| Lead | `clamp(1.05rem, 1.4vw, 1.2rem)` | 400 | 1.6 | 0 |
| Testo | `1rem` | 400 | 1.65 | 0 |
| Etichetta / indice | `0.78rem` | 500 | 1.2 | 0.14em, maiuscolo |

Lunghezza di riga del testo: massimo 65 caratteri (`max-width: 62ch`).

---

## 4. Stile delle immagini

- **Niente foto stock.** Il sito non ne ha e non deve averne.
- **Prodotti mostrati come sono**: screenshot reali delle interfacce (Nexogo, Gestora, Cashflow, TurboMastin) dentro una cornice essenziale (bordo sottile `--line-dark`, raggio 12 px, nessun finto dispositivo 3D). Finché mancano: un **segnaposto dichiarato** ("Screenshot in arrivo"), non un mockup inventato.
- Formati: AVIF/WebP con fallback PNG, `width`/`height` espliciti, `loading="lazy"` sotto la piega, `srcset` 1x/2x.
- Icone: lineari 1,75 px (stile attuale), **senza riquadro viola pieno**: l'icona sta da sola o accanto all'indice.

---

## 5. Griglia e spaziature

- Contenitore: `min(1200px, 100% − 2×gutter)`, gutter `clamp(1.25rem, 4vw, 2.5rem)`.
- Griglia a 12 colonne su desktop, 6 su tablet, 1 su mobile (CSS Grid).
- Scala di spaziatura a base 4: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px`.
- Ritmo verticale delle sezioni: `clamp(4.5rem, 10vw, 8rem)`.
- Raggi: **12 px** card e immagini, **8 px** campi, **999 px** solo per i bottoni (la pillola resta: è riconoscibile). Oggi le card sono a 18 px: più morbide di quanto serva a un marchio angolare.

### Ritmo della home (alternanza chiaro/scuro con una funzione)
1. **Hero** — scuro
2. **01 Servizi** — chiaro
3. **02 Prodotti e lavori** — scuro (i prodotti risaltano come "oggetti")
4. **03 Metodo** — chiaro
5. **04 Studio** (chi siamo) — chiaro, variante bianca
6. **05 Contatti** — scuro, a tutta larghezza
7. Footer — scuro, separato da una linea

I prodotti salgono prima del metodo: chi arriva vede subito *cosa sapete fare* e *cosa avete già fatto*, poi *come lavorate*.

---

## 6. Linguaggio dei componenti

**Bottoni**
- *Primario*: pillola viola piena, testo bianco. Hover: viola-strong + freccia che scorre di 3 px. Niente ombra colorata.
- *Secondario*: pillola con bordo 1,5 px, trasparente.
- *Link testuale*: sottolineatura sottile sempre visibile, che si ispessisce all'hover.
- Focus: anello 2 px (`--violet` su chiaro, `--cyan` su scuro) con offset 3 px, via `:focus-visible`.
- Tutti i target ≥ 44×44 px.

**Card** — tre tipi diversi, non uno solo:
- *Servizio*: niente scatola. Riga con icona, titolo e testo, separata da linee sottili (una lista ben composta). Il servizio principale (software su misura) occupa più spazio degli altri.
- *Prodotto*: superficie `--navy-2`, area immagine in alto, nome, frase, 3 punti, due link. È l'unica card cliccabile: all'hover compaiono gli angoli del telaio.
- *Passaggio del metodo*: numero grande, nessun riquadro, collegato agli altri dalla linea.

**Form**
- Label visibili sopra i campi, segnaposto solo come esempio.
- Campi su `--navy-2`, bordo `--line-dark`; al focus bordo `--violet-light` e angoli del telaio.
- Errori sotto il campo, con testo e icona (mai solo colore), annunciati con `aria-live`.
- Bottone con stato "Invio in corso…"; sotto, una riga su cosa succede dopo l'invio.
- Antispam honeypot invisibile.

**Menu**
- Desktop: link con indicatore della sezione attiva (linea che scorre sotto la voce).
- Mobile: pannello a tutto schermo, voci grandi con ingresso sfalsato (40 ms), contatti diretti in basso. Chiusura con Esc, focus intrappolato, scroll bloccato, `inert` da chiuso.

---

## 7. Principi di movimento

1. **Ogni movimento risponde a una domanda**: dove sono, cosa è cliccabile, cosa è cambiato.
2. **Una volta sola**: gli ingressi avvengono al primo passaggio, poi basta. Nessuna animazione infinita (via `drift` dei glow e contatori).
3. **Solo `transform` e `opacity`**, poche eccezioni misurate (riempimento della linea con `scaleY`).
4. **Il contenuto c'è sempre**: le animazioni partono solo se JS è attivo (`html.js`). L'H1 e la hero non sono mai nascoste.
5. **Durate**: micro-interazioni 150–220 ms; ingressi 500–650 ms; spostamento massimo 16 px. Curva unica `cubic-bezier(.22, 1, .36, 1)`.
6. **`prefers-reduced-motion: reduce`**: niente spostamenti né disegni; restano solo i cambi di colore e opacità istantanei.
7. **Niente**: scroll hijacking, parallax, cursore personalizzato, loader iniziale, autoplay.

| Dove | Cosa | Perché |
|---|---|---|
| Hero | Il marchio si disegna una volta (già esistente, accelerato a ~1 s); titolo **sempre visibile** | Identità al primo sguardo senza ritardare il contenuto |
| Indice di sezione | L'angolo a L si disegna quando la sezione entra | Orientamento |
| Liste e card | Ingresso sfalsato breve (opacity + 12 px) | Gerarchia di lettura |
| Metodo | Linea che si riempie con lo scroll (IntersectionObserver + `scaleY`) | Spiega la sequenza |
| Card prodotto | Angoli del telaio + leggero zoom dell'immagine (1.02) | Segnala che è cliccabile |
| Menu mobile | Pannello in dissolvenza + voci sfalsate | Transizione di stato chiara |
| Form | Focus inquadrato, errore che scorre in apertura, invio con stato | Feedback |
| Navigazione verso prodotto | View Transitions (dove supportate, altrimenti nulla) | Continuità |

---

## 8. Wordmark e uso del logo

- **Il marchio non si tocca.** Si corregge solo l'uso:
  - un unico simbolo SVG (`<symbol>`) riusato con `<use>` invece di 12 copie incollate;
  - area di rispetto pari all'altezza del tratto;
  - su fondo chiaro: tratto superiore `--navy`, inferiore `--violet`;
  - dimensione minima 24 px.
- Il wordmark "FRAME LAB" in Comfortaa resta identico. Sistemato l'allineamento ottico (oggi `translateY(2px)` manuale).
- "Ideas into reality." resta come **firma** di brand (footer, piccola sotto la hero, OG image). Non è più il titolo principale.

---

## 9. Cosa resta e cosa cambia

| Resta | Cambia |
|---|---|
| Marchio F e wordmark | H1 della hero: frase italiana che dice cosa fate (da confermare) |
| Navy + viola come colori del brand | Viola chiaro per il testo su scuro; ciano solo per gli stati |
| Space Grotesk + Inter | Comfortaa fuori dal caricamento; font in self-hosting (da confermare) |
| Bottoni a pillola | Niente ombre colorate, niente gradienti sui bottoni |
| Struttura one-page + pagine prodotto | Ordine delle sezioni: prodotti prima del metodo |
| Testi dei prodotti | Statistiche decorative rimosse (da confermare) |
| Form FormSubmit, email, WhatsApp, telefono | Form con label, errori, antispam, feedback |
| Pagine policy | Footer e header uniformi ovunque; policy aggiornata sul form (da validare) |
| Disegno animato del marchio | Niente glow animati, contatori, hover su elementi non cliccabili |
| — | Banner cookie rimosso o reso informativo (da confermare) |

## 10. Rischi e limiti
- Senza screenshot reali dei prodotti la sezione 02 resta meno forte di quanto potrebbe: si consegnano segnaposto dichiarati.
- I testi legali sono bozze tecniche, non pareri legali.
- GitHub Pages non permette header HTTP personalizzati: la CSP sarà solo via `<meta>`.
