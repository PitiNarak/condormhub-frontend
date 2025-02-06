'use client';

import React, { useState } from 'react';

// Import shadcn/ui components (adjust paths if needed)
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import Image from 'next/image';

// Define the student data type
interface Student {
  id: number;
  name: string;
  studentCard: string; // URL to student card image
  reviewed: boolean; // whether the admin has taken an action
  status?: 'Accepted' | 'Rejected';
}

// Mock-up data for demonstration
const initialStudents: Student[] = [
  {
    id: 1,
    name: 'John Doe',
    studentCard: '/mock_images/fakeng',
    reviewed: false,
  },
  {
    id: 2,
    name: 'Jane Smith',
    studentCard: '/images/jane.png',
    reviewed: false,
  },
  {
    id: 3,
    name: 'Alice Johnson',
    studentCard: '/images/alice.png',
    reviewed: true,
    status: 'Accepted',
  },
];

export default function AdminView() {
  // State to hold student records
  const [students, setStudents] = useState<Student[]>(initialStudents);

  // State for confirmation dialog
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [actionType, setActionType] = useState<'accept' | 'reject' | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  // Handle review action
  const handleReview = (student: Student, action: 'accept' | 'reject') => {
    setSelectedStudent(student);
    setActionType(action);
    setDialogOpen(true);
  };

  // Once the admin confirms the action, update the student record
  const confirmReview = () => {
    if (selectedStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === selectedStudent.id
            ? {
                ...s,
                reviewed: true,
                status: actionType === 'accept' ? 'Accepted' : 'Rejected',
              }
            : s
        )
      );
    }
    setDialogOpen(false);
    setSelectedStudent(null);
    setActionType(null);
  };

  // Filter lists based on whether the admin has reviewed
  const pendingReview = students.filter((s) => !s.reviewed);
  const reviewedStudents = students.filter((s) => s.reviewed);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>

      {/* Tabs to switch between views */}
      <Tabs defaultValue="pendingReview">
        <TabsList className="mb-4">
          <TabsTrigger value="pendingReview">Pending Review</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
        </TabsList>

        {/* Pending Review Tab */}
        <TabsContent value="pendingReview">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Student Card</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingReview.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Image
                      src={student.studentCard}
                      alt={`${student.name} student card`}
                      className="w-20 h-auto rounded"
                    />
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleReview(student, 'accept')}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReview(student, 'reject')}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Reviewed Tab */}
        <TabsContent value="reviewed">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Student Card</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviewedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Image
                      src={student.studentCard}
                      alt={`${student.name} student card`}
                      className="w-20 h-auto rounded"
                    />
                  </TableCell>
                  <TableCell
                    className={
                      student.status === 'Accepted'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {student.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            Confirm {actionType === 'accept' ? 'Acceptance' : 'Rejection'}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to {actionType}{' '}
            <strong>{selectedStudent?.name}</strong>&apos;s request?
          </DialogDescription>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button onClick={() => setDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={confirmReview}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
