import React, { useState } from 'react';
import { Sparkles, BookOpen, Copy, Download, Lamp } from 'lucide-react';
import StoryInput from './components/StoryInput';
import StoryDisplay from './components/StoryDisplay';
import LoadingAnimation from './components/LoadingAnimation';
import { generateStory } from './services/aiService';

interface Story {
  id: string;
  prompt: string;
  content: string;
  createdAt: Date;
}

function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStory = async (prompt: string) => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setCurrentStory(null);

    try {
      const storyContent = await generateStory(prompt);
      
      const newStory: Story = {
        id: Date.now().toString(),
        prompt,
        content: storyContent,
        createdAt: new Date()
      };

      setCurrentStory(newStory);
      setStories(prev => [newStory, ...prev.slice(0, 9)]); // Keep only last 10 stories
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate story. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyStory = () => {
    if (currentStory) {
      navigator.clipboard.writeText(currentStory.content);
    }
  };

  const handleDownloadStory = () => {
    if (!currentStory) return;
    
    const element = document.createElement('a');
    const file = new Blob([currentStory.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `story-${currentStory.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen relative font-body">
      {/* Genie Lamp Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
        }}
      ></div>
      
      {/* Pine Forest Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pine-50 via-pine-100 to-pine-200"></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-gold-200/30 to-gold-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pine-200/30 to-pine-300/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-gold-300/30 to-gold-400/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-pine-300/30 to-pine-400/30 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header - Compact Size */}
        <header className="text-center py-8 px-4">
          {/* Lamp Logo Above Title - Smaller */}
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white border-3 border-gold-400 rounded-full shadow-lg">
              <Lamp className="w-8 h-8 text-gold-500 stroke-2" />
            </div>
          </div>
          
          {/* Title and Tagline - Smaller */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pine-600 via-pine-700 to-pine-800 bg-clip-text text-transparent font-heading mb-2">
              Story Genie AI
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span className="text-pine-600 font-bold font-body text-sm">Your Wish is My Command</span>
              <Sparkles className="w-4 h-4 text-gold-500" />
            </div>
          </div>
        </header>

        {/* Main Content - Single Column Centered */}
        <main className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-10">
            {/* Input Section */}
            <div className="w-full">
              <StoryInput 
                onGenerate={handleGenerateStory}
                isGenerating={isGenerating}
              />
              
              {error && (
                <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-full p-5 shadow-sm">
                  <p className="text-red-700 text-base font-bold font-body text-center">{error}</p>
                </div>
              )}
            </div>

            {/* Output Section */}
            <div className="w-full">
              {isGenerating ? (
                <LoadingAnimation />
              ) : currentStory ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-pine-700 flex items-center gap-3 font-heading">
                      <Sparkles className="w-7 h-7 text-gold-500" />
                      Your Magical Story
                    </h2>
                    <div className="flex gap-4">
                      <button
                        onClick={handleCopyStory}
                        className="p-4 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gold-300"
                        title="Copy story"
                      >
                        <Copy className="w-6 h-6 text-white" />
                      </button>
                      <button
                        onClick={handleDownloadStory}
                        className="p-4 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gold-300"
                        title="Download story"
                      >
                        <Download className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                  <StoryDisplay story={currentStory} />
                </div>
              ) : (
                <div className="h-96 bg-white/70 backdrop-blur-sm border-2 border-gold-300 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div className="relative mb-8">
                      <div className="p-8 bg-white border-4 border-gold-400 rounded-full shadow-xl">
                        <Lamp className="w-20 h-20 text-gold-500 stroke-2" />
                      </div>
                    </div>
                    <p className="text-pine-700 text-2xl font-bold mb-3 font-heading">The Genie Awaits Your Wish</p>
                    <p className="text-pine-600 text-lg font-body">Share your idea and let the magic begin</p>
                  </div>
                </div>
              )}
            </div>

            {/* Story History */}
            {stories.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm border-2 border-gold-300 rounded-full p-8 shadow-lg">
                <h3 className="text-xl font-bold text-pine-700 mb-6 flex items-center justify-center gap-3 font-heading">
                  <BookOpen className="w-6 h-6 text-gold-500" />
                  Story Collection
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                  {stories.map((story) => (
                    <button
                      key={story.id}
                      onClick={() => setCurrentStory(story)}
                      className="text-left p-5 rounded-full bg-gradient-to-r from-pine-50 to-gold-50 hover:from-pine-100 hover:to-gold-100 transition-all duration-300 border border-gold-300 hover:border-gold-400 hover:shadow-md"
                    >
                      <p className="text-base text-pine-800 font-bold truncate font-body text-center">{story.prompt}</p>
                      <p className="text-sm text-pine-600 mt-2 font-body text-center">
                        {story.createdAt.toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-10 px-4 border-t-2 border-gold-300 bg-white/40 backdrop-blur-sm">
          <p className="text-pine-600 text-base font-bold font-body">
            ✨ Powered by Ancient Magic & Modern AI ✨ • Crafted for Dreamers & Storytellers
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;