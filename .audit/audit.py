import urllib.request, re, json, ssl, sys
from urllib.parse import urljoin, urlparse
from html.parser import HTMLParser
UA={'User-Agent':'Mozilla/5.0 (compatible; MantraAudit/1.0)'}
def get(u,timeout=25):
    try:
        r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=timeout)
        return r.status, r.geturl(), r.read(2_000_000).decode('utf-8','ignore')
    except urllib.error.HTTPError as e: return e.code, u, ''
    except Exception as e: return 0, u, str(e)[:80]
def ld_types(html):
    t=[]
    for m in re.finditer(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>',html,re.S|re.I):
        try:
            d=json.loads(m.group(1).strip())
        except Exception: t.append('INVALID'); continue
        def walk(x):
            if isinstance(x,dict):
                ty=x.get('@type')
                if ty: t.extend(ty if isinstance(ty,list) else [ty])
                for v in x.values(): walk(v)
            elif isinstance(x,list):
                for v in x: walk(v)
        walk(d)
    return t
def meta(html,name):
    m=re.search(r'<meta[^>]+(?:name|property)=["\']%s["\'][^>]*content=["\']([^"\']*)'%name,html,re.I) or re.search(r'<meta[^>]+content=["\']([^"\']*)["\'][^>]*(?:name|property)=["\']%s["\']'%name,html,re.I)
    return m.group(1).strip() if m else ''
SITES=[('AU','https://mantrasports.com.au/',['/faq/']),('USA','https://mantrasportsusa.com/',['/pages/faq']),('CA','https://www.mantrasports.ca/',['/faq']),('NL','https://www.mantrasports.nl/',['/faq']),('DE','https://www.mantrasports.de/',['/faq']),('India','https://www.mantrasports.co.in/',['/faq'])]
out=[]
for name,home,faqs in SITES:
    R={'site':name,'url':home,'notes':[]}; S={}
    st,final,h=get(home)
    R['home_status']=st; R['final']=final
    title=(re.search(r'<title[^>]*>(.*?)</title>',h,re.S|re.I) or [None,''])[1].strip() if h else ''
    title=re.sub(r'\s+',' ',title)
    desc=meta(h,'description')
    R['title']=title; R['desc_len']=len(desc)
    S['titles']=(5 if 15<=len(title)<=70 else 2 if title else 0)+(5 if 70<=len(desc)<=170 else 2 if desc else 0)
    types=ld_types(h); R['home_schema']=sorted(set(types))
    S['org']=10 if any(x in types for x in ['Organization','LocalBusiness','Store','SportingGoodsStore','OnlineStore']) else 0
    canon=bool(re.search(r'<link[^>]+rel=["\']canonical',h,re.I))
    sm=get(urljoin(final,'/sitemap.xml'))[0]
    if sm!=200: sm=get(urljoin(final,'/sitemap_index.xml'))[0]
    S['canonical_sitemap']=(5 if canon else 0)+(5 if sm==200 else 0); R['canonical']=canon; R['sitemap']=sm
    rst,_,rb=get(urljoin(final,'/robots.txt'))
    block=False
    if rst==200:
        grp=None
        for line in rb.splitlines():
            l=line.split('#')[0].strip()
            if l.lower().startswith('user-agent:'): grp=l.split(':',1)[1].strip()
            elif l.lower().replace(' ','')=='disallow:/' and grp in ('*','GPTBot','ClaudeBot','OAI-SearchBot','PerplexityBot','Google-Extended','Claude-SearchBot'): block=True; R['notes'].append('robots blocks '+grp)
    S['robots']=0 if (rst!=200 or block) else 10; R['robots']=rst
    lst,_,lb=get(urljoin(final,'/llms.txt'))
    llm=lst==200 and not lb.lstrip().startswith('<')
    if not llm and name=='USA':
        a=get(urljoin(final,'/pages/ai-summary'))[0]
        S['llms']=6 if a==200 else 0; R['llms']='ai-summary page' if a==200 else 'none'
    else:
        S['llms']=10 if llm else 0; R['llms']=llm
    fq=0
    for f in faqs:
        fs,_,fh=get(urljoin(final,f))
        if fs==200:
            fq=5+(5 if 'FAQPage' in ld_types(fh) else 0); break
    S['faq']=fq
    links=[]
    for m in re.finditer(r'href=["\']([^"\'#]+)',h):
        u=urljoin(final,m.group(1))
        if urlparse(u).netloc.replace('www.','')==urlparse(final).netloc.replace('www.','') and not re.search(r'\.(css|js|png|jpg|jpeg|svg|webp|ico|xml|json)(\?|$)|/cdn/|/wp-content/|/wp-json/|/_next/|/cart|/account|/checkout|mailto:|tel:',u):
            if u not in links: links.append(u)
    prod=next((u for u in links if re.search(r'/(product|products|shop)/[^/?]+',u)),None)
    if prod:
        ps,_,ph=get(prod); pt=ld_types(ph)
        S['product']=10 if 'Product' in pt else 0; R['product_page']=prod; R['product_schema']='Product' in pt
    else:
        S['product']=0; R['notes'].append('no product link on homepage')
    bad=[]
    for u in links[:45]:
        s=get(u,15)[0]
        if s>=400 or s==0: bad.append((s,u))
    R['links_checked']=min(45,len(links)); R['broken']=bad
    S['links']=max(0,10-3*len(bad))
    txt=re.sub(r'<script.*?</script>|<style.*?</style>','',h,flags=re.S|re.I)
    flags=[p for p in [r'500\+\s*(customers|Kunden|klanten)',r'Trusted by players nationwide',r'WELCOME5',r'ERSTBESTELLUNG',r'Rahul M\.',r'Priya S\.',r'Heritage Willow Reserve'] if re.search(p,txt,re.I)]
    phone=bool(re.search(r'tel:|\+1[\s(-]*\d{3}|\+61|\+91',h))
    S['trust']=(6 if not flags else 0)+(4 if phone else 0); R['claim_flags']=flags; R['phone']=phone
    vp=bool(re.search(r'name=["\']viewport',h,re.I))
    h1=len(re.findall(r'<h1[\s>]',h,re.I))
    imgs=re.findall(r'<img\b[^>]*>',h,re.I); withalt=[i for i in imgs if re.search(r'\balt=["\'][^"\']+',i)]
    altr=len(withalt)/len(imgs) if imgs else 1
    S['mobile_a11y']=(4 if vp else 0)+(3 if h1==1 else 1 if h1>1 else 0)+(3 if altr>=0.9 else 2 if altr>=0.7 else 0)
    R['h1_count']=h1; R['img_alt_ratio']=round(altr,2)
    R['scores']=S; R['total']=sum(S.values())
    out.append(R)
    print(f"{name}: {R['total']} {S}",flush=True)
print('JSON_START');print(json.dumps(out,indent=1));print('JSON_END')
