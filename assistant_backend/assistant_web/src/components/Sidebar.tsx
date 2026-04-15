import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Rss, 
  MessageSquare, 
  Settings, 
  Users, 
  Megaphone,
  UserCircle
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const adminLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Fontes', icon: Rss, path: '/admin/sources' },
    { name: 'Prompts IA', icon: MessageSquare, path: '/admin/prompts' },
    { name: 'Campanhas', icon: Megaphone, path: '/admin/campaigns' },
    { name: 'Usuários', icon: Users, path: '/admin/users' },
  ];

  const userLinks = [
    { name: 'Meu Painel', icon: UserCircle, path: '/portal' },
    { name: 'Preferências', icon: Settings, path: '/portal/preferences' },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="w-64 h-screen glass-panel m-4 flex flex-col p-6 sticky top-0">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-bold gradient-text">Assistant.AI</h1>
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
          {isAdmin ? 'Admin Console' : 'User Portal'}
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-[0_0_20px_rgba(14,165,233,0.1)]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center space-x-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-purple-500 flex items-center justify-center text-white font-bold">
            P
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-slate-100 truncate">Paulo Jr</p>
            <p className="text-xs text-slate-500 truncate">Sair da conta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
