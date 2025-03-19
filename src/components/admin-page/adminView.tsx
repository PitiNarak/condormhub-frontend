'use client';

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
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
import { Student, studentData } from '@/mocks/mockAdmin';

export default function AdminView() {
  const [students, setStudents] = useState<Student[]>(studentData);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [actionType, setActionType] = useState<'accept' | 'reject' | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const handleReview = (student: Student, action: 'accept' | 'reject') => {
    setSelectedStudent(student);
    setActionType(action);
    setDialogOpen(true);
  };

  const confirmReview = () => {
    if (selectedStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === selectedStudent.id
            ? {
                ...s,
                reviewed: true,
                status: actionType === 'accept' ? 'Accepted' : 'Rejected',
                reviewDate: new Date().toISOString(),
              }
            : s
        )
      );
    }
    setDialogOpen(false);
    setSelectedStudent(null);
    setActionType(null);
  };

  const pendingReview = students.filter((s) => !s.reviewed);
  const reviewedStudents = students
    .filter((s) => s.reviewed)
    .sort((a, b) => {
      const dateA = new Date(a.reviewDate || 0);
      const dateB = new Date(b.reviewDate || 0);
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <div className="p-4">
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
                    {/* Image Click to Zoom */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Image
                          src={student.studentCard}
                          alt={`${student.name} student card`}
                          width={200}
                          height={100}
                          className="rounded cursor-pointer hover:opacity-80"
                          onClick={() => setZoomedImage(student.studentCard)}
                        />
                      </DialogTrigger>
                    </Dialog>
                  </TableCell>
                  <TableCell className="space-x-0">
                    <Button
                      variant="outline"
                      onClick={() => handleReview(student, 'accept')}
                      className="bg-green-500 text-white hover:bg-green-600 rounded-lg"
                    >
                      <Check className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleReview(student, 'reject')}
                      className="bg-red-500 text-white hover:bg-red-600 rounded-lg"
                    >
                      <X className="w-5 h-5" />
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
                <TableHead>Reviewed Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviewedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    {/* Image Click to Zoom */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Image
                          src={student.studentCard}
                          alt={`${student.name} student card`}
                          width={200}
                          height={100}
                          className="rounded cursor-pointer hover:opacity-80"
                          onClick={() => setZoomedImage(student.studentCard)}
                        />
                      </DialogTrigger>
                    </Dialog>
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
                  <TableCell>
                    {student.reviewDate
                      ? new Date(student.reviewDate).toLocaleString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        })
                      : '-'}
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

      {/* Zoomed Image Dialog */}
      <Dialog open={!!zoomedImage} onOpenChange={() => setZoomedImage(null)}>
        <DialogContent className="p-4">
          <DialogTitle>Student Card</DialogTitle>
          {zoomedImage && (
            <Image
              src={zoomedImage}
              alt="Zoomed Student Card"
              width={900}
              height={900}
              className="object-contain rounded-lg"
            />
          )}
          <DialogFooter className="mt-4 flex justify-end">
            <Button onClick={() => setZoomedImage(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
