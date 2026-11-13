"""Proof frames: the Eureka moment of this film in each of the three directions (A, B, C).
Writes proof/proof-a.html, proof-b.html, proof-c.html (1920x1080 SVG pages)."""
import base64, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "proof"


def font_face(family, stem, weight):
    css = ""
    for sub, rng in (("latin", "U+0000-00FF"), ("latin-ext", "U+0100-024F,U+1E00-1EFF")):
        p = ROOT / "assets" / "fonts" / f"{stem}-{sub}-{weight}.woff2"
        css += (f"@font-face{{font-family:'{family}';font-weight:{weight};"
                f"src:url(data:font/woff2;base64,{base64.b64encode(p.read_bytes()).decode()}) format('woff2');"
                f"unicode-range:{rng};}}\n")
    return css


def figure(st):
    """Archimedes jumping up in his tub. st: dict of colours and stroke style."""
    ink, sw = st["ink"], st["sw"]
    skin, toga, tub, water, beard = st["skin"], st["toga"], st["tub"], st["water"], st["beard"]
    hatch = st.get("hatch", "none")
    return f"""
  <g stroke="{ink}" stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round">
    <!-- splash behind -->
    <g fill="{water}">
      <path d="M470 720 C430 640 380 610 330 640 C380 650 410 690 430 735 Z"/>
      <path d="M1050 720 C1100 630 1160 600 1210 625 C1160 640 1120 690 1090 735 Z"/>
      <circle cx="350" cy="560" r="16"/><circle cx="410" cy="600" r="11"/><circle cx="300" cy="610" r="9"/>
      <circle cx="1190" cy="550" r="17"/><circle cx="1240" cy="600" r="10"/><circle cx="1130" cy="590" r="12"/>
      <circle cx="560" cy="560" r="10"/><circle cx="980" cy="575" r="11"/>
    </g>
    <!-- arms raised -->
    <path d="M675 500 C620 430 585 360 560 270" fill="none" stroke-width="{sw*9}" stroke="{ink}"/>
    <path d="M675 500 C620 430 585 360 560 270" fill="none" stroke-width="{sw*9-2*sw}" stroke="{skin}"/>
    <path d="M845 500 C900 430 935 360 960 270" fill="none" stroke-width="{sw*9}" stroke="{ink}"/>
    <path d="M845 500 C900 430 935 360 960 270" fill="none" stroke-width="{sw*9-2*sw}" stroke="{skin}"/>
    <!-- open hands -->
    <path d="M560 270 l-38 -30 M560 270 l-14 -44 M560 270 l12 -44 M560 270 l32 -30" fill="none" stroke-width="{sw*3}"/>
    <path d="M960 270 l-32 -30 M960 270 l-12 -44 M960 270 l14 -44 M960 270 l38 -30" fill="none" stroke-width="{sw*3}"/>
    <circle cx="560" cy="275" r="26" fill="{skin}"/><circle cx="960" cy="275" r="26" fill="{skin}"/>
    <!-- torso -->
    <path d="M660 480 C650 560 640 640 630 740 L890 740 C880 640 870 560 860 480 C820 455 700 455 660 480 Z" fill="{skin}"/>
    <path d="M660 480 C650 560 640 640 630 740 L890 740 C880 640 870 560 860 480 C820 455 700 455 660 480 Z" fill="{hatch}" stroke="none" opacity=".55"/>
    <!-- toga slipping off one shoulder -->
    <path d="M640 600 C700 560 800 520 870 470 C885 520 890 600 890 740 L630 740 C632 690 635 640 640 600 Z" fill="{toga}"/>
    <path d="M680 610 C730 590 800 560 860 520 M670 660 C740 640 810 610 880 580 M660 710 C740 690 820 670 885 650" fill="none" stroke-width="{sw*.8}"/>
    <!-- fluffy side hair behind the head -->
    <path d="M690 270 C640 265 625 300 640 320 C615 335 622 372 650 378 C640 400 668 420 690 405 Z" fill="{beard}"/>
    <path d="M830 270 C880 265 895 300 880 320 C905 335 898 372 870 378 C880 400 852 420 830 405 Z" fill="{beard}"/>
    <!-- head -->
    <ellipse cx="760" cy="345" rx="92" ry="100" fill="{skin}"/>
    <ellipse cx="664" cy="350" rx="18" ry="28" fill="{skin}"/><ellipse cx="856" cy="350" rx="18" ry="28" fill="{skin}"/>
    <!-- beard -->
    <path d="M675 360 C670 430 700 500 760 535 C820 500 850 430 845 360 C820 395 800 405 760 405 C720 405 700 395 675 360 Z" fill="{beard}"/>
    <path d="M720 430 C725 470 740 495 760 515 M800 430 C795 470 780 495 760 515 M760 420 L760 520" fill="none" stroke-width="{sw*.8}"/>
    <!-- eyes wide, brows up -->
    <ellipse cx="725" cy="335" rx="17" ry="21" fill="#fff"/><ellipse cx="795" cy="335" rx="17" ry="21" fill="#fff"/>
    <circle cx="728" cy="331" r="7" fill="{ink}"/><circle cx="792" cy="331" r="7" fill="{ink}"/>
    <path d="M700 296 C715 282 735 282 748 292 M772 292 C785 282 805 282 820 296" fill="none" stroke-width="{sw*1.6}"/>
    <!-- nose and shouting mouth -->
    <path d="M760 345 C752 365 748 378 762 382" fill="none"/>
    <ellipse cx="760" cy="420" rx="28" ry="24" fill="{st['mouth']}"/>
    <!-- tub -->
    <path d="M440 720 L1080 720 L1040 960 L480 960 Z" fill="{tub}"/>
    <path d="M440 720 L1080 720 L1040 960 L480 960 Z" fill="{hatch}" stroke="none" opacity=".7"/>
    <path d="M560 722 L575 958 M680 722 L685 958 M800 722 L795 958 M920 722 L905 958" fill="none" stroke-width="{sw*.8}"/>
    <path d="M455 790 L1068 790 M470 890 L1052 890" fill="none" stroke-width="{sw*2.2}"/>
    <!-- water lip over the rim -->
    <path d="M430 722 C520 700 600 735 700 712 C800 690 900 735 1090 715 L1090 735 C1000 745 900 760 760 748 C620 740 520 760 430 740 Z" fill="{water}"/>
    <path d="M470 735 C460 770 470 800 480 830 M1060 735 C1070 770 1060 800 1048 840" fill="none" stroke="{water}" stroke-width="{sw*4}"/>
    <!-- motion lines of the leap -->
    <path d="M600 200 L620 150 M760 190 L760 130 M920 200 L900 150" fill="none" stroke-width="{sw*2}"/>
  </g>"""


def quiz_card(st, x, y):
    f, ink = st["font"], st["ink"]
    chips = st["chips"]
    w = 640
    return f"""
  <g transform="translate({x},{y})" font-family="'{f}'">
    <rect x="0" y="0" width="{w}" height="330" rx="{st['card_r']}" fill="{st['card']}" stroke="{ink}" stroke-width="{st['sw']*1.5}"/>
    <text x="{w/2}" y="88" text-anchor="middle" font-size="64" fill="{st['card_ink']}" letter-spacing="2">GERÇEK Mİ?</text>
    <text x="{w/2}" y="160" text-anchor="middle" font-size="40" fill="{st['card_ink2']}">Hamamda “Evreka!”</text>
    <g font-size="34" text-anchor="middle">
      <rect x="30" y="210" width="180" height="80" rx="{st['card_r']/2}" fill="{chips[0]}" stroke="{ink}" stroke-width="{st['sw']}"/>
      <text x="120" y="263" fill="{st['chip_ink']}">DOĞRU</text>
      <rect x="230" y="210" width="180" height="80" rx="{st['card_r']/2}" fill="{chips[1]}" stroke="{ink}" stroke-width="{st['sw']}"/>
      <text x="320" y="263" fill="{st['chip_ink']}">KISMEN</text>
      <rect x="430" y="210" width="180" height="80" rx="{st['card_r']/2}" fill="{chips[2]}" stroke="{ink}" stroke-width="{st['sw']}"/>
      <text x="520" y="263" fill="{st['chip_ink']}">EFSANE</text>
    </g>
  </g>"""


def page(svg, css):
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{css}
html,body{{margin:0;background:#000}} svg{{display:block}}</style></head>
<body><svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">{svg}</svg></body></html>"""


def direction_a():
    st = dict(ink="#2a2420", sw=4, skin="#efe4cf", toga="#f4ecdc", tub="#d9c9aa", water="#e9e0cf",
              beard="#f7f2e8", mouth="#5a2a1c", hatch="url(#hatch)", font="Young Serif",
              card="#efe6d3", card_ink="#2a2420", card_ink2="#a24f2b", chips=["#efe6d3", "#efe6d3", "#efe6d3"],
              chip_ink="#2a2420", card_r=4)
    thumb = base64.b64encode((ROOT / "research/pick-a/thumbs/01.img").read_bytes()).decode()
    svg = f"""
  <defs>
    <pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <line x1="0" y1="0" x2="0" y2="9" stroke="#2a2420" stroke-width="2"/></pattern>
    <pattern id="cross" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
      <line x1="0" y1="0" x2="0" y2="12" stroke="#2a2420" stroke-width="1.2"/></pattern>
    <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="4"/>
      <feColorMatrix values="0 0 0 0 .35  0 0 0 0 .30  0 0 0 0 .24  0 0 0 .16 0"/></filter>
    <filter id="rough"><feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="2" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="4"/></filter>
  </defs>
  <rect width="1920" height="1080" fill="#e7dcc6"/>
  <!-- bath-house wall: stone courses in cross-hatch -->
  <rect x="0" y="0" width="1920" height="700" fill="url(#cross)" opacity=".35"/>
  <path d="M0 700 L1920 700" stroke="#2a2420" stroke-width="5"/>
  <rect x="0" y="700" width="1920" height="380" fill="#d8cbb0"/>
  <path d="M0 790 L1920 790 M0 900 L1920 900 M0 1010 L1920 1010" stroke="#2a2420" stroke-width="2" opacity=".5"/>
  <g filter="url(#rough)">{figure(st)}</g>
  <!-- speech bubble -->
  <g font-family="'Young Serif'">
    <path d="M150 120 L520 120 L520 240 L430 240 L470 300 L380 240 L150 240 Z" fill="#f4ecdc" stroke="#2a2420" stroke-width="5"/>
    <text x="335" y="205" text-anchor="middle" font-size="76" fill="#a24f2b">EVREKA!</text>
  </g>
  <!-- archive print pasted in -->
  <g transform="translate(1250,110) rotate(2.5)">
    <rect x="-14" y="-14" width="628" height="441" fill="#f4ecdc" stroke="#2a2420" stroke-width="2"/>
    <image href="data:image/jpeg;base64,{thumb}" x="0" y="0" width="600" height="413"/>
    <text x="0" y="452" font-family="'Young Serif'" font-size="24" fill="#2a2420">Honoré Daumier, taşbaskı · Met Müzesi</text>
  </g>
  {quiz_card(st, 1230, 640)}
  <rect width="1920" height="1080" filter="url(#paper)"/>
  <rect width="1920" height="1080" fill="none" stroke="#2a2420" stroke-width="22"/>"""
    css = font_face("Young Serif", "young-serif", 400)
    return page(svg, css)


def meander(y, h=60):
    out = []
    for i in range(0, 1920, 120):
        out.append(f"M{i} {y+h} L{i} {y} L{i+90} {y} L{i+90} {y+h-15} L{i+30} {y+h-15} L{i+30} {y+15} "
                   f"L{i+60} {y+15} L{i+60} {y+30}")
    return f'<path d="{" ".join(out)}" fill="none" stroke="#c4622f" stroke-width="8" stroke-linejoin="miter"/>'


def direction_b():
    st = dict(ink="#16110e", sw=4, skin="#c4622f", toga="#b9582a", tub="#c4622f", water="#d98a5c",
              beard="#c4622f", mouth="#16110e", hatch="none", font="Cormorant",
              card="#16110e", card_ink="#d77a46", card_ink2="#e9c7a6", chips=["#c4622f", "#c4622f", "#c4622f"],
              chip_ink="#16110e", card_r=0)
    svg = f"""
  <defs><filter id="glaze"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="2" seed="9"/>
      <feColorMatrix values="0 0 0 0 .1  0 0 0 0 .07  0 0 0 0 .05  0 0 0 .22 0"/></filter></defs>
  <rect width="1920" height="1080" fill="#16110e"/>
  <rect x="0" y="0" width="1920" height="110" fill="#c4622f"/>
  <g transform="translate(0,25)">{meander(0)}</g>
  <rect x="0" y="0" width="1920" height="110" fill="none"/>
  <path d="M0 25 L1920 25 M0 85 L1920 85" stroke="#16110e" stroke-width="6"/>
  <rect x="0" y="970" width="1920" height="110" fill="#c4622f"/>
  <path d="M0 995 L1920 995 M0 1055 L1920 1055" stroke="#16110e" stroke-width="6"/>
  <!-- tongues / egg-and-dart on the lower band -->
  <g fill="#16110e">{''.join(f'<ellipse cx="{i+30}" cy="1025" rx="18" ry="22"/>' for i in range(0,1920,60))}</g>
  <g transform="translate(0,20)">{figure(st)}</g>
  <!-- dilute glaze lines on the figure like vase relief lines -->
  <g font-family="'Cormorant'" font-weight="600">
    <text x="220" y="250" font-size="96" fill="#c4622f" letter-spacing="14">ΕΥΡΗΚΑ</text>
    <text x="230" y="300" font-size="38" fill="#e9c7a6" letter-spacing="6">“Buldum!”</text>
  </g>
  {quiz_card(st, 1180, 560)}
  <rect width="1920" height="1080" filter="url(#glaze)"/>"""
    css = font_face("Cormorant", "cormorant", 600)
    return page(svg, css)


def direction_c():
    st = dict(ink="#1f2a36", sw=6, skin="#f2b98d", toga="#ffffff", tub="#e5483b", water="#5fc0ec",
              beard="#ffffff", mouth="#7a1f23", hatch="none", font="Atma",
              card="#f6c445", card_ink="#1f2a36", card_ink2="#c7362c", chips=["#57b86b", "#ffffff", "#e5483b"],
              chip_ink="#1f2a36", card_r=28)
    svg = f"""
  <rect width="1920" height="1080" fill="#8fd3f0"/>
  <circle cx="1650" cy="170" r="110" fill="#f6c445"/>
  <g stroke="#f6c445" stroke-width="14" stroke-linecap="round">
    {''.join(f'<line x1="1650" y1="170" x2="{1650+190*__import__("math").cos(a/8*6.283):.0f}" y2="{170+190*__import__("math").sin(a/8*6.283):.0f}" stroke-dasharray="0 140 60"/>' for a in range(8))}
  </g>
  <path d="M0 610 C300 590 500 630 800 600 C1100 575 1400 625 1920 595 L1920 700 L0 700 Z" fill="#1f6fb2"/>
  <!-- white town of Syracuse on the far shore -->
  <g fill="#ffffff" stroke="#1f2a36" stroke-width="5">
    <rect x="1240" y="480" width="70" height="120"/><rect x="1310" y="520" width="90" height="80"/>
    <rect x="1400" y="470" width="60" height="130"/><path d="M1460 600 L1460 500 L1530 450 L1600 500 L1600 600 Z"/>
    <rect x="1600" y="530" width="110" height="70"/><rect x="1710" y="495" width="70" height="105"/>
  </g>
  <rect x="0" y="700" width="1920" height="380" fill="#f2e3c2"/>
  <g fill="#e6d2a8">{''.join(f'<rect x="{i}" y="{700+ (i//160)%2*95}" width="160" height="95"/>' for i in range(0,1920,160))}
     {''.join(f'<rect x="{i+80}" y="{890 + (i//160)%2*95}" width="160" height="95"/>' for i in range(0,1920,160))}</g>
  {figure(st)}
  <g font-family="'Atma'" font-weight="700">
    <path d="M110 110 C150 60 480 50 540 110 C600 170 560 250 470 255 L520 320 L400 258 C230 262 70 200 110 110 Z"
      fill="#ffffff" stroke="#1f2a36" stroke-width="6"/>
    <text x="330" y="195" text-anchor="middle" font-size="84" fill="#e5483b">EVREKA!</text>
  </g>
  {quiz_card(st, 1200, 680)}"""
    css = font_face("Atma", "atma", 700)
    return page(svg, css)


for name, fn in (("a", direction_a), ("b", direction_b), ("c", direction_c)):
    (OUT / f"proof-{name}.html").write_text(fn(), encoding="utf-8")
print("ok")
