import { ArrowRight, ShieldCheck, Zap, Users, Wallet, CheckCircle2 } from 'lucide-react'

const features = [
  ['Smart Missions','Complete verified daily missions with a clean, simple dashboard.'],
  ['Secure Wallet','Track deposits, rewards and withdrawals in one place.'],
  ['Referral Rewards','Invite people and monitor referral rewards transparently.'],
]

export default function Home() {
  return <main className="min-h-screen bg-[#05070b] text-white overflow-hidden">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <div className="text-2xl font-black tracking-tight"><span className="text-cyan-400">NEROX</span> AISO</div>
      <div className="hidden gap-7 text-sm text-slate-300 md:flex"><a href="#features">Features</a><a href="#how">How it works</a><a href="#security">Security</a></div>
      <a href="/login" className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black">Get Started</a>
    </nav>

    <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 text-center md:pt-28">
      <div className="absolute left-1/2 top-10 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold text-cyan-300"><Zap size={14}/> NEXT-GENERATION DIGITAL REWARDS</div>
        <h1 className="text-5xl font-black tracking-tight sm:text-7xl">Earn smarter.<br/><span className="bg-gradient-to-r from-cyan-300 via-white to-blue-400 bg-clip-text text-transparent">Move faster.</span></h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">NEROX AISO brings missions, wallet tracking and referral rewards into one modern platform built for clarity and control.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><a href="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-bold text-black">Create account <ArrowRight size={18}/></a><a href="/login" className="rounded-xl border border-white/10 px-7 py-4 font-bold text-white">Sign in</a></div>
      </div>
    </section>

    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-5 md:grid-cols-3">{features.map(([title,desc],i)=><div key={title} className="rounded-3xl border border-white/10 bg-white/[.03] p-7"><div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">{i===0?<Zap/>:i===1?<Wallet/>:<Users/>}</div><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-slate-400">{desc}</p></div>)}</div>
    </section>

    <section id="how" className="border-y border-white/5 bg-white/[.02] py-20"><div className="mx-auto max-w-5xl px-6"><h2 className="text-center text-3xl font-black">A simple path from signup to rewards</h2><div className="mt-12 grid gap-8 md:grid-cols-3">{['Create your account','Confirm your eligible deposit','Unlock missions and track rewards'].map((x,i)=><div key={x} className="flex gap-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400 font-black text-black">{i+1}</div><div><h3 className="font-bold">{x}</h3><p className="mt-2 text-sm leading-6 text-slate-400">A guided flow keeps each step visible and easy to understand.</p></div></div>)}</div></div></section>

    <section id="security" className="mx-auto max-w-6xl px-6 py-20"><div className="rounded-3xl border border-emerald-400/15 bg-emerald-400/5 p-8 md:p-12"><div className="flex items-start gap-5"><ShieldCheck className="mt-1 text-emerald-300" size={32}/><div><h2 className="text-2xl font-black">Built around account safety</h2><div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2"><span><CheckCircle2 className="mr-2 inline text-emerald-300" size={16}/>Protected authentication</span><span><CheckCircle2 className="mr-2 inline text-emerald-300" size={16}/>Clear reward controls</span><span><CheckCircle2 className="mr-2 inline text-emerald-300" size={16}/>Admin-managed settings</span><span><CheckCircle2 className="mr-2 inline text-emerald-300" size={16}/>Supabase-backed data</span></div></div></div></div></section>

    <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-500">© 2026 NEROX AISO. Use responsibly. Rewards and eligibility are subject to platform terms.</footer>
  </main>
}