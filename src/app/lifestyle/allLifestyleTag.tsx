export type LifestyleTag = {
  id: number;
  name: string;
  type: string;
};

export const allLifestyleTags: LifestyleTag[] = [
  // General Interests
  { id: 1, name: 'Active', type: 'General' },
  { id: 2, name: 'Creative', type: 'General' },
  { id: 3, name: 'Social', type: 'General' },
  { id: 4, name: 'Relaxed', type: 'General' },

  // Sports & Activities
  { id: 5, name: 'Football', type: 'Sports & Activities' },
  { id: 6, name: 'Basketball', type: 'Sports & Activities' },
  { id: 7, name: 'Tennis', type: 'Sports & Activities' },
  { id: 8, name: 'Swimming', type: 'Sports & Activities' },
  { id: 9, name: 'Running', type: 'Sports & Activities' },
  { id: 10, name: 'Cycling', type: 'Sports & Activities' },
  { id: 11, name: 'Badminton', type: 'Sports & Activities' },
  { id: 12, name: 'Yoga', type: 'Sports & Activities' },
  { id: 13, name: 'Gym & Fitness', type: 'Sports & Activities' },

  // Hobbies & Interests
  { id: 14, name: 'Music', type: 'Hobbies & Interests' },
  { id: 15, name: 'Dancing', type: 'Hobbies & Interests' },
  { id: 16, name: 'Photography', type: 'Hobbies & Interests' },
  { id: 17, name: 'Painting', type: 'Hobbies & Interests' },
  { id: 18, name: 'Gaming', type: 'Hobbies & Interests' },
  { id: 19, name: 'Reading', type: 'Hobbies & Interests' },
  { id: 20, name: 'Writing', type: 'Hobbies & Interests' },
  { id: 21, name: 'DIY & Crafting', type: 'Hobbies & Interests' },
  { id: 22, name: 'Cooking', type: 'Hobbies & Interests' },

  // Social & Personality
  { id: 23, name: 'Extrovert', type: 'Social & Personality' },
  { id: 24, name: 'Introvert', type: 'Social & Personality' },
  { id: 25, name: 'Night Owl', type: 'Social & Personality' },
  { id: 26, name: 'Early Bird', type: 'Social & Personality' },

  // Travel & Outdoors
  { id: 27, name: 'Traveler', type: 'Travel & Outdoors' },
  { id: 28, name: 'Backpacker', type: 'Travel & Outdoors' },
  { id: 29, name: 'Nature Lover', type: 'Travel & Outdoors' },
  { id: 30, name: 'Camping', type: 'Travel & Outdoors' },
  { id: 31, name: 'Beach Lover', type: 'Travel & Outdoors' },

  // Pets & Animals
  { id: 32, name: 'Dog Lover', type: 'Pets & Animals' },
  { id: 33, name: 'Cat Lover', type: 'Pets & Animals' },

  // Tech & Work
  { id: 34, name: 'Freelancer', type: 'Work & Career' },
  { id: 35, name: 'Entrepreneur', type: 'Work & Career' },
  { id: 36, name: 'Office Worker', type: 'Work & Career' },
  { id: 37, name: 'Remote Worker', type: 'Work & Career' },
  { id: 38, name: 'Student', type: 'Work & Career' },
  { id: 39, name: 'Self-Employed', type: 'Work & Career' },
];
