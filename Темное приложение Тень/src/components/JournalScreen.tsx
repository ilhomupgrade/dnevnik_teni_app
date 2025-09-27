import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, BookOpen, Search, Plus, ChevronRight } from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  day: number;
  content: string;
  title: string;
}

interface JournalScreenProps {
  onBack: () => void;
  journalEntries: JournalEntry[];
  onSaveEntry: (entry: Omit<JournalEntry, 'id'>) => void;
}

export function JournalScreen({ onBack, journalEntries, onSaveEntry }: JournalScreenProps) {
  const [isWriting, setIsWriting] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const filteredEntries = journalEntries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (newTitle.trim() && newContent.trim()) {
      onSaveEntry({
        date: new Date().toLocaleDateString('ru-RU'),
        day: 0, // Free journal entry
        title: newTitle,
        content: newContent
      });
      setNewTitle("");
      setNewContent("");
      setIsWriting(false);
    }
  };

  const prompts = [
    "Что я узнал о себе сегодня?",
    "Какие эмоции я подавляю?",
    "В чем я себе лгу?",
    "Что во мне нуждается в принятии?",
    "Какая часть меня просит внимания?",
    "Где я ношу маску?",
    "Что меня пугает в самом себе?",
    "Какой дар скрыт в моей тени?"
  ];

  if (selectedEntry) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center px-6 py-4">
            <button 
              onClick={() => setSelectedEntry(null)}
              className="w-10 h-10 rounded-full bg-card/60 backdrop-blur-xl border border-white/10 flex items-center justify-center mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg truncate">{selectedEntry.title}</h1>
              <p className="text-sm text-gray-400">{selectedEntry.date}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          <div className="bg-card/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
              {selectedEntry.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isWriting) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center px-6 py-4">
            <button 
              onClick={() => setIsWriting(false)}
              className="w-10 h-10 rounded-full bg-card/60 backdrop-blur-xl border border-white/10 flex items-center justify-center mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg">Новая запись</h1>
            </div>
            <Button
              onClick={handleSave}
              disabled={!newTitle.trim() || !newContent.trim()}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl disabled:bg-gray-600 disabled:text-gray-400"
            >
              Сохранить
            </Button>
          </div>
        </div>

        <div className="px-6 py-8 space-y-6">
          {/* Title Input */}
          <div className="bg-card/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <label className="block text-sm text-gray-400 mb-3">Заголовок</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="О чем эта запись?"
              className="w-full bg-transparent text-lg placeholder-gray-500 border-none outline-none"
            />
          </div>

          {/* Content Input */}
          <div className="bg-card/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <label className="block text-sm text-gray-400 mb-3">Содержание</label>
            <Textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Поделитесь своими мыслями..."
              className="min-h-[250px] bg-transparent border-none outline-none resize-none placeholder-gray-500 text-base leading-relaxed"
            />
          </div>

          {/* Writing Prompts */}
          <div className="bg-card/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg mb-4">Вопросы для размышления</h3>
            <div className="space-y-2">
              {prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setNewContent(newContent + (newContent ? '\n\n' : '') + prompt + '\n')}
                  className="w-full text-left p-4 bg-card/40 hover:bg-card/60 rounded-xl text-gray-300 hover:text-white transition-colors text-sm leading-relaxed"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
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
          <div className="flex-1">
            <h1 className="text-lg">Журнал</h1>
            <p className="text-sm text-gray-400">{filteredEntries.length} записей</p>
          </div>
          <button
            onClick={() => setIsWriting(true)}
            className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>

      <div className="px-6 py-8 space-y-6">
        {/* Search */}
        <div className="bg-card/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Поиск по записям..."
              className="w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Journal Entries */}
        {filteredEntries.length === 0 && (
          <div className="bg-card/40 backdrop-blur-xl rounded-3xl p-12 border border-white/10 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-gray-500" />
            <h3 className="text-xl mb-3">Журнал пуст</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Начните записывать свои размышления и инсайты
            </p>
            <Button
              onClick={() => setIsWriting(true)}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-2xl"
            >
              Создать первую запись
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className="w-full bg-card/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-left hover:bg-card/80 transition-all duration-200 active:scale-[0.98]"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg truncate mr-4">{entry.title}</h3>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-gray-400 text-sm">{entry.date}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                {entry.content.substring(0, 150)}
                {entry.content.length > 150 && "..."}
              </p>
              {entry.day > 0 && (
                <div className="mt-3 inline-block bg-primary/20 text-primary px-3 py-1 rounded-xl text-xs">
                  День {entry.day}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Quote */}
        {filteredEntries.length > 0 && (
          <div className="bg-card/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center mt-8">
            <p className="text-gray-300 italic text-sm mb-2 leading-relaxed">
              "Дневник — это разговор с самим собой"
            </p>
            <p className="text-gray-500 text-xs">— Мария Хакк</p>
          </div>
        )}
      </div>
    </div>
  );
}