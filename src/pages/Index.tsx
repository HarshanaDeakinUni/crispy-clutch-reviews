
import React, { useState } from 'react';
import { Crown, TrendingUp, Award, Users } from 'lucide-react';
import ChickenCard from '@/components/ChickenCard';
import { Badge } from '@/components/ui/badge';

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

interface ChickenData {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  totalVotes: number;
  comments: Comment[];
  description: string;
  price: string;
}

const Index = () => {
  const [chickens, setChickens] = useState<ChickenData[]>([
    {
      id: 1,
      name: "The Golden Crispy",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=400&fit=crop",
      rating: 4.8,
      totalVotes: 127,
      price: "$89.99",
      description: "Premium leather craftsmanship meets modern elegance. This golden-brown beauty features a perfectly crispy exterior with spacious interior compartments.",
      comments: [
        {
          id: 1,
          author: "Sarah M.",
          text: "Absolutely love this handbag! The golden finish is stunning and it holds everything I need.",
          timestamp: "2 hours ago"
        },
        {
          id: 2,
          author: "Mike R.",
          text: "Best purchase I've made this year. The quality is incredible!",
          timestamp: "1 day ago"
        }
      ]
    },
    {
      id: 2,
      name: "Smokey Supreme",
      imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=500&h=400&fit=crop",
      rating: 4.6,
      totalVotes: 89,
      price: "$129.99",
      description: "Dark, sophisticated, and bold. This smokey masterpiece features a rich, deep finish that pairs with any outfit. Limited edition design.",
      comments: [
        {
          id: 3,
          author: "Emma K.",
          text: "This bag has such a unique character. The smokey finish is unlike anything I've seen!",
          timestamp: "3 hours ago"
        }
      ]
    },
    {
      id: 3,
      name: "Classic Roasted",
      imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=500&h=400&fit=crop",
      rating: 4.9,
      totalVotes: 203,
      price: "$79.99",
      description: "The timeless classic that never goes out of style. Perfect balance of form and function with a warm, inviting aesthetic.",
      comments: [
        {
          id: 4,
          author: "Jessica L.",
          text: "My go-to handbag for every occasion. The classic design is perfect!",
          timestamp: "5 hours ago"
        },
        {
          id: 5,
          author: "David P.",
          text: "Bought this for my wife and she absolutely loves it. Great quality!",
          timestamp: "1 day ago"
        }
      ]
    }
  ]);

  const handleVote = (chickenId: number, rating: number) => {
    setChickens(prev => prev.map(chicken => {
      if (chicken.id === chickenId) {
        const newTotalVotes = chicken.totalVotes + 1;
        const newRating = ((chicken.rating * chicken.totalVotes) + rating) / newTotalVotes;
        return {
          ...chicken,
          rating: Math.round(newRating * 10) / 10,
          totalVotes: newTotalVotes
        };
      }
      return chicken;
    }));
  };

  const handleComment = (chickenId: number, commentText: string) => {
    setChickens(prev => prev.map(chicken => {
      if (chicken.id === chickenId) {
        const newComment = {
          id: Date.now(),
          author: "Anonymous User",
          text: commentText,
          timestamp: "Just now"
        };
        return {
          ...chicken,
          comments: [newComment, ...chicken.comments]
        };
      }
      return chicken;
    }));
  };

  const topChicken = chickens.reduce((prev, current) => 
    (prev.rating > current.rating) ? prev : current
  );

  const totalVotes = chickens.reduce((sum, chicken) => sum + chicken.totalVotes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <Crown className="h-12 w-12 text-yellow-200" />
              <h1 className="text-6xl font-bold text-white tracking-tight">
                Hot<span className="text-yellow-200">Bag</span>
              </h1>
              <Crown className="h-12 w-12 text-yellow-200" />
            </div>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              🔥 The ultimate destination for premium handbag reviews and ratings 🔥<br/>
              Discover, vote, and review the hottest luxury handbags in the market
            </p>
            <div className="flex justify-center space-x-8 text-orange-100">
              <div className="text-center">
                <div className="text-2xl font-bold">{chickens.length}</div>
                <div className="text-sm">Premium Bags</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalVotes}</div>
                <div className="text-sm">Total Votes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-orange-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Award className="mr-3 text-orange-500" />
              Current Champion
            </h2>
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2">
              🏆 Top Rated
            </Badge>
          </div>
          <div className="flex items-center space-x-6">
            <img
              src={topChicken.imageUrl}
              alt={topChicken.name}
              className="w-24 h-24 rounded-xl object-cover border-4 border-yellow-400"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{topChicken.name}</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="text-green-500" size={16} />
                  <span className="text-lg font-semibold text-orange-600">{topChicken.rating}★</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="text-blue-500" size={16} />
                  <span className="text-gray-600">{topChicken.totalVotes} votes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Handbag Gallery */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Premium Handbag Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chickens.map((chicken) => (
              <ChickenCard
                key={chicken.id}
                chicken={chicken}
                onVote={handleVote}
                onComment={handleComment}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Crown className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold">HotBag</span>
          </div>
          <p className="text-gray-300 mb-4">
            The premier destination for luxury handbag enthusiasts
          </p>
          <p className="text-sm text-gray-400">
            © 2024 HotBag. All rights reserved. | Rate responsibly 🔥
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
