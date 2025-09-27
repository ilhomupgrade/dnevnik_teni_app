import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Calendar, BookOpen, TrendingUp, Settings, ChevronRight } from "lucide-react";

interface MainDashboardProps {
  currentDay: number;
  onNavigate: (screen: string) => void;
  completedDays: boolean[];
}

export function MainDashboard({ currentDay, onNavigate, completedDays }: MainDashboardProps) {
  const completedCount = completedDays.filter(Boolean).length;
  const progressPercentage = (completedCount / 30) * 100;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброе утро";
    if (hour < 18) return "Добрый день";
    return "Добрый вечер";
  };

  const getMotivationalText = () => {
    if (completedCount === 0) return "Готовы начать путешествие самопознания?";
    if (completedCount < 15) return "Каждый день — шаг к целостности";
    if (completedCount < 25) return "Вы на правильном пути";
    if (completedCount < 30) return "Осталось совсем немного";
    return "Поздравляем с завершением путешествия!";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="px-6 pt-16 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl mb-1">{getGreeting()}</h1>
            <p className="text-gray-400">День {currentDay} из 30</p>
          </div>
          <button 
            onClick={() => onNavigate('settings')}
            className="w-10 h-10 rounded-full bg-card/60 backdrop-blur-xl border border-white/10 flex items-center justify-center"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Card */}
        <div className="bg-card/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl mb-1">Прогресс</h2>
              <p className="text-sm text-gray-400">{completedCount} дней завершено</p>
            </div>
            <div className="text-right">
              <div className="text-2xl mb-1">{Math.round(progressPercentage)}%</div>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2 mb-4" />
          <p className="text-sm text-gray-300">
            {getMotivationalText()}
          </p>
        </div>
      </div>

      {/* Main Actions */}
      <div className="px-6 space-y-4 mb-8">
        {/* Today's Exercise */}
        <button
          onClick={() => onNavigate('daily')}
          className="w-full bg-card/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 text-left hover:bg-card/80 transition-all duration-200 active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg mb-1">Сегодняшнее упражнение</h3>
                <p className="text-sm text-gray-400">
                  {currentDay <= 30 ? "Исследуйте новый аспект" : "Все упражнения завершены"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {completedDays[currentDay - 1] && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              )}
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </button>

        {/* Journal */}
        <button
          onClick={() => onNavigate('journal')}
          className="w-full bg-card/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 text-left hover:bg-card/80 transition-all duration-200 active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg mb-1">Журнал</h3>
                <p className="text-sm text-gray-400">Записи и размышления</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Progress Detail */}
        <button
          onClick={() => onNavigate('progress')}
          className="w-full bg-card/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10 text-left hover:bg-card/80 transition-all duration-200 active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg mb-1">Детальный прогресс</h3>
                <p className="text-sm text-gray-400">Визуализация пути</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>
      </div>

      {/* Quote */}
      <div className="px-6 pb-8">
        <div className="bg-card/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
          <p className="text-gray-300 italic text-sm mb-2 leading-relaxed">
            "Всё, что нас раздражает в других, может привести нас к пониманию себя"
          </p>
          <p className="text-gray-500 text-xs">— Карл Густав Юнг</p>
        </div>
      </div>
    </div>
  );
}