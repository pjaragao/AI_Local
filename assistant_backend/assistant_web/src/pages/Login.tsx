import React from 'react';
import { Mail, Lock, Zap } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel p-10 relative overflow-hidden">
        {/* Abstract background glows */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl opacity-50" />

        <div className="relative z-10 text-center mb-10">
          <div className="inline-flex p-4 rounded-3xl bg-slate-900 border border-white/5 mb-6 text-primary-400 shadow-xl">
            <Zap size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Bem-vindo de volta</h2>
          <p className="text-slate-400 mt-2">Acesse seu assistente pessoal inteligente</p>
        </div>

        <form className="relative z-10 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
            <div className="flex items-center space-x-3 glass-panel border-white/5 p-4 focus-within:border-primary-500/50 transition-all">
              <Mail size={18} className="text-slate-500" />
              <input 
                type="email" 
                placeholder="exemplo@email.com" 
                className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder:text-slate-700" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Senha</label>
                <a href="#" className="text-xs text-primary-500 hover:text-primary-400 font-bold">Esqueceu?</a>
            </div>
            <div className="flex items-center space-x-3 glass-panel border-white/5 p-4 focus-within:border-primary-500/50 transition-all">
              <Lock size={18} className="text-slate-500" />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder:text-slate-700" 
              />
            </div>
          </div>

          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold text-lg transition-all duration-300 shadow-xl shadow-primary-500/20 active:scale-[0.98]">
            Entrar na Plataforma
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 relative z-10">
          Ainda não tem conta? <span className="text-primary-500 font-bold hover:underline cursor-pointer">Assine agora</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
