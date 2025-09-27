import { Progress } from "./ui/progress";
import { ArrowLeft, CheckCircle, Circle } from "lucide-react";

interface ProgressScreenProps {
  onBack: () => void;
  completedDays: boolean[];
  currentDay: number;
}

export function ProgressScreen({ onBack, completedDays, currentDay }: ProgressScreenProps) {
  const completedCount = completedDays.filter(Boolean).length;
  const progressPercentage = (completedCount / 30) * 100;
  
  const weeklyProgress = [];
  for (let week = 0; week < 5; week++) {
    const weekDays = [];
    for (let day = 0; day < 7 && (week * 7 + day) < 30; day++) {
      weekDays.push(week * 7 + day);
    }
    weeklyProgress.push(weekDays);
  }

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
            <h1 className="text-lg">Прогресс</h1>
            <p className="text-sm text-gray-400">{completedCount} из 30 дней</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Overall Progress */}
        <div className="bg-card/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center">
          <div className="text-5xl mb-2">{Math.round(progressPercentage)}%</div>
          <p className="text-gray-400 mb-6">{completedCount} дней завершено</p>
          <Progress value={progressPercentage} className="h-3 mb-4" />
          <div className="flex justify-between text-sm text-gray-400">
            <span>Начало</span>
            <span>Трансформация</span>
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-4">
          {[
            { 
              phase: "Осознание", 
              days: "1-10", 
              completed: completedDays.slice(0, 10).filter(Boolean).length,
              color: "from-red-500/20 to-red-600/20",
              accent: "text-red-400"
            },
            { 
              phase: "Принятие", 
              days: "11-20", 
              completed: completedDays.slice(10, 20).filter(Boolean).length,
              color: "from-yellow-500/20 to-orange-600/20",
              accent: "text-yellow-400"
            },
            { 
              phase: "Трансформация", 
              days: "21-30", 
              completed: completedDays.slice(20, 30).filter(Boolean).length,
              color: "from-green-500/20 to-emerald-600/20",
              accent: "text-green-400"
            }
          ].map((phase, index) => (
            <div key={index} className={`bg-gradient-to-r ${phase.color} backdrop-blur-xl rounded-2xl p-6 border border-white/10`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg">{phase.phase}</h3>
                  <p className="text-sm text-gray-400">Дни {phase.days}</p>
                </div>
                <div className={`text-2xl ${phase.accent}`}>{phase.completed}/10</div>
              </div>
              <Progress value={(phase.completed / 10) * 100} className="h-2" />
            </div>
          ))}
        </div>

        {/* Calendar View */}
        <div className="bg-card/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h2 className="text-lg mb-6">30-дневный календарь</h2>
          
          <div className="space-y-6">
            {weeklyProgress.map((week, weekIndex) => (
              <div key={weekIndex}>
                <h3 className="text-sm text-gray-400 mb-3">
                  Неделя {weekIndex + 1}
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {week.map((dayIndex) => {
                    const day = dayIndex + 1;
                    const isCompleted = completedDays[dayIndex];
                    const isCurrent = day === currentDay;
                    
                    return (
                      <div
                        key={dayIndex}
                        className={`
                          relative aspect-square rounded-xl border flex flex-col items-center justify-center text-sm transition-all
                          ${isCompleted 
                            ? 'bg-green-500/20 border-green-500/50' 
                            : isCurrent 
                              ? 'bg-primary/20 border-primary/50' 
                              : 'bg-card/40 border-white/20'
                          }
                          ${!isCompleted && day < currentDay ? 'opacity-50' : ''}
                        `}
                      >
                        <div className="mb-1">
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : isCurrent ? (
                            <Circle className="w-4 h-4 text-primary" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                        <div className="text-xs">{day}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-card/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg mb-4">Ваши инсайты</h3>
          <div className="text-gray-300 text-sm leading-relaxed">
            {completedCount === 0 && (
              <p>Начните путешествие, чтобы увидеть свои инсайты здесь</p>
            )}
            {completedCount > 0 && completedCount < 10 && (
              <p>Вы начали осознавать свои теневые аспекты. Это требует мужества!</p>
            )}
            {completedCount >= 10 && completedCount < 20 && (
              <p>Фаза принятия началась. Вы учитесь интегрировать отвергнутые части себя.</p>
            )}
            {completedCount >= 20 && completedCount < 30 && (
              <p>Трансформация в действии! Вы становитесь более целостным человеком.</p>
            )}
            {completedCount === 30 && (
              <p>Поздравляем! Вы завершили путешествие к целостности и аутентичности.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}