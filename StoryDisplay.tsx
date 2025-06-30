import React from 'react';
import { Calendar, Type, Sparkles } from 'lucide-react';

interface Story {
  id: string;
  prompt: string;
  content: string;
  createdAt: Date;
}

interface StoryDisplayProps {
  story: Story;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story }) => {
  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-5 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  const wordCount = story.content.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute

  return (
    <div className="bg-white/90 backdrop-blur-sm border-2 border-gold-300 rounded-full overflow-hidden shadow-xl">
      {/* Story Header */}
      <div className="bg-gradient-to-r from-pine-100 via-gold-100 to-pine-100 border-b-2 border-gold-300 p-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-gold-500" />
              <h3 className="text-base font-bold text-pine-700 font-heading">Your Original Wish</h3>
            </div>
            <p className="text-pine-800 font-bold text-xl bg-white/60 p-4 rounded-full border border-gold-400 font-body text-center">{story.prompt}</p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-pine-700 font-bold">
            <div className="flex items-center gap-3 bg-white/70 px-4 py-3 rounded-full border border-gold-400">
              <Calendar className="w-4 h-4" />
              <span className="font-body">{story.createdAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/70 px-4 py-3 rounded-full border border-gold-400">
              <Type className="w-4 h-4" />
              <span className="font-body">{wordCount} words • {readingTime} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="p-10">
        <div className="prose prose-pine prose-xl max-w-none">
          <div className="text-pine-800 leading-relaxed text-lg font-bold font-body text-center">
            {formatContent(story.content)}
          </div>
        </div>
      </div>

      {/* Story Footer */}
      <div className="bg-gradient-to-r from-pine-50 to-gold-50 border-t-2 border-gold-300 p-6">
        <div className="flex items-center justify-between text-sm text-pine-700 font-bold">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4" />
            <p className="font-body">Crafted by Story Genie AI • Tale ID: {story.id}</p>
          </div>
          <p className="font-body">Granted on {story.createdAt.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default StoryDisplay;