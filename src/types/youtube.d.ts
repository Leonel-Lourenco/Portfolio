// YouTube IFrame API types
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        config: YT.PlayerConfig
      ) => YT.Player;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

declare namespace YT {
  interface PlayerConfig {
    videoId: string;
    playerVars?: PlayerVars;
    events?: PlayerEvents;
  }

  interface PlayerVars {
    autoplay?: number;
    controls?: number;
    disablekb?: number;
    fs?: number;
    modestbranding?: number;
    rel?: number;
    showinfo?: number;
    iv_load_policy?: number;
    cc_load_policy?: number;
    playsinline?: number;
  }

  interface PlayerEvents {
    onReady?: (event: { target: Player }) => void;
    onStateChange?: (event: { data: number }) => void;
    onTimeUpdate?: () => void;
  }

  class Player {
    constructor(elementId: string | HTMLElement, config: PlayerConfig);
    playVideo(): void;
    pauseVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    getCurrentTime(): number;
    getDuration(): number;
    destroy(): void;
  }
}

export {};
