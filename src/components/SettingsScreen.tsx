import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { ArrowLeft, Bell, Moon, RotateCcw, Download, ChevronRight } from "lucide-react";

interface SettingsScreenProps {
  onBack: () => void;
  onReset: () => void;
  settings: {
    notifications: boolean;
    darkMode: boolean;
    reminders: boolean;
  };
  onUpdateSettings: (settings: any) => void;
}

export function SettingsScreen({ onBack, onReset, settings, onUpdateSettings }: SettingsScreenProps) {
  const handleToggle = (key: string, value: boolean) => {
    onUpdateSettings({
      ...settings,
      [key]: value
    });
  };

  const handleExport = () => {
    // Mock export functionality
    const data = {
      exportDate: new Date().toISOString(),
      message: "Данные журнала будут экспортированы"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shadow-journal-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center px-6 py-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-card/60 backdrop-blur-xl border border-white/10 flex items-center justify-center mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg">Настройки</h1>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* App Settings */}
        <div className="space-y-4">
          <h2 className="text-lg mb-4">Приложение</h2>
          
          <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                  <Bell className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-base">Уведомления</h3>
                  <p className="text-sm text-gray-400">Напоминания о упражнениях</p>
                </div>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => handleToggle('notifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Moon className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-base">Темная тема</h3>
                  <p className="text-sm text-gray-400">Всегда включена</p>
                </div>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleToggle('darkMode', checked)}
                disabled
              />
            </div>

            <div className="flex items-center justify-between p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Bell className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-base">Напоминания</h3>
                  <p className="text-sm text-gray-400">Время для рефлексии</p>
                </div>
              </div>
              <Switch
                checked={settings.reminders}
                onCheckedChange={(checked) => handleToggle('reminders', checked)}
              />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="space-y-4">
          <h2 className="text-lg mb-4">Данные</h2>
          
          <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-between p-6 border-b border-white/10 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Download className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-left">
                  <h3 className="text-base">Экспорт журнала</h3>
                  <p className="text-sm text-gray-400">Сохранить записи</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={onReset}
              className="w-full flex items-center justify-between p-6 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mr-4">
                  <RotateCcw className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-left">
                  <h3 className="text-base">Сброс прогресса</h3>
                  <p className="text-sm text-gray-400">Начать заново</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* About */}
        <div className="space-y-4">
          <h2 className="text-lg mb-4">О приложении</h2>
          
          <div className="bg-card/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-white mb-2">Тень v1.0</h3>
                <p className="text-sm leading-relaxed">
                  Приложение для 30-дневного путешествия самопознания, основанное на концепции 
                  теневой работы Карла Густава Юнга.
                </p>
              </div>

              <div>
                <h4 className="text-white mb-2">Философия</h4>
                <p className="text-sm leading-relaxed">
                  "Тень" представляет собой те аспекты нашей личности, которые мы подавляем, 
                  отрицаем или считаем неприемлемыми. Интеграция тени ведет к целостности 
                  и аутентичной жизни.
                </p>
              </div>

              <div>
                <h4 className="text-white mb-2">Поддержка</h4>
                <p className="text-sm leading-relaxed">
                  Если вам нужна профессиональная помощь в процессе самопознания, 
                  рекомендуем обратиться к квалифицированному психологу или психотерапевту.
                </p>
              </div>

              <div className="border-t border-white/20 pt-4 mt-6">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Это приложение предназначено для образовательных целей и не заменяет 
                  профессиональную психологическую помощь.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="bg-card/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
          <p className="text-gray-300 italic text-sm mb-2 leading-relaxed">
            "Кто смотрит наружу — видит сны, кто смотрит в себя — пробуждается"
          </p>
          <p className="text-gray-500 text-xs">— Карл Густав Юнг</p>
        </div>
      </div>
    </div>
  );
}