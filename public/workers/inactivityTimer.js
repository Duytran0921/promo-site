// Web Worker for handling inactivity timer
// This runs on a separate thread and is not affected by browser tab throttling

let timerId = null;
let startTime = null;
let duration = 8000; // 8 seconds
let isPaused = false;
let remainingTime = duration;

// Listen for messages from main thread
self.onmessage = function(e) {
  const { type, payload } = e.data;
  
  switch (type) {
    case 'START_TIMER':
      startTimer(payload?.duration || duration);
      break;
      
    case 'RESET_TIMER':
      resetTimer(payload?.duration || duration);
      break;
      
    case 'PAUSE_TIMER':
      pauseTimer();
      break;
      
    case 'RESUME_TIMER':
      resumeTimer();
      break;
      
    case 'STOP_TIMER':
      stopTimer();
      break;
      
    case 'GET_STATUS':
      sendStatus();
      break;
      
    default:
      console.warn('Unknown message type:', type);
  }
};

function startTimer(newDuration = duration) {
  stopTimer(); // Clear any existing timer
  
  duration = newDuration;
  remainingTime = duration;
  startTime = Date.now();
  isPaused = false;
  
  timerId = setTimeout(() => {
    // Timer completed - notify main thread
    self.postMessage({
      type: 'TIMER_COMPLETED',
      payload: {
        timestamp: Date.now()
      }
    });
    
    // Reset state
    timerId = null;
    startTime = null;
    remainingTime = duration;
  }, duration);
  
  // Notify main thread that timer started
  self.postMessage({
    type: 'TIMER_STARTED',
    payload: {
      duration: duration,
      timestamp: Date.now()
    }
  });
}

function resetTimer(newDuration = duration) {
  startTimer(newDuration);
}

function pauseTimer() {
  if (timerId && !isPaused) {
    clearTimeout(timerId);
    timerId = null;
    
    // Calculate remaining time
    const elapsed = Date.now() - startTime;
    remainingTime = Math.max(0, duration - elapsed);
    isPaused = true;
    
    self.postMessage({
      type: 'TIMER_PAUSED',
      payload: {
        remainingTime: remainingTime,
        timestamp: Date.now()
      }
    });
  }
}

function resumeTimer() {
  if (isPaused && remainingTime > 0) {
    startTime = Date.now();
    isPaused = false;
    
    timerId = setTimeout(() => {
      self.postMessage({
        type: 'TIMER_COMPLETED',
        payload: {
          timestamp: Date.now()
        }
      });
      
      timerId = null;
      startTime = null;
      remainingTime = duration;
    }, remainingTime);
    
    self.postMessage({
      type: 'TIMER_RESUMED',
      payload: {
        remainingTime: remainingTime,
        timestamp: Date.now()
      }
    });
  } else if (!timerId && !isPaused) {
    // Nếu không có timer nào đang chạy và không bị pause, start timer mới với full duration
    startTimer(duration);
  }
}

function stopTimer() {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
  
  startTime = null;
  remainingTime = duration;
  isPaused = false;
  
  self.postMessage({
    type: 'TIMER_STOPPED',
    payload: {
      timestamp: Date.now()
    }
  });
}

function sendStatus() {
  let currentRemainingTime = remainingTime;
  
  if (timerId && startTime && !isPaused) {
    const elapsed = Date.now() - startTime;
    currentRemainingTime = Math.max(0, duration - elapsed);
  }
  
  self.postMessage({
    type: 'TIMER_STATUS',
    payload: {
      isRunning: !!timerId,
      isPaused: isPaused,
      remainingTime: currentRemainingTime,
      duration: duration,
      timestamp: Date.now()
    }
  });
}

// Send periodic status updates while timer is running
setInterval(() => {
  if (timerId && !isPaused) {
    sendStatus();
  }
}, 1000); // Send status every second