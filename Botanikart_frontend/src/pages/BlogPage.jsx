import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listPosts } from '../actions/postActions';

const BlogPage = () => {
    const dispatch = useDispatch();
    const postList = useSelector(state => state.postList);
    const { loading, error, posts = [] } = postList;

    useEffect(() => {
        dispatch(listPosts());
    }, [dispatch]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">Error: {error}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {/* Image Section with Error Handling */}
                                <div className="w-full h-48 bg-gray-100 overflow-hidden">
                                    {post.image ? (
                                        <img 
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-contain p-2"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Post Content */}
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mt-2">
                                        {(post.text?.substring(0, 100) || 'No content available')}
                                        {post.text?.length > 100 && '...'}
                                    </p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="flex items-center">
                                            <span className="text-sm mr-2">♥</span>
                                            <span className="text-sm">{post.hearts_count} Likes</span>
                                        </div>
                                        <Link 
                                            to={`/post/${post.id}`} 
                                            className="text-blue-500 hover:text-blue-700 text-sm"
                                        >
                                            Read more
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-full">No posts available</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BlogPage;