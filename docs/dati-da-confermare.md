# Dati da confermare

Informazioni che il sito usa o dovrebbe usare e che **non posso verificare da solo**. Finché non arriva una conferma, nel redesign sono segnaposto evidenti, testi neutri o elementi rimossi. Non ho inventato niente.

Legenda stato: ⏳ da confermare · ✔ confermato · ✘ da rimuovere

## Azienda
| Dato | Dove serve | Stato attuale nel sito | Stato |
|---|---|---|---|
| Ragione sociale / forma giuridica | footer, privacy, cookie policy, dati strutturati | assente ("Frame Lab") | ⏳ |
| Partita IVA | footer, policy | assente | ⏳ |
| Indirizzo della sede (o solo "Verona") | footer, dati strutturati | "Verona, IT" | ⏳ |
| Composizione del team ("designer, sviluppatori e consulenti") | sezione Chi siamo | dichiarata, non verificata | ⏳ |
| Nomi/ruoli/foto dei membri del team (facoltativo) | sezione Studio | assenti | ⏳ |
| Anno di fondazione (facoltativo) | Studio | assente | ⏳ |
| Profili social / LinkedIn aziendale | footer, `sameAs` nei dati strutturati | assenti | ⏳ |

## Affermazioni di servizio
| Affermazione | Dove | Domanda | Stato |
|---|---|---|---|
| "24/7 monitoring" | statistiche home | Esiste davvero un monitoraggio 24/7 dei prodotti/clienti? Proposta: rimuovere | ⏳ |
| "100 % su misura", "360° di supporto", "1 obiettivo: il tuo" | statistiche home | Slogan, non dati. Proposta: rimuovere | ⏳ |
| "ti risponderemo con una proposta concreta" | box contatti | Entro quanto rispondete di solito? (es. "entro 2 giorni lavorativi") | ⏳ |
| "Sprint iterativi con demo continue" | Metodo | Corrisponde al modo di lavorare reale? | ⏳ |
| "restiamo al tuo fianco dopo il lancio" | Metodo | Offrite contratti di manutenzione/assistenza? | ⏳ |

## Prodotti
| Dato | Prodotto | Stato attuale | Stato |
|---|---|---|---|
| Prezzo "100 €/mese" | Nexogo | pubblicato nella pagina prodotto | ⏳ (confermare, IVA inclusa/esclusa?) |
| "I marketplace costano il 25/30 % a ordine" | Nexogo | affermazione su terzi senza fonte | ⏳ (fonte o formulazione più prudente) |
| "Integrazione con il gestionale di cassa" — quali casse? | Nexogo | generico | ⏳ |
| "App pronte in pochi giorni" | Nexogo | | ⏳ |
| Prezzo / canone | Gestora, Cashflow | non pubblicato | ⏳ (pubblicarlo o no?) |
| Cashflow: per privati, aziende o entrambi? | Cashflow | ambiguo ("i tuoi soldi") | ⏳ |
| Screenshot reali delle interfacce | tutti e tre | assenti | ⏳ (fornirli, oppure autorizzarmi a catturare le pagine pubbliche dei vostri siti prodotto) |
| Clienti che usano i prodotti (con permesso di citarli) | tutti | assenti | ⏳ |

## Lavori / portfolio
| Dato | Stato |
|---|---|
| TurboMastin: permesso di mostrarlo come caso, anno, cosa avete fatto esattamente | ⏳ |
| Altri progetti per clienti pubblicabili (nome, settore, problema, cosa avete fatto, risultato misurabile se c'è) | ⏳ |
| Recensioni/testimonianze reali con autorizzazione | ⏳ (nessuna inserita) |

## Privacy e legale (da far verificare a un professionista)
| Punto | Stato |
|---|---|
| Privacy policy: aggiunta di FormSubmit come fornitore che riceve i dati del form (con trasferimento extra-UE da verificare) | ⏳ bozza nel redesign |
| Titolare del trattamento con dati completi | ⏳ |
| Rimozione del banner cookie (solo cookie/storage tecnici) | ⏳ |
| Obbligo di P.IVA sul sito | ⏳ (verifica commercialista) |

## Tecnici
| Punto | Stato |
|---|---|
| Autorizzazione a scaricare i file dei font (Inter, Space Grotesk, Comfortaa, licenza OFL) per il self-hosting | ⏳ |
| La cartella `docs/` non va pubblicata: escluderla prima del merge su `main` o spostarla | ⏳ |
