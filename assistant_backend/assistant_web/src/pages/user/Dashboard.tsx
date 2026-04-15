import React from 'react';
import { 
  Bell, 
  MapPin, 
  Settings, 
  CreditCard,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';

const UserDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Olá, Paulo! 👋</h2>
          <p className="text-slate-400 mt-2">Seus alertas curados estão prontos para hoje.</p>
        </div>
        <div className="flex -space-x-2">
            {[1,2,3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800" />
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Central Feed Simulation */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-6 border-primary-500/20 bg-primary-500/5 relative overflow-hidden group hover:border-primary-500 transition-all cursor-pointer">
              <div className="absolute top-0 right-0 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-primary-500 text-white">Próximo Envio: 08:00</span>
              </div>
              <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-primary-500 text-white">
                      <Layers size={24} />
                  </div>
                  <div>
                      <h3 className="text-xl font-bold text-slate-100">Preview do seu Boletim Matinal</h3>
                      <p className="text-slate-400 mt-2 leading-relaxed">
                          Seu boletim conterá 4 atualizações de trânsito em Vila Madalena e 2 promoções de churrasco baseadas no seu perfil center-right.
                      </p>
                      <button className="mt-4 text-primary-400 font-bold text-sm hover:underline">Ver detalhes da fila →</button>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Zonas Ativas', value: '4 localidades', icon: MapPin, desc: 'SP (Semana), Floripa (FDS)' },
                { title: 'Status do Plano', value: 'Plano Pro', icon: ShieldCheck, desc: 'Vencimento em 15 dias' },
              ].map(card => (
                  <div key={card.title} className="glass-panel p-6 hover:bg-white/5 transition-all">
                      <div className="flex items-center space-x-4">
                          <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-primary-400">
                              <card.icon size={24} />
                          </div>
                          <div>
                              <p className="text-xs text-slate-500">{card.title}</p>
                              <h4 className="text-lg font-bold text-slate-100">{card.value}</h4>
                              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{card.desc}</p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>

          <div className="glass-panel p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-6">Últimas Interações</h3>
              <div className="space-y-6">
                  <div className="relative pl-8 border-l border-white/10 space-y-8">
                      <div className="relative">
                          <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-primary-500 border-4 border-slate-950" />
                          <div>
                              <p className="text-xs text-slate-500 font-medium">Hoje às 08:02</p>
                              <p className="text-sm text-slate-300 mt-1">Boletim enviado via WhatsApp (4.2kb)</p>
                          </div>
                      </div>
                      <div className="relative">
                          <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-slate-800 border-4 border-slate-950" />
                          <div>
                              <p className="text-xs text-slate-500 font-medium">Ontem às 14:15</p>
                              <p className="text-sm text-slate-300 mt-1">Preferências de Viés Político atualizadas via Portal Web</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 space-y-4">
                <h4 className="font-bold text-slate-100">Ações Rápidas</h4>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-left group">
                        <div className="flex items-center space-x-3">
                            <Calendar size={18} className="text-slate-400 group-hover:text-primary-400" />
                            <span className="text-sm font-medium">Ajustar Horários</span>
                        </div>
                        <span className="text-slate-600">→</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-left group">
                        <div className="flex items-center space-x-3">
                            <CreditCard size={18} className="text-slate-400 group-hover:text-primary-400" />
                            <span className="text-sm font-medium">Pagamento</span>
                        </div>
                        <span className="text-slate-600">→</span>
                    </button>
                </div>
            </div>

            <div className="glass-panel p-6 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
                <div className="mb-4 text-purple-400">
                    <Zap size={32} />
                </div>
                <h4 className="font-bold text-slate-100 italic font-serif">"Dê um Oi e reabra a janela."</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Ajude-nos a manter seus custos baixos! Ao responder uma das nossas campanhas, você renova o contato direto e recebe notícias com mais precisão.
                </p>
                <div className="mt-4 flex space-x-2">
                    <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-purple-500" />
                    </div>
                    <span className="text-[10px] text-purple-400 font-bold uppercase">Meta Batida</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
