# State: Arşimet: Gerçek mi, Efsane mi?

Read this first in every new session, after loading the cinecode skill (Claude Code: the Skill tool, never a plain read of SKILL.md), then `python3 KIT/scripts/init_film.py . --update-tools` silently; update "Now" before ending every turn. Keep it short.
Kit: /root/.claude/skills/cinecode
Method: this chat coordinates and builds what it holds the context for; a fresh helper takes only an independent part beside it (sound, narration takes, research, the independent viewer) or a long film's chapter, briefed from files (`/root/.claude/skills/cinecode/references/context-protocol.md`).

## Resume here
<!-- Updated at every gate and before every handoff. A new chat starts with "STATE.md'den devam et" / "Continue from STATE.md". -->
- **Phase:** 6 Draft (pace through)
- **Pace:** through
- **Approved gates:** interview, roadmap, script (thesis A)
- **Open notes:** none (notes/round-N.md)
- **Next action:** archive pictures (helper → review/sourcing.md) into film.html ARCHIVE_FILES; then `make.py draft`; when the user's CH0..CH8 narration and music arrive: split into VO lines (audio/vo/), fill VO_MEASURED, OWN_MUSIC, audio/mix.json, re-draft
- **Budget so far:** <~estimate> of the <Balanced> ceiling (<n>%)

## Now
- **Step:** 6 draft cut
- **Gate:** draft cut (next)
- **Next step:** <one concrete line>
- **Waiting for:** <user / background job / nothing>
- **Profile:** balanced
- **Voice:** narration recorded by the user in ElevenLabs from the script I give; files to come (user)
- **Purpose:** cinematic (documentary explainer) (`/root/.claude/skills/cinecode/references/purpose-<cinematic|ad>.md`)
- **Format:** ~6 min (from the narration), 16:9, 1920x1080, 24 fps (YouTube; drawings on twos)
- **Medium:** yarı karikatür yarı ciddi: 2D cartoon animation + open-licence real images and footage (user)
- **Look:** A · Taşbaskı karikatür: Daumier-style ink hatching on cream paper, one terracotta accent (#a24f2b), ink #2a2420, paper #e7dcc6; archive prints pasted in as framed relics; type Young Serif (proof)
- **Finishing:** none (pace through: ★ default off)
- **Music:** own: instrumental the user generates from my prompt, file to come (user) <!-- always asked, the recording picked by ear -->
- **Type:** Young Serif (display) + EB Garamond (text) + Courier Prime (mono, archive tags) · ★ under pace through
- **Subtitles:** off
- **Last output:** <path, version>
- **Disk free at last check:** <GB, date>

## Running jobs
| Job | Command (short) | PID | Status file | Log | Started |
|---|---|---|---|---|---|

## Gates
| Step | Gate | Result | Date | Note |
|---|---|---|---|---|
| 1 | interview answered / defaults accepted | style A picked after proof frames (review/proofs-v1.jpg) | 2026-11-13 | |
| 2 | roadmap approved | OK | 2026-11-13 | screw verdict changed to KISMEN after sources |
| 3 | script and text approved | | | |
| 4 | style frame approved, finishing chosen | | | |
| 4b | type pairing picked | | | |
| 5 | animatic approved | | | |
| 6a | draft cut approved | | | |
| 6 | final delivered | | | |

## Decisions
| Date | Decision | Why | Who |
|---|---|---|---|
| 2026-11-13 | Engine: film.html (canvas 2D) in Film mode, src/film-section.js spliced by logs/splice.py | no WebGL in this container; 2D ink style needs none | agent |
| 2026-11-13 | Timing built from VO_LINES durations (estimates until VO_MEASURED) | narration recorded later by the user | agent |
| 2026-11-13 | Temporary subtitles in drafts until the voice arrives | the user can follow the draft without narration | agent |

## Notes rounds
Verbatim notes and the per-shot split live in `notes/round-N.md`.

| Round | File | Shots touched | Unchanged | Status |
|---|---|---|---|---|

## Agent tasks
| Task | Calls | Brief (files read) | Output file | Result |
|---|---|---|---|---|

## Budget meter
Ceiling: <Economy / Balanced / Quality> (internal caps: `references/context-protocol.md` §6). Stop and ask at 80%.

| Phase | Share of ceiling | Estimate so far | % of share | Note |
|---|---|---|---|---|
| 1-2 Interview + roadmap | 10% | | | |
| 3 Script | 10% | | | |
| 4 Style frame | 20% | | | |
| 5 Animatic | 15% | | | |
| 6 Render, sound, final | 35% | | | |
| Notes rounds | 10% | | | |
| **Total** | 100% | | | |

## Versions
| Version | File | What changed | Snapshot |
|---|---|---|---|
