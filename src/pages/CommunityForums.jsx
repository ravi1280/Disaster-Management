import React from 'react';
import { demoForumPosts } from '../data/demoData';
import { MessageSquare, Users } from 'lucide-react';

const CommunityForums = () => {
    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>Community Forums</h1>
            <p style={styles.subtitle}>Local coordination and mutual aid</p>

            <button className="btn btn-primary mb-3">Create New Post</button>

            <div style={styles.posts}>
                {demoForumPosts.map(post => (
                    <div key={post.id} style={styles.postCard}>
                        <div style={styles.postHeader}>
                            <div>
                                <h3 style={styles.postTitle}>{post.title}</h3>
                                <div style={styles.postMeta}>
                                    <span>👤 {post.author}</span>
                                    <span>•</span>
                                    <span>📍 {post.district}</span>
                                    <span>•</span>
                                    <span>⏰ {new Date(post.postedAt).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        <p style={styles.postContent}>{post.content}</p>
                        <div style={styles.postFooter}>
                            <button style={styles.replyButton}>
                                <MessageSquare size={16} />
                                {post.replies} Replies
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    page: { padding: '2rem 0', minHeight: 'calc(100vh - 200px)' },
    title: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' },
    subtitle: { color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '2rem' },
    posts: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    postCard: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' },
    postHeader: { marginBottom: '1rem' },
    postTitle: { fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' },
    postMeta: { display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' },
    postContent: { color: 'var(--color-text-secondary)', marginBottom: '1rem' },
    postFooter: {},
    replyButton: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--color-bg-tertiary)', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }
};

export default CommunityForums;
