const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
for(const n of ['a','b','c']){await p.goto('file://'+process.cwd()+'/proof/proof-'+n+'.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);await p.screenshot({path:'proof/proof-'+n+'.png'});}
await b.close();})();
