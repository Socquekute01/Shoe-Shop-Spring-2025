import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit, Calendar, Clock } from "lucide-react";
import api from "../../../api";

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await api.getBlogPost(id);
        setPost(response.data);
      } catch (error) {
        setError("Failed to fetch blog post");
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading)
    return <div className="flex justify-center p-8">Loading blog post...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;
  if (!post) return <div className="p-8">Blog post not found</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link to="/admin/blog" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Blog Post Details</h1>
        </div>
        <Link
          to={`/admin/blog/${id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Edit size={16} />
          Edit Post
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{formatTime(post.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
