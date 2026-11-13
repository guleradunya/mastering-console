// ============================== FILM ==============================
const TITLE = 'Arşimet: Gerçek mi, Efsane mi?';
const PURPOSE = 'cinematic';
// Look A, "Taşbaskı karikatür": Daumier-style ink on cream paper, drawings on twos, a static paper fibre.
const LOOKS = {
  'ink-print': { grade: 'contrast(1.03)', bloom: 0, texture: 'paper', vignette: 0.14, grain: 0.035, grainHold: Infinity, hold: 12, line: 0.003, steps: 0,
    palette: { bg: '#e7dcc6', ink: '#2a2420', accent: '#a24f2b', dim: '#d8cbb0' } },
};
const LOOK_ID = 'ink-print';
const LOOK = LOOKS[LOOK_ID];
const FINISH = { shutter: null, weave: 0, tone: null };
const FPS = 24;
const BPM = 104;
const BEAT0 = 0;
const beat = (n) => BEAT0 + n * 60 / BPM, bar = (n) => beat(4 * n);
// The user's instrumental (generated from the prompt in SCRIPT/roadmap); null until the file arrives.
const OWN_MUSIC = null;
const INSTRUMENTS = [];
const CAST = {};
const FORMULAS = {};
const PALETTE = { bg: '#e7dcc6', ink: '#2a2420', accent: '#a24f2b', dim: '#d8cbb0', paper: '#f4ecdc', wash: '#d8cbb0',
  skin: '#efe2cb', gold: '#c99a3b', water: '#c9d3cf', sea: '#cfd2c8', fire: '#c4622f', night: '#1d1a24', uv: '#8f6bd8',
  D: '#3d6b45', K: '#b07d22', E: '#a24f2b' };
const TYPE = {
  lang: 'tr',
  roles: {
    display: { family: 'Young Serif', pkg: 'young-serif', version: '5.3.0', weights: [400] },
    text: { family: 'EB Garamond', pkg: 'eb-garamond', version: '5.3.0', weights: [400, 700] },
    mono: { family: 'Courier Prime', pkg: 'courier-prime', version: '5.3.0', weights: [400, 700] },
  },
  check: { strings: { display: ['GERÇEK Mİ?', 'DOĞRU', 'KISMEN DOĞRU', 'EFSANE', 'ARŞİMET'], text: ['Gerçek mi, Efsane mi?'], mono: ['Vitruvius · MÖ 1. yüzyıl'] }, sizes: { text: 0.04 } },
};

// ---- Narration: the script's lines. dur = measured from the user's files once they arrive (VO_MEASURED);
// until then an estimate from the length of the line. Every time in the film is built from this table.
const VO_LINES = [
  ['CH0', 'VO1', "Arşimet'in güneş ışığıyla Roma gemilerini yaktığı anlatılır."],
  ['CH0', 'VO2', 'Banyodan çıplak fırladığı da.'],
  ['CH0', 'VO3', "Bir çubukla Dünya'yı yerinden oynatabileceği de."],
  ['CH0', 'VO4', 'Bu hikâyelerin hangisi gerçekten yaşandı?'],
  ['CH0', 'VO5', 'Bugün yedi iddia var, üç cevap.'],
  ['CH0', 'VO6', 'Doğru. Kısmen doğru. Ya da efsane.'],
  ['CH0', 'VO7', 'Her turda önce sen tahmin edeceksin.'],
  ['CH0', 'VO8', 'En inanılmazını sona sakladım.'],
  ['CH0', 'VO9', "Üstelik o hikâye İstanbul'da geçiyor."],
  ['CH1', 'VO10', "Sicilya, Siraküza. Kral Hieron'un altın tacından şüphesi var."],
  ['CH1', 'VO11', 'Kuyumcu altına gümüş karıştırmış olabilir.'],
  ['CH1', 'VO12', 'Ama tacı eritmeden bunu anlamak gerek.'],
  ['CH1', 'VO13', 'Arşimet banyoya girer. Su taşar.'],
  ['CH1', 'VO14', '"Evreka!" diye bağırıp sokağa çıplak fırlar.'],
  ['CH1', 'VO15', 'Taç, aynı ağırlıktaki saf altından daha çok su taşırır.'],
  ['CH1', 'VO16', 'Demek ki içinde gümüş var. Kuyumcu yakalanır.'],
  ['CH1', 'VO17', 'Birinci soru: Bu hikâye doğru mu?', 'q'],
  ['CH1', 'VO18', 'Hikâyeyi ilk yazan, Romalı mimar Vitruvius.'],
  ['CH1', 'VO19', "Hem de Arşimet'in ölümünden yaklaşık iki yüz yıl sonra."],
  ['CH1', 'VO20', 'Galileo ise suyun içinde bir terazi kullandığını düşünüyordu.'],
  ['CH1', 'VO21', 'Ama suyun cisimleri kaldırdığını bulan gerçekten Arşimet.'],
  ['CH1', 'VO22', "Bunu kendi kitabında, Yüzen Cisimler Üzerine'de yazdı."],
  ['CH1', 'VO23', 'Hikâye süslenmiş, bilim sağlam. Kısmen doğru.', 'K'],
  ['CH2', 'VO24', 'Milattan önce 214. Roma donanması Siraküza surlarına dayanır.'],
  ['CH2', 'VO25', 'Anlatılana göre Arşimet askerlere parlak aynalar dağıtır.'],
  ['CH2', 'VO26', 'Güneşi tek noktaya toplarlar ve gemiler tutuşur.'],
  ['CH2', 'VO27', 'İkinci soru. Sence?', 'q'],
  ['CH2', 'VO28', 'Kuşatmayı anlatan en eski üç tarihçi: Polybios, Livius, Plutarkhos.'],
  ['CH2', 'VO29', 'Hiçbiri aynalardan söz etmez.'],
  ['CH2', 'VO30', 'Aynalar hikâyeye ancak dört yüz yıl kadar sonra girer.'],
  ['CH2', 'VO31', "2005'te MIT'li öğrenciler 127 aynayla denedi."],
  ['CH2', 'VO32', 'Gemi ancak on dakika kıpırdamadan bekleyince alev aldı.'],
  ['CH2', 'VO33', 'Roma gemileri o kadar sabırlı değildi.'],
  ['CH2', 'VO34', 'Efsane.', 'E'],
  ['CH3', 'VO35', 'Aynı kuşatma. Surların üstünde dev bir vinç.'],
  ['CH3', 'VO36', 'Ucundaki demir kanca gemiyi burnundan yakalar.'],
  ['CH3', 'VO37', 'Havaya kaldırır, sonra bırakır.'],
  ['CH3', 'VO38', 'Üçüncü soru: Bu gerçekten olmuş olabilir mi?', 'q'],
  ['CH3', 'VO39', 'Bu sefer kaynaklar aynı şeyi söylüyor.'],
  ['CH3', 'VO40', 'Aynı üç tarihçi bu makineleri ayrıntılarıyla anlatır.'],
  ['CH3', 'VO41', 'Adı harpagē. Yani aşağı yukarı kapkaççı.'],
  ['CH3', 'VO42', "2005'te mühendisler bir benzerini yedi günde kurdu."],
  ['CH3', 'VO43', 'Ve bir gemi maketini devirmeyi başardılar.'],
  ['CH3', 'VO44', 'Doğru.', 'D'],
  ['CH4', 'VO45', "Arşimet'e ait en ünlü söz şu:"],
  ['CH4', 'VO46', '"Bana bir dayanak noktası verin, Dünya\'yı yerinden oynatayım."'],
  ['CH4', 'VO47', 'Dördüncü soru: Bu sözü gerçekten o mu söyledi?', 'q'],
  ['CH4', 'VO48', 'Kaldıraç yasasını gerçekten o kanıtladı.'],
  ['CH4', 'VO49', 'Kaldıracın kolu uzadıkça, aynı yükü kaldırmak kolaylaşır.'],
  ['CH4', 'VO50', 'Ama bu cümleyi bize aktaran İskenderiyeli Pappus.'],
  ['CH4', 'VO51', "Arşimet'ten yaklaşık beş yüz yıl sonra yaşamış biri."],
  ['CH4', 'VO52', "Plutarkhos'ta ise Arşimet koca bir gemiyi tek başına çeker."],
  ['CH4', 'VO53', 'Makaralarla. Tarihçiler bu ayrıntılara pek inanmıyor.'],
  ['CH4', 'VO54', 'Fikir onun, cümle sonradan. Kısmen doğru.', 'K'],
  ['CH5', 'VO55', 'Arşimet burgusu: döndükçe suyu yukarı taşıyan bir sarmal.'],
  ['CH5', 'VO56', 'Bugün atık su tesislerinde hâlâ çalışıyor.'],
  ['CH5', 'VO57', 'Beşinci soru: Onu Arşimet mi icat etti?', 'q'],
  ['CH5', 'VO58', 'Bazı antik yazarlar evet diyor.'],
  ['CH5', 'VO59', 'Ama burguyu anlatan Vitruvius onun adını hiç anmaz.'],
  ['CH5', 'VO60', 'Bazı araştırmacılara göre Mısırlılar onu zaten kullanıyordu.'],
  ['CH5', 'VO61', 'Belki icat etti, belki geliştirdi. Kısmen doğru.', 'K'],
  ['CH6', 'VO62', 'Milattan önce 212. Siraküza sonunda düşer.'],
  ['CH6', 'VO63', "Roma komutanı Marcellus emir vermiştir: Arşimet'e dokunulmayacak."],
  ['CH6', 'VO64', 'Arşimet o sırada kuma geometri çizmektedir.'],
  ['CH6', 'VO65', 'Bir asker gelir. Arşimet başını kaldırmadan konuşur:'],
  ['CH6', 'VO66', '"Çemberlerimi bozma!"'],
  ['CH6', 'VO67', 'Asker onu tanımaz. Kılıcını indirir.'],
  ['CH6', 'VO68', 'Altıncı soru: Son sözleri bu muydu?', 'q'],
  ['CH6', 'VO69', "Arşimet'i bir Roma askerinin öldürdüğü doğru."],
  ['CH6', 'VO70', 'Ama bu cümle hiçbir antik kaynakta geçmez.'],
  ['CH6', 'VO71', 'En yakını iki yüz yıldan fazla sonra yazılmış:'],
  ['CH6', 'VO72', '"Lütfen, bunu bozma."'],
  ['CH6', 'VO73', 'Kısmen doğru.', 'K'],
  ['CH6', 'VO74', 'Yaklaşık yüz kırk yıl sonra Romalı Cicero mezarını arar.'],
  ['CH6', 'VO75', 'Çalıların altında bulur: üstünde bir küre ve bir silindir.'],
  ['CH6', 'VO76', "Küre ve silindir: Arşimet'in en değer verdiği buluş."],
  ['CH7', 'VO77', 'Ve sona sakladığım hikâye.'],
  ['CH7', 'VO78', 'Yıl 1229, Kudüs. Eski bir kitabın sayfaları sökülür.'],
  ['CH7', 'VO79', 'Mürekkep kazınır, sayfalar yıkanır.'],
  ['CH7', 'VO80', 'Üstüne dualar yazılır.'],
  ['CH7', 'VO81', "Kazınan yazılar, Arşimet'in kayıp kitaplarıdır."],
  ['CH7', 'VO82', "Yüzyıllar içinde dua kitabı İstanbul'a, bir Rum kütüphanesine ulaşır."],
  ['CH7', 'VO83', 'Son soru: Bu hikâye de mi efsane?', 'q'],
  ['CH7', 'VO84', "1906. Danimarkalı bilgin Heiberg İstanbul'a gelir."],
  ['CH7', 'VO85', 'Kütüphanede o dua kitabını inceler.'],
  ['CH7', 'VO86', "Silik satırların altında Arşimet'i tanır."],
  ['CH7', 'VO87', 'Sonra kitap ortadan kaybolur. Bir mahzende küflenir.'],
  ['CH7', 'VO88', "1998'de New York'ta açık artırmada: 2 milyon dolar."],
  ['CH7', 'VO89', 'On yıl boyunca morötesi ışık ve X ışınlarıyla taranır.'],
  ['CH7', 'VO90', "Ve duaların altından Arşimet'in çizimleri geri gelir."],
  ['CH7', 'VO91', 'İçinde, sonsuz küçük parçalarla hesap yapan bir yöntem var.'],
  ['CH7', 'VO92', 'Kalkülüsün, yani integral hesabının ilk izi.'],
  ['CH7', 'VO93', "Newton'dan neredeyse iki bin yıl önce."],
  ['CH7', 'VO94', 'Doğru. Hem de hepsinden doğru.', 'D'],
  ['CH8', 'VO95', 'Kaç tanesini bildin? Skorunu yorumlara yaz.'],
  ['CH8', 'VO96', "Arşimet'in en ünlü hikâyelerinin çoğu yarı gerçek çıktı."],
  ['CH8', 'VO97', 'Tam gerçek olanı ise bir dua kitabının altında saklanıyordu.'],
];
const VO_MEASURED = {};                       // { VO1: 3.42, ... } from ffprobe of the user's split files
const GAP = { line: 0.45, chapter: 1.4, quiz: 3.6, verdict: 1.7, title: 3.2, uv: 2.2, end: 6 };
const TL = (() => {                            // the timeline: every line's start, built from the durations
  const out = []; let t = 0.4, ch = 'CH0';
  for (const [c, id, text, flag] of VO_LINES) {
    if (c !== ch) { t += GAP.chapter; ch = c; }
    if (id === 'VO90') t += GAP.uv;            // the near silence before the UV reveal
    const dur = VO_MEASURED[id] ?? Math.max(0.8, [...text].length / 14.5 + 0.25);
    out.push({ id, ch: c, text: text.replace(/"/g, '“').replace(/“([^“]*)“/g, '“$1”'), flag, at: t, dur });
    t += dur + (flag === 'q' ? GAP.quiz : 'DKE'.includes(flag || '-') ? GAP.verdict : GAP.line);
    if (id === 'VO9') t += GAP.title;
  }
  return { lines: out, end: t + GAP.end };
})();
const L = Object.fromEntries(TL.lines.map((l) => [l.id, l]));
const at = (id, d = 0) => L[id].at + d;        // start of a line (+ offset)
const after = (id, d = 0) => L[id].at + L[id].dur + d;
const DURATION = Math.ceil(TL.end);
const CUES = { end: DURATION };
const VO = TL.lines.map((l) => ({ id: l.id, at: l.at, dur: l.dur }));
const CAPTIONS = null;
const CAPTION_STYLE = { role: 'display', accentRole: 'display', size: 0.062, caps: false, ink: PALETTE.ink, hi: PALETTE.ink, accent: PALETTE.accent, punch: 0.07 };
// Draft aid while the narration is not recorded: the line on screen as a temporary subtitle. Off once VO_MEASURED is filled.
const TEMP_SUBS = Object.keys(VO_MEASURED).length === 0;

// ---- Archive pictures (assets/archive, LICENSES.csv). Loaded before READY; a missing file draws a labelled blank.
const ARCHIVE = {};
const ARCHIVE_FILES = {
  daumier: 'assets/archive/daumier.jpg', portrait: 'assets/archive/portrait.jpg', siege: 'assets/archive/siege.jpg',
  mirrors: 'assets/archive/mirrors.jpg', death: 'assets/archive/death.jpg', cicero: 'assets/archive/cicero.jpg',
  palimpsest: 'assets/archive/palimpsest.jpg', palimpsestUV: 'assets/archive/palimpsest-uv.jpg', screw: 'assets/archive/screw.jpg',
  lever: 'assets/archive/lever.jpg', balance: 'assets/archive/balance.jpg', ortigia: 'assets/archive/ortigia.jpg', bath: 'assets/archive/bath.jpg',
};
const ARCHIVE_READY = Promise.all(Object.entries(ARCHIVE_FILES).map(([k, f]) => new Promise((res) => {
  const img = new Image(); img.onload = () => { ARCHIVE[k] = img; res(); }; img.onerror = () => res(); img.src = f;
})));

// ---- design space: 1920 x 1080, the camera a slow push over the page
function page(g, S, k, o = {}) {
  const z = lerp(o.z0 ?? 1, o.z1 ?? 1.05, EASE.inOut(k));
  const cx = o.cx ?? 960, cy = o.cy ?? 540, dx = lerp(o.x0 ?? 0, o.x1 ?? 0, EASE.inOut(k)), dy = lerp(o.y0 ?? 0, o.y1 ?? 0, EASE.inOut(k));
  g.scale(S.W / 1920, S.H / 1080);
  g.translate(960, 540); g.scale(z, z); g.translate(-cx + dx, -cy + dy);
  paperBg(g, o.bg);
}
function paperBg(g, bg = PALETTE.bg) {
  g.fillStyle = bg; g.fillRect(-400, -400, 2720, 1880);
  const blots = lazy(() => { const r = rng(77); return Array.from({ length: 26 }, () => [r() * 2200 - 140, r() * 1300 - 110, 60 + r() * 220, r()]); });
  if (bg === PALETTE.bg) for (const [x, y, rr, a] of blots()) { g.globalAlpha = 0.035 + a * 0.04; g.fillStyle = '#b8a582'; g.beginPath(); g.ellipse(x, y, rr, rr * 0.7, a * 3, 0, TAU); g.fill(); }
  g.globalAlpha = 1;
}
const boilT = (t) => Math.floor(t * 12);
function boil(g, t, salt, amt = 1.6) { const n = boilT(t); g.translate((hash1(n * 7 + salt) - 0.5) * amt, (hash1(n * 13 + salt * 3) - 0.5) * amt); }
const PATHS = new Map();
const P = (d) => { let p = PATHS.get(d); if (!p) { p = new Path2D(d); PATHS.set(d, p); } return p; };
function hatch(g, path, o = {}) {              // diagonal ink hatching clipped to a path
  g.save(); g.clip(path); g.strokeStyle = o.color ?? PALETTE.ink; g.lineWidth = o.w ?? 1.6; g.globalAlpha = o.alpha ?? 0.55;
  const step = o.step ?? 10, ang = (o.angle ?? 35) * Math.PI / 180, b = o.box ?? [-600, -600, 3200, 2400];
  g.beginPath();
  for (let i = -b[3]; i < b[2] + b[3]; i += step) { const x0 = b[0] + i; g.moveTo(x0, b[1]); g.lineTo(x0 - Math.tan(ang) * b[3], b[1] + b[3]); }
  g.stroke();
  if (o.cross) { g.beginPath(); for (let i = -b[3]; i < b[2] + b[3]; i += step * 1.3) { const x0 = b[0] + i; g.moveTo(x0, b[1]); g.lineTo(x0 + Math.tan(ang) * b[3], b[1] + b[3]); } g.stroke(); }
  g.restore();
}
function ink(g, path, fill, o = {}) {
  if (fill) { g.fillStyle = fill; g.fill(path); }
  if (o.hatch) hatch(g, path, o.hatch);
  if (o.stroke !== false) { g.strokeStyle = o.ink ?? PALETTE.ink; g.lineWidth = o.w ?? 4; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(path); }
}
function line(g, pts, w = 4, color = PALETTE.ink) {
  g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath();
  pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke();
}
function ellipsePath(x, y, rx, ry, rot = 0) { const p = new Path2D(); p.ellipse(x, y, rx, ry, rot, 0, TAU); return p; }
function rectPath(x, y, w, h) { const p = new Path2D(); p.rect(x, y, w, h); return p; }
function font(role, px, weight = 400) { setType(g_ctx(), TYPE, role, px, { weight }); }
let G_CTX = null; const g_ctx = () => G_CTX;
function say(g, str, x, y, px, color = PALETTE.ink, o = {}) {
  setType(g, TYPE, o.role ?? 'display', px, { weight: o.weight ?? 400 });
  g.fillStyle = color; g.textAlign = o.align ?? 'center'; g.textBaseline = 'middle';
  const s = o.caps ? str.toLocaleUpperCase('tr') : str;
  if (o.reveal != null && o.reveal < 1) {
    const m = g.measureText(s).width, x0 = o.align === 'left' ? x : x - m / 2;
    g.save(); g.beginPath(); g.rect(x0 - 4, y - px, m * clamp(o.reveal) + 4, px * 2); g.clip(); g.fillText(s, x, y); g.restore();
  } else g.fillText(s, x, y);
}

// ---- Archimedes: round bald head, white beard, toga; local origin at his waist (feet at y = +250 when standing)
const ARCH = {
  torso: 'M-100 -260 C-110 -180 -120 -100 -130 0 L130 0 C120 -100 110 -180 100 -260 C60 -285 -60 -285 -100 -260 Z',
  toga: 'M-120 -140 C-60 -180 40 -220 110 -270 C125 -220 130 -140 130 0 L-130 0 C-128 -50 -125 -100 -120 -140 Z',
  togaFolds: 'M-80 -130 C-30 -150 40 -180 100 -220 M-90 -80 C-20 -100 50 -130 120 -160 M-100 -30 C-20 -50 60 -70 125 -90',
  skirt: 'M-130 0 C-140 90 -150 170 -160 240 L160 240 C150 170 140 90 130 0 Z',
  skirtFolds: 'M-60 10 C-70 90 -80 170 -85 238 M10 10 C10 90 15 170 20 238 M80 10 C90 90 100 170 105 238',
  hairL: 'M-70 -470 C-120 -475 -135 -440 -120 -420 C-145 -405 -138 -368 -110 -362 C-120 -340 -92 -320 -70 -335 Z',
  hairR: 'M70 -470 C120 -475 135 -440 120 -420 C145 -405 138 -368 110 -362 C120 -340 92 -320 70 -335 Z',
  beard: 'M-85 -380 C-90 -310 -60 -240 0 -205 C60 -240 90 -310 85 -380 C60 -345 40 -335 0 -335 C-40 -335 -60 -345 -85 -380 Z',
  beardLines: 'M-40 -310 C-35 -270 -20 -245 0 -225 M40 -310 C35 -270 20 -245 0 -225 M0 -320 L0 -220',
};
function arch(g, x, y, s, t, o = {}) {
  g.save(); g.translate(x, y); g.scale(s * (o.flip ? -1 : 1), s); boil(g, t, 11);
  if (o.lean) g.rotate(o.lean);
  const shoulderL = [-85, -255], shoulderR = [85, -255];
  const arm = (sh, hand, elbow) => {
    const pts = [sh, elbow ?? [(sh[0] + hand[0]) / 2 + (hand[0] - sh[0]) * 0.1, (sh[1] + hand[1]) / 2 + 20], hand];
    g.lineCap = 'round'; g.lineJoin = 'round';
    g.strokeStyle = PALETTE.ink; g.lineWidth = 38; g.beginPath(); g.moveTo(...pts[0]); g.quadraticCurveTo(...pts[1], ...pts[2]); g.stroke();
    g.strokeStyle = PALETTE.skin; g.lineWidth = 30; g.stroke();
    ink(g, ellipsePath(hand[0], hand[1], 24, 24), PALETTE.skin, { w: 4 });
  };
  const poses = {
    up: [[-200, -520], [200, -520]], down: [[-150, -60], [150, -60]], chin: [[-150, -60], [30, -330, [120, -200]]],
    point: [[-150, -60], [300, -330]], pull: [[-260, -230], [-250, -180]], draw: [[-160, -40], [190, -20]],
    shrug: [[-210, -250, [-190, -160]], [210, -250, [190, -160]]], wave: [[-150, -60], [210, -480]],
  };
  const [al, ar] = poses[o.arms ?? 'down'];
  if (o.lower !== false) { ink(g, P(ARCH.skirt), PALETTE.paper, { w: 4 }); ink(g, P(ARCH.skirtFolds), null, { w: 2.5 });
    ink(g, ellipsePath(-60, 252, 42, 14), PALETTE.ink, { w: 2 }); ink(g, ellipsePath(60, 252, 42, 14), PALETTE.ink, { w: 2 }); }
  ink(g, P(ARCH.torso), PALETTE.skin, { w: 4, hatch: { step: 9, alpha: 0.18, angle: 40 } });
  if (o.toga !== false) { ink(g, P(ARCH.toga), PALETTE.paper, { w: 4 }); ink(g, P(ARCH.togaFolds), null, { w: 2.5 }); }
  arm(shoulderL, al.slice(0, 2), al[2]); arm(shoulderR, ar.slice(0, 2), ar[2]);
  // head
  ink(g, P(ARCH.hairL), PALETTE.paper, { w: 4 }); ink(g, P(ARCH.hairR), PALETTE.paper, { w: 4 });
  ink(g, ellipsePath(0, -395, 92, 100), PALETTE.skin, { w: 4 });
  ink(g, ellipsePath(-96, -390, 18, 28), PALETTE.skin, { w: 4 }); ink(g, ellipsePath(96, -390, 18, 28), PALETTE.skin, { w: 4 });
  hatch(g, ellipsePath(30, -440, 70, 60), { step: 8, alpha: 0.12 });
  const blink = (Math.floor(t * 12) % 46) === 0;
  const [px, py] = o.look ?? [0, 0];
  if (blink) { line(g, [[-50, -405], [-20, -405]], 4); line(g, [[20, -405], [50, -405]], 4); }
  else {
    const er = o.mood === 'wide' ? 22 : 17;
    ink(g, ellipsePath(-35, -405, er * 0.85, er), '#fff', { w: 3.5 }); ink(g, ellipsePath(35, -405, er * 0.85, er), '#fff', { w: 3.5 });
    ink(g, ellipsePath(-32 + px * 7, -403 + py * 7, 7, 7), PALETTE.ink, { stroke: false }); ink(g, ellipsePath(38 + px * 7, -403 + py * 7, 7, 7), PALETTE.ink, { stroke: false });
  }
  const browUp = o.mood === 'wide' ? -14 : o.mood === 'doubt' ? 0 : -6, tilt = o.mood === 'doubt' ? 8 : 0;
  line(g, [[-60, -440 + browUp - tilt], [-45, -452 + browUp - tilt], [-14, -446 + browUp]], 5);
  line(g, [[14, -446 + browUp], [45, -452 + browUp + tilt], [60, -440 + browUp + tilt]], 5);
  line(g, [[0, -395], [-8, -372], [6, -366]], 3.5);
  ink(g, P(ARCH.beard), '#faf6ee', { w: 4 }); ink(g, P(ARCH.beardLines), null, { w: 2.4 });
  const talk = o.talk ? 0.5 + 0.5 * Math.sin(t * 18) : 0;
  if (o.mouth === 'open' || o.mouth === 'shout') ink(g, ellipsePath(0, -350, o.mouth === 'shout' ? 30 : 20, (o.mouth === 'shout' ? 26 : 14) + talk * 6), '#5a2a1c', { w: 3.5 });
  else if (o.mouth === 'smile') line(g, [[-24, -356], [0, -342], [24, -356]], 4);
  else line(g, [[-16, -350 + talk * 3], [16, -350 + talk * 3]], 4);
  g.restore();
}

// ---- other cast, simpler: a head, a body block, a hat; local origin at the feet
function person(g, x, y, s, t, o = {}) {
  g.save(); g.translate(x, y); g.scale(s * (o.flip ? -1 : 1), s); boil(g, t, o.salt ?? 5);
  const robe = o.robe ?? PALETTE.paper, h = o.h ?? 1;
  ink(g, P('M-70 0 C-75 -120 -80 -240 -60 -330 C-20 -350 20 -350 60 -330 C80 -240 75 -120 70 0 Z'), robe, { w: 4, hatch: o.dark ? { step: 7, alpha: 0.7, cross: true } : { step: 11, alpha: 0.2 } });
  if (o.arm) { line(g, [[50, -300], o.arm], 22, PALETTE.ink); line(g, [[50, -300], o.arm], 15, PALETTE.skin); }
  if (o.belt) line(g, [[-68, -160], [68, -160]], 6);
  ink(g, ellipsePath(0, -395, 58, 64), PALETTE.skin, { w: 4 });
  if (o.beard) ink(g, P('M-55 -390 C-55 -330 -30 -300 0 -295 C30 -300 55 -330 55 -390 C35 -360 -35 -360 -55 -390 Z'), o.beard, { w: 3.5 });
  if (o.moustache) ink(g, P('M-30 -372 C-15 -382 -5 -378 0 -372 C5 -378 15 -382 30 -372 C20 -362 5 -366 0 -368 C-5 -366 -20 -362 -30 -372 Z'), PALETTE.ink, { w: 2 });
  const look = o.look ?? 0;
  ink(g, ellipsePath(-20 + look * 6, -400, 6, 7), PALETTE.ink, { stroke: false }); ink(g, ellipsePath(20 + look * 6, -400, 6, 7), PALETTE.ink, { stroke: false });
  if (o.glasses) { g.lineWidth = 3; g.strokeStyle = PALETTE.ink; g.beginPath(); g.arc(-20, -400, 15, 0, TAU); g.moveTo(35, -400); g.arc(20, -400, 15, 0, TAU); g.stroke(); }
  if (o.sweat) for (let i = 0; i < 3; i++) ink(g, ellipsePath(-70 - i * 14, -430 + ((t * 60 + i * 20) % 50), 6, 10), '#fff', { w: 2 });
  if (!o.beard && !o.moustache) line(g, [[-14, -365], [14, -365 + (o.frown ? -4 : 4)]], 3.5);
  const hats = {
    crown: 'M-55 -450 L-62 -500 L-30 -470 L0 -515 L30 -470 L62 -500 L55 -450 Z',
    helmet: 'M-62 -410 C-62 -480 62 -480 62 -410 L62 -400 L-62 -400 Z M-10 -470 C-40 -530 40 -540 60 -470 C40 -500 10 -500 -10 -470 Z',
    hood: 'M-75 -380 C-80 -470 -40 -490 0 -490 C40 -490 80 -470 75 -380 C60 -440 -60 -440 -75 -380 Z',
    bowler: 'M-45 -440 C-45 -490 45 -490 45 -440 Z M-70 -440 L70 -440 L70 -430 L-70 -430 Z',
    hardhat: 'M-58 -430 C-58 -490 58 -490 58 -430 Z M-70 -432 L74 -432 L74 -422 L-70 -422 Z',
    curls: 'M-60 -420 C-70 -470 -30 -480 -20 -460 C-10 -490 30 -485 30 -460 C45 -480 75 -460 60 -420 C40 -450 -40 -450 -60 -420 Z',
    laurel: 'M-58 -430 C-40 -455 40 -455 58 -430',
  };
  if (o.hat) ink(g, P(hats[o.hat]), o.hat === 'crown' ? PALETTE.gold : o.hat === 'hood' ? '#8a7b66' : o.hat === 'helmet' ? '#b9a47a' : o.hat === 'curls' ? PALETTE.ink : PALETTE.paper, { w: 4, hatch: o.hat === 'helmet' ? { step: 7, alpha: 0.35 } : undefined });
  if (o.shield) { ink(g, P('M-120 -300 C-120 -330 -40 -330 -40 -300 L-40 -110 C-40 -80 -120 -80 -120 -110 Z'), PALETTE.accent, { w: 4, hatch: { step: 8, alpha: 0.35 } }); }
  g.restore();
}

// ---- world objects
function sea(g, y0, t, o = {}) {
  ink(g, rectPath(-400, y0, 2720, 1500), o.fill ?? PALETTE.sea, { stroke: false });
  g.strokeStyle = PALETTE.ink; g.lineWidth = 2.2; g.globalAlpha = 0.6;
  for (let r = 0; r < 14; r++) {
    const y = y0 + 18 + r * r * 4.5, ph = t * (0.8 + r * 0.05) + r * 1.7; g.beginPath();
    for (let x = -300; x < 2300; x += 70) { const yy = y + Math.sin(x * 0.012 + ph) * (3 + r * 0.6); g.moveTo(x, yy); g.quadraticCurveTo(x + 18, yy - 6 - r * 0.3, x + 36, yy); }
    g.stroke();
  }
  g.globalAlpha = 1; line(g, [[-400, y0], [2320, y0]], 4);
}
function ship(g, x, y, s, t, o = {}) {
  g.save(); g.translate(x, y + Math.sin(t * 1.6 + x) * 4); g.scale(s * (o.flip ? -1 : 1), s); g.rotate(o.tilt ?? Math.sin(t * 1.3 + x * 0.01) * 0.02);
  // hull with a ram at the bow (right)
  ink(g, P('M-260 -40 C-250 10 -200 40 -120 45 L190 45 C230 40 260 20 300 10 L340 18 L300 -10 L260 -40 Z'), '#9a8668', { w: 4, hatch: { step: 8, alpha: 0.5 } });
  line(g, [[-250, -20], [270, -20]], 3);
  g.strokeStyle = PALETTE.ink; g.lineWidth = 3; g.beginPath();
  for (let i = 0; i < 12; i++) { const ox = -200 + i * 38, sw = Math.sin(t * 3 + i * 0.4) * 10; g.moveTo(ox, 0); g.lineTo(ox - 14 + sw, 70); } g.stroke();
  line(g, [[0, -40], [0, -260]], 6);
  if (o.sail !== false) {
    const burn = o.burn ?? 0;
    ink(g, P('M-110 -250 C-60 -235 60 -235 110 -250 L120 -80 C60 -95 -60 -95 -120 -80 Z'), PALETTE.paper, { w: 4, hatch: { step: 12, alpha: 0.18 } });
    if (burn > 0) { g.globalAlpha = clamp(burn * 1.4); ink(g, ellipsePath(10, -170, 40 * burn, 34 * burn), PALETTE.fire, { w: 3 }); g.globalAlpha = 1;
      smoke(g, 10, -200, t, burn); }
  }
  if (o.fire) flames(g, -40, -40, t, o.fire);
  g.restore();
}
function smoke(g, x, y, t, k) {
  for (let i = 0; i < 6; i++) { const p = ((t * 0.5 + i / 6) % 1); g.globalAlpha = (1 - p) * 0.5 * k;
    ink(g, ellipsePath(x + Math.sin(i * 2 + t) * 30 * p, y - p * 260, 20 + p * 50, 16 + p * 40), '#7d746a', { w: 2 }); }
  g.globalAlpha = 1;
}
function flames(g, x, y, t, k) {
  for (let i = 0; i < 5; i++) { const h = (60 + 40 * noise1(t * 6 + i * 3)) * k, ox = x + (i - 2) * 28;
    ink(g, P(`M${ox - 18} ${y} C${ox - 22} ${y - h * 0.5} ${ox - 4} ${y - h * 0.7} ${ox} ${y - h} C${ox + 6} ${y - h * 0.6} ${ox + 22} ${y - h * 0.5} ${ox + 18} ${y} Z`), i % 2 ? PALETTE.fire : PALETTE.gold, { w: 3 }); }
}
function wall(g, x, y, w, h, o = {}) {
  const p = new Path2D(); p.moveTo(x, y + h); p.lineTo(x, y);
  for (let i = 0; i < w; i += 60) { p.lineTo(x + i, y); p.lineTo(x + i, y - 34); p.lineTo(x + i + 34, y - 34); p.lineTo(x + i + 34, y); }
  p.lineTo(x + w, y); p.lineTo(x + w, y + h); p.closePath();
  ink(g, p, '#cdbd9c', { w: 4, hatch: { step: 9, alpha: 0.3 } });
  g.strokeStyle = PALETTE.ink; g.lineWidth = 2; g.globalAlpha = 0.6; g.beginPath();
  for (let r = 1; r * 46 < h; r++) { g.moveTo(x, y + r * 46); g.lineTo(x + w, y + r * 46); for (let i = (r % 2) * 40; i < w; i += 80) { g.moveTo(x + i, y + (r - 1) * 46); g.lineTo(x + i, y + r * 46); } }
  g.stroke(); g.globalAlpha = 1;
}
function sun(g, x, y, r, t) {
  ink(g, ellipsePath(x, y, r, r), '#f1dfa9', { w: 4 });
  g.strokeStyle = PALETTE.ink; g.lineWidth = 4; g.beginPath();
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU + t * 0.1; g.moveTo(x + Math.cos(a) * (r + 18), y + Math.sin(a) * (r + 18)); g.lineTo(x + Math.cos(a) * (r + 48 + (i % 2) * 20), y + Math.sin(a) * (r + 48 + (i % 2) * 20)); }
  g.stroke();
}
function crown(g, x, y, s, t, glint = 0) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.lineWidth = 16; g.strokeStyle = PALETTE.ink; g.beginPath(); g.ellipse(0, 0, 110, 46, 0, 0, TAU); g.stroke();
  g.lineWidth = 10; g.strokeStyle = PALETTE.gold; g.stroke();
  for (let i = 0; i < 18; i++) { const a = i / 18 * TAU, lx = Math.cos(a) * 110, ly = Math.sin(a) * 46;
    g.save(); g.translate(lx, ly); g.rotate(a + 0.9); ink(g, ellipsePath(0, -16, 11, 24), PALETTE.gold, { w: 3 }); g.restore(); }
  if (glint > 0) { g.globalAlpha = glint; line(g, [[60, -70], [60, -30]], 4, '#fff'); line(g, [[40, -50], [80, -50]], 4, '#fff'); g.globalAlpha = 1; }
  g.restore();
}
function tub(g, x, y, s, water = 0.6, t = 0, overflow = 0) {
  g.save(); g.translate(x, y); g.scale(s, s);
  ink(g, P('M-320 -120 L320 -120 L280 120 L-280 120 Z'), '#d9c9aa', { w: 4, hatch: { step: 10, alpha: 0.35 } });
  line(g, [[-305, -50], [305, -50]], 7); line(g, [[-290, 50], [290, 50]], 7);
  for (const xx of [-200, -80, 40, 160]) line(g, [[xx, -118], [xx + 6, 118]], 2.5);
  const wy = -120 - water * 30;
  ink(g, P(`M-330 -118 C-200 ${wy - 10} -100 ${wy + 12} 0 ${wy} C100 ${wy - 12} 200 ${wy + 10} 330 -118 Z`), PALETTE.water, { w: 3.5 });
  if (overflow > 0) for (const sx of [-1, 1]) {
    ink(g, P(`M${sx * 315} -125 C${sx * 360} -60 ${sx * 350} 40 ${sx * (330 + 20 * overflow)} 125`), null, { w: 14 * overflow, ink: PALETTE.water });
    for (let i = 0; i < 4; i++) { const p = (t * 1.5 + i / 4) % 1; ink(g, ellipsePath(sx * (340 + p * 90), -120 + p * 260 - Math.sin(p * Math.PI) * 120, 9, 12), PALETTE.water, { w: 2.5 }); }
  }
  g.restore();
}
function vessel(g, x, y, level, label, o = {}) {
  ink(g, P(`M${x - 90} ${y - 260} L${x - 90} ${y} L${x + 90} ${y} L${x + 90} ${y - 260}`), null, { w: 5 });
  ink(g, rectPath(x - 88, y - level, 176, level), PALETTE.water, { stroke: false });
  line(g, [[x - 88, y - level], [x + 88, y - level]], 3);
  if (o.drop) { for (let i = 0; i < 3; i++) { const p = (o.t * 1.2 + i / 3) % 1; ink(g, ellipsePath(x + 100 + p * 30, y - 255 + p * 240, 7, 10), PALETTE.water, { w: 2 }); } }
  if (label) say(g, label, x, y + 46, 34, PALETTE.ink, { role: 'mono' });
}
function scroll(g, x, y, w, h, s = 1, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s); g.rotate(o.rot ?? 0);
  ink(g, rectPath(-w / 2, -h / 2, w, h), PALETTE.paper, { w: 4, hatch: { step: 14, alpha: 0.08 } });
  ink(g, ellipsePath(-w / 2, 0, 16, h / 2 + 6), '#d9c9aa', { w: 4 }); ink(g, ellipsePath(w / 2, 0, 16, h / 2 + 6), '#d9c9aa', { w: 4 });
  g.globalAlpha = 0.5; for (let i = 0; i < 6; i++) line(g, [[-w / 2 + 40, -h / 2 + 40 + i * (h - 80) / 5], [w / 2 - 40 - (i % 3) * 40, -h / 2 + 40 + i * (h - 80) / 5]], 3); g.globalAlpha = 1;
  if (o.title) say(g, o.title, 0, -h / 2 - 34, 40, PALETTE.ink, { role: 'display' });
  if (o.mark) mark(g, w / 2 - 20, -h / 2 + 10, o.mark, o.markK ?? 1);
  g.restore();
}
function mark(g, x, y, kind, k = 1) {             // a hand-drawn tick or cross, drawn on
  if (k <= 0) return;
  g.save(); g.translate(x, y); g.lineWidth = 12; g.lineCap = 'round'; g.strokeStyle = kind === 'ok' ? PALETTE.D : PALETTE.E;
  g.beginPath();
  if (kind === 'ok') { const a = clamp(k * 2), b = clamp(k * 2 - 1); g.moveTo(-40, 0); g.lineTo(-40 + 30 * a, 30 * a); if (b > 0) g.lineTo(-10 + 70 * b, 30 - 90 * b); }
  else { const a = clamp(k * 2), b = clamp(k * 2 - 1); g.moveTo(-35, -35); g.lineTo(-35 + 70 * a, -35 + 70 * a); if (b > 0) { g.moveTo(35, -35); g.lineTo(35 - 70 * b, -35 + 70 * b); } }
  g.stroke(); g.restore();
}
function tag(g, x, y, label, t, o = {}) {        // a luggage tag with a source name: "Vitruvius · MÖ 1. yüzyıl"
  g.save(); g.translate(x, y); g.rotate(o.rot ?? -0.04 + Math.sin(t * 1.5 + x) * 0.015);
  setType(g, TYPE, 'mono', o.px ?? 34, { weight: 700 }); const w = g.measureText(label).width + 80, h = (o.px ?? 34) * 2.1;
  ink(g, P(`M0 ${-h / 2} L${w} ${-h / 2} L${w} ${h / 2} L0 ${h / 2} L-30 0 Z`), PALETTE.paper, { w: 3.5 });
  ink(g, ellipsePath(-6, 0, 8, 8), PALETTE.bg, { w: 3 });
  g.fillStyle = PALETTE.ink; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText(label, 26, 2);
  g.restore();
}
function insert(g, key, x, y, w, t, o = {}) {      // an archive picture pasted on the page, with a typed caption
  const img = ARCHIVE[key]; const ar = img ? img.naturalHeight / img.naturalWidth : 0.7, h = w * (o.crop ?? ar);
  const k = o.k ?? 1; if (k <= 0) return;
  g.save(); g.translate(x, y); g.rotate(o.rot ?? 0.02); const sc = lerp(1.18, 1, EASE.out(clamp(k))); g.scale(sc, sc); g.globalAlpha = clamp(k * 3);
  g.fillStyle = 'rgba(40,30,20,0.18)'; g.fillRect(-w / 2 + 12, -h / 2 + 14, w + 24, h + 24);
  ink(g, rectPath(-w / 2 - 14, -h / 2 - 14, w + 28, h + (o.caption ? 74 : 28)), PALETTE.paper, { w: 2 });
  if (img) {
    g.save(); g.beginPath(); g.rect(-w / 2, -h / 2, w, h); g.clip();
    const iw = w * (o.zoom ?? 1), ih = iw * ar, ox = (o.pan?.[0] ?? 0) * (iw - w), oy = (o.pan?.[1] ?? 0.5) * (ih - h);
    g.filter = o.filter ?? 'sepia(0.35) contrast(1.05)'; g.drawImage(img, -w / 2 - ox, -h / 2 - oy, iw, ih); g.filter = 'none'; g.restore();
  } else { ink(g, rectPath(-w / 2, -h / 2, w, h), PALETTE.dim, { w: 2, hatch: { step: 14, alpha: 0.25 } }); say(g, '[' + key + ']', 0, 0, 30, PALETTE.ink, { role: 'mono' }); }
  g.strokeStyle = PALETTE.ink; g.lineWidth = 2; g.strokeRect(-w / 2, -h / 2, w, h);
  if (o.caption) say(g, o.caption, -w / 2, h / 2 + 32, 26, PALETTE.ink, { role: 'mono', align: 'left' });
  g.restore();
}
function yearline(g, items, k, y = 960, o = {}) {   // [ [x, '212', 'MÖ'], ... ] drawn on left to right
  const x0 = o.x0 ?? 200, x1 = o.x1 ?? 1720, xe = lerp(x0, x1, EASE.inOut(clamp(k)));
  line(g, [[x0, y], [xe, y]], 5);
  for (const [x, label, sub] of items) { if (x > xe) continue;
    line(g, [[x, y - 18], [x, y + 18]], 5); say(g, label, x, y - 50, 40, PALETTE.ink, { role: 'display' }); if (sub) say(g, sub, x, y + 46, 28, PALETTE.ink, { role: 'mono' }); }
}
function span(g, xa, xb, y, label, k) {
  if (k <= 0) return; const xe = lerp(xa, xb, EASE.inOut(clamp(k)));
  g.setLineDash([14, 10]); line(g, [[xa, y], [xe, y]], 4, PALETTE.accent); g.setLineDash([]);
  if (k > 0.9) say(g, label, (xa + xb) / 2, y - 36, 44, PALETTE.accent, { role: 'display' });
}
function bubble(g, x, y, str, px, k = 1, o = {}) {
  if (k <= 0) return; setType(g, TYPE, 'display', px); const w = g.measureText(str).width + px * 1.4, h = px * 1.9;
  g.save(); g.translate(x, y); const s = MOTION.back(clamp(k), 2); g.scale(s, s);
  const tx = o.tail ?? -w * 0.25;
  ink(g, P(`M${-w / 2} ${-h / 2} L${w / 2} ${-h / 2} L${w / 2} ${h / 2} L${tx + 40} ${h / 2} L${tx} ${h / 2 + 60} L${tx + 10} ${h / 2} L${-w / 2} ${h / 2} Z`), PALETTE.paper, { w: 4.5 });
  say(g, str, 0, 2, px, o.color ?? PALETTE.accent, { role: 'display' });
  g.restore();
}

// ---- the quiz: a card with the question, three chips and a pencil countdown (3 · 2 · 1)
const VERDICT = { D: ['DOĞRU', 'D'], K: ['KISMEN DOĞRU', 'K'], E: ['EFSANE', 'E'] };
const QUIZ = TL.lines.filter((l) => l.flag === 'q');
const VERDICTS = TL.lines.filter((l) => 'DKE'.includes(l.flag || '-'));
function quizCard(g, t, claim) {
  const q = QUIZ.find((l) => t >= l.at - 0.3 && t < l.at + l.dur + GAP.quiz - 0.1); if (!q) return;
  const k = clamp((t - q.at + 0.3) / 0.5), out = clamp((q.at + q.dur + GAP.quiz - 0.1 - t) / 0.35), vis = Math.min(EASE.out(k), out);
  const n = QUIZ.indexOf(q) + 1;
  g.save(); g.globalAlpha = 0.55 * vis; g.fillStyle = PALETTE.bg; g.fillRect(-400, -400, 2720, 1880); g.globalAlpha = 1;
  g.translate(960, lerp(1300, 520, MOTION.back(vis, 1.2))); g.rotate(-0.015);
  ink(g, rectPath(-560, -300, 1120, 600), PALETTE.paper, { w: 6 });
  ink(g, rectPath(-540, -280, 1080, 560), null, { w: 2 });
  say(g, `${n}. SORU`, 0, -215, 38, PALETTE.accent, { role: 'mono', weight: 700 });
  say(g, 'GERÇEK Mİ?', 0, -140, 92, PALETTE.ink, { role: 'display' });
  say(g, claim ?? '', 0, -45, 48, PALETTE.ink, { role: 'text', weight: 700 });
  const chips = [['DOĞRU', PALETTE.D], ['KISMEN', PALETTE.K], ['EFSANE', PALETTE.E]];
  chips.forEach(([s, c], i) => { const x = -350 + i * 350, pop = clamp((t - q.at - 0.25 - i * 0.12) / 0.3);
    g.save(); g.translate(x, 90); const sc = MOTION.back(pop, 2); g.scale(sc, sc);
    ink(g, rectPath(-150, -52, 300, 104), PALETTE.bg, { w: 5 }); ink(g, rectPath(-150, -52, 22, 104), c, { w: 0, stroke: false });
    say(g, s, 10, 4, 44, c, { role: 'display' }); g.restore(); });
  // countdown: three pencil circles filled one per second after the question ends
  const c0 = q.at + q.dur + 0.3;
  for (let i = 0; i < 3; i++) { const x = -90 + i * 90, fill = clamp((t - c0 - i * 1.0) / 0.5);
    g.lineWidth = 5; g.strokeStyle = PALETTE.ink; g.beginPath(); g.arc(x, 215, 30, 0, TAU); g.stroke();
    if (fill > 0) { g.beginPath(); g.moveTo(x, 215); g.arc(x, 215, 30, -Math.PI / 2, -Math.PI / 2 + TAU * fill); g.closePath(); g.fillStyle = PALETTE.ink; g.globalAlpha = 0.8; g.fill(); g.globalAlpha = 1; }
    say(g, String(3 - i), x, 216, 34, fill > 0.6 ? PALETTE.paper : PALETTE.ink, { role: 'display' }); }
  g.restore();
}
function stampAt(g, t) {                           // the verdict stamp slams on the verdict line
  const v = VERDICTS.find((l) => t >= l.at - 0.05 && t < l.at + l.dur + GAP.verdict + 0.2); if (!v) return;
  const k = clamp((t - v.at + 0.05) / 0.22), [word, key] = VERDICT[v.flag], c = PALETTE[key];
  const fade = clamp((v.at + v.dur + GAP.verdict + 0.2 - t) / 0.3);
  g.save(); g.translate(960, 520); g.rotate(-0.12); const s = lerp(2.2, 1, EASE.in(k)) * (1 + 0.04 * Math.max(0, Math.sin(k * 9)) * (1 - k)); g.scale(s, s);
  g.globalAlpha = clamp(k * 2) * fade;
  setType(g, TYPE, 'display', 150); const w = g.measureText(word).width + 140;
  g.lineWidth = 16; g.strokeStyle = c; g.strokeRect(-w / 2, -120, w, 240); g.lineWidth = 5; g.strokeRect(-w / 2 + 22, -98, w - 44, 196);
  g.fillStyle = c; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(word, 0, 8);
  // dry-ink gaps: paper-coloured specks across the stamp
  const specks = lazy(() => { const r = rng(91); return Array.from({ length: 160 }, () => [r() * 2 - 1, r() * 2 - 1, 2 + r() * 7]); });
  g.fillStyle = PALETTE.bg; for (const [sx, sy, sr] of specks()) { g.beginPath(); g.arc(sx * w / 2, sy * 120, sr, 0, TAU); g.fill(); }
  g.restore();
}
function tally(g, t) {                             // the score in the corner: seven boxes, filled per verdict
  if (t < at('VO7')) return; const k = clamp((t - at('VO7')) / 0.6);
  g.save(); g.globalAlpha = k; g.translate(1880 - 7 * 62, 60);
  for (let i = 0; i < 7; i++) {
    const v = VERDICTS[i], done = v && t >= v.at; ink(g, rectPath(i * 62, 0, 50, 50), done ? PALETTE[v.flag] : PALETTE.paper, { w: 3.5 });
    if (done) say(g, v.flag, i * 62 + 25, 27, 30, PALETTE.paper, { role: 'display' });
    else if (QUIZ[i] && t >= QUIZ[i].at) say(g, '?', i * 62 + 25, 27, 30, PALETTE.ink, { role: 'display' });
  }
  g.restore();
}
function subs(g, t) {                              // temporary narration subtitle (draft aid until the voice arrives)
  if (!TEMP_SUBS) return; const l = TL.lines.find((x) => t >= x.at && t < x.at + x.dur + 0.3); if (!l) return;
  g.save(); setType(g, TYPE, 'text', 40, { weight: 700 }); const w = Math.min(1700, g.measureText(l.text).width + 60);
  g.globalAlpha = 0.86; g.fillStyle = PALETTE.ink; g.fillRect(960 - w / 2, 1000, w, 58); g.globalAlpha = 1;
  g.fillStyle = PALETTE.paper; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(l.text, 960, 1030); g.restore();
}
const CLAIMS = ['Hamamda “Evreka!” diye koştu', 'Aynalarla Roma gemilerini yaktı', 'Demir pençe gemileri kaldırdı', '“Bana bir dayanak verin…”', 'Su burgusunu o icat etti', 'Son sözü: “Çemberlerimi bozma!”', 'Kitabı bir dua kitabı oldu'];
// every scene draws its picture, then the shared layers: quiz card, stamp, score, temporary subtitle
const scene = (fn, o = {}) => (g, k, t, S) => {
  G_CTX = g; g.save(); fn(g, k, t, S); g.restore();
  g.save(); g.scale(S.W / 1920, S.H / 1080);
  const qi = QUIZ.findIndex((l) => t >= l.at - 0.3 && t < l.at + l.dur + GAP.quiz);
  if (qi >= 0) quizCard(g, t, CLAIMS[qi]);
  stampAt(g, t); tally(g, t); subs(g, t);
  g.restore();
};
const kin = (t, a, d = 0.6) => clamp((t - a) / d);  // 0..1 progress of a move that starts at time a

// ============================== SCENES ==============================
// CH0 · cold open
function s0Mirrors(g, k, t, S) {
  // push in, 4 s, ease-in-out, toward the burning sail; the beam sweeps from frame 0
  page(g, S, k, { z0: 1.0, z1: 1.12, cx: 1100, cy: 520 });
  sun(g, 260, 170, 70, t);
  sea(g, 640, t);
  ship(g, 1250, 640, 1.25, t, { burn: clamp((t - 1.2) / 2.2) });
  ship(g, 1720, 680, 0.75, t, {});
  wall(g, -60, 520, 560, 600);
  for (let i = 0; i < 4; i++) person(g, 40 + i * 110, 520, 0.35, t, { hat: 'helmet', salt: i, arm: [110, -360] });
  const sweep = EASE.out(clamp(t / 1.6));
  g.save(); g.globalCompositeOperation = 'multiply'; g.globalAlpha = 0.9; g.fillStyle = '#f2d77a';
  for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(85 + i * 110, 365); g.lineTo(lerp(700, 1262, sweep) - 46, 455); g.lineTo(lerp(700, 1262, sweep) + 46, 470); g.closePath(); g.fill(); }
  g.restore();
  g.save(); g.globalAlpha = 0.85; ink(g, ellipsePath(lerp(700, 1262, sweep), 462, 60, 44), '#fff3c4', { w: 3, ink: PALETTE.gold }); g.restore();
}
function s0Bath(g, k, t, S) {
  page(g, S, k, { z0: 1.06, z1: 1.0 });
  wallTiles(g);
  const leap = MOTION.back(kin(t, at('VO2') + 0.2, 0.5), 1.6);
  tub(g, 960, 860, 1.0, 0.8, t, leap);
  arch(g, 960, lerp(980, 820, leap), 0.82, t, { arms: 'up', mouth: 'shout', mood: 'wide', lower: false });
  tub(g, 960, 860, 1.0, 0.8, t, 0); // the tub's front again over his body
  bubble(g, 620, 220, 'EVREKA!', 86, kin(t, at('VO2') + 0.4, 0.4), { tail: 120 });
}
function wallTiles(g) {
  ink(g, rectPath(-400, 700, 2720, 600), PALETTE.wash, { w: 4 });
  g.globalAlpha = 0.5; for (let i = 0; i < 30; i++) line(g, [[-400 + i * 100, 700], [-400 + i * 100, 1300]], 2); line(g, [[-400, 820], [2320, 820]], 2); line(g, [[-400, 940], [2320, 940]], 2); g.globalAlpha = 1;
  hatch(g, rectPath(-400, -400, 2720, 1100), { step: 12, alpha: 0.12, angle: -30 });
}
function s0Lever(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.08, bg: '#23202a' });
  const stars = lazy(() => { const r = rng(5); return Array.from({ length: 140 }, () => [r() * 2200 - 140, r() * 1200 - 60, r() * 3 + 1]); });
  for (const [x, y, r] of stars()) dot(g, S, x, y, r, '#efe4cf', 0.8);
  const push = EASE.inOut(kin(t, at('VO3'), 2.2)), ang = lerp(0.18, 0.05, push);
  ink(g, ellipsePath(420, 860, 160, 70), '#8a7b66', { w: 4, hatch: { step: 8, alpha: 0.4 } });
  g.save(); g.translate(560, 790); g.rotate(-ang); line(g, [[-160, 0], [1180, 0]], 16, PALETTE.paper); line(g, [[-160, 0], [1180, 0]], 4); g.restore();
  ink(g, P('M520 860 L560 790 L600 860 Z'), PALETTE.paper, { w: 4 });
  const ex = 560 + Math.cos(ang) * 1150, ey = 790 - Math.sin(ang) * 1150 - 130;
  globe(g, ex, ey, 130, t);
  arch(g, 380, 790 - 10, 0.42, t, { arms: 'point', mood: 'wide', mouth: 'open' });
}
function globe(g, x, y, r, t) {
  ink(g, ellipsePath(x, y, r, r), '#9fb3a6', { w: 5 });
  g.save(); g.beginPath(); g.arc(x, y, r, 0, TAU); g.clip();
  ink(g, P(`M${x - r * 0.6} ${y - r * 0.4} C${x - r * 0.2} ${y - r * 0.7} ${x + r * 0.2} ${y - r * 0.2} ${x - r * 0.1} ${y + r * 0.2} C${x - r * 0.4} ${y + r * 0.4} ${x - r * 0.8} ${y} ${x - r * 0.6} ${y - r * 0.4} Z`), '#cbbd8f', { w: 3 });
  ink(g, P(`M${x + r * 0.3} ${y + r * 0.1} C${x + r * 0.7} ${y} ${x + r * 0.8} ${y + r * 0.5} ${x + r * 0.4} ${y + r * 0.7} Z`), '#cbbd8f', { w: 3 });
  hatch(g, ellipsePath(x + r * 0.4, y + r * 0.3, r, r), { step: 8, alpha: 0.35 }); g.restore();
}
function s0Question(g, k, t, S) {
  page(g, S, k, { z0: 1.02, z1: 1.0 });
  const thumbs = [[s0MiniShip, -0.05], [s0MiniBath, 0.03], [s0MiniLever, -0.02]];
  thumbs.forEach(([fn, rot], i) => { const pk = kin(t, at('VO4') + i * 0.18, 0.5); if (pk <= 0) return;
    g.save(); g.translate(400 + i * 560, 470); g.rotate(rot); g.scale(MOTION.back(pk, 1.4), MOTION.back(pk, 1.4));
    ink(g, rectPath(-240, -170, 480, 340), PALETTE.paper, { w: 4 }); g.beginPath(); g.rect(-226, -156, 452, 312); g.save(); g.clip(); fn(g, t); g.restore(); g.restore(); });
  const qk = kin(t, at('VO4') + 1.0, 0.5); if (qk > 0) say(g, '?', 960, 860, 200 * MOTION.back(qk, 2), PALETTE.accent, { role: 'display' });
}
function s0MiniShip(g, t) { g.save(); g.scale(0.32, 0.32); g.translate(-960, -540); sea(g, 640, t); ship(g, 960, 640, 1.3, t, { burn: 0.8 }); sun(g, 400, 200, 70, t); g.restore(); }
function s0MiniBath(g, t) { g.save(); g.scale(0.3, 0.3); g.translate(-960, -620); tub(g, 960, 860, 1, 0.8, t, 1); arch(g, 960, 820, 0.82, t, { arms: 'up', mouth: 'shout', lower: false }); tub(g, 960, 860, 1, 0.8, t, 0); g.restore(); }
function s0MiniLever(g, t) { g.save(); g.scale(0.3, 0.3); g.translate(-960, -600); g.fillStyle = '#23202a'; g.fillRect(-200, -200, 2400, 1600); line(g, [[300, 800], [1500, 600]], 16, PALETTE.paper); globe(g, 1550, 480, 130, t); arch(g, 300, 780, 0.42, t, { arms: 'point' }); g.restore(); }
function s0Stamps(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.04 });
  const big = (word, c, x, y, rot, a) => { const kk = clamp((t - a) / 0.2); if (kk <= 0) return;
    g.save(); g.translate(x, y); g.rotate(rot); const s = lerp(1.9, 1, EASE.in(kk)); g.scale(s, s);
    setType(g, TYPE, 'display', 90); const w = g.measureText(word).width + 90; g.globalAlpha = kk;
    g.lineWidth = 10; g.strokeStyle = c; g.strokeRect(-w / 2, -80, w, 160); g.fillStyle = c; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(word, 0, 6); g.restore(); };
  const a = at('VO6'), d = L.VO6.dur;
  big('DOĞRU', PALETTE.D, 420, 420, -0.08, a + 0.05);
  big('KISMEN', PALETTE.K, 980, 470, 0.05, a + d * 0.3);
  big('EFSANE', PALETTE.E, 1520, 420, -0.1, a + d * 0.75);
  // the pencil writes the seven boxes across the bottom ("Her turda önce sen tahmin edeceksin")
  const bk = kin(t, at('VO7'), 1.2);
  for (let i = 0; i < 7; i++) { const p = clamp(bk * 7 - i); if (p <= 0) continue; g.globalAlpha = p; ink(g, rectPath(560 + i * 120, 760, 90, 90), PALETTE.paper, { w: 5 }); say(g, String(i + 1), 605 + i * 120, 805, 40, PALETTE.ink, { role: 'mono', weight: 700 }); g.globalAlpha = 1; }
  if (bk > 0) pencil(g, 560 + bk * 840, 760, t);
}
function pencil(g, x, y, t) {
  g.save(); g.translate(x, y + Math.sin(t * 20) * 4); g.rotate(-0.6);
  ink(g, rectPath(0, -14, 220, 28), PALETTE.K, { w: 3.5 }); ink(g, P('M0 -14 L-40 0 L0 14 Z'), '#e9d9b6', { w: 3.5 }); ink(g, P('M-28 -4 L-40 0 L-28 4 Z'), PALETTE.ink, { w: 2 });
  ink(g, rectPath(220, -14, 30, 28), '#c98f8f', { w: 3.5 }); g.restore();
}
function s0Istanbul(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.1, cy: 560 });
  // dusk paper, the Istanbul skyline in ink, a closed book in front
  ink(g, rectPath(-400, 600, 2720, 800), PALETTE.sea, { stroke: false }); sea(g, 700, t);
  const sk = new Path2D(); sk.moveTo(-100, 700);
  const domes = [[300, 600, 120], [760, 540, 170], [1260, 580, 140], [1660, 620, 100]];
  for (const [x, y, r] of domes) { sk.lineTo(x - r - 40, 700); sk.lineTo(x - r - 40, y + 40); sk.lineTo(x - r, y + 40); sk.arc(x, y + 40, r, Math.PI, 0); sk.lineTo(x + r + 40, y + 40); sk.lineTo(x + r + 40, 700); }
  sk.lineTo(2000, 700); sk.lineTo(2000, 720); sk.lineTo(-100, 720); sk.closePath();
  ink(g, sk, '#bfae8e', { w: 4, hatch: { step: 9, alpha: 0.35 } });
  for (const x of [520, 1000, 1080, 1460, 1880]) { ink(g, rectPath(x - 12, 330, 24, 370), '#bfae8e', { w: 3.5 }); ink(g, P(`M${x - 12} 330 L${x} 270 L${x + 12} 330 Z`), PALETTE.ink, { w: 3 }); }
  const bk = MOTION.back(kin(t, at('VO8') + 0.2, 0.6), 1.3);
  g.save(); g.translate(960, lerp(1300, 860, bk)); g.rotate(-0.04);
  ink(g, rectPath(-260, -150, 520, 300), '#7b4a32', { w: 5, hatch: { step: 8, alpha: 0.3 } }); ink(g, rectPath(-250, -140, 30, 280), '#5c3524', { w: 3 });
  ink(g, rectPath(150, -30, 110, 60), PALETTE.gold, { w: 4 }); say(g, '?', 0, 0, 120, PALETTE.paper, { role: 'display' }); g.restore();
  const lk = kin(t, at('VO9') + 0.5, 0.5); if (lk > 0) tag(g, 1300, 420, 'İstanbul', t, { px: 44 });
}
function s0Title(g, k, t, S) {
  page(g, S, k, { z0: 1.04, z1: 1.0 });
  const a = after('VO9', 0.3), r = kin(t, a, 0.9);
  hatch(g, rectPath(-400, -400, 2720, 1880), { step: 14, alpha: 0.08 });
  say(g, 'ARŞİMET', 960, 430, 190, PALETTE.ink, { role: 'display', reveal: r });
  say(g, 'Gerçek mi, Efsane mi?', 960, 600, 76, PALETTE.accent, { role: 'text', weight: 700, reveal: kin(t, a + 0.5, 0.8) });
  line(g, [[600, 690], [lerp(600, 1320, EASE.inOut(kin(t, a + 0.8, 0.8))), 690]], 4);
  arch(g, 1540, 980, 0.32, t, { arms: 'wave', mouth: 'smile' });
}

// CH1 · Evreka
function s1King(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.07, cx: 900 });
  palace(g);
  person(g, 600, 960, 1.05, t, { hat: 'crown', beard: '#5b4636', robe: '#b98b5a', look: 1, frown: true, salt: 2, arm: [170, -380] });
  crown(g, 860, 470, 0.85, t, kin(t, at('VO10') + 1.2, 0.3) * (1 - kin(t, at('VO10') + 1.6, 0.4)));
  const gk = kin(t, at('VO11'), 0.6);
  person(g, lerp(1700, 1300, EASE.out(gk)), 960, 0.9, t, { hat: 'curls', robe: '#9a8b6a', sweat: gk > 0.5, look: -1, salt: 4, flip: true });
  if (gk > 0.4) { bubble(g, 1360, 300, 'Saf altın!', 56, kin(t, at('VO11') + 0.5, 0.4), { tail: -60, color: PALETTE.ink }); }
  const mk = kin(t, at('VO12'), 0.5); if (mk > 0) { line(g, [[760, 380], [960, 560]], 8, PALETTE.E); line(g, [[960, 380], [760, 560]], 8, PALETTE.E); say(g, 'eritmek yok', 860, 640, 40, PALETTE.E, { role: 'mono', weight: 700 }); }
  tag(g, 120, 160, 'Siraküza · Sicilya', t, { px: 36 });
}
function palace(g) {
  for (const x of [200, 520, 1400, 1720]) { ink(g, rectPath(x - 40, 160, 80, 820), PALETTE.paper, { w: 4, hatch: { step: 12, alpha: 0.2 } }); for (let i = 1; i < 4; i++) line(g, [[x - 40 + i * 20, 170], [x - 40 + i * 20, 970]], 2); }
  ink(g, P('M80 160 L960 20 L1840 160 Z'), PALETTE.wash, { w: 4, hatch: { step: 10, alpha: 0.25 } });
  ink(g, rectPath(-400, 980, 2720, 400), PALETTE.wash, { w: 4 });
}
function s1Bath(g, k, t, S) {
  page(g, S, k, { z0: 1.08, z1: 1.0, cy: 600 });
  wallTiles(g);
  const sink = EASE.inOut(kin(t, at('VO13'), 1.4)), leap = MOTION.back(kin(t, at('VO14'), 0.45), 1.6);
  const water = 0.3 + sink * 0.6, over = clamp(sink * 1.4 - 0.4);
  tub(g, 960, 880, 1.0, water, t, Math.max(over, leap));
  arch(g, 960, lerp(lerp(940, 1010, sink), 820, leap), 0.82, t, { arms: leap > 0.1 ? 'up' : 'down', mouth: leap > 0.1 ? 'shout' : 'shut', mood: leap > 0.1 ? 'wide' : undefined, lower: false, look: [0, -0.5] });
  tub(g, 960, 880, 1.0, water, t, 0);
  bubble(g, 600, 240, 'EVREKA!', 92, kin(t, at('VO14') + 0.2, 0.35), { tail: 140 });
  if (leap > 0) say(g, 'Buldum!', 600, 360, 40, PALETTE.ink, { role: 'mono', reveal: kin(t, at('VO14') + 0.8, 0.5) });
}
function s1Vessels(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.05 });
  say(g, 'aynı ağırlık', 960, 140, 44, PALETTE.ink, { role: 'mono', weight: 700 });
  const fk = EASE.out(kin(t, at('VO15'), 1.4));
  vessel(g, 640, 860, 140 + 60 * fk, 'saf altın');
  vessel(g, 1280, 860, 140 + 110 * fk, 'taç', { drop: fk > 0.9, t });
  ink(g, rectPath(600, 860 - 130 - 60 * fk, 80, 60), PALETTE.gold, { w: 3.5, hatch: { step: 8, alpha: 0.3 } });
  crown(g, 1280, 860 - 120 - 110 * fk + 40, 0.42, t);
  const gk = kin(t, at('VO16'), 0.5);
  if (gk > 0) { tag(g, 1420, 520, 'Ag · gümüş', t, { px: 38 }); mark(g, 1640, 380, 'no', kin(t, at('VO16') + 1.4, 0.5)); }
  if (gk > 0) person(g, lerp(2100, 1720, EASE.out(gk)), 1060, 0.6, t, { hat: 'curls', sweat: true, robe: '#9a8b6a', flip: true, salt: 4 });
}
function s1Vitruvius(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.06, cx: 980 });
  insert(g, 'bath', 520, 430, 640, t, { k: kin(t, at('VO17') - 0.3, 0.5), rot: -0.03, caption: 'Hamam hikâyesi, eski bir gravür' });
  scroll(g, 1360, 420, 560, 360, 1, { title: 'De Architectura' });
  tag(g, 1180, 690, 'Vitruvius · MÖ 1. yüzyıl', t);
  const yk = kin(t, at('VO19'), 1.6);
  yearline(g, [[400, '212', 'MÖ · Arşimet ölür'], [1400, '≈ 25', 'MÖ · Vitruvius yazar']], yk, 920);
  span(g, 400, 1400, 860, '≈ 200 yıl', kin(t, at('VO19') + 1.4, 0.9));
}
function s1Galileo(g, k, t, S) {
  page(g, S, k, { z0: 1.04, z1: 1.0 });
  insert(g, 'balance', 520, 470, 600, t, { k: kin(t, at('VO20') - 0.3, 0.5), rot: 0.025, caption: 'Galileo, La Bilancetta · 1586' });
  // the balance in water, drawn: crown and gold hang from a beam into a tank; the crown side rises
  const tip = EASE.inOut(kin(t, at('VO20') + 1.2, 1.4)) * 0.12;
  ink(g, rectPath(1080, 640, 640, 300), PALETTE.water, { w: 4 }); line(g, [[1400, 300], [1400, 470]], 8); ink(g, P('M1360 300 L1440 300 L1400 260 Z'), PALETTE.paper, { w: 4 });
  g.save(); g.translate(1400, 470); g.rotate(-tip); line(g, [[-260, 0], [260, 0]], 9); g.restore();
  const yl = 470 + Math.sin(tip) * 260, yr = 470 - Math.sin(tip) * 260;
  line(g, [[1140, yl], [1140, yl + 290]], 3); line(g, [[1660, yr], [1660, yr + 290]], 3);
  ink(g, rectPath(1100, yl + 290, 80, 60), PALETTE.gold, { w: 3.5, hatch: { step: 8, alpha: 0.3 } }); crown(g, 1660, yr + 320, 0.36, t);
  tag(g, 1120, 220, 'Galileo · 1586', t);
}
function s1Buoyancy(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.06 });
  ink(g, rectPath(260, 420, 760, 520), PALETTE.water, { w: 5 });
  const bob = Math.sin(t * 2) * 10, rise = EASE.out(kin(t, at('VO21'), 1));
  ink(g, rectPath(520, 600 + bob, 240, 180), '#b59a6c', { w: 5, hatch: { step: 9, alpha: 0.35 } });
  for (const x of [560, 640, 720]) { const h = 120 * rise; line(g, [[x, 900], [x, 900 - h]], 8, PALETTE.D); ink(g, P(`M${x - 18} ${900 - h} L${x} ${880 - h - 20} L${x + 18} ${900 - h} Z`), PALETTE.D, { w: 3 }); }
  line(g, [[640, 600 + bob], [640, 470 + bob]], 6, PALETTE.ink); ink(g, P(`M622 ${600 + bob} L640 ${630 + bob} L658 ${600 + bob} Z`), PALETTE.ink, { w: 2 });
  say(g, 'kaldırma kuvveti', 640, 380, 44, PALETTE.D, { role: 'mono', weight: 700, reveal: kin(t, at('VO21') + 0.8, 0.8) });
  const bk = MOTION.back(kin(t, at('VO22'), 0.6), 1.3);
  g.save(); g.translate(1420, 560); g.rotate(0.05); g.scale(bk, bk);
  ink(g, rectPath(-240, -300, 480, 600), '#8c5a3c', { w: 5, hatch: { step: 9, alpha: 0.3 } }); ink(g, rectPath(-200, -250, 400, 500), PALETTE.paper, { w: 3 });
  say(g, 'Yüzen', 0, -150, 56, PALETTE.ink); say(g, 'Cisimler', 0, -80, 56, PALETTE.ink); say(g, 'Üzerine', 0, -10, 56, PALETTE.ink);
  say(g, 'Arşimet', 0, 140, 40, PALETTE.accent, { role: 'mono', weight: 700 }); g.restore();
  arch(g, 1120, 1020, 0.36, t, { arms: 'point', mouth: 'smile', flip: false });
}

// CH2 · mirrors
function s2Fleet(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.06, x0: 40, x1: -40 });
  sea(g, 600, t);
  for (let i = 0; i < 6; i++) ship(g, 700 + i * 260 - k * 80, 640 + (i % 2) * 70, 0.55 + (i % 3) * 0.08, t, { flip: true });
  wall(g, -100, 420, 520, 700);
  tag(g, 1300, 160, 'MÖ 214 · Siraküza', t, { px: 40 });
  insert(g, 'siege', 1520, 380, 420, t, { k: kin(t, at('VO24') + 1.6, 0.5), rot: 0.04, caption: 'Kuşatma, gravür' });
}
function s2Beams(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.14, cx: 1200, cy: 520 });
  sun(g, 200, 140, 80, t); sea(g, 640, t);
  const fk = kin(t, at('VO26') + 0.6, 1.6);
  ship(g, 1300, 650, 1.1, t, { flip: true, burn: fk, fire: fk > 0.7 ? (fk - 0.7) * 3 : 0 });
  wall(g, -100, 520, 640, 600);
  const beams = kin(t, at('VO26'), 0.8);
  for (let i = 0; i < 5; i++) { const x = 40 + i * 110;
    person(g, x, 520, 0.36, t, { hat: 'helmet', salt: i + 3, arm: [120, -380] });
    ink(g, ellipsePath(x + 45, 382, 26, 34, 0.5), '#f4efe0', { w: 3.5 });
    if (beams > 0) { g.save(); g.globalAlpha = 0.42 * beams; g.fillStyle = '#f6e6a9'; g.beginPath(); g.moveTo(x + 45, 382); g.lineTo(1300 - 20, 480); g.lineTo(1300 + 20, 480); g.closePath(); g.fill(); g.restore(); } }
  say(g, 'anlatılana göre…', 400, 960, 44, PALETTE.ink, { role: 'mono', reveal: kin(t, at('VO25'), 1) });
}
function s2Historians(g, k, t, S) {
  page(g, S, k, { z0: 1.03, z1: 1.0 });
  const names = ['Polybios', 'Livius', 'Plutarkhos'];
  names.forEach((n, i) => { const a = at('VO28') + 0.4 + i * 0.7, sk = MOTION.back(kin(t, a, 0.4), 1.4); if (sk <= 0) return;
    scroll(g, 380 + i * 580, 480, 420, 300, sk, { title: n, rot: (i - 1) * 0.04, mark: 'no', markK: kin(t, at('VO29') + i * 0.25, 0.4) }); });
  const mk = kin(t, at('VO29') - 0.2, 0.5);
  if (mk > 0) { magnifier(g, lerp(300, 1500, EASE.inOut(kin(t, at('VO28') + 0.5, L.VO28.dur + 1))), 520, t); }
  say(g, '“ayna” kelimesi: 0', 960, 880, 56, PALETTE.E, { role: 'display', reveal: kin(t, at('VO29') + 0.8, 0.6) });
}
function magnifier(g, x, y, t) {
  g.save(); g.translate(x, y + Math.sin(t * 3) * 8); g.lineWidth = 14; g.strokeStyle = PALETTE.ink;
  g.beginPath(); g.arc(0, 0, 90, 0, TAU); g.stroke(); g.globalAlpha = 0.25; g.fillStyle = '#fff'; g.fill(); g.globalAlpha = 1;
  ink(g, P('M60 60 L170 170 L150 190 L40 80 Z'), '#7b4a32', { w: 4 }); g.restore();
}
function s2Galen(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.05 });
  insert(g, 'mirrors', 1380, 420, 560, t, { k: kin(t, at('VO30') + 0.3, 0.5), rot: 0.03, caption: 'Aynalar, sonraki yüzyılların gravürü' });
  yearline(g, [[260, '214', 'MÖ · kuşatma'], [1100, '≈ 170', 'MS · Galen: aynalar']], kin(t, at('VO30'), 1.4), 860, { x0: 200, x1: 1200 });
  span(g, 260, 1100, 800, '≈ 400 yıl', kin(t, at('VO30') + 1.3, 0.9));
  tag(g, 160, 200, 'Galen · MS 2. yüzyıl', t);
}
function s2MIT(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.05, cy: 560 });
  tag(g, 140, 140, 'MIT · 2005', t, { px: 40 });
  // 127 mirrors in a grid, aimed at a ship that does not move
  for (let i = 0; i < 127; i++) { const c = i % 16, r = Math.floor(i / 16), x = 160 + c * 34, y = 360 + r * 40;
    ink(g, rectPath(x, y, 28, 32), '#efe9da', { w: 2 }); }
  say(g, '127 ayna', 430, 720, 48, PALETTE.ink, { role: 'mono', weight: 700 });
  const mins = clamp((t - at('VO32')) / L.VO32.dur) * 10;
  clock(g, 1000, 300, 110, mins);
  sea(g, 760, 0); ship(g, 1450, 770, 0.9, 0, { burn: clamp((mins - 7) / 3), fire: mins > 9.6 ? 0.6 : 0 });
  const rk = kin(t, at('VO33'), 1.6);
  if (rk > 0) { for (let i = 0; i < 3; i++) ship(g, 1600 + rk * 900 + i * 160, 820 + i * 30, 0.4, t, { }); say(g, 'Roma gemileri durmaz', 1300, 980, 44, PALETTE.ink, { role: 'mono', reveal: rk * 2 }); }
}
function clock(g, x, y, r, minutes) {
  ink(g, ellipsePath(x, y, r, r), PALETTE.paper, { w: 6 });
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; line(g, [[x + Math.cos(a) * r * 0.82, y + Math.sin(a) * r * 0.82], [x + Math.cos(a) * r * 0.95, y + Math.sin(a) * r * 0.95]], 4); }
  const a = -Math.PI / 2 + minutes / 60 * TAU * 6; line(g, [[x, y], [x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8]], 6);
  line(g, [[x, y], [x + Math.cos(-Math.PI / 2 + minutes / 60 * TAU) * r * 0.5, y + Math.sin(-Math.PI / 2 + minutes / 60 * TAU) * r * 0.5]], 9);
  say(g, `${Math.floor(minutes)} dk`, x, y + r + 50, 44, PALETTE.ink, { role: 'mono', weight: 700 });
}

// CH3 · the claw
function s3Claw(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.06, cx: 1000 });
  sea(g, 720, t); wall(g, -100, 420, 620, 700);
  const grab = kin(t, at('VO36'), 0.8), lift = EASE.inOut(kin(t, at('VO37'), 0.9)), drop = EASE.in(kin(t, at('VO37') + L.VO37.dur * 0.55, 0.6));
  const shipY = 760 - lift * 330 + drop * 360, tilt = -lift * 0.45 + drop * 0.7;
  // the crane: a timber arm pivoting on the wall, rope to the claw
  const tipX = lerp(1050, 1120, grab), tipY = lerp(220, 180, lift);
  line(g, [[420, 400], [tipX, tipY]], 26, '#8a6a46'); line(g, [[420, 400], [tipX, tipY]], 4);
  ink(g, ellipsePath(420, 400, 26, 26), PALETTE.ink, { w: 2 });
  const clawX = lerp(tipX, 1180, grab), clawY = lerp(tipY + 200, shipY - 40, grab);
  line(g, [[tipX, tipY], [clawX, clawY - 30]], 4);
  ink(g, P(`M${clawX - 40} ${clawY - 30} C${clawX - 60} ${clawY} ${clawX - 40} ${clawY + 30} ${clawX - 10} ${clawY + 30} M${clawX + 40} ${clawY - 30} C${clawX + 60} ${clawY} ${clawX + 40} ${clawY + 30} ${clawX + 10} ${clawY + 30}`), null, { w: 12 });
  ship(g, 1260, shipY, 0.95, t, { flip: true, tilt });
  if (drop > 0.8) for (let i = 0; i < 8; i++) { const a = -Math.PI * (0.15 + 0.7 * i / 7), p = kin(t, at('VO37') + L.VO37.dur * 0.55 + 0.5, 0.8);
    ink(g, ellipsePath(1260 + Math.cos(a) * 200 * p, 740 + Math.sin(a) * 200 * p, 14, 18), PALETTE.water, { w: 2.5 }); }
  for (let i = 0; i < 3; i++) person(g, 80 + i * 120, 420, 0.32, t, { hat: 'curls', salt: 8 + i, arm: [140, -320] });
}
function s3Sources(g, k, t, S) {
  page(g, S, k, { z0: 1.03, z1: 1.0 });
  insert(g, 'siege', 1400, 460, 760, t, { k: kin(t, at('VO39') + 0.2, 0.5), rot: -0.02, caption: 'Siraküza kuşatması, eski bir gravür' });
  ['Polybios', 'Livius', 'Plutarkhos'].forEach((n, i) => { const sk = MOTION.back(kin(t, at('VO40') + i * 0.35, 0.4), 1.4); if (sk <= 0) return;
    scroll(g, 330, 220 + i * 250, 380, 190, sk, { title: '', rot: -0.03, mark: 'ok', markK: kin(t, at('VO40') + 0.6 + i * 0.3, 0.4) }); say(g, n, 330, 220 + i * 250, 44, PALETTE.ink); });
  const hk = kin(t, at('VO41'), 0.5);
  if (hk > 0) { tag(g, 900, 960, 'harpagē = kapkaççı', t, { px: 40 }); }
}
function s3Rebuild(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.07 });
  tag(g, 140, 140, '2005 · 7 günde', t, { px: 40 });
  ink(g, rectPath(300, 640, 1320, 320), PALETTE.water, { w: 5 });
  const tip = EASE.inOut(kin(t, at('VO43') + 0.3, 1.4));
  line(g, [[320, 300], [320, 640]], 20, '#8a6a46'); line(g, [[320, 320], [lerp(980, 1040, tip), lerp(260, 200, tip)]], 16, '#8a6a46');
  line(g, [[lerp(980, 1040, tip), lerp(260, 200, tip)], [1060, lerp(560, 480, tip)]], 4);
  g.save(); g.translate(1100, lerp(680, 620, tip)); g.rotate(-tip * 0.75); ship(g, 0, 0, 0.6, 0, { flip: true }); g.restore();
  for (let i = 0; i < 4; i++) person(g, 520 + i * 260, 1060, 0.5, t, { hat: 'hardhat', robe: '#b8a37a', salt: 20 + i, arm: i === 1 ? [160, -420] : undefined });
}

// CH4 · the lever
function s4Quote(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.06 });
  insert(g, 'lever', 560, 480, 760, t, { k: kin(t, at('VO45') - 0.2, 0.5), rot: -0.025, caption: 'Mechanics Magazine, 1824' });
  const qk = kin(t, at('VO46'), L.VO46.dur);
  g.save(); g.translate(1420, 470);
  setType(g, TYPE, 'text', 52, { weight: 700 }); g.fillStyle = PALETTE.ink; g.textAlign = 'center';
  const lines = ['“Bana bir dayanak', 'noktası verin,', 'Dünya’yı yerinden', 'oynatayım.”'];
  lines.forEach((s, i) => { const r = clamp(qk * 4 - i); if (r <= 0) return; say(g, s, 0, -120 + i * 80, 58, PALETTE.ink, { role: 'text', weight: 700, reveal: r }); });
  g.restore();
}
function s4Diagram(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.04 });
  const ext = EASE.inOut(kin(t, at('VO49'), 2.2)), armL = lerp(300, 900, ext);
  const fx = 700, fy = 760;
  ink(g, P(`M${fx - 50} ${fy + 90} L${fx} ${fy} L${fx + 50} ${fy + 90} Z`), PALETTE.paper, { w: 5 });
  line(g, [[fx - 300, fy], [fx + armL, fy]], 14, '#8a6a46'); line(g, [[fx - 300, fy], [fx + armL, fy]], 3);
  ink(g, rectPath(fx - 400, fy - 180, 200, 180), '#9a8668', { w: 5, hatch: { step: 8, alpha: 0.4 } }); say(g, 'YÜK', fx - 300, fy - 90, 44, PALETTE.paper);
  const f = 300 / armL, ax = fx + armL - 10;
  line(g, [[ax, fy - 40 - 220 * f], [ax, fy - 30]], 12, PALETTE.D); ink(g, P(`M${ax - 24} ${fy - 50} L${ax} ${fy - 14} L${ax + 24} ${fy - 50} Z`), PALETTE.D, { w: 3 });
  say(g, 'kuvvet', ax, fy - 90 - 220 * f, 40, PALETTE.D, { role: 'mono', weight: 700 });
  say(g, 'Kaldıraç yasası', 960, 200, 76, PALETTE.ink, { reveal: kin(t, at('VO48'), 0.8) });
  arch(g, 1680, 900, 0.3, t, { arms: 'chin', mood: 'doubt' });
}
function s4Pappus(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.05 });
  scroll(g, 1400, 380, 520, 320, MOTION.back(kin(t, at('VO50'), 0.5), 1.3), { title: 'Pappus' });
  tag(g, 1180, 620, 'İskenderiyeli Pappus · MS 4. yüzyıl', t, { px: 32 });
  yearline(g, [[260, '212', 'MÖ · Arşimet'], [1180, '≈ 320', 'MS · Pappus']], kin(t, at('VO51'), 1.4), 880, { x0: 200, x1: 1300 });
  span(g, 260, 1180, 820, '≈ 500 yıl', kin(t, at('VO51') + 1.3, 0.9));
  arch(g, 420, 600, 0.34, t, { arms: 'shrug', mood: 'doubt' });
}
function s4Ship(g, k, t, S) {
  page(g, S, k, { z0: 1.05, z1: 1.0, x0: 0, x1: -60 });
  ink(g, rectPath(-400, 800, 2720, 600), PALETTE.wash, { w: 4 });
  const pull = EASE.inOut(kin(t, at('VO52'), L.VO52.dur + 1));
  g.save(); g.translate(lerp(1560, 1320, pull), 800); g.scale(1.25, 1.25); ship(g, 0, 0, 1, 0, { sail: true }); g.restore();
  for (let i = 0; i < 3; i++) { const x = 760 - i * 110; ink(g, ellipsePath(x, 560, 34, 34), PALETTE.paper, { w: 4 }); }
  line(g, [[lerp(1560, 1320, pull) - 320, 770], [760, 560], [650, 560], [540, 560], [440, 640]], 4);
  arch(g, 400, 560, 0.58, t, { arms: 'pull', mouth: 'smile', mood: 'doubt', lean: -0.1 });
  const hk = kin(t, at('VO53') + 0.6, 0.5);
  if (hk > 0) { for (let i = 0; i < 3; i++) person(g, 1300 + i * 170, 1080, 0.45, t, { hat: 'curls', beard: '#5b4636', salt: 40 + i, look: -1 });
    bubble(g, 1480, 520, 'Hmm…', 56, hk, { tail: 30, color: PALETTE.ink }); }
}

// CH5 · the screw
function s5Screw(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.06 });
  ink(g, rectPath(-400, 860, 1300, 500), PALETTE.water, { w: 4 });
  g.save(); g.translate(700, 620); g.rotate(-0.55);
  ink(g, rectPath(-520, -80, 1040, 160), '#e5d8bd', { w: 5 });
  g.save(); g.beginPath(); g.rect(-520, -80, 1040, 160); g.clip();
  const ph = t * 2.2;
  for (let i = -6; i < 14; i++) { const x = -520 + ((i * 90 + ph * 90 / TAU * 6) % 1260);
    ink(g, P(`M${x} -80 C${x + 40} -20 ${x + 50} 20 ${x + 90} 80`), null, { w: 7 });
    const wx = x + 45; if (wx > -520 && wx < 520) ink(g, ellipsePath(wx + 20, 50, 22, 16), PALETTE.water, { w: 2 }); }
  g.restore(); line(g, [[-560, 0], [560, 0]], 8); g.restore();
  ink(g, rectPath(1180, 180, 300, 140), PALETTE.water, { w: 4 }); say(g, 'yukarı', 1330, 130, 40, PALETTE.ink, { role: 'mono', weight: 700 });
  const pk = kin(t, at('VO56'), 0.6);
  if (pk > 0) { g.save(); g.globalAlpha = pk; plant(g, 1500, 900); g.restore(); tag(g, 1240, 1000, 'bugün: atık su tesisleri', t, { px: 32 }); }
}
function plant(g, x, y) {
  for (let i = 0; i < 3; i++) { ink(g, rectPath(x - 200 + i * 140, y - 200, 110, 200), PALETTE.paper, { w: 4, hatch: { step: 10, alpha: 0.2 } }); line(g, [[x - 200 + i * 140, y - 190], [x - 90 + i * 140, y - 10]], 6); }
  ink(g, rectPath(x + 230, y - 300, 70, 300), PALETTE.paper, { w: 4 });
}
function s5Egypt(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.05 });
  scroll(g, 400, 330, 440, 260, MOTION.back(kin(t, at('VO58'), 0.4), 1.3), { title: 'Bazı antik yazarlar', mark: 'ok', markK: kin(t, at('VO58') + 0.8, 0.4) });
  scroll(g, 400, 760, 440, 260, MOTION.back(kin(t, at('VO59'), 0.4), 1.3), { title: 'Vitruvius', mark: 'no', markK: kin(t, at('VO59') + 1.2, 0.4) });
  insert(g, 'screw', 1340, 420, 640, t, { k: kin(t, at('VO57') + 0.5, 0.5), rot: 0.03, caption: 'Arşimet burgusu, gravür' });
  const ek = kin(t, at('VO60'), 0.8);
  if (ek > 0) { g.save(); g.globalAlpha = ek;
    ink(g, P('M1000 760 C1100 820 1200 900 1220 1060 L1700 1060 C1700 900 1650 800 1600 760 Z'), '#ddd0b0', { w: 4 });
    ink(g, P('M1300 760 C1320 840 1380 920 1400 1060 L1440 1060 C1420 920 1360 840 1340 760 Z'), PALETTE.water, { w: 3 });
    for (const [x, y, s] of [[1100, 820, 60], [1180, 880, 80]]) ink(g, P(`M${x - s} ${y} L${x} ${y - s * 1.3} L${x + s} ${y} Z`), PALETTE.gold, { w: 3.5, hatch: { step: 8, alpha: 0.3 } });
    say(g, 'Mısır', 1520, 1010, 44, PALETTE.ink, { role: 'mono', weight: 700 }); g.restore(); }
}

// CH6 · the last words, the tomb
function s6Fall(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.07 });
  wall(g, -100, 520, 2120, 700);
  const fk = EASE.out(kin(t, at('VO62') + 0.8, 0.8));
  for (const x of [400, 1000, 1600]) { line(g, [[x, 520], [x, 520 - 260 * fk]], 6); ink(g, P(`M${x} ${520 - 260 * fk} L${x + 150 * fk} ${520 - 220 * fk} L${x} ${520 - 180 * fk} Z`), PALETTE.E, { w: 3 }); }
  tag(g, 120, 150, 'MÖ 212 · Siraküza düşer', t, { px: 38 });
  const mk = kin(t, at('VO63'), 0.6);
  if (mk > 0) { person(g, lerp(2100, 1500, EASE.out(mk)), 1050, 0.8, t, { hat: 'helmet', robe: PALETTE.E, salt: 50, flip: true, arm: [-180, -380] });
    scroll(g, 1150, 360, 420, 200, MOTION.back(kin(t, at('VO63') + 1.2, 0.4), 1.3), { title: 'Marcellus’un emri' }); say(g, 'Dokunulmayacak', 1150, 360, 46, PALETTE.ink, { reveal: kin(t, at('VO63') + 1.6, 0.8) }); }
}
function s6Sand(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.1, cx: 900, cy: 640 });
  ink(g, rectPath(-400, 640, 2720, 800), '#e3d3ae', { w: 4 });
  const dk = kin(t, at('VO64'), 1.6);
  g.save(); g.globalAlpha = 0.85;
  g.lineWidth = 5; g.strokeStyle = PALETTE.ink; g.beginPath(); g.arc(1000, 840, 120, 0, TAU * dk); g.stroke();
  g.beginPath(); g.arc(1240, 860, 70, 0, TAU * clamp(dk * 1.4 - 0.4)); g.stroke(); line(g, [[880, 840], [880 + 360 * dk, 840]], 4); g.restore();
  arch(g, 760, 820, 0.5, t, { arms: 'draw', lower: false, lean: 0.25, look: [1, 1], talk: t > at('VO66') && t < after('VO66') });
  const sk = EASE.out(kin(t, at('VO65'), 1));
  // the soldier: only his shadow and his sandals enter from the right
  g.save(); g.globalAlpha = 0.45 * sk; g.fillStyle = PALETTE.ink;
  g.beginPath(); g.ellipse(lerp(2200, 1500, sk), 860, 260, 50, 0, 0, TAU); g.fill();
  g.beginPath(); g.moveTo(lerp(2200, 1500, sk) - 60, 840); g.lineTo(lerp(2200, 1500, sk) - 420, 700); g.lineTo(lerp(2200, 1500, sk) - 400, 690); g.lineTo(lerp(2200, 1500, sk) - 40, 830); g.fill(); g.restore();
  bubble(g, 560, 300, 'Çemberlerimi bozma!', 64, kin(t, at('VO66'), 0.4), { tail: 120 });
  const ck = kin(t, at('VO67') + 0.8, 0.6);
  if (ck > 0) { g.save(); g.globalAlpha = ck; g.fillStyle = PALETTE.night; g.fillRect(-400, -400, 2720, 1880); g.restore(); }
}
function s6Sources(g, k, t, S) {
  page(g, S, k, { z0: 1.03, z1: 1.0 });
  insert(g, 'death', 560, 450, 700, t, { k: kin(t, at('VO68') - 0.2, 0.5), rot: -0.03, caption: 'Arşimet’in ölümü, mozaik (sonraki dönem)' });
  const ck = kin(t, at('VO70'), 0.6);
  ['Livius', 'Plutarkhos'].forEach((n, i) => { const sk = MOTION.back(kin(t, at('VO70') + i * 0.3, 0.4), 1.3); if (sk <= 0) return;
    scroll(g, 1250 + i * 420, 300, 360, 200, sk, { title: n, mark: 'no', markK: kin(t, at('VO70') + 0.8 + i * 0.3, 0.4) }); });
  const vk = kin(t, at('VO71'), 0.5);
  if (vk > 0) { tag(g, 1160, 640, 'Valerius Maximus · MS 1. yüzyıl', t, { px: 30 });
    bubble(g, 1480, 860, '“Lütfen, bunu bozma.”', 52, kin(t, at('VO72'), 0.4), { tail: -100, color: PALETTE.ink }); }
}
function s6Tomb(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.08, cx: 1000 });
  ink(g, rectPath(-400, 820, 2720, 600), '#d8c8a2', { w: 4 });
  const ck = EASE.out(kin(t, at('VO74'), 1.6)), bush = 1 - EASE.inOut(kin(t, at('VO75'), 1.2));
  ink(g, rectPath(980, 560, 360, 280), '#cdbd9c', { w: 5, hatch: { step: 9, alpha: 0.3 } });
  ink(g, rectPath(1080, 300, 160, 260), PALETTE.paper, { w: 5 }); ink(g, ellipsePath(1160, 430, 78, 78), PALETTE.paper, { w: 5, hatch: { step: 10, alpha: 0.2 } });
  for (let i = 0; i < 14; i++) { const x = 900 + (i % 7) * 90 + (i > 6 ? 40 : 0), y = 560 + (i > 6 ? 200 : 0), off = (i % 2 ? -1 : 1) * bush * 0 + (1 - bush) * (i % 2 ? -300 : 300);
    g.globalAlpha = 0.25 + 0.75 * bush; ink(g, ellipsePath(x + off, y, 90, 70), '#8f9a6c', { w: 4, hatch: { step: 8, alpha: 0.5 } }); }
  g.globalAlpha = 1;
  person(g, lerp(-200, 660, ck), 1000, 0.9, t, { hat: 'laurel', robe: PALETTE.paper, salt: 60, arm: [190, -360], look: 1 });
  tag(g, 120, 140, 'Cicero · MÖ 75', t, { px: 38 });
  insert(g, 'cicero', 1620, 360, 460, t, { k: kin(t, at('VO75') + 1.2, 0.5), rot: 0.04, caption: 'Cicero mezarı bulurken, tablo' });
  const dk = kin(t, at('VO76'), 0.8);
  if (dk > 0) { g.save(); g.globalAlpha = dk; ink(g, rectPath(1460, 640, 260, 300), null, { w: 5 }); ink(g, ellipsePath(1590, 790, 128, 128), null, { w: 4 }); say(g, '2/3', 1590, 790, 64, PALETTE.accent); g.restore(); }
}

// CH7 · the lost book
function s7Scrape(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.06 });
  tag(g, 120, 140, '1229 · Kudüs', t, { px: 40 });
  ink(g, rectPath(560, 200, 800, 720), '#efe4cb', { w: 5 });
  const sc = EASE.inOut(kin(t, at('VO79'), 1.6)), pr = kin(t, at('VO80'), 1.6), ghost = kin(t, at('VO81'), 1);
  // Archimedes' Greek and diagrams, fading under the knife
  g.save(); g.globalAlpha = Math.max(1 - sc, 0.18 * ghost + (1 - sc) * 0.82); greekPage(g, 600, 240, 720, 640, PALETTE.ink); g.restore();
  // prayers written across, in two columns, rotated 90° as in the real book
  g.save(); g.globalAlpha = pr; prayers(g, 600, 240, 720, 640, pr); g.restore();
  if (sc > 0 && sc < 1) { const y = 240 + sc * 640; line(g, [[580, y], [1340, y]], 3, PALETTE.accent); knife(g, 1360, y, t); }
  person(g, 340, 1040, 0.85, t, { hat: 'hood', robe: '#8a7b66', salt: 70, arm: [200, -400] });
  if (ghost > 0) tag(g, 1440, 800, 'altta: Arşimet', t, { px: 34 });
}
function greekPage(g, x, y, w, h, color) {
  const rr = rng(404); g.strokeStyle = color; g.lineWidth = 2.6;
  for (let r = 0; r < 18; r++) { g.beginPath(); let xx = x + 30; const yy = y + 40 + r * 32;
    while (xx < x + w - 30) { const ww = 10 + rr() * 34; g.moveTo(xx, yy); g.lineTo(xx + ww, yy + (rr() - 0.5) * 3); xx += ww + 10; } g.stroke(); }
  g.lineWidth = 3.5; g.beginPath(); g.arc(x + w * 0.72, y + h * 0.7, 90, 0, TAU); g.moveTo(x + w * 0.72 - 90, y + h * 0.7); g.lineTo(x + w * 0.72 + 90, y + h * 0.7);
  g.moveTo(x + w * 0.2, y + h * 0.85); g.quadraticCurveTo(x + w * 0.35, y + h * 0.4, x + w * 0.5, y + h * 0.85); g.stroke();
}
function prayers(g, x, y, w, h, k) {
  const rr = rng(808); g.strokeStyle = '#6b3a2a'; g.lineWidth = 3.4;
  for (let c = 0; c < 2; c++) for (let r = 0; r < 14; r++) { const p = clamp(k * 28 - (c * 14 + r)); if (p <= 0) continue;
    const xx = x + 40 + c * (w / 2), yy = y + 50 + r * 42; g.beginPath(); g.moveTo(xx, yy);
    for (let i = 0; i < 16 * p; i++) g.lineTo(xx + i * 18, yy + Math.sin(i * 1.7 + r) * 6 * rr()); g.stroke(); }
}
function knife(g, x, y, t) { g.save(); g.translate(x, y); g.rotate(-0.4 + Math.sin(t * 14) * 0.05);
  ink(g, P('M0 -10 L120 -18 L140 0 L120 18 L0 10 Z'), '#cfcfcf', { w: 3 }); ink(g, rectPath(140, -14, 120, 28), '#7b4a32', { w: 3 }); g.restore(); }
function s7Map(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.05 });
  // a hand-drawn map of the eastern Mediterranean: coast lines and two cities
  ink(g, rectPath(-400, -400, 2720, 1880), PALETTE.sea, { stroke: false });
  ink(g, P('M-200 -100 L2200 -100 L2200 300 C1900 320 1700 300 1500 380 C1400 420 1300 380 1200 360 C1000 330 900 300 700 380 C500 440 300 380 -200 420 Z'), PALETTE.bg, { w: 4, hatch: { step: 14, alpha: 0.12 } });
  ink(g, P('M1500 1300 L1500 760 C1520 640 1580 560 1700 520 C1800 500 1900 520 2200 520 L2200 1300 Z'), PALETTE.bg, { w: 4, hatch: { step: 14, alpha: 0.12 } });
  const ist = [1280, 300], kud = [1640, 760];
  dot(g, S, ...ist, 14, PALETTE.ink); dot(g, S, ...kud, 14, PALETTE.ink);
  say(g, 'İstanbul', ist[0], ist[1] - 50, 48, PALETTE.ink); say(g, 'Kudüs', kud[0] + 120, kud[1], 48, PALETTE.ink);
  const mk = EASE.inOut(kin(t, at('VO82'), L.VO82.dur + 0.6));
  g.setLineDash([16, 12]); line(g, [kud, [lerp(kud[0], 1500, mk), lerp(kud[1], 540, mk)], [lerp(kud[0], ist[0], mk), lerp(kud[1], ist[1], mk)]].slice(0, 2 + (mk > 0.3)), 5, PALETTE.accent); g.setLineDash([]);
  const bx = lerp(kud[0], ist[0], mk), by = lerp(kud[1], ist[1], mk);
  ink(g, rectPath(bx - 40, by - 30, 80, 60), '#7b4a32', { w: 4 });
  say(g, 'yüzyıllar', 1260, 620, 40, PALETTE.ink, { role: 'mono', weight: 700 });
}
function s7Heiberg(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.08, cx: 1000 });
  for (let i = 0; i < 6; i++) { ink(g, rectPath(100 + i * 300, 160, 260, 720), '#c9b48c', { w: 4 }); for (let r = 0; r < 6; r++) { line(g, [[100 + i * 300, 160 + r * 120], [360 + i * 300, 160 + r * 120]], 4);
    for (let b = 0; b < 8; b++) ink(g, rectPath(110 + i * 300 + b * 30, 175 + r * 120, 24, 100), b % 3 ? '#8a5a3c' : '#6d7a5a', { w: 2 }); } }
  ink(g, rectPath(560, 760, 900, 60), '#8a6a46', { w: 4 });
  ink(g, rectPath(840, 640, 360, 120), '#efe4cb', { w: 4 });
  const gk = kin(t, at('VO86'), 1);
  g.save(); g.globalAlpha = 0.3 + 0.7 * gk; greekPage(g, 850, 646, 340, 110, PALETTE.accent); g.restore();
  person(g, 640, 1060, 0.95, t, { hat: 'bowler', moustache: true, glasses: true, robe: '#4a4038', dark: true, salt: 80, arm: [260, -420] });
  magnifier(g, 1020, 690, t);
  tag(g, 120, 140, '1906 · İstanbul', t, { px: 40 }); tag(g, 1460, 960, 'J. L. Heiberg', t, { px: 34 });
}
function s7Cellar(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.04 });
  const dark = kin(t, at('VO87'), 0.8), gk = kin(t, at('VO88'), 0.5);
  g.save(); g.globalAlpha = 0.85 * dark * (1 - gk); g.fillStyle = PALETTE.night; g.fillRect(-400, -400, 2720, 1880); g.restore();
  ink(g, rectPath(760, 420, 400, 300), '#7b4a32', { w: 5 });
  const spots = lazy(() => { const r = rng(55); return Array.from({ length: 40 }, () => [760 + r() * 400, 420 + r() * 300, 6 + r() * 22]); });
  for (const [x, y, r] of spots()) { if (dark > 0.3) { g.globalAlpha = clamp(dark * 2 - 0.6) * 0.8; ink(g, ellipsePath(x, y, r, r * 0.8), '#5d6b45', { w: 1.5 }); g.globalAlpha = 1; } }
  if (gk > 0) { const hit = MOTION.back(gk, 2);
    g.save(); g.translate(1420, 420); g.rotate(-0.6 + EASE.in(clamp(gk * 2)) * 0.6); ink(g, rectPath(-30, -20, 300, 40), '#7b4a32', { w: 4 }); ink(g, rectPath(-110, -60, 120, 120), '#7b4a32', { w: 4 }); g.restore();
    tag(g, 260, 200, '1998 · New York · açık artırma', t, { px: 36 });
    say(g, '2.000.000 $', 960, 900, 110 * hit, PALETTE.accent); }
}
function s7UV(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.1, bg: PALETTE.night });
  const sk = kin(t, at('VO89'), 1.2), rk = EASE.inOut(kin(t, at('VO90') - 0.2, 1.4));
  // the scanner bar sweeps; the page turns violet; the hidden diagrams surface
  insert(g, 'palimpsest', 960, 500, 860, t, { k: 1, rot: 0, caption: 'Arşimet Palimpsesti, sayfa (Walters Art Museum)', filter: `sepia(0.2) contrast(1.05) brightness(${lerp(0.85, 0.55, rk)})` });
  if (ARCHIVE.palimpsestUV) { g.save(); g.globalAlpha = rk; insert(g, 'palimpsestUV', 960, 500, 860, t, { k: 1, rot: 0, filter: 'none' }); g.restore(); }
  else { g.save(); g.globalCompositeOperation = 'screen'; g.globalAlpha = 0.6 * rk; g.fillStyle = PALETTE.uv; g.fillRect(530, 140, 860, 720); g.restore();
    g.save(); g.globalAlpha = rk; greekPage(g, 560, 180, 800, 640, '#efe0ff'); g.restore(); }
  if (sk > 0 && sk < 1) { const y = 140 + sk * 760; g.save(); g.globalAlpha = 0.7; g.fillStyle = PALETTE.uv; g.fillRect(500, y - 10, 920, 20); g.restore(); }
  tag(g, 120, 140, '1999–2008 · morötesi + X ışını', t, { px: 34 });
}
function s7Method(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.04 });
  // a parabola cut into ever thinner strips: the method of the infinitely small
  const n = Math.round(lerp(4, 60, EASE.inOut(kin(t, at('VO91'), 2.2)))), x0 = 300, x1 = 1100, base = 860, top = 360;
  const y = (x) => base - (base - top) * (1 - ((x - (x0 + x1) / 2) / ((x1 - x0) / 2)) ** 2);
  for (let i = 0; i < n; i++) { const xa = x0 + (x1 - x0) * i / n, xb = x0 + (x1 - x0) * (i + 1) / n, yy = y((xa + xb) / 2);
    ink(g, rectPath(xa, yy, xb - xa, base - yy), i % 2 ? '#e8d7b0' : '#dcc89c', { w: 1.6 }); }
  g.beginPath(); for (let x = x0; x <= x1; x += 8) (x === x0 ? g.moveTo(x, y(x)) : g.lineTo(x, y(x))); g.strokeStyle = PALETTE.accent; g.lineWidth = 6; g.stroke();
  line(g, [[x0 - 40, base], [x1 + 40, base]], 4);
  say(g, `${n} şerit`, 700, 940, 44, PALETTE.ink, { role: 'mono', weight: 700 });
  say(g, 'integral hesabının ilk izi', 1480, 300, 46, PALETTE.ink, { role: 'text', weight: 700, reveal: kin(t, at('VO92'), 1) });
  yearline(g, [[1240, 'MÖ 250', ''], [1760, '1687', 'Newton']], kin(t, at('VO93'), 1.2), 620, { x0: 1200, x1: 1800 });
  span(g, 1240, 1760, 560, '≈ 2000 yıl', kin(t, at('VO93') + 1, 0.8));
}
// CH8 · the score and the ending
function s8Score(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.03 });
  say(g, 'KAÇ TANESİNİ BİLDİN?', 960, 190, 96, PALETTE.ink, { reveal: kin(t, at('VO95'), 0.8) });
  VERDICTS.forEach((v, i) => { const p = MOTION.back(kin(t, at('VO95') + 0.4 + i * 0.16, 0.35), 1.6); if (p <= 0) return;
    g.save(); g.translate(270 + i * 230, 520); g.scale(p, p);
    ink(g, rectPath(-95, -150, 190, 300), PALETTE.paper, { w: 4 });
    say(g, String(i + 1), 0, -100, 40, PALETTE.ink, { role: 'mono', weight: 700 });
    say(g, ['Evreka', 'Aynalar', 'Pençe', 'Dayanak', 'Burgu', 'Son söz', 'Kitap'][i], 0, -30, 34, PALETTE.ink, { role: 'text', weight: 700 });
    ink(g, rectPath(-70, 30, 140, 90), PALETTE[v.flag], { w: 3 }); say(g, v.flag, 0, 78, 58, PALETTE.paper); g.restore(); });
  say(g, 'D 2 · K 4 · E 1', 960, 820, 60, PALETTE.ink, { role: 'mono', weight: 700, reveal: kin(t, at('VO95') + 1.8, 0.6) });
}
function s8End(g, k, t, S) {
  page(g, S, k, { z0: 1.0, z1: 1.12, cy: 520, bg: PALETTE.night });
  insert(g, ARCHIVE.palimpsestUV ? 'palimpsestUV' : 'palimpsest', 1100, 470, 760, t, { k: 1, rot: 0.01, filter: ARCHIVE.palimpsestUV ? 'none' : 'sepia(0.2) brightness(0.8)' });
  if (!ARCHIVE.palimpsestUV) { g.save(); g.globalCompositeOperation = 'screen'; g.globalAlpha = 0.5; g.fillStyle = PALETTE.uv; g.fillRect(720, 160, 760, 640); g.restore(); }
  arch(g, 420, 980, 0.62, t, { arms: 'chin', look: [1, -0.4], mouth: 'smile' });
  const ek = kin(t, after('VO97', 0.6), 1);
  if (ek > 0) { g.save(); g.globalAlpha = ek; g.fillStyle = PALETTE.bg; g.fillRect(-400, -400, 2720, 1880);
    say(g, 'ARŞİMET', 960, 470, 160, PALETTE.ink); say(g, 'Gerçek mi, Efsane mi?', 960, 620, 64, PALETTE.accent, { role: 'text', weight: 700 }); g.restore(); }
}

// The scenes, cut at line starts: a scene runs from (its first line − 0.35 s) to the next scene's start.
const CUTS = [
  ['C0', 0, s0Mirrors, 'the beam sweeps onto a Roman sail and it smokes', { kind: 'water', gain: 0.05 }],
  ['C0', 'VO2', s0Bath, 'Archimedes leaps out of the tub', { kind: 'room', gain: 0.05 }, 'smash'],
  ['C0', 'VO3', s0Lever, 'he pushes a lever that lifts the Earth', { kind: 'air', gain: 0.03 }],
  ['C0', 'VO4', s0Question, 'three stories pop up as pictures and a question mark lands', null, 'wipe'],
  ['C0', 'VO5', s0Stamps, 'three verdict stamps slam down and the score boxes are drawn', { kind: 'room', gain: 0.03 }],
  ['C0', 'VO8', s0Istanbul, 'a locked old book rises in front of Istanbul', { kind: 'water', gain: 0.04 }, 'dissolve'],
  ['C0', after('VO9', 0.2), s0Title, 'the title writes itself', null, 'wipe'],
  ['C1', 'VO10', s1King, 'King Hieron eyes his gold crown, the goldsmith sweats', { kind: 'room', gain: 0.04 }, 'whip'],
  ['C1', 'VO13', s1Bath, 'Archimedes sinks, the water overflows, he leaps shouting', { kind: 'room', gain: 0.05 }],
  ['C1', 'VO15', s1Vessels, 'the crown overflows more water than the gold', { kind: 'room', gain: 0.03 }, 'wipe'],
  ['C1', 'VO18', s1Vitruvius, 'a time line stretches 200 years from his death to the story', null],
  ['C1', 'VO20', s1Galileo, 'Galileo’s balance tips in water', null, 'dissolve'],
  ['C1', 'VO21', s1Buoyancy, 'water pushes a block up; his book appears', { kind: 'water', gain: 0.03 }],
  ['C2', 'VO24', s2Fleet, 'the Roman fleet closes on the walls', { kind: 'water', gain: 0.06 }, 'whip'],
  ['C2', 'VO25', s2Beams, 'soldiers aim mirrors, the beams meet and the ship burns', { kind: 'water', gain: 0.05 }],
  ['C2', 'VO28', s2Historians, 'three histories are searched and crossed out', { kind: 'room', gain: 0.03 }, 'wipe'],
  ['C2', 'VO30', s2Galen, 'the mirrors appear 400 years later on a time line', null],
  ['C2', 'VO31', s2MIT, 'a clock runs ten minutes before a still ship burns', { kind: 'water', gain: 0.03 }, 'dissolve'],
  ['C3', 'VO35', s3Claw, 'the claw lifts a ship and drops it', { kind: 'water', gain: 0.06 }, 'whip'],
  ['C3', 'VO39', s3Sources, 'three histories are ticked beside an old engraving', { kind: 'room', gain: 0.03 }, 'wipe'],
  ['C3', 'VO42', s3Rebuild, 'engineers’ model claw tips a model ship', { kind: 'water', gain: 0.04 }],
  ['C4', 'VO45', s4Quote, 'the famous sentence writes itself beside an 1824 engraving', null, 'whip'],
  ['C4', 'VO48', s4Diagram, 'the lever arm grows and the needed force shrinks', null, 'wipe'],
  ['C4', 'VO50', s4Pappus, 'a time line stretches 500 years to Pappus', null],
  ['C4', 'VO52', s4Ship, 'Archimedes hauls a ship with pulleys; historians frown', { kind: 'water', gain: 0.03 }, 'dissolve'],
  ['C5', 'VO55', s5Screw, 'the screw turns and lifts water', { kind: 'water', gain: 0.05 }, 'whip'],
  ['C5', 'VO58', s5Egypt, 'one source says yes, Vitruvius says nothing, Egypt appears', null, 'wipe'],
  ['C6', 'VO62', s6Fall, 'Roman banners rise over the walls; Marcellus gives his order', { kind: 'air', gain: 0.05 }, 'whip'],
  ['C6', 'VO64', s6Sand, 'Archimedes draws circles; a soldier’s shadow falls over them', { kind: 'air', gain: 0.04 }],
  ['C6', 'VO68', s6Sources, 'the sources are checked; a later line is found', null],
  ['C6', 'VO74', s6Tomb, 'Cicero pushes back the bushes and finds the sphere and cylinder', { kind: 'air', gain: 0.04 }, 'wipe'],
  ['C7', 'VO77', s7Scrape, 'the page is scraped and prayers are written over it', { kind: 'room', gain: 0.04 }, 'whip'],
  ['C7', 'VO82', s7Map, 'the book travels from Jerusalem to Istanbul', null, 'dissolve'],
  ['C7', 'VO84', s7Heiberg, 'Heiberg finds Archimedes under the lines', { kind: 'room', gain: 0.04 }],
  ['C7', 'VO87', s7Cellar, 'the book molds in a cellar, then a gavel falls', { kind: 'room', gain: 0.03 }, 'wipe'],
  ['C7', 'VO89', s7UV, 'ultraviolet light brings the hidden diagrams back', { kind: 'room', gain: 0.02 }, 'dissolve'],
  ['C7', 'VO91', s7Method, 'a curve is cut into ever thinner strips', null],
  ['C8', 'VO95', s8Score, 'the seven answers flip up as a score card', null, 'whip'],
  ['C8', 'VO96', s8End, 'Archimedes looks at the glowing page; the title returns', { kind: 'room', gain: 0.03 }, 'dissolve'],
];
const SCENES = CUTS.map(([chapter, start, fn, action, amb, inType], i) => {
  const from = i === 0 ? 0 : typeof start === 'number' ? start : at(start, -0.35);
  return { chapter, from, draw: scene(fn), action, amb: amb ?? undefined, in: inType ? { type: inType, dur: inType === 'whip' ? 0.35 : 0.5 } : { type: 'cut' } };
}).map((s, i, a) => ({ ...s, to: i + 1 < a.length ? a[i + 1].from : DURATION }));

// Picture-locked sounds: the stamp thump and its tail, the countdown ticks, a whoosh on the whips.
const SFX = [
  ...VERDICTS.map((v) => ({ at: v.at, voice: 'hit', gain: 0.75, wet: 0.25 })),
  ...QUIZ.flatMap((q) => [0, 1, 2].map((i) => ({ at: q.at + q.dur + 0.3 + i, voice: 'tick', gain: 0.5, wet: 0.1 }))),
  ...SCENES.filter((s) => s.in?.type === 'whip').map((s) => ({ at: s.from - 0.25, voice: 'whoosh', dur: 0.5, gain: 0.22, wet: 0.2 })),
  { at: at('VO90'), voice: 'riser', dur: 1.2, gain: 0.18, wet: 0.4 },
];
const ROOM = { secs: 1.6, decay: 3.0, tone: 4500 };
const ARRANGEMENT = [{ section: 'all', from: 0, to: DURATION, parts: [] }];
function score(ctx, out) {
  // Music is the user's own instrumental (OWN_MUSIC); until it arrives the draft carries ambience and effects only.
}
