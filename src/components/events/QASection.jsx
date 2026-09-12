import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, ThumbsUp, Send, CheckCircle, User, ShieldCheck } from 'lucide-react';

export const QASection = ({ eventId }) => {
  const { 
    discussions, 
    addDiscussionQuestion, 
    addDiscussionReply, 
    upvoteQuestion, 
    currentUser 
  } = useApp();

  const [newQuestion, setNewQuestion] = useState('');
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const eventQuestions = discussions.filter(d => d.eventId === eventId);

  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    addDiscussionQuestion(eventId, newQuestion);
    setNewQuestion('');
  };

  const handlePostReply = (questionId) => {
    if (!replyText.trim()) return;
    addDiscussionReply(eventId, questionId, replyText);
    setReplyText('');
    setReplyingToId(null);
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: '1.75rem',
      marginTop: '2rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <MessageSquare size={20} color="var(--color-primary)" />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Community Q&A & Inquiries ({eventQuestions.length})
          </h3>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Verified club organizers actively respond here
        </span>
      </div>

      {/* Ask Question Form */}
      <form onSubmit={handlePostQuestion} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          {/* Initials badge instead of photo */}
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {currentUser.name ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'SR'}
          </div>
          <div style={{ flex: 1 }}>
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Ask an inquiry regarding eligibility, prerequisite software, team formation, or venue logistics..."
              className="form-textarea"
              style={{ minHeight: '70px', marginBottom: '0.5rem' }}
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="submit" 
                className="btn btn-primary btn-sm"
                style={{ gap: '0.4rem' }}
              >
                <Send size={14} />
                <span>Post Question</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {eventQuestions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600 }}>No questions asked yet.</p>
            <p style={{ fontSize: '0.8125rem' }}>Be the first student to inquire about this opportunity!</p>
          </div>
        ) : (
          eventQuestions.map(item => (
            <div 
              key={item.id}
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {/* Question Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  {/* Initials badge instead of photo */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.authorName ? item.authorName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'ST'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      {item.authorName}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                      {item.authorDept} • {item.timestamp}
                    </div>
                  </div>
                </div>

                {/* Upvote Button */}
                <button
                  onClick={() => upvoteQuestion(eventId, item.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.35rem', padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                >
                  <ThumbsUp size={12} color="var(--color-primary)" />
                  <span>{item.upvotes}</span>
                </button>
              </div>

              {/* Question Content */}
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '0.875rem' }}>
                {item.question}
              </p>

              {/* Action */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <button
                  onClick={() => setReplyingToId(replyingToId === item.id ? null : item.id)}
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', color: 'var(--color-primary)' }}
                >
                  Reply as {currentUser.role === 'ORGANIZER' ? 'Club Organizer' : currentUser.name}
                </button>
              </div>

              {/* Reply Form if active */}
              {replyingToId === item.id && (
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-card)',
                  marginBottom: '1rem',
                  border: '1px solid var(--border-active)'
                }}>
                  <input
                    type="text"
                    placeholder="Write a helpful response..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.8125rem', padding: '0.4rem 0.75rem' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handlePostReply(item.id);
                    }}
                  />
                  <button
                    onClick={() => handlePostReply(item.id)}
                    className="btn btn-primary btn-sm"
                    style={{ padding: '0.4rem 0.75rem' }}
                  >
                    Reply
                  </button>
                </div>
              )}

              {/* Replies Thread */}
              {item.replies && item.replies.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.625rem',
                  paddingLeft: '1.25rem',
                  borderLeft: '2px solid var(--border-medium)',
                  marginTop: '0.5rem'
                }}>
                  {item.replies.map(rep => (
                    <div 
                      key={rep.id}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: rep.isOrganizer ? 'var(--color-primary-light)' : 'var(--bg-card)',
                        border: rep.isOrganizer ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid var(--border-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                          {rep.authorName}
                        </span>
                        {rep.isOrganizer && (
                          <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                            <ShieldCheck size={11} /> Verified Organizer
                          </span>
                        )}
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                          • {rep.timestamp}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        {rep.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
