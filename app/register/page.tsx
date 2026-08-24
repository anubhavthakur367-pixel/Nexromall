'use client'
import {FormEvent,useState} from 'react'
import {supabaseBrowser} from '../../lib/supabase-browser'
import {useRouter} from 'next/navigation'

export default function Register(){
 const [name,setName]=useState('');const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [ref,setRef]=useState('');const [error,setError]=useState('');const [busy,setBusy]=useState(false);const r=useRouter()
 async function submit(e:FormEvent){
  e.preventDefault(); if(busy)return; setBusy(true);setError('')
  try{
   const s=supabaseBrowser()
   if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw new Error('Supabase is not configured. Please contact the administrator.')
   const result=await Promise.race([
    s.auth.signUp({email:email.trim(),password,options:{data:{full_name:name.trim(),referral_code:ref.trim()||null}}}),
    new Promise<never>((_,reject)=>setTimeout(()=>reject(new Error('Registration timed out. Please check your connection and try again.')),15000))
   ])
   const {data,error}=result
   if(error) throw error
   if(data.session){r.replace('/dashboard');return}
   setError('Account created. Please check your email and confirm your account before signing in.')
  }catch(err:any){setError(err?.message||'Unable to create the account. Please try again.')}
  finally{setBusy(false)}
 }
 return <main className="min-h-screen grid place-items-center bg-[#05070b] text-white px-6"><form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[.03] p-8"><h1 className="text-3xl font-black"><span className="text-cyan-400">NEROX</span> AISO</h1><p className="mt-2 text-slate-400">Create your account</p><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="mt-8 w-full rounded-xl border border-white/10 bg-black/30 p-3"/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="mt-3 w-full rounded-xl border border-white/10 bg-black/30 p-3"/><input required minLength={6} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="mt-3 w-full rounded-xl border border-white/10 bg-black/30 p-3"/><input value={ref} onChange={e=>setRef(e.target.value)} placeholder="Referral code (optional)" className="mt-3 w-full rounded-xl border border-white/10 bg-black/30 p-3"/><button disabled={busy} className="mt-5 w-full rounded-xl bg-cyan-400 py-3 font-bold text-black">{busy?'Creating…':'Create account'}</button>{error&&<p className={`mt-4 text-sm ${error.startsWith('Account created')?'text-emerald-300':'text-red-300'}`}>{error}</p>}<a href="/login" className="mt-5 block text-center text-sm text-slate-400">Already have an account?</a></form></main>}
