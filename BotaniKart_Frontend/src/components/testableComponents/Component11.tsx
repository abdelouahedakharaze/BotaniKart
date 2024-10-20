import React, { useState } from 'react';
import { Search, Calendar, User } from 'lucide-react';

const blogPosts = [
  { id: 1, title: "Top 5 Low-Maintenance Plants for Beginners", image: "/placeholder.svg?height=200&width=400", excerpt: "Discover the best plants for new plant parents that are both beautiful and easy to care for...", author: "Jane Doe", date: "2023-05-15", category: "Care Tips" },
  { id: 2, title: "The Art of Bonsai: A Beginner's Guide", image: "/placeholder.svg?height=200&width=400", excerpt: "Learn the basics of bonsai cultivation and how to start your own miniature tree garden...", author: "John Smith", date: "2023-05-10", category: "Techniques" },
  { id: 3, title: "Creating a Tropical Oasis in Your Living Room", image: "/placeholder.svg?height=200&width=400", excerpt: "Transform your living space into a lush tropical paradise with these plant selection and decor tips...", author: "Emily Johnson", date: "2023-05-05", category: "Interior Design" },
  { id: 4, title: "The Benefits of Indoor Plants for Mental Health", image: "/placeholder.svg?height=200&width=400", excerpt: "Explore how incorporating plants into your indoor environment can boost mood and reduce stress...", author: "Michael Brown", date: "2023-04-30", category: "Wellness" },
  { id: 5, title: "Sustainable Gardening: Eco-Friendly Plant Care", image: "/placeholder.svg?height=200&width=400", excerpt: "Discover environmentally conscious ways to care for your plants and create a sustainable indoor garden...", author: "Sarah Wilson", date: "2023-04-25", category: "Sustainability" },
];

const categories = ["All", "Care Tips", "Techniques", "Interior Design", "Wellness", "Sustainability"];

export default function BlogList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || post.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-olive-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-olive-800 mb-8 text-center">Plant Paradise Blog</h1>
        
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full py-3 px-4 rounded-full border border-olive-300 focus:outline-none focus:ring-2 focus:ring-olive-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-olive-400" size={20} />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4 md:mt-0">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-medium-green text-white"
                    : "bg-olive-200 text-olive-800 hover:bg-olive-300 transition duration-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-olive-800 mb-2">{post.title}</h2>
                <p className="text-olive-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center text-olive-500 text-sm">
                  <span className="flex items-center">
                    <User size={16} className="mr-1" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {post.date}
                  </span>
                </div>
                <a
                  href="#"
                  className="mt-4 inline-block bg-medium-green text-white px-4 py-2 rounded hover:bg-dark-green transition-colors"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
