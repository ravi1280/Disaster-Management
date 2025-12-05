import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { demoForumPosts } from '../data/demoData';
import { MessageSquare, Send, X } from 'lucide-react';

const CommunityForums = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [expandedPost, setExpandedPost] = useState(null);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        district: ''
    });
    const [replyText, setReplyText] = useState('');

    // Load posts from localStorage on mount
    useEffect(() => {
        const storedPosts = localStorage.getItem('communityForumPosts');
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        } else {
            // Initialize with demo posts
            const initialPosts = demoForumPosts.map(post => ({
                ...post,
                replies: post.replies || 0,
                replyList: []
            }));
            setPosts(initialPosts);
            localStorage.setItem('communityForumPosts', JSON.stringify(initialPosts));
        }
    }, []);

    const handleCreatePost = (e) => {
        e.preventDefault();

        const post = {
            id: Date.now(),
            title: newPost.title,
            content: newPost.content,
            district: newPost.district,
            author: user.fullName,
            postedAt: new Date(),
            replies: 0,
            replyList: [],
            userId: user.id
        };

        const updatedPosts = [post, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem('communityForumPosts', JSON.stringify(updatedPosts));

        // Reset form
        setNewPost({ title: '', content: '', district: '' });
        setShowNewPostModal(false);
    };

    const handleAddReply = (postId) => {
        if (!replyText.trim()) return;

        const reply = {
            id: Date.now(),
            author: user.fullName,
            content: replyText,
            postedAt: new Date(),
            userId: user.id
        };

        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    replies: post.replies + 1,
                    replyList: [...(post.replyList || []), reply]
                };
            }
            return post;
        });

        setPosts(updatedPosts);
        localStorage.setItem('communityForumPosts', JSON.stringify(updatedPosts));
        setReplyText('');
    };

    const toggleReplies = (postId) => {
        setExpandedPost(expandedPost === postId ? null : postId);
        setReplyText('');
    };

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>Community Forums</h1>
            <p style={styles.subtitle}>Local coordination and mutual aid</p>

            <button
                className="btn btn-primary mb-3"
                onClick={() => setShowNewPostModal(true)}
            >
                + Create New Post
            </button>

            <div style={styles.posts}>
                {posts.map(post => (
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
                            <button
                                style={styles.replyButton}
                                onClick={() => toggleReplies(post.id)}
                            >
                                <MessageSquare size={16} />
                                {post.replies} Replies
                            </button>
                        </div>

                        {/* Replies Section */}
                        {expandedPost === post.id && (
                            <div style={styles.repliesSection}>
                                <div style={styles.repliesList}>
                                    {post.replyList && post.replyList.length > 0 ? (
                                        post.replyList.map(reply => (
                                            <div key={reply.id} style={styles.replyCard}>
                                                <div style={styles.replyHeader}>
                                                    <strong>{reply.author}</strong>
                                                    <span style={styles.replyTime}>
                                                        {new Date(reply.postedAt).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p style={styles.replyContent}>{reply.content}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p style={styles.noReplies}>No replies yet. Be the first to reply!</p>
                                    )}
                                </div>

                                {/* Reply Input */}
                                <div style={styles.replyInputSection}>
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write your reply..."
                                        style={styles.replyInput}
                                        rows="3"
                                    />
                                    <button
                                        onClick={() => handleAddReply(post.id)}
                                        style={styles.sendButton}
                                        disabled={!replyText.trim()}
                                    >
                                        <Send size={16} />
                                        Send Reply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Create Post Modal */}
            {showNewPostModal && (
                <div style={styles.modalOverlay} onClick={() => setShowNewPostModal(false)}>
                    <div style={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={{ margin: 0 }}>Create New Post</h2>
                            <button
                                style={styles.closeBtn}
                                onClick={() => setShowNewPostModal(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleCreatePost} style={styles.form}>
                            <div className="form-group">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    placeholder="Enter post title..."
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">District</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={newPost.district}
                                    onChange={(e) => setNewPost({ ...newPost, district: e.target.value })}
                                    placeholder="Enter your district..."
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Content</label>
                                <textarea
                                    className="form-textarea"
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    placeholder="Share information, ask questions, or coordinate with your community..."
                                    rows="5"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={styles.submitBtn}>
                                Post to Community
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    page: { padding: '2rem 0', minHeight: 'calc(100vh - 200px)' },
    title: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' },
    subtitle: { color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '2rem' },
    posts: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    postCard: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem'
    },
    postHeader: { marginBottom: '1rem' },
    postTitle: { fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' },
    postMeta: {
        display: 'flex',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-muted)',
        flexWrap: 'wrap'
    },
    postContent: { color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 },
    postFooter: { marginBottom: '0.5rem' },
    replyButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'var(--color-bg-tertiary)',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: 600,
        transition: 'all var(--transition-fast)'
    },
    repliesSection: {
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--glass-border)'
    },
    repliesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1rem'
    },
    replyCard: {
        background: 'var(--color-bg-secondary)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)'
    },
    replyHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
        fontSize: '0.875rem'
    },
    replyTime: {
        color: 'var(--color-text-muted)',
        fontSize: '0.75rem'
    },
    replyContent: {
        color: 'var(--color-text-secondary)',
        margin: 0,
        lineHeight: 1.5
    },
    noReplies: {
        textAlign: 'center',
        color: 'var(--color-text-muted)',
        padding: '1rem',
        fontStyle: 'italic'
    },
    replyInputSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    },
    replyInput: {
        width: '100%',
        padding: '0.75rem',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        fontSize: '1rem',
        resize: 'vertical',
        fontFamily: 'inherit'
    },
    sendButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        background: 'var(--gradient-safe)',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: 600,
        alignSelf: 'flex-end',
        transition: 'all var(--transition-normal)'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
    },
    modalContainer: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--glass-border)'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--color-text)',
        cursor: 'pointer',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-md)',
        transition: 'all var(--transition-fast)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
    },
    submitBtn: {
        marginTop: '0.5rem',
        width: '100%',
        padding: '1rem',
        fontSize: '1.05rem',
        justifyContent: 'center'
    }
};

export default CommunityForums;
