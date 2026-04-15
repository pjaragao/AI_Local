import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  AlertCircle 
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total de Usuários', value: '1,284', change: '+12%', icon: Users, color: 'text-blue-400' },
    { label: 'Processamentos IA', value: '45.2k', change: '+24%', icon: Zap, color: 'text-yellow-400' },
    { label: 'Taxa de Conversão', value: '18.4%', change: '+5%', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Falhas de Scrape', value: '3', change: '-40%', icon: AlertCircle, color: 'text-rose-400' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold text-slate-100">Visão Geral</h2>
        <p className="text-slate-400 mt-2">Monitore a saúde e o engajamento do seu assistente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-panel p-6 group hover:border-primary-500/50 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl bg-slate-900 border border-white/5 ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-slate-900 border border-white/5 ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-rose-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-100 mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6">
          <h3 className="text-xl font-bold text-slate-100 mb-6">Últimos Processamentos</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 transition-hover hover:bg-white/10 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-100">G1 Trânsito - Marginal Pinheiros</h4>
                    <p className="text-xs text-slate-500">Há 5 minutos • Viés: Neutro • Escopo: Municipal</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 font-medium">Sucesso</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-xl font-bold text-slate-100 mb-6">Status dos Provedores</h3>
          <div className="space-y-6">
            {[
              { name: 'Gemini 1.5 Flash', status: 'Online', delay: '1.2s', color: 'bg-blue-500' },
              { name: 'Ollama (Local)', status: 'Online', delay: '0.8s', color: 'bg-purple-500' },
              { name: 'OpenAI GPT-4o', status: 'Offline', delay: '--', color: 'bg-slate-500' },
            ].map((provider) => (
              <div key={provider.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${provider.color === 'bg-slate-500' ? 'bg-slate-500' : 'animate-pulse ' + provider.color}`} />
                  <span className="text-sm text-slate-300">{provider.name}</span>
                </div>
                <span className="text-xs text-slate-500">{provider.delay}</span>
              </div>
            ))}
            <div className="mt-8 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <p className="text-xs text-primary-400 font-medium leading-relaxed">
                Dica de Admin: O Ollama está sendo priorizado para conteúdos acima de 2.000 tokens para otimização de custos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
