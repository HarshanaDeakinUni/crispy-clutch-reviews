
import React, { useState } from 'react';
import { MessageCircle, TrendingUp, Users } from 'lucide-react';
import StarRating from './StarRating';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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

interface ChickenCardProps {
  chicken: ChickenData;
  onVote: (chickenId: number, rating: number) => void;
  onComment: (chickenId: number, comment: string) => void;
}

const ChickenCard = ({ chicken, onVote, onComment }: ChickenCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);

  const handleVote = (rating: number) => {
    setUserRating(rating);
    onVote(chicken.id, rating);
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onComment(chicken.id, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-orange-50 border-orange-200">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={chicken.imageUrl}
            alt={chicken.name}
            className="w-full h-64 object-cover"
          />
          <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600">
            {chicken.price}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{chicken.name}</h3>
          <div className="flex items-center space-x-2">
            <StarRating rating={chicken.rating} readonly size={18} />
            <span className="text-sm text-gray-600">({chicken.totalVotes})</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{chicken.description}</p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Rate this handbag:</span>
            <StarRating rating={userRating} onRatingChange={handleVote} />
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{chicken.totalVotes} votes</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={16} />
              <span>{chicken.comments.length} reviews</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp size={16} />
              <span>Trending</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0">
        <div className="w-full space-y-3">
          <Button
            variant="outline"
            className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? 'Hide Reviews' : 'View Reviews'}
          </Button>
          
          {showComments && (
            <div className="space-y-3">
              <div className="max-h-40 overflow-y-auto space-y-2">
                {chicken.comments.map((comment) => (
                  <div key={comment.id} className="bg-white p-3 rounded-lg border border-orange-100">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-gray-800">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600">{comment.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Write a review..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                />
                <Button
                  onClick={handleSubmitComment}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={!newComment.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChickenCard;
