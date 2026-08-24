'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '../../lib/supabase-browser'

const presets = [10, 20, 50, 100, 200, 500, 1000]
const NETWORKS = {
  TRC20: 'TFwpxLoaj6Et1hMLn8HpB3zHPdrVTSEfQo',
  BEP20: '0xA3F15E73B102dF74B3f7b15390d1D68B72F8d950'
} as const

type Network = keyof typeof NETWORKS

export default function Deposit() {
  const router = useRouter()
  const [amount, setAmount] = useState('100')
  const [network, setNetwork] = useState<Network>('TRC20')
  const [txHash, setTxHash] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const address = NETWORKS[network]
  const canSubmit = useMemo(() => Number(amount) > 0 && txHash.trim().length >= 8 && !busy, [amount, txHash, busy])

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setBusy(true); setMessage('')
    const s = supabaseBrowser()
    const { data: { user } } = await s.auth.getUser()
    if (!user) { router.replace('/login'); return }
    const { error } = await s.from('deposits').insert({ user_id: user.id, amount: Number(amount), asset: 'USDT', network, address, tx_hash: txHash.trim(), status: 'pending' })
    setMessage(error ? error.message : 'Deposit submitted for admin verification. Missions will unlock after approval.')
    if (!error) setTimeout(() => router.push('/dashboard'), 1200)
    setBusy(false)
  }

  return <main className="min-h-screen bg-[#05070b] px-5 py-8 text-white sm:px-8">
    <div className="mx-auto max-w-5xl"><button onClick={() => router.back()} className="text-sm text-slate-400">← Back</button>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
          <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-lime-300">NEROX AISO</p><h1 className="mt-2 text-3xl font-black">Deposit USDT</h1></div><span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">{network}</span></div>
          <p className="mt-3 text-sm leading-6 text-slate-400">Choose a supported USDT network, send the exact amount, then submit your transaction hash. Your deposit stays pending until an administrator verifies it.</p>
          <div className="mt-6 grid grid-cols-2 gap-3"><button type="button" onClick={() => {setNetwork('TRC20');setTxHash('')}} className={`rounded-xl border px-4 py-3 text-sm font-bold ${network==='TRC20'?'border-lime-400 bg-lime-400/10 text-lime-300':'border-white/10 text-slate-300'}`}>USDT TRC20</button><button type="button" onClick={() => {setNetwork('BEP20');setTxHash('')}} className={`rounded-xl border px-4 py-3 text-sm font-bold ${network==='BEP20'?'border-lime-400 bg-lime-400/10 text-lime-300':'border-white/10 text-slate-300'}`}>USDT BEP20</button></div>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-7">{presets.map(v => <button key={v} type="button" onClick={() => setAmount(String(v))} className={`rounded-xl border px-2 py-3 text-xs font-bold ${Number(amount)===v?'border-lime-400 bg-lime-400/10 text-lime-300':'border-white/10 text-slate-300'}`}>{v} USDT</button>)}</div>
          <form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm"><span className="text-slate-400">Amount (USDT)</span><input value={amount} onChange={e=>setAmount(e.target.value)} type="number" min="1" step="any" className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3"/></label><label className="block text-sm"><span className="text-slate-400">Transaction hash</span><input required value={txHash} onChange={e=>setTxHash(e.target.value)} placeholder={`Paste ${network} transaction hash`} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3"/></label><button disabled={!canSubmit} className="w-full rounded-xl bg-lime-400 py-3 font-black text-black disabled:cursor-not-allowed disabled:opacity-40">{busy?'Submitting…':'I Have Paid — Confirm Deposit'}</button></form>
          {message && <p className="mt-4 rounded-xl border border-white/10 p-3 text-sm text-cyan-200">{message}</p>}
        </section>
        <aside className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8"><h2 className="text-xl font-bold">Send USDT to</h2><p className="mt-2 text-sm text-slate-400">{network}</p><div className="mt-5 rounded-2xl border border-lime-400/20 bg-lime-400/5 p-4"><p className="break-all font-mono text-sm text-lime-200">{address}</p></div><div className="mt-6 rounded-2xl border border-amber-400/10 bg-amber-400/5 p-4 text-sm leading-6 text-amber-100">1. Send USDT on {network} only. 2. Paste the transaction hash. 3. Wait for admin verification. 4. Daily missions unlock only after an eligible deposit is approved.</div><a href="/dashboard" className="mt-5 block rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-bold">Back to dashboard</a></aside>
      </div>
    </div>
  </main>
}
