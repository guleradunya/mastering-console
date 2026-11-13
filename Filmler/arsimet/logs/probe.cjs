const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:640,height:360}});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+process.cwd()+'/film.html?w=640&h=360&capture=1');
try{const r=await p.evaluate(()=>window.READY.then(x=>({frames:x.frames})));console.log(JSON.stringify(r));
const spec=process.argv[2]||'1';const times=spec==='scenes'?await p.evaluate(()=>SCENES.map(s=>(s.from+s.to)/2+ (s.to-s.from)*0.15)):spec.startsWith('VO')?await p.evaluate(ids=>ids.split(',').map(i=>VO.find(v=>v.id===i).at+0.8),spec):spec.split(',').map(Number);
const out=[];for(const t of times){const d=await p.evaluate(f=>window.captureFrame(f,'image/jpeg',0.85),Math.round(t*24));const f=`review/probe-${t.toFixed(1)}.jpg`;fs.writeFileSync(f,Buffer.from(d.split(',')[1],'base64'));out.push(f);}
console.log(out.join(' '));
}catch(e){console.log('ERR',String(e))}
console.log(errs.slice(0,8).join('\n'));await b.close();})();
