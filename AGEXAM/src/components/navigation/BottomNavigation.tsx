import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Gift, Trophy, ClipboardCheck } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const BottomNavigation: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Home', icon: Home, color: 'text-amber-500' },
    { to: '/adventure', label: 'Quest', icon: Compass, color: 'text-sky-500' },
    { to: '/exam', label: 'Exam', icon: ClipboardCheck, color: 'text-emerald-500' },
    { to: '/rewards', label: 'Rewards', icon: Gift, color: 'text-rose-500' },
    { to: '/achievements', label: 'Trophies', icon: Trophy, color: 'text-purple-500' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-amber-200/80 px-2 py-1.5 shadow-lg max-w-4xl mx-auto rounded-t-3xl">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => soundService.playClick()}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 min-w-[56px] min-h-[50px] cursor-pointer ${
                  isActive
                    ? 'bg-amber-100 text-amber-950 font-bold scale-105 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-6 h-6 transition-transform ${
                      isActive ? 'scale-110 ' + item.color : 'text-slate-400'
                    }`}
                  />
                  <span className="text-[11px] sm:text-xs font-bubble tracking-tight mt-0.5">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
