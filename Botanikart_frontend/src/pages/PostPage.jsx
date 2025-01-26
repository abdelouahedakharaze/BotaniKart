import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPost, toggleHeart, createComment } from '../actions/postActions';

const PostPage = () => {
    const { id: postId } = useParams();
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState('');
    
    const postDetails = useSelector(state => state.postDetails);
    const { loading, error, post } = postDetails;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(getPost(postId));
    }, [dispatch, postId]);

    const submitComment = (e) => {
      e.preventDefault();
      if (commentText.trim()) {
          dispatch(createComment(postId, commentText))  // Pass text directly
              .then(() => {
                  setCommentText('');
                  // Refresh comments without reloading entire post
                  dispatch(getPost(postId));
              })
              .catch(() => {
                  // Handle error if needed
              });
      }
  };

    const handleHeart = () => {
        dispatch(toggleHeart(postId)).then(() => {
            dispatch(getPost(postId)); // Refresh post data
        });
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Link to="/blog" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
                ← Back to Posts
            </Link>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-red-500 text-center">Error: {error}</div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Post Image */}
                    <div className="w-full h-64 bg-gray-100 overflow-hidden">
                        {post.image ? (
                            <img 
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-contain p-2"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                        <p className="text-gray-600 mb-6 whitespace-pre-wrap">
                            {post.text}
                        </p>

                        {/* Like Button */}
                        <div className="mb-6 flex items-center">
                            <button 
                                onClick={handleHeart}
                                className="flex items-center text-red-500 hover:text-red-600"
                                disabled={!userInfo}
                            >
                                <svg 
                                    className="w-6 h-6 mr-1" 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm">{post.hearts_count} Likes</span>
                            </button>
                        </div>

                        {/* Comments Section */}
                        <div className="border-t pt-6">
                            <h2 className="text-xl font-semibold mb-4">Comments</h2>

                            {/* Comment Form */}
                            {userInfo ? (
                                <form onSubmit={submitComment} className="mb-6">
                                    <textarea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="w-full p-2 border rounded mb-2"
                                        placeholder="Write a comment..."
                                        rows="3"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Post Comment
                                    </button>
                                </form>
                            ) : (
                                <div className="mb-4 text-gray-500">
                                    <Link to="/login" className="text-blue-500">Login</Link> to comment
                                </div>
                            )}

                            {/* Comments List */}
                            {post.comments?.length > 0 ? (
                                post.comments.map(comment => (
                                    <div key={comment.id} className="mb-4 p-3 bg-gray-50 rounded">
                                        <p className="text-gray-600">{comment.text}</p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500">No comments yet</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostPage;