import { useState, useRef, useEffect } from 'react';

interface Chapter {
  title: string;
  startTime: number;
  endTime: number;
  icon: string;
}

const chapters: Chapter[] = [
  { title: 'Intro', startTime: 0, endTime: 82, icon: '�' },
  { title: 'Voice Assistant', startTime: 83, endTime: 115, icon: '🎤' },
  { title: 'Calendar Connectivity', startTime: 116, endTime: 183, icon: '📅' },
  { title: 'Productivity', startTime: 184, endTime: 274, icon: '⚡' },
  { title: 'Technical Explanation', startTime: 275, endTime: 310, icon: '⚙️' },
  { title: 'Conclusion', startTime: 311, endTime: 334, icon: '✅' },
];

const YOUTUBE_VIDEO_ID = 'TVPrfiYeSGo';

export default function PhantomVideo() {
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(334); // 5:34 from YouTube video
  const [activeChapter, setActiveChapter] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize YouTube player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      if (containerRef.current) {
        const player = new (window as any).YT.Player(containerRef.current, {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 1,
            disablekb: 0,
            fs: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            cc_load_policy: 0,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              playerRef.current = event.target;
              setDuration(event.target.getDuration());
              setPlayerReady(true);
            },
            onStateChange: (event: any) => {
              setIsPlaying(event.data === 1); // YT.PlayerState.PLAYING
            },
          },
        });
      }
    };
  }, []);

  useEffect(() => {
    // Update current time every second when playing
    let interval: NodeJS.Timeout;
    
    if (isPlaying && playerReady && playerRef.current) {
      interval = setInterval(() => {
        setCurrentTime(playerRef.current?.getCurrentTime() || 0);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, playerReady]);

  useEffect(() => {
    // Determine active chapter based on current time
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (currentTime >= chapters[i].startTime) {
        setActiveChapter(i);
        break;
      }
    }
  }, [currentTime]);

  const togglePlay = () => {
    if (showPlaceholder) {
      setShowPlaceholder(false);
      // Give YouTube player time to initialize before playing
      setTimeout(() => {
        if (playerRef.current && playerReady) {
          playerRef.current.playVideo();
        }
      }, 500);
    } else {
      if (playerRef.current && playerReady) {
        if (isPlaying) {
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.playVideo();
        }
      }
    }
  };

  const jumpToChapter = (index: number) => {
    if (playerRef.current && playerReady) {
      if (showPlaceholder) {
        setShowPlaceholder(false);
        setTimeout(() => {
          if (playerRef.current) {
            playerRef.current.seekTo(chapters[index].startTime, true);
            setCurrentTime(chapters[index].startTime);
            setActiveChapter(index);
            playerRef.current.playVideo();
          }
        }, 500);
      } else {
        playerRef.current.seekTo(chapters[index].startTime, true);
        setCurrentTime(chapters[index].startTime);
        setActiveChapter(index);
        if (!isPlaying) {
          playerRef.current.playVideo();
        }
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    if (playerRef.current && playerReady) {
      playerRef.current.seekTo(newTime, true);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col bg-black">
      {/* Video Container */}
      <div className="relative aspect-video bg-gray-900">
        {/* Placeholder/Thumbnail */}
        {showPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 z-20">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <span className="text-4xl">👻</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Phantom Voice Assistant</h3>
              <p className="text-gray-400 text-sm mb-6">Fully local AI-powered calendar management</p>
              <button
                onClick={togglePlay}
                className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Watch Demo
              </button>
            </div>
          </div>
        )}

        {/* YouTube Player Container */}
        <div
          ref={containerRef}
          className="w-full h-full"
          style={{ 
            position: 'relative',
            zIndex: 1,
            pointerEvents: showPlaceholder ? 'none' : 'auto'
          }}
        />

        {/* Play/Pause Overlay (when not placeholder) */}
        {!showPlaceholder && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center group z-30"
            style={{ pointerEvents: 'auto' }}
          >
            <div className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center transition-opacity ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </div>
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div 
        className="h-1 bg-gray-800 cursor-pointer relative"
        onClick={handleSeek}
      >
        {/* Chapter markers */}
        {chapters.map((chapter, i) => (
          <div
            key={i}
            className="absolute top-0 w-0.5 h-full bg-gray-600"
            style={{ left: `${(chapter.startTime / duration) * 100}%` }}
          />
        ))}
        
        {/* Progress */}
        <div 
          className="h-full bg-accent transition-all"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-3 bg-gray-900">
        <div className="flex items-center gap-4">
          <button onClick={togglePlay} className="text-white hover:text-accent transition-colors">
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
          <span className="text-white text-sm font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        
        <div className="text-gray-400 text-sm">
          {chapters[activeChapter]?.icon} {chapters[activeChapter]?.title}
        </div>
      </div>

      {/* Chapter Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-gray-800">
        {chapters.map((chapter, index) => (
          <button
            key={index}
            onClick={() => jumpToChapter(index)}
            className={`p-4 text-left transition-colors ${
              activeChapter === index 
                ? 'bg-accent/20 text-white' 
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span>{chapter.icon}</span>
              <span className="text-xs font-mono text-gray-500">{formatTime(chapter.startTime)}</span>
            </div>
            <div className="text-sm font-medium truncate">{chapter.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
