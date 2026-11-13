import json,sys,shutil,pathlib
src,dst,picks=sys.argv[1],sys.argv[2],[int(x) for x in sys.argv[3].split(",")]
d=json.load(open(f"{src}/results.json")); L=d['results'] if isinstance(d,dict) else d
out=pathlib.Path(dst); (out/"thumbs").mkdir(parents=True,exist_ok=True)
old=[]
if (out/"results.json").exists():
    o=json.load(open(out/"results.json")); old=o['results'] if isinstance(o,dict) else o
new=old+[dict(L[i-1],n=len(old)+j+1) for j,i in enumerate(picks)]
for j,p in enumerate(picks):
    shutil.copy(f"{src}/thumbs/{p:02d}.img", out/"thumbs"/f"{len(old)+j+1:02d}.img")
if isinstance(d,dict): d=dict(d); d['results']=new
else: d=new
json.dump(d,open(out/"results.json","w"),ensure_ascii=False,indent=1)
