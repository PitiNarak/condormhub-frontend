'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LifestyleTag, allLifestyleTags } from '@/types/allLifestyle';
import { useSession } from 'next-auth/react';
import { Loader2, CircleCheckBig } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UpdateLifestyleTags, GetUserData } from '@/actions/lifestyle/action';

export function LifestyleForm() {
  const { data: session, update } = useSession();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedTags, setSelectedTags] = useState<LifestyleTag[]>([]);
  const [initialTags, setInitialTags] = useState<LifestyleTag[]>([]);

  // Fetch user data
  useEffect(() => {
    const fetchUserLifestyles = async () => {
      if (!session?.access_token) return;

      setLoading(true);
      try {
        const userData = await GetUserData(session.access_token);
        console.log('Fetched userData:', userData);

        if (userData) {
          // Map backend lifestyle strings to our tag objects
          const userLifestyles =
            (userData as { data: { lifestyles?: string[] } }).data
              ?.lifestyles || [];
          const matchedTags = allLifestyleTags.filter((tag) =>
            userLifestyles.includes(tag.name)
          );
          console.log('Fetched userData:', matchedTags);

          setSelectedTags(matchedTags);
          setInitialTags(matchedTags);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Failed to load your lifestyle tags',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserLifestyles();
  }, [session, toast]);

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

  // Handle Save: update the user's lifestyle tags
  const handleSave = async () => {
    if (!session?.access_token) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to save lifestyle tags',
      });
      return;
    }

    setSaving(true);
    try {
      // Convert tag objects to strings for the API
      const lifestyleNames = selectedTags.map((tag) => tag.name);

      const result = await UpdateLifestyleTags(
        session.access_token,
        lifestyleNames
      );

      if (result) {
        setInitialTags(selectedTags);

        // Update the session with new lifestyles if session update is available
        if (update && session.user) {
          update({
            user: {
              ...session.user,
              lifestyles: lifestyleNames,
            },
          });
        }

        toast({
          description: (
            <div className="flex gap-5">
              <CircleCheckBig className="text-green-500" />
              <p className="text-base">Lifestyle Tags updated successfully</p>
            </div>
          ),
        });
      }
    } catch (error) {
      console.error('Error saving lifestyle tags:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to save your lifestyle tags',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setSelectedTags(initialTags);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg">Loading your lifestyle tags</span>
      </div>
    );
  }

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
                        ? 'bg-gray-300 text-gray-700 hover:bg-gray-300 cursor-not-allowed'
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
          type="button"
          className="w-44 bg-red-500 hover:bg-red-600"
          onClick={handleCancel}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="w-44"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );
}
