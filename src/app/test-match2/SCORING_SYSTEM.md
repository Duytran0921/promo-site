# Scoring System Documentation

## Overview
Hệ thống tính điểm cho game Match 2 được thiết kế để đánh giá hiệu suất người chơi dựa trên thời gian hoàn thành từng cặp thẻ và tổng thể game.

## Scoring Formula

### Match Score (Điểm cho mỗi cặp thẻ)
```javascript
matchScore = baseScore + timeBonus + efficiencyScore
```

**Components:**
- `baseScore`: 100 điểm cố định
- `timeBonus`: max(0, 50 - matchTime * 10)
  - Thưởng cho việc ghép nhanh
  - Giảm 10 điểm mỗi giây
  - Tối đa 50 điểm (nếu ghép trong 0s)
- `efficiencyScore`: (totalPairs - currentMatches) * 5
  - Thưởng cho việc ghép sớm
  - Cặp đầu tiên được điểm cao nhất
  - Giảm dần theo thứ tự

**Example:**
- Cặp thứ 1, ghép trong 2s, tổng 6 cặp: 100 + 30 + 25 = **155 điểm**
- Cặp thứ 3, ghép trong 4s, tổng 6 cặp: 100 + 10 + 15 = **125 điểm**

### Final Score (Điểm cuối game)
```javascript
finalScore = totalMatchScore + completionBonus + timeBonus + efficiencyBonus
```

**Components:**
- `totalMatchScore`: Tổng điểm của tất cả các cặp
- `completionBonus`: 200 điểm (nếu hoàn thành game)
- `timeBonus`: max(0, 300 - totalTime * 2)
  - Thưởng cho việc hoàn thành nhanh
  - Giảm 2 điểm mỗi giây
  - Tối đa 300 điểm
- `efficiencyBonus`: max(0, (totalPairs * 2 - totalClicks) * 10)
  - Thưởng cho việc click ít
  - Lý tưởng: totalClicks = totalPairs * 2
  - Mỗi click thừa trừ 10 điểm

## Implementation

### Files Modified
1. **`useGameSession.js`**
   - Added `calculateMatchScore()` function
   - Added `calculateFinalScore()` function
   - Modified `trackMatch()` to calculate and store match scores
   - Modified `endSession()` to calculate final score
   - Added `scoring` object to session structure

2. **`useMatch2GameWithConfig.js`**
   - Exposed `calculateMatchScore` and `calculateFinalScore` functions
   - No changes to game logic, only exposed scoring functions

### Session Data Structure
```javascript
{
  sessionId: "session_123",
  startedAt: 1234567890,
  completedAt: 1234567950,
  gameConfig: { rows: 3, cols: 4, totalPairs: 6 },
  matchedPairs: 6,
  totalClicks: 15,
  matchTimes: [2.1, 3.5, 1.8, 4.2, 2.9, 3.1],
  firstMatchTime: 2.1,
  scoring: {
    matchScores: [155, 125, 160, 110, 130, 120],
    totalScore: 800,
    finalScore: 1050,
    averageMatchScore: 133.33
  }
}
```

### When Scores Are Updated
1. **During Match** (`trackMatch()`):
   - Calculate match score immediately
   - Update `scoring.matchScores` array
   - Update `scoring.totalScore`
   - Update `scoring.averageMatchScore`
   - Save to localStorage

2. **Game Completion** (`endSession(true)`):
   - Calculate final score with bonuses
   - Update `scoring.finalScore`
   - Save final session to localStorage

3. **Game Stop/Pause** (`endSession(false)`):
   - Save current progress
   - No final score calculation

## Usage Examples

### Basic Usage
```javascript
const {
  calculateMatchScore,
  calculateFinalScore,
  currentSession
} = useGameSession();

// Calculate score for a match
const score = calculateMatchScore(2.5, 6); // 2.5s, 6 total pairs

// Get current scoring data
const scoring = currentSession?.scoring;
console.log('Total Score:', scoring?.totalScore);
console.log('Match Scores:', scoring?.matchScores);
```

### With Game Hook
```javascript
const {
  calculateMatchScore,
  calculateFinalScore,
  currentSession
} = useMatch2GameWithConfig(gameConfig);

// Scoring functions are automatically integrated
// Scores are calculated and saved automatically during gameplay
```

## Testing

### Test Pages
1. **`/test-match2/test-scoring`**: Full game with scoring display
2. **`/test-match2/test-scoring-simple`**: Function testing and session simulation

### Manual Testing
1. Start a game session
2. Make matches and observe real-time scoring
3. Complete the game to see final score
4. Check localStorage for saved session data

### Automated Testing
Use the simple test page to run scoring function tests:
```javascript
// Test match scoring
const score1 = calculateMatchScore(2.0, 6); // Fast match
const score2 = calculateMatchScore(5.0, 6); // Slow match

// Test final scoring
const finalScore = calculateFinalScore(mockSession);
```

## Performance Considerations

1. **Real-time Updates**: Scores are calculated and saved immediately after each match
2. **Storage**: Sessions are stored in localStorage (max 10 sessions)
3. **Memory**: Scoring data is lightweight and doesn't impact game performance
4. **Calculations**: All scoring calculations are synchronous and fast

## Future Enhancements

1. **Difficulty Multipliers**: Different base scores for different difficulty levels
2. **Achievement System**: Special bonuses for specific accomplishments
3. **Leaderboards**: Compare scores across sessions
4. **Progressive Scoring**: Increasing bonuses for consecutive good matches
5. **Penalty System**: Deduct points for excessive wrong matches

## Configuration

Scoring parameters can be easily adjusted by modifying the constants in the scoring functions:

```javascript
// In calculateMatchScore()
const BASE_SCORE = 100;
const TIME_BONUS_MAX = 50;
const TIME_PENALTY_PER_SECOND = 10;
const EFFICIENCY_BONUS_PER_REMAINING = 5;

// In calculateFinalScore()
const COMPLETION_BONUS = 200;
const FINAL_TIME_BONUS_MAX = 300;
const FINAL_TIME_PENALTY_PER_SECOND = 2;
const EFFICIENCY_BONUS_PER_OPTIMAL_CLICK = 10;
```