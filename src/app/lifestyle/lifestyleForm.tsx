'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LifestyleTag,
  allLifestyleTags,
} from '@/app/lifestyle/allLifestyleTag';
import { mockPerson, PersonData } from '@/app/lifestyle/mockData/mockPerson';

export default function LifestyleForm() {
  const [person, setPerson] = useState<PersonData>(mockPerson);
  const [selectedTags, setSelectedTags] = useState<LifestyleTag[]>(
    person.lifestyleTags
  );

  const addTag = (tag: LifestyleTag) => {
    if (!selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: LifestyleTag) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
  };

  // Group available tags by their type for display
  const groupedTags = allLifestyleTags.reduce(
    (acc, tag) => {
      if (!acc[tag.type]) {
        acc[tag.type] = [];
      }
      acc[tag.type].push(tag);
      return acc;
    },
    {} as Record<string, LifestyleTag[]>
  );

  // Handle Save: update the person’s lifestyle tags and log the updated person
  const handleSave = () => {
    const updatedPerson = { ...person, lifestyleTags: selectedTags };
    setPerson(updatedPerson);
    console.log('Saved Person:', updatedPerson);
    console.log('Selected Tags:', selectedTags);
  };

  const handleCancel = () => {
    setSelectedTags(person.lifestyleTags);
    // router.push('/')
  };

  return (
    <div className="p-1 max-w-4xl mx-auto rounded-lg">
      {/* All Tags */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">All Tags</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(groupedTags).map(([type, tags]) => (
            <div key={type} className="mb-4">
              <h3 className="text-md font-semibold text-gray-700">{type}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    className={`cursor-pointer px-3 py-1 rounded-lg transition-all ${
                      selectedTags.some((t) => t.id === tag.id)
                        ? 'bg-gray-300 text-gray-700 pointer-events-none'
                        : 'bg-blue-500 text-white hover:bg-blue-700'
                    }`}
                    onClick={() => addTag(tag)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Selected Tags */}
      <Card className="mb-6 border-2 border-black">
        <CardHeader>
          <CardTitle className="text-lg text-black">
            Your Selected Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedTags.length === 0 ? (
            <p className="text-gray-500">No tags selected.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag.id}
                  className="cursor-pointer px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                  onClick={() => removeTag(tag)}
                >
                  {tag.name} <span className="ml-1">&times;</span>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save and Cancel Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          className="px-6 py-2 bg-red-500 hover:bg-red-600"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button className="px-6 py-2" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
