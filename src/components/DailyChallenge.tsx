import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface DailyChallengeProps {
  currentDay: number;
  onBack: () => void;
  onComplete: (day: number, reflection: string) => void;
  isCompleted: boolean;
  savedReflection?: string;
}

const challenges = [
  {
    title: "Распознание триггеров",
    description: "Что вызывает у вас сильные эмоциональные реакции?",
    exercise: "Вспомните последнюю ситуацию, когда вы отреагировали слишком эмоционально. Что именно вас задело? Какая часть вашей личности была затронута?",
    reflection: "Опишите ситуацию и ваши чувства. Что это говорит о ваших скрытых страхах или потребностях?"
  },
  {
    title: "Зависть как учитель",
    description: "Исследуйте свою зависть к качествам других людей",
    exercise: "Подумайте о человеке, которому вы завидуете. Что именно в нем вызывает зависть? Это качество, которое вы подавляете в себе?",
    reflection: "Как вы можете развить это качество в себе вместо того, чтобы завидовать?"
  },
  {
    title: "Внутренний критик",
    description: "Познакомьтесь со своим внутренним голосом осуждения",
    exercise: "Прислушайтесь к своему внутреннему диалогу в течение дня. Какие фразы повторяются? Откуда этот голос?",
    reflection: "Чей голос вы слышите? Родителей, учителей, общества? Как этот голос влияет на ваши решения?"
  },
  {
    title: "Отвергнутые части",
    description: "Какие аспекты себя вы считаете неприемлемыми?",
    exercise: "Составьте список черт характера, которые вы считаете негативными. Затем найдите ситуации, где эти черты могли бы быть полезными.",
    reflection: "Как эти 'негативные' черты могли бы служить вам в определенных контекстах?"
  },
  {
    title: "Проекция на других",
    description: "Что вы не принимаете в других людях?",
    exercise: "Вспомните человека, который вас очень раздражает. Какие именно качества в нем вас беспокоят?",
    reflection: "Есть ли эти качества в вас? Как вы их подавляете или отрицаете?"
  }
];

export function DailyChallenge({ currentDay, onBack, onComplete, isCompleted, savedReflection }: DailyChallengeProps) {
  const [reflection, setReflection] = useState(savedReflection || "");
  const [showCompleted, setShowCompleted] = useState(false);

  const challenge = challenges[(currentDay - 1) % challenges.length];

  const handleComplete = () => {
    onComplete(currentDay, reflection);
    setShowCompleted(true);
    setTimeout(() => setShowCompleted(false), 2000);
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
          <div className="flex-1">
            <h1 className="text-lg">День {currentDay}</h1>
            <p className="text-sm text-gray-400">{challenge.title}</p>
          </div>
          {isCompleted && (
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Challenge Description */}
        <div className="bg-card/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h2 className="text-xl mb-4">{challenge.title}</h2>
          <p className="text-gray-300 leading-relaxed">{challenge.description}</p>
        </div>

        {/* Exercise */}
        <div className="bg-card/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h3 className="text-lg mb-4">Упражнение</h3>
          <p className="text-gray-300 leading-relaxed">{challenge.exercise}</p>
        </div>

        {/* Reflection */}
        <div className="bg-card/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h3 className="text-lg mb-4">Ваши размышления</h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">{challenge.reflection}</p>
          
          <Textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Поделитесь своими мыслями и инсайтами..."
            className="min-h-[200px] bg-input/50 backdrop-blur-xl border-white/20 text-white placeholder-gray-500 resize-none rounded-2xl"
          />
        </div>

        {/* Success Message */}
        {showCompleted && (
          <div className="bg-green-500/20 backdrop-blur-xl rounded-3xl p-6 border border-green-500/30 text-center">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
            <h3 className="text-lg mb-2">Отличная работа!</h3>
            <p className="text-green-200 text-sm">
              День {currentDay} завершен. Вы сделали еще один шаг к целостности.
            </p>
          </div>
        )}

        {/* Daily Wisdom */}
        <div className="bg-card/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
          <p className="text-gray-300 italic text-sm mb-2 leading-relaxed">
            "Наша тень содержит в себе 90% чистого золота"
          </p>
          <p className="text-gray-500 text-xs">— Роберт Блай</p>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="sticky bottom-0 p-6 bg-black/80 backdrop-blur-xl border-t border-white/10">
        <Button 
          onClick={handleComplete}
          disabled={!reflection.trim()}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl disabled:bg-gray-600 disabled:text-gray-400"
        >
          {isCompleted ? "Обновить размышления" : "Завершить день"}
        </Button>
      </div>
    </div>
  );
}