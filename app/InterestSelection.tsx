import BallIcon from '@/assets/images/ball.svg';
import FoodIcon from '@/assets/images/food&drink.svg';
import HandshakeIcon from '@/assets/images/ix_handshake.svg';
import LearningIcon from '@/assets/images/learning&ed.svg';
import NightlifeIcon from '@/assets/images/nightlife.svg';
import SearchIcon from '@/assets/images/search_icon_create_acc.svg';
import VideoGameIcon from '@/assets/images/Video_Game.svg';
import React, { useState } from 'react';
import {
    Keyboard,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SvgProps } from 'react-native-svg';

const CATEGORIES: { id: string; label: string; icon: React.FC<SvgProps>; tags: string[] }[] = [
  {
    id: 'social',
    label: 'Social & Networking',
    icon: HandshakeIcon,
    tags: ['Meetups & Mixers', 'Speed Networking', 'Singles & Dating', 'LGBTQ+ Events', "Women's Networking", 'Young Professionals', 'Alumni Gatherings', 'Community Service', 'Cultural Exchange', 'Social Clubs'],
  },
  {
    id: 'gaming',
    label: 'Gaming & Entertainment',
    icon: VideoGameIcon,
    tags: ['Board Games', 'Video Games', 'Trivia Nights', 'Escape Rooms', 'Movie Screenings', 'Comedy Shows', 'Karaoke', 'Improv & Theater', 'Anime & Manga', 'Card Games'],
  },
  {
    id: 'learning',
    label: 'Learning & Education',
    icon: LearningIcon,
    tags: ['Workshops & Seminars', 'Language Learning', 'Personal Development', 'Career Growth', 'Science & Research', 'Book Clubs', 'Study Groups', 'Online Courses', 'Academic Lectures', 'Undergraduate Research'],
  },
  {
    id: 'sports',
    label: 'Sports & Fitness',
    icon: BallIcon,
    tags: ['Football & Soccer', 'Basketball', 'Tennis', 'Running & Jogging', 'Yoga & Meditation', 'Cycling', 'Swimming', 'Hiking', 'Martial Arts', 'Gym & Weightlifting'],
  },
  {
    id: 'food',
    label: 'Food & Drink',
    icon: FoodIcon,
    tags: ['Restaurant Crawls', 'Coffee Meetups', 'Cooking Classes', 'Baking', 'Food Festivals', 'Wine Tasting', 'Brunch Clubs', 'Vegan & Vegetarian', 'International Cuisine', 'BBQ & Grilling'],
  },
  {
    id: 'nightlife',
    label: 'Nightlife & Parties',
    icon: NightlifeIcon,
    tags: ['House Parties', 'Club Nights', 'Rooftop Events', 'Bar Crawls', 'Live Music', 'DJ Sets', 'Themed Parties', 'Concerts', 'Festivals', 'Late Night Eats'],
  },
];

interface InterestSelectionProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function InterestSelection({ onNext, onBack }: InterestSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const allTags = CATEGORIES.flatMap((c) => c.tags);

  const filteredTags = allTags.filter(
    (t) =>
      t.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedTags.includes(t)
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? [] : [id]
    );
    setShowSearchResults(false);
    Keyboard.dismiss();
  };

  const getSelectedCountForCategory = (tags: string[]) =>
    tags.filter((t) => selectedTags.includes(t)).length;

  const handleSearchTag = (tag: string) => {
    toggleTag(tag);
    setSearchQuery('');
    setShowSearchResults(false);
    Keyboard.dismiss();
  };

  const closeSearch = () => {
    setShowSearchResults(false);
    Keyboard.dismiss();
  };

  const allFilled = selectedTags.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-8 pt-6" keyboardShouldPersistTaps="handled">

        {/* Back Arrow */}
        <TouchableOpacity onPress={onBack} className="mb-8 self-start">
          <Text className="text-2xl text-gray-800">←</Text>
        </TouchableOpacity>

        {/* Progress Bar */}
        <View className="h-1.5 bg-gray-200 rounded-full mb-12 overflow-hidden">
          <View className="h-full w-2/3 bg-orange-700 rounded-full" />
        </View>

        {/* Title - tap to close search */}
        <TouchableWithoutFeedback onPress={closeSearch}>
          <View>
            <Text className="text-2xl font-bold text-gray-900 mb-2">Tell Us About You</Text>
            <Text className="text-sm text-gray-500 mb-8">
              Pick tags from any category — we'll use them to customize your experience
            </Text>
          </View>
        </TouchableWithoutFeedback>

        {/* Search Bar */}
        <View className="border border-gray-300 rounded-lg mb-3 px-4 flex-row items-center">
          <SearchIcon width={16} height={16} style={{ marginRight: 10 }} />
          <TextInput
            className="flex-1 py-4 text-sm text-gray-800"
            placeholder="Search for interests, events, activities..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setShowSearchResults(text.length > 0);
            }}
            onFocus={() => setShowSearchResults(searchQuery.length > 0)}
          />
        </View>

        {/* Search Results */}
        {showSearchResults && (
          <View className="border border-gray-200 rounded-lg mb-6 bg-white shadow-sm">
            {filteredTags.length > 0 ? (
              <>
                <Text className="text-xs text-gray-400 px-4 pt-3 pb-1">
                  {filteredTags.length} results - tap to select tag(s)
                </Text>
                <View className="flex-row flex-wrap px-4 pb-4 gap-2">
                  {filteredTags.slice(0, 6).map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      onPress={() => handleSearchTag(tag)}
                      className="flex-row items-center border border-gray-300 rounded-full px-3 py-1.5"
                    >
                      <Text className="text-xs text-gray-700">+ {tag}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              <View className="px-4 py-4">
                <Text className="text-sm text-gray-500">
                  No results for "{searchQuery}"
                </Text>
                <TouchableOpacity className="mt-1">
                  <Text className="text-sm text-orange-700 font-semibold">
                    Tag not listed? Send it in
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Categories */}
        <View className="gap-3 mb-8">
          {CATEGORIES.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);
            const selectedCount = getSelectedCountForCategory(category.tags);
            const IconComponent = category.icon;

            return (
              <View key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Category Header */}
                <TouchableOpacity
                  className="px-4 py-4 flex-row items-center justify-between bg-white"
                  onPress={() => toggleCategory(category.id)}
                >
                  <View className="flex-row items-center gap-3">
                    <IconComponent width={20} height={20} />
                    <Text className="text-sm font-semibold text-gray-800">{category.label}</Text>
                    {selectedCount > 0 && (
                      <View className="bg-orange-700 rounded-full w-5 h-5 items-center justify-center">
                        <Text className="text-white text-xs font-bold">{selectedCount}</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-gray-400">{isExpanded ? '∧' : '∨'}</Text>
                </TouchableOpacity>

                {/* Category Tags */}
                {isExpanded && (
                  <View className="px-4 pb-4 flex-row flex-wrap gap-2 border-t border-gray-100">
                    {category.tags.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <TouchableOpacity
                          key={tag}
                          onPress={() => toggleTag(tag)}
                          className={`flex-row items-center rounded-full px-3 py-1.5 mt-2 ${
                            isSelected
                              ? 'bg-orange-700 border border-orange-700'
                              : 'border border-gray-300'
                          }`}
                        >
                          <Text className={`text-xs ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                            {isSelected ? '× ' : '+ '}{tag}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          className={`rounded-lg py-4 items-center justify-center mt-2 mb-16 ${
            allFilled ? 'bg-orange-700' : 'bg-transparent border border-gray-300'
          }`}
          onPress={allFilled ? onNext : undefined}
          activeOpacity={allFilled ? 0.8 : 1}
        >
          <Text className={`text-base font-semibold ${allFilled ? 'text-white' : 'text-gray-400'}`}>
            Next
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}