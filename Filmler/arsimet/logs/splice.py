s=open("film.html",encoding="utf-8").read()
a=s.index("// ============================== FILM ==============================")
b=s.index("// ============================== HELPERS (picture) ==============================")
s=s[:a]+open("src/film-section.js",encoding="utf-8").read()+"\n"+s[b:]
open("film.html","w",encoding="utf-8").write(s)
