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
| "24/7 monitoring" | statistiche home | Rimosse su indicazione del cliente | ✘ rimosso |
| "100 % su misura", "360° di supporto", "1 obiettivo: il tuo" | statistiche home | Rimosse su indicazione del cliente | ✘ rimosso |
| Tempi di risposta | sezione Contatti | Entro quanto rispondete di solito? Oggi il sito non promette tempi: se li confermate si possono aggiungere vicino al form | ⏳ |
| "Sprint iterativi con demo continue" | Metodo | Corrisponde al modo di lavorare reale? | ⏳ |
| "restiamo al tuo fianco dopo il lancio" | Metodo | Offrite contratti di manutenzione/assistenza? | ⏳ |

## Prodotti
| Dato | Prodotto | Stato attuale | Stato |
|---|---|---|---|
| Prezzo "100 €/mese" | Nexogo | pubblicato nella pagina prodotto | ⏳ (confermare, IVA inclusa/esclusa?) |
| "I marketplace costano il 25/30 % a ordine" | Nexogo | testo già presente sul sito, mantenuto come titolo di sezione; affermazione su terzi senza fonte | ⏳ (fonte o formulazione più prudente) |
| "Integrazione con il gestionale di cassa" — quali casse? | Nexogo | generico | ⏳ |
| "App pronte in pochi giorni" | Nexogo | | ⏳ |
| Prezzo / canone | Gestora, Cashflow | non pubblicato | ⏳ (pubblicarlo o no?) |
| Cashflow: per privati, aziende o entrambi? | Cashflow | ambiguo ("i tuoi soldi") | ⏳ |
| Screenshot reali delle interfacce | Nexogo, Gestora | catturati dalle pagine pubbliche dei siti prodotto (autorizzato) | ✔ |
| Screenshot di Cashflow | Cashflow | segnaposto "Anteprima non ancora disponibile" | ⏳ (fornire un'immagine dell'app) |
| Dominio `cashflow.framelabweb.it` | Cashflow | **non risolve (NXDOMAIN)**: link rimossi dal sito | ⏳ (attivarlo o indicare l'indirizzo corretto) |
| Gestora: il pubblico è la ristorazione? | Gestora | testo neutro | ⏳ |
| Clienti che usano i prodotti (con permesso di citarli) | tutti | assenti | ⏳ |

## Lavori / portfolio
| Dato | Stato |
|---|---|
| TurboMastin: permesso di mostrarlo come caso (ora nel carosello con screenshot del sito pubblico), anno, cosa avete fatto esattamente | ⏳ |
| Altri progetti per clienti pubblicabili (nome, settore, problema, cosa avete fatto, risultato misurabile se c'è) | ⏳ |
| Recensioni/testimonianze reali con autorizzazione | ⏳ (nessuna inserita) |

## Privacy e legale (da far verificare a un professionista)
| Punto | Stato |
|---|---|
| Privacy policy: aggiunta di FormSubmit come fornitore che riceve i dati del form (con trasferimento extra-UE da verificare) | ⏳ bozza nel redesign, segnaposto evidenziati in giallo |
| Titolare del trattamento con dati completi | ⏳ |
| Banner cookie ridotto a informativa con solo "Ok" (solo storage tecnico) | ✔ scelta del cliente, da far confermare al consulente |
| Obbligo di P.IVA sul sito | ⏳ (verifica commercialista) |

## Tecnici
| Punto | Stato |
|---|---|
| Autorizzazione a scaricare i file dei font (Inter, Space Grotesk, Comfortaa, licenza OFL) per il self-hosting | ✔ |
| La cartella `docs/` non va pubblicata: escluderla prima del merge su `main` o spostarla | ⏳ |
