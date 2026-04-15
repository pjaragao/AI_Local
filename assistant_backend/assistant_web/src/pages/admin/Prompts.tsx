import React from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Bot
} from 'lucide-react';

const Prompts = () => {
  const prompts = [
    { id: 1, name: 'EXTRACTION_NEWS', provider: 'Gemini 1.5 Flash', version: 4, lastUpdate: '12/04' },
    { id: 2, name: 'WEATHER_CONTEXT', provider: 'Ollama', version: 2, lastUpdate: '05/04' },
    { id: 3, name: 'DEALS_FILTER', provider: 'Gemini 1.5 Flash', version: 1, lastUpdate: '01/04' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Editor de Prompts</h2>
          <p className="text-slate-400 mt-2">Gerencie o cérebro das análises de IA.</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all duration-300 shadow-lg shadow-primary-500/20">
          <Plus size={20} />
          <span>Novo Prompt</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-4 flex items-center space-x-3 text-slate-400 border-white/5 focus-within:border-primary-500/50 transition-all">
            <Search size={18} />
            <input type="text" placeholder="Buscar prompts..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>

          <div className="space-y-3">
            {prompts.map((p) => (
              <div key={p.id} className="glass-panel p-4 cursor-pointer hover:bg-white/5 transition-all group border-white/5 active:border-primary-500/30">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-100 group-hover:text-primary-400 transition-colors">{p.name}</h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 border border-white/5">v{p.version}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2 text-xs text-slate-500">
                  <Bot size={12} />
                  <span>{p.provider} • Atualizado em {p.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 glass-panel flex flex-col min-h-[600px]">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h3 className="text-xl font-bold text-slate-100">EXTRACTION_NEWS</h3>
              <div className="flex space-x-2">
                <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Gemini 1.5 Flash</span>
                <span className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">JSON Mode</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
                <Trash2 size={18} />
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-bold transition-all">
                Salvar Alterações
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 font-mono text-sm">
            <textarea 
              className="w-full h-full bg-slate-900/50 border border-white/5 rounded-xl p-6 text-slate-300 focus:border-primary-500/30 outline-none resize-none leading-relaxed"
              defaultValue={`"Analise o texto abaixo e extraia as informações estruturadas. 
A resposta DEVE ser um JSON válido contendo:
- category: (Trânsito, Clima, Esporte, Economia, Lazer, Noticia)
- scope_level: (International, National, State, Regional, Municipal, Neighborhood)
- political_bias: (Left_Leaning, Right_Leaning, Neutral)
- is_realtime_alert: boolean
- summary_short: max 80 chars
- summary_medium: bullet points max 300 chars
- summary_long: max 800 chars
- tags: array de strings

TEXTO PARA ANÁLISE:
{{text}}"`}
            />
          </div>

          <div className="p-4 bg-slate-900 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <AlertCircle size={14} className="text-yellow-500" />
              <span>Aviso: Alterar este prompt afetará todos os Scrapers vinculados a CATEGORY=NEWS.</span>
            </div>
            <button className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors text-xs font-bold uppercase tracking-widest">
              <span>Testar com amostra</span>
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { AlertCircle } from 'lucide-react';
export default Prompts;
