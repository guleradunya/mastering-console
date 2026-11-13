# Sourcing (archive inserts)

Note: asset_search `--pick` is 1-based (the "n" field). Two early fetches used the wrong index and are NOT wanted (rows exist in LICENSES.csv, files unused): met-410773 Rock of the Philosophers (Stefano della Bella, CC0) and aic-65 Fishing Craft near Collioure (Appian, CC0). aic-106225 Clawed Arm Defense is an armour object, not Archimedes' claw: not relevant, do not use.
Wikimedia Commons returned HTTP 429 on most searches and downloads, even after several 40-60 s waits.

1. FOUND assets/archive/met-678724-archim-de-riant-des-efforts-impuissants-.jpg | Archimède riant des efforts impuissants... | Honoré Daumier | Met Museum | CC0 | 3696x2545
2. FOUND assets/archive/met-420639-archimedes-printer-s-sample-for-the-worl.jpg | Archimedes, printer's sample, World's Inventors album (A25) | Allen & Ginter | Met Museum | CC0 | 1660x3012
3. NOT FOUND (siege/war machines/claw). Queries: "siege of Syracuse Archimedes claw engraving" (met,aic,cleveland,wikimedia). Only coins, armour, a naval map (not confirmed as Syracuse).
4. NOT FOUND (burning mirrors). Queries: "Archimedes burning mirrors Roman fleet engraving"; wikimedia "Archimedes burning mirror" returned 429.
5. NOT FETCHED. Candidate: Wikimedia "Archimedes before his death with the Roman soldier, Roman mosaic" (research/src-6, PD); download 429 x5. Queries: "Death of Archimedes", "Death of Archimedes mosaic".
6. NOT FOUND. Queries: "Cicero discovering tomb of Archimedes" (met,aic,cleveland); wikimedia retry 429.
7. PARTLY. Normal page: assets/archive/wikimedia-30276470-archimedes-palimpsest-jpg.jpg | Archimedes Palimpsest.jpg | Matthew Kon | Wikimedia Commons | public domain | 665x448 (small, under 1600 px; not verified visually). Multispectral: not fetched; candidate research/src-7 #4 (Ryan Baumann, CC BY pseudocolor page), 429 x4.
8. WEAK. assets/archive/wikimedia-2285256-archimedes-screw-jpg.JPG | Archimedes screw.JPG | Ianmacm (en.wikipedia) | Wikimedia Commons | PD | 350x234. A modern photo, not an engraving; too small. Better candidates unretrieved.
9. NOT FETCHED. Candidate Wikimedia "Archimedes lever.png" (src-9 #2, PD, not confirmed as the 1824 engraving); 429.
10. NOT FOUND. Query "Galileo bilancetta hydrostatic balance" (wikimedia): 429, no results.
11. NOT FOUND. Query "Ortigia Syracuse sea walls" (wikimedia): 429, no results.
12. NOT FETCHED. Candidates (src-14, PD): #4 John Leech, Comic History of Rome, Archimedes taking a warm bath; #1 Archimedes bath.jpg; 429.
