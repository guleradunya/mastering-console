# Roadmap: Arşimet: Gerçek mi, Efsane mi?

Format: 5:30 (± 20 s), 16:9, 1920x1080, 30 fps, YouTube. Medium: 2D ink caricature (style A) + open-licence archive prints and photographs. Narration: user records in ElevenLabs from SCRIPT.md. Music: user generates an instrumental from the prompt below.

## 1. Concept
- **Logline:** Seven famous stories about Archimedes, each put to the viewer as a quiz (Doğru · Kısmen · Efsane), then checked against the oldest sources; the last and least known one turns out to be the truest and the strangest.
- **The turn:** Before: the famous stories (bath, mirrors, the lever line) feel like the "real" Archimedes. After: the most dramatic ones are later additions, and the true story nobody tells (a book scraped into a prayer book, found in İstanbul) beats them all.
- **Ending:** the scraped page glows under ultraviolet light, the hidden Greek diagrams surface over the prayers; the viewer's score card; one line that sends the question back: which story will they tell now.
- **How code shows it:** cartoon Archimedes and his world drawn in ink with hatching on cream paper (SVG/canvas 2D, no GPU needed); real evidence enters as archive prints "pasted" on the page (Daumier lithograph, 19th c. portrait card, engravings of the siege, the death mosaic, palimpsest pages); verdicts stamped like a rubber stamp in terracotta.
- **World test:** Syracuse harbour, the bath house, the city wall, the sand drawings, the claw's timber crane, a prayer book in a cellar: every scene comes from these stories' own places and objects.

## 2. Chapters (standard tempo, avg shot ≈ 6 s, ≈ 55 shots; acts of 1–2 min)
| Act | Time | Chapter | Claim · verdict | Real material |
|---|---|---|---|---|
| I | 0:00–0:25 | Cold open | ships flare in a beam of light; "Arşimet bunu gerçekten yaptı mı?"; the three stamps introduced | Daumier "Archimède" print |
| I | 0:25–1:05 | 1 Evreka | Bath, naked run, crown · **KISMEN** (story 200 years later; buoyancy law real; Galileo's balance) | 19th c. portrait card, Galileo's balance engraving if found |
| I | 1:05–1:45 | 2 Güneş aynaları | Mirrors burned the Roman fleet · **EFSANE** (no early source; MIT 10 min still ship; MythBusters) | siege engravings |
| II | 1:45–2:25 | 3 Demir pençe | Claw lifted ships out of the sea · **DOĞRU** (Polybius, Livy, Plutarch; 2005 rebuild tipped a model) | siege engravings, Syracuse walls photo |
| II | 2:25–3:05 | 4 Dünyayı oynatırım | "Bana bir dayanak verin…" · **KISMEN** (lever law proven; the sentence centuries later via Pappus) | lever engraving (Mechanics Magazine 1824, PD) |
| II | 3:05–3:40 | 5 Burgu | He invented the water screw · **EFSANE** (older; contemporaries do not credit him) | screw engravings, photo of a screw in use |
| III | 3:40–4:25 | 6 Son söz | "Çemberlerimi bozma!" · **KISMEN** (killed in 212 BC, yes; the famous words in no ancient source) + Cicero finds the tomb | death mosaic, Cicero tomb painting |
| III | 4:25–5:15 | 7 Kayıp kitap | His lost book was scraped into a prayer book and found in İstanbul · **DOĞRU** (1229, 1906, 1998 $2 million, UV imaging) | palimpsest pages (CC BY), UV images |
| III | 5:15–5:30 | Ending | score: "Kaç tanesini bildin?" · the UV page · end card | |

Each claim chapter runs the same rhythm, changed each time: **claim drawn (8–10 s) → quiz card with 3 chips and a 3 s pencil countdown (4 s) → evidence (15–20 s) → stamp (2 s) → one-line takeaway**.

## 3. Look
- **Base:** style A, Taşbaskı karikatür (proof: review/proofs-v1.jpg, top). Paper #e7dcc6, ink #2a2420, accent terracotta #a24f2b, wash #d8cbb0, highlight paper #f4ecdc.
- **Changes:** stamps carry the only strong colour: DOĞRU deep green #3d6b45, KISMEN ochre #b8862b, EFSANE terracotta #a24f2b (the three read apart in greyscale by shape too: tick, half circle, cross). Archive material sits in torn paper frames with a hand-written caption.
- **References:** Daumier lithographs (Met, CC0) for the line and hatching; red-figure vases only as a motif on objects (the Greek world inside the print).

## 4. Sound identity
- **Concept:** toy-orchestra stings on a printed page: a pizzicato question, a glockenspiel tick for the countdown, a rubber-stamp thump for the verdict.
- **Signature sound:** the stamp thump; returns seven times, each verdict with its own short tail (green: two bright notes up, ochre: one note that wobbles, terracotta: a slide down).
- **Silence:** the 3 s countdown drops the music to the ticks only; the UV reveal of the palimpsest has 2 s of near silence before the hidden text surfaces.
- **Voice · music:** narrator (user, ElevenLabs): curious, warm, quick-witted, a storyteller who enjoys the twist · instrumental by the user from the prompt in the message (light, playful Mediterranean-baroque, pizzicato strings, mandolin, woodwinds, 104 BPM).
- **Beds:** harbour (gulls, water slap) · bath house (drips, echo) · city wall (wind, timber creak) · library (paper, room tone). Paper rustle on every archive insert.

## 4b. Curiosity map
| Question | Opens | Paid |
|---|---|---|
| Which of the famous stories are true? (the score) | 0:05 | 5:15 |
| "En inanılmazını sona sakladım: üstelik İstanbul'da geçiyor." | 0:20 | 4:25–5:05 |
| Each claim's verdict | each chapter start | ~25 s later |
A reveal every ≈ 40 s (each stamp); no more than two big questions open.

## 5. Hook (first 2 s)
Frame 1: a Roman ship's sail catches a dazzling beam and smokes; the narrator's first line starts at 0:00.5 ("Arşimet'in güneş ışığıyla Roma gemilerini yaktığı anlatılır.").

## 6. Risks
1. **Narration timing:** your recording sets the timing. I time the animatic from word counts (no guide voice without a TTS key) and re-cut it to your files; keep line IDs (VO1, VO2…) as file names.
2. **Archive coverage:** Wikimedia rate-limits this session; some pictures (Cicero tomb painting, palimpsest UV pages) live there. Fallback: drawn versions in the ink style.
3. **Length vs render time:** 5.5 min of 2D at 1080p renders on CPU; draft at half size first (≈ 20–40 min), the final longer.

## 7. Director card
- **Structure:** a quiz in seven rounds inside a three-act arc (famous stories → war machines and words → death and the book that survived him); each round a small question and answer, the big one (what is true?) paid at the end.
- **Look:** A, because the real prints and the cartoon share one paper, so "yarı karikatür yarı ciddi" reads as one film · **Camera:** flat planes, a slow push across the page as if over a desk; signature move: a quick tilt down onto the stamp · **Motion:** lively (squash and stretch on Archimedes, firm on objects; type writes on like a pen).
- **Tempo:** standard, ≈ 6 s a shot; tags per act: I fast · II breath · III hold at the UV reveal. Music 104 BPM: a bar ≈ 2.3 s; stamps land on bar downbeats.
- **Transitions:** cut by default; a page turn between claims (never twice in a row: alternates with an ink-blot wipe); archive inserts slide in as pasted paper.
- **Light:** printed page, flat even light; one change: the palimpsest scene goes dark and a UV violet glow reveals the hidden text (the only non-paper light in the film).
- **How each thing is seen:** Archimedes: round bald head, big white beard, toga, ink outline with hatched shadows, seen front and three quarters · Romans: helmet silhouettes, many, small · ships: side-on, hatched hulls · water and fire: hatching plus a terracotta wash.
- **Motion design:** the quiz card (question + 3 chips + pencil countdown) · year line (212 BC → 1229 → 1906 → 1998) for the book · the score tally in the corner, one tick per round.
- **Type:** at step 4b (proof used Young Serif) · **Texture:** paper grain and slight ink wobble, always · **Finishing:** at the style frame.
- **Ending:** UV page, score card, last line; credits in the YouTube description.

## 8. Next gates
Script (SCRIPT.md, narration in Turkish, line IDs for ElevenLabs) → style frame → animatic with guide voice → your narration and music files → draft → final.
