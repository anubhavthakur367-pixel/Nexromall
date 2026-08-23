'use client'
import { FormEvent, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'

export default function Login(){
 const router=useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [busy,setBusy]=useState(false)
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError('');const {error}=await supabaseBrowser().auth.signInWithPassword({email,password});if(error)setError(error.message);else router.push('/dashboard');setBusy(false)}
 return <main className="min-h-screen grid place-items-center bg-[#05070b] text-white px-6"><form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[.04] p-8"><h1 className="text-3xl font-black"><span className="text-cyan-400">NEROX</span> AISO</h1><p className="mt-2 text-slate-400">Sign in to your account</p><label className="mt-7 block text-sm">Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 outline-none"/></label><label className="mt-4 block text-sm">Password<input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 outline-none"/></label>{error&&<p className="mt-4 text-sm text-red-300">{error}</p>}<button disabled={busy} className="mt-6 w-full rounded-xl bg-cyan-400 p-3 font-bold text-black disabled:opacity-50">{busy?'Signing in…':'Sign in'}</button><a href="/register" className="mt-5 block text-center text-sm text-cyan-300">Create an account</a></form></main>
}
