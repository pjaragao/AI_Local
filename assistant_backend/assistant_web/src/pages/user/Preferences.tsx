import React from 'react';
import { 
  ChevronRight, 
  MapPin, 
  Clock, 
  Target, 
  Calendar,
  Save
} from 'lucide-react';

const Preferences = () => {
  const [selectedBias, setSelectedBias] = React.useState('center');

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold text-slate-100 italic">Personalize sua Experiência</h2>
        <p className="text-slate-400 mt-2">Ajuste como e onde o assistente deve focar o seu radar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bias Selection */}
        <section className="glass-panel p-8 space-y-6">
          <div className="flex items-center space-x-3 text-primary-400">
            <Target size={24} />
            <h3 className="text-xl font-bold text-slate-100">Alinhamento Ideológico</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Nossa IA filtrará o tom das notícias para quebrar (ou manter) sua bolha de informação conforme desejado.
          </p>
          <div className="flex flex-col space-y-3">
            {['left', 'center-left', 'center', 'center-right', 'right'].map((bias) => (
              <button
                key={bias}
                onClick={() => setSelectedBias(bias)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  selectedBias === bias 
                    ? 'bg-primary-500/10 border-primary-500 text-primary-400 shadow-lg shadow-primary-500/10' 
                    : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/10'
                }`}
              >
                <span className="capitalize font-medium">{bias.replace('-', ' ')}</span>
                {selectedBias === bias && <div className="w-2 h-2 rounded-full bg-primary-500" />}
              </button>
            ))}
          </div>
        </section>

        {/* Global Reading Preferences */}
        <section className="glass-panel p-8 space-y-6">
          <div className="flex items-center space-x-3 text-purple-400">
            <Clock size={24} />
            <h3 className="text-xl font-bold text-slate-100">Formato e Horário</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tamanho do Resumo</label>
              <select className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-slate-200 outline-none focus:border-purple-500/50">
                <option>Curto (Alertas Push)</option>
                <option>Médio (Bullet Points)</option>
                <option>Longo (Leitura Profunda)</option>
              </select>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Frequência</label>
                <div className="grid grid-cols-3 gap-2">
                    {['08:00', '12:00', '20:00'].map(time => (
                        <div key={time} className="p-3 rounded-lg bg-white/5 border border-white/5 text-center text-sm font-bold text-slate-300">
                            {time}
                        </div>
                    ))}
                    <button className="p-3 rounded-lg bg-white/5 border border-dashed border-white/10 text-slate-600 text-xs">+</button>
                </div>
            </div>
          </div>
        </section>
      </div>

      {/* Radar Zones Table */}
      <section className="glass-panel p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <MapPin size={120} />
        </div>
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center space-x-3 text-green-400">
            <MapPin size={24} />
            <h3 className="text-xl font-bold text-slate-100">Zonas de Radar Temporais</h3>
          </div>
          <button className="text-xs font-bold text-primary-500 hover:text-primary-400 uppercase tracking-widest">+ Adicionar Nova Zona</button>
        </div>

        <div className="space-y-4 relative z-10">
          {[
            { label: 'Casa / Escola', city: 'São Paulo', neighborhood: 'Vila Madalena', days: 'Seg-Sex', status: 'Ativo' },
            { label: 'Finais de Semana', city: 'Florianópolis', neighborhood: 'Campeche', days: 'Sáb-Dom', status: 'Inativo hoje' },
          ].map((zone, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex items-start space-x-5">
                <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 text-slate-400 group-hover:text-green-400 transition-colors">
                  <Calendar size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-lg">{zone.label}</h4>
                  <p className="text-sm text-slate-400">{zone.city} • {zone.neighborhood}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-8">
                <div className="text-right">
                  <span className="block text-xs font-bold text-slate-500 uppercase tracking-tighter">Dias Ativos</span>
                  <span className="text-primary-400 font-bold">{zone.days}</span>
                </div>
                <div className="w-px h-8 bg-white/5 hidden md:block" />
                <button className="p-3 rounded-xl bg-white/5 text-slate-500 hover:text-slate-100">
                    <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end pt-4">
          <button className="flex items-center space-x-3 px-10 py-4 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-lg shadow-2xl shadow-primary-500/40 transition-all active:scale-95">
              <Save size={20} />
              <span>Salvar Configurações</span>
          </button>
      </div>
    </div>
  );
};

export default Preferences;
