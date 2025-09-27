import { Button } from "./ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen p-6">
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-sm mx-auto">
          {/* App Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl mb-8 flex items-center justify-center shadow-2xl">
            <span className="text-2xl">🌙</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl tracking-tight mb-3">Тень</h1>
          <p className="text-lg text-gray-300 mb-12 leading-relaxed">
            30-дневное путешествие к целостности через принятие теневых аспектов личности
          </p>

          {/* Feature Cards */}
          <div className="space-y-4 mb-12 w-full">
            <div className="bg-card/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="text-left">
                <h3 className="text-lg mb-2">Самопознание</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Исследуйте скрытые аспекты своей личности через ежедневные упражнения
                </p>
              </div>
            </div>

            <div className="bg-card/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="text-left">
                <h3 className="text-lg mb-2">Интеграция</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Принимайте отвергнутые части себя для достижения внутренней гармонии
                </p>
              </div>
            </div>

            <div className="bg-card/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="text-left">
                <h3 className="text-lg mb-2">Трансформация</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Станьте более аутентичной и целостной версией себя
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="space-y-4">
          <Button 
            onClick={onStart}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg font-medium"
          >
            Начать путешествие
          </Button>
          
          <p className="text-center text-xs text-gray-500 leading-relaxed px-4">
            "Кто смотрит наружу — видит сны, кто смотрит в себя — пробуждается" — К.Г. Юнг
          </p>
        </div>
      </div>
    </div>
  );
}