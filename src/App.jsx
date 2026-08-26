import React, { useMemo, useState } from "react";
import {
  Building2, CheckCircle2, ChevronRight, CircleDollarSign, Copy, FileCheck2,
  Globe2, Home, LayoutDashboard, Link2, Menu, PackageCheck, QrCode,
  Search, Send, ShieldCheck, Ship, Sparkles, Truck, UploadCloud, UserRound,
  UsersRound, X, Bell, Settings, LogOut, ArrowUpRight, Clock3, LockKeyhole,
  BadgeCheck, FileText, Boxes, Route, BarChart3, ClipboardCheck
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "passport", label: "Business Passport", icon: FileCheck2 },
  { id: "marketplace", label: "Logistics Marketplace", icon: Truck },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const opportunities = [
  { name: "GulfLink Logistics", tag: "Air + Sea Freight", match: 96, response: "< 2 hrs", verified: true },
  { name: "Falcon Freight UAE", tag: "Customs + Warehousing", match: 92, response: "< 4 hrs", verified: true },
  { name: "Emirates Cargo Hub", tag: "Cross-border Logistics", match: 88, response: "Same day", verified: true },
  { name: "Desert Route Logistics", tag: "Last-mile + Fulfilment", match: 84, response: "< 6 hrs", verified: false },
];

const recentActivity = [
  ["Passport shared", "GulfLink Logistics opened your passport", "12 min ago"],
  ["Document verified", "Trade license status updated to Verified", "Today, 11:10"],
  ["New proposal", "Falcon Freight sent a logistics proposal", "Yesterday"],
];

function Brand() {
  return (
    <div className="brand">
      <div className="brandMark"><span></span><span></span><span></span></div>
      <div>
        <div className="brandName"><b>Pass</b><strong>Co.</strong></div>
        <div className="brandTag">One Passport. Every Door.</div>
      </div>
    </div>
  )
}

function StatCard({icon: Icon, label, value, detail, accent}) {
  return (
    <div className="statCard">
      <div className={"statIcon " + (accent || "")}><Icon size={20}/></div>
      <div className="statLabel">{label}</div>
      <div className="statValue">{value}</div>
      <div className="statDetail">{detail}</div>
    </div>
  )
}

function VerificationPill({children="Verified"}) {
  return <span className="verified"><BadgeCheck size={14}/>{children}</span>
}

function App() {
  const [active, setActive] = useState("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");

  const publicUrl = "https://passco.ae/p/PC-AE-000128";
  const filtered = useMemo(() => opportunities.filter(x => x.name.toLowerCase().includes(query.toLowerCase()) || x.tag.toLowerCase().includes(query.toLowerCase())), [query]);

  function copyUrl() {
    navigator.clipboard?.writeText(publicUrl);
    setToast("Passport link copied");
    setTimeout(() => setToast(""), 1600);
  }

  return (
    <div className="appShell">
      <aside className={"sidebar " + (mobileNav ? "open" : "")}>
        <div className="sideTop">
          <Brand/>
          <button className="mobileClose" onClick={() => setMobileNav(false)}><X size={20}/></button>
        </div>
        <nav>
          <div className="navLabel">WORKSPACE</div>
          {NAV.map(item => {
            const Icon = item.icon;
            return <button key={item.id} onClick={() => {setActive(item.id);setMobileNav(false)}} className={"navItem "+(active===item.id?"active":"")}><Icon size={18}/><span>{item.label}</span></button>
          })}
          <div className="navLabel second">ACCOUNT</div>
          <button className="navItem"><UsersRound size={18}/><span>Team access</span></button>
          <button className="navItem"><Settings size={18}/><span>Settings</span></button>
        </nav>
        <div className="sidebarFooter">
          <div className="miniProfile">
            <div className="avatar">AN</div>
            <div><b>Al Noor Trading</b><span>SME account</span></div>
            <ChevronRight size={16}/>
          </div>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="topLeft">
            <button className="menuBtn" onClick={() => setMobileNav(true)}><Menu size={21}/></button>
            <div><span className="eyebrow">PASSCO BUSINESS HUB</span><h1>{pageTitle(active)}</h1></div>
          </div>
          <div className="topActions">
            <button className="iconBtn"><Search size={19}/></button>
            <button className="iconBtn"><Bell size={19}/><i></i></button>
            <button className="primary" onClick={() => setShowShare(true)}><QrCode size={17}/> Share Passport</button>
          </div>
        </header>

        <div className="content">
          {active === "dashboard" && <Dashboard setActive={setActive} setShowShare={setShowShare}/>}
          {active === "passport" && <Passport setShowShare={setShowShare}/>}
          {active === "marketplace" && <Marketplace query={query} setQuery={setQuery} data={filtered}/>}
          {active === "documents" && <Documents/>}
          {active === "analytics" && <Analytics/>}
        </div>
      </main>

      {showShare && (
        <div className="modalBackdrop" onClick={() => setShowShare(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modalHeader">
              <div><span className="eyebrow">DIGITAL BUSINESS PASSPORT</span><h2>Share your PassCo</h2></div>
              <button className="iconBtn" onClick={() => setShowShare(false)}><X size={20}/></button>
            </div>
            <div className="qrWrap"><QRCodeSVG value={publicUrl} size={174} fgColor="#08205c" bgColor="#ffffff" level="H"/></div>
            <div className="shareCompany"><VerificationPill/><b>Al Noor Trading LLC</b><span>PC-AE-000128</span></div>
            <div className="linkField"><span>{publicUrl}</span><button onClick={copyUrl}><Copy size={17}/></button></div>
            <div className="shareActions">
              <button className="secondary" onClick={copyUrl}><Link2 size={17}/> Copy link</button>
              <button className="primary"><Send size={17}/> Send passport</button>
            </div>
            <div className="privacyNote"><LockKeyhole size={16}/><span>Only fields you mark as shareable are visible to partners.</span></div>
          </div>
        </div>
      )}
      {toast && <div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
    </div>
  )
}

function Dashboard({setActive,setShowShare}) {
  return (
    <>
      <section className="hero">
        <div className="heroText">
          <div className="heroBadge"><Sparkles size={14}/> Digital business identity for UAE trade</div>
          <h2>Your business passport is <span>ready to open doors.</span></h2>
          <p>Keep your verified company profile, trade documents and logistics needs in one trusted passport — then share it instantly with partners.</p>
          <div className="heroActions">
            <button className="primary large" onClick={() => setShowShare(true)}><QrCode size={18}/> Share passport</button>
            <button className="ghost large" onClick={() => setActive("passport")}>View passport <ArrowUpRight size={18}/></button>
          </div>
        </div>
        <div className="passportMini">
          <div className="passTop">
            <Brand/>
            <VerificationPill/>
          </div>
          <div className="passMid">
            <span>BUSINESS PASSPORT</span>
            <h3>Al Noor Trading LLC</h3>
            <p>Food Trading • Dubai Mainland</p>
          </div>
          <div className="passId"><span>PASSCO ID</span><b>PC-AE-000128</b></div>
          <div className="passFoot">
            <div><span>Shipments</span><b>18 / month</b></div>
            <div><span>Main route</span><b>India → UAE</b></div>
          </div>
        </div>
      </section>

      <section className="statsGrid">
        <StatCard icon={ShieldCheck} label="Passport status" value="92%" detail="4 of 5 sections verified" accent="blue"/>
        <StatCard icon={Ship} label="Shipments" value="18" detail="Average per month" accent="orange"/>
        <StatCard icon={UsersRound} label="Partner views" value="47" detail="+12 this month" accent="blue"/>
        <StatCard icon={CircleDollarSign} label="Open proposals" value="3" detail="2 awaiting your review" accent="orange"/>
      </section>

      <section className="twoCol">
        <div className="panel">
          <div className="panelHead"><div><span className="eyebrow">READINESS</span><h3>Complete your passport</h3></div><button className="textBtn" onClick={() => setActive("passport")}>Manage <ChevronRight size={16}/></button></div>
          <div className="progress"><span style={{width:"92%"}}></span></div>
          <div className="checkList">
            <CheckRow done title="Trade license" note="Verified by PassCo"/>
            <CheckRow done title="Company profile" note="Complete"/>
            <CheckRow done title="Products & services" note="6 categories added"/>
            <CheckRow done title="Shipping profile" note="Routes and frequency added"/>
            <CheckRow title="Banking profile" note="Optional — private by default"/>
          </div>
        </div>

        <div className="panel">
          <div className="panelHead"><div><span className="eyebrow">ACTIVITY</span><h3>Recent passport activity</h3></div><button className="iconBtn"><Clock3 size={17}/></button></div>
          <div className="activityList">
            {recentActivity.map((x,i) => <div className="activity" key={i}><div className="activityIcon">{i===0?<Link2 size={17}/>:i===1?<ShieldCheck size={17}/>:<Send size={17}/>}</div><div><b>{x[0]}</b><span>{x[1]}</span><small>{x[2]}</small></div></div>)}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panelHead"><div><span className="eyebrow">MATCHED FOR YOU</span><h3>Recommended logistics partners</h3></div><button className="textBtn" onClick={() => setActive("marketplace")}>Explore marketplace <ChevronRight size={16}/></button></div>
        <div className="partnerGrid">
          {opportunities.slice(0,3).map((p,i) => <PartnerCard p={p} key={i}/>)}
        </div>
      </section>
    </>
  )
}

function Passport({setShowShare}) {
  return (
    <>
      <div className="sectionTitle">
        <div><span className="eyebrow">PC-AE-000128</span><h2>Al Noor Trading LLC</h2><p>Control what partners see and keep your company information current.</p></div>
        <button className="primary" onClick={() => setShowShare(true)}><QrCode size={17}/> Share passport</button>
      </div>

      <div className="passportLayout">
        <div className="passportCardLarge">
          <div className="pclTop"><Brand/><VerificationPill/></div>
          <div className="pclHero">
            <div className="companySeal"><Building2 size={34}/></div>
            <div><span>UAE BUSINESS PASSPORT</span><h2>Al Noor Trading LLC</h2><p>Food Trading • Dubai Mainland</p></div>
          </div>
          <div className="pclGrid">
            <Info label="Trade License" value="CN-2458917" verified/>
            <Info label="Established" value="2023" verified/>
            <Info label="Monthly Shipments" value="18 avg."/>
            <Info label="Primary Route" value="India → UAE"/>
            <Info label="Import Mode" value="Sea / Air"/>
            <Info label="Destination" value="Jebel Ali"/>
          </div>
          <div className="pclBottom"><div><span>PASSCO ID</span><b>PC-AE-000128</b></div><div className="miniQr"><QRCodeSVG value="https://passco.ae/p/PC-AE-000128" size={68} fgColor="#08205c"/></div></div>
        </div>

        <div className="sidePanelStack">
          <div className="panel compact">
            <div className="panelHead"><div><span className="eyebrow">VISIBILITY</span><h3>Shared information</h3></div><ShieldCheck size={20}/></div>
            <Toggle label="Company profile" on/>
            <Toggle label="Trade license" on/>
            <Toggle label="Products & services" on/>
            <Toggle label="Shipment history" on/>
            <Toggle label="Banking information"/>
          </div>
          <div className="panel compact">
            <div className="panelHead"><div><span className="eyebrow">TRUST SCORE</span><h3>Verification</h3></div><b className="score">92</b></div>
            <p className="muted">Your score improves as more business information is independently verified.</p>
            <div className="progress"><span style={{width:"92%"}}></span></div>
          </div>
        </div>
      </div>

      <section className="panel">
        <div className="panelHead"><div><span className="eyebrow">BUSINESS DETAILS</span><h3>Passport sections</h3></div><button className="secondary"><UploadCloud size={17}/> Upload document</button></div>
        <div className="sectionCards">
          <SectionCard icon={Building2} title="Company & license" sub="Legal name, license, activity" badge="Verified"/>
          <SectionCard icon={Boxes} title="Products & services" sub="6 product categories" badge="Complete"/>
          <SectionCard icon={Route} title="Shipping requirements" sub="Routes, frequency, volumes" badge="Complete"/>
          <SectionCard icon={ClipboardCheck} title="Company track record" sub="Partner references and history" badge="Review"/>
        </div>
      </section>
    </>
  )
}

function Marketplace({query,setQuery,data}) {
  return (
    <>
      <div className="sectionTitle">
        <div><span className="eyebrow">PARTNER DISCOVERY</span><h2>Logistics Marketplace</h2><p>Find providers matched to your routes, shipment profile and business requirements.</p></div>
      </div>
      <div className="searchBar"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search logistics providers, services or capabilities"/><button className="secondary">Filters</button></div>
      <div className="marketGrid">
        {data.map((p,i)=><PartnerCard p={p} key={i} expanded/> )}
      </div>
    </>
  )
}

function Documents() {
  const docs = [
    ["Trade License.pdf","Trade License","Verified","14 Aug 2026"],
    ["VAT Certificate.pdf","Tax","Verified","11 Aug 2026"],
    ["Product Catalogue.pdf","Products","Shared","07 Aug 2026"],
    ["Shipping History.xlsx","Logistics","Private","02 Aug 2026"],
  ];
  return (
    <>
      <div className="sectionTitle"><div><span className="eyebrow">DOCUMENT VAULT</span><h2>Business Documents</h2><p>Keep core records attached to your passport and control who can access them.</p></div><button className="primary"><UploadCloud size={17}/> Upload document</button></div>
      <div className="panel docPanel">
        <div className="docHeader"><span>Document</span><span>Category</span><span>Status</span><span>Updated</span><span></span></div>
        {docs.map((d,i)=><div className="docRow" key={i}><div className="docName"><div className="docIcon"><FileText size={18}/></div><b>{d[0]}</b></div><span>{d[1]}</span><span className={"statusText "+d[2].toLowerCase()}>{d[2]}</span><span>{d[3]}</span><button className="iconBtn"><ChevronRight size={17}/></button></div>)}
      </div>
    </>
  )
}

function Analytics() {
  return (
    <>
      <div className="sectionTitle"><div><span className="eyebrow">INSIGHTS</span><h2>Passport Analytics</h2><p>Understand how partners interact with your business passport.</p></div></div>
      <section className="statsGrid">
        <StatCard icon={UsersRound} label="Total views" value="147" detail="+21% this month" accent="blue"/>
        <StatCard icon={Link2} label="Shares" value="32" detail="+8 this month" accent="orange"/>
        <StatCard icon={Send} label="Proposals" value="9" detail="3 currently open" accent="blue"/>
        <StatCard icon={CheckCircle2} label="Conversion" value="18%" detail="+4.2% vs last month" accent="orange"/>
      </section>
      <div className="panel chartPanel">
        <div className="panelHead"><div><span className="eyebrow">LAST 6 MONTHS</span><h3>Passport engagement</h3></div></div>
        <div className="chart">
          {[32,44,38,61,74,91].map((v,i)=><div className="barGroup" key={i}><div className="bar" style={{height:`${v*2}px`}}><span>{v}</span></div><small>{["Mar","Apr","May","Jun","Jul","Aug"][i]}</small></div>)}
        </div>
      </div>
    </>
  )
}

function CheckRow({done,title,note}) {
  return <div className="checkRow"><div className={"checkCircle "+(done?"done":"")}>{done?<CheckCircle2 size={17}/>:<span/>}</div><div><b>{title}</b><span>{note}</span></div><ChevronRight size={17}/></div>
}
function PartnerCard({p,expanded}) {
  return <div className={"partnerCard "+(expanded?"expanded":"")}><div className="partnerTop"><div className="partnerLogo"><Truck size={22}/></div><div>{p.verified?<VerificationPill/>:<span className="neutralPill">Listed</span>}<h4>{p.name}</h4><p>{p.tag}</p></div></div><div className="matchLine"><span>PassCo match</span><b>{p.match}%</b></div><div className="progress thin"><span style={{width:`${p.match}%`}}></span></div><div className="partnerMeta"><span><Clock3 size={14}/>{p.response}</span><span><Globe2 size={14}/>UAE</span></div><div className="partnerActions"><button className="secondary">View profile</button><button className="primary">Send passport</button></div></div>
}
function Info({label,value,verified}) {
  return <div className="info"><span>{label}</span><b>{value}</b>{verified&&<small><CheckCircle2 size={12}/>Verified</small>}</div>
}
function Toggle({label,on}) {
  return <div className="toggleRow"><span>{label}</span><div className={"toggle "+(on?"on":"")}><i></i></div></div>
}
function SectionCard({icon:Icon,title,sub,badge}) {
  return <div className="sectionCard"><div className="sectionIcon"><Icon size={21}/></div><div><b>{title}</b><span>{sub}</span></div><span className="sectionBadge">{badge}</span><ChevronRight size={17}/></div>
}
function pageTitle(active) {
  return ({dashboard:"Dashboard",passport:"Business Passport",marketplace:"Logistics Marketplace",documents:"Documents",analytics:"Analytics"})[active]
}

export default App;
