import React, { useState } from 'react';
import MLStatus from './MLStatus';

const LearningPage = ({
  question,
  stats = { totalReviews: 0, correctAnswers: 0, currentStreak: 0 },
  mlInfo,
  feedback = null,
  onSubmitAnswer,
  onNextQuestion,
}) => {
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(!!feedback);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() && onSubmitAnswer) {
      onSubmitAnswer(answer.trim());
      setAnswer('');
      setShowFeedback(true);
    }
  };

  const accuracy = stats.totalReviews > 0
    ? ((stats.correctAnswers / stats.totalReviews) * 100).toFixed(1)
    : '0.0';

  return (
    <div style={styles.page}>
      {/* Stats Bar */}
      <div style={styles.statsBar}>
        <div style={styles.stat}>
          <span style={styles.statValue}>{stats.totalReviews}</span>
          <span style={styles.statLabel}>Reviews</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statValue}>{accuracy}%</span>
          <span style={styles.statLabel}>Accuracy</span>
        </div>
        <div style={styles.stat}>
          <span style={{ ...styles.statValue, color: '#00ff41' }}>{'\u{1F525}'} {stats.currentStreak}</span>
          <span style={styles.statLabel}>Streak</span>
        </div>
      </div>

      {/* ML Status */}
      {mlInfo && <MLStatus mlInfo={mlInfo} />}

      {/* Question Card */}
      {question && !showFeedback && (
        <div style={styles.questionCard}>
          <div style={styles.questionLabel}>QUESTION</div>
          <div style={styles.questionText}>{question.prompt}</div>
          <div style={styles.questionMeta}>
            Difficulty: {(question.difficulty * 100).toFixed(0)}% |
            Memory: {(question.memoryStrength * 100).toFixed(0)}% |
            Reviews: {question.totalReviews}
          </div>
          <form onSubmit={handleSubmit} style={styles.answerForm}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
              style={styles.answerInput}
              autoFocus
              data-testid="answer-input"
            />
            <button type="submit" style={styles.submitBtn} disabled={!answer.trim()} data-testid="submit-answer">
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Feedback Card */}
      {showFeedback && feedback && (
        <div style={{
          ...styles.feedbackCard,
          borderColor: feedback.correct ? '#00ff41' : '#ff4444',
        }}>
          <div style={{
            ...styles.feedbackHeader,
            color: feedback.correct ? '#00ff41' : '#ff4444',
          }}>
            {feedback.correct ? '\u2713 Correct!' : '\u2717 Incorrect'}
          </div>
          <div style={styles.feedbackAnswer}>
            Answer: <strong>{feedback.correctAnswer}</strong>
          </div>
          <div style={styles.intervalComparison}>
            <div style={styles.intervalItem}>
              <span style={styles.intervalLabel}>SM-2 Interval</span>
              <span style={styles.intervalValue}>{feedback.sm2Interval} days</span>
            </div>
            <div style={styles.intervalItem}>
              <span style={{ ...styles.intervalLabel, color: '#00ff41' }}>ML Interval</span>
              <span style={{ ...styles.intervalValue, color: '#00ff41' }}>{feedback.mlInterval} days</span>
            </div>
            <div style={styles.intervalItem}>
              <span style={styles.intervalLabel}>ML Confidence</span>
              <span style={styles.intervalValue}>{(feedback.mlConfidence * 100).toFixed(0)}%</span>
            </div>
          </div>
          <button
            onClick={() => { setShowFeedback(false); onNextQuestion && onNextQuestion(); }}
            style={styles.nextBtn}
            data-testid="next-question"
          >
            Next Question {'\u2192'}
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#0a0e27',
    padding: '24px',
    fontFamily: "'Courier New', monospace",
    color: '#00ff41',
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    padding: '16px',
    backgroundColor: '#0d1235',
    borderRadius: '8px',
    border: '1px solid #00ff4120',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statValue: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: '0.7em',
    color: '#00ff4160',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  questionCard: {
    backgroundColor: '#0d1235',
    border: '1px solid #00ff4130',
    borderRadius: '8px',
    padding: '24px',
  },
  questionLabel: {
    fontSize: '0.7em',
    color: '#00ff4160',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    marginBottom: '8px',
  },
  questionText: {
    fontSize: '1.4em',
    color: '#ffffff',
    marginBottom: '12px',
    lineHeight: 1.4,
  },
  questionMeta: {
    fontSize: '0.8em',
    color: '#00ff4160',
    marginBottom: '20px',
  },
  answerForm: {
    display: 'flex',
    gap: '12px',
  },
  answerInput: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: '#0a0e27',
    border: '1px solid #00ff4140',
    borderRadius: '6px',
    color: '#00ff41',
    fontFamily: "'Courier New', monospace",
    fontSize: '1.1em',
    outline: 'none',
  },
  submitBtn: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    border: '1px solid #00ff41',
    borderRadius: '6px',
    color: '#00ff41',
    fontFamily: "'Courier New', monospace",
    fontSize: '1em',
    cursor: 'pointer',
  },
  feedbackCard: {
    backgroundColor: '#0d1235',
    border: '2px solid',
    borderRadius: '8px',
    padding: '24px',
  },
  feedbackHeader: {
    fontSize: '1.6em',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  feedbackAnswer: {
    fontSize: '1.1em',
    color: '#ffffff',
    marginBottom: '20px',
  },
  intervalComparison: {
    display: 'flex',
    gap: '24px',
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: '#0a0e27',
    borderRadius: '6px',
  },
  intervalItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  intervalLabel: {
    fontSize: '0.7em',
    color: '#00ff4160',
    textTransform: 'uppercase',
  },
  intervalValue: {
    fontSize: '1.3em',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  nextBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#00ff4115',
    border: '1px solid #00ff41',
    borderRadius: '6px',
    color: '#00ff41',
    fontFamily: "'Courier New', monospace",
    fontSize: '1.1em',
    cursor: 'pointer',
    letterSpacing: '1px',
  },
};

export default LearningPage;
