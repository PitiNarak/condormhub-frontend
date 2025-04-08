import {
  CakeIcon,
  Calendar,
  CircleSlash,
  Mail,
  University,
  User,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { TextInCard } from '@/components/profileLesseeID-page/textInCard';
import { Badge } from '@/components/ui/badge';

interface ProfileInfoProps {
  birthDate: string;
  createAt: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  gender: string;
  studentAt: string;
  life1: string;
  life2: string;
  life3: string;
}

export function ProfileInfo({
  birthDate,
  createAt,
  email,
  firstName,
  lastName,
  userName,
  gender,
  studentAt,
  life1,
  life2,
  life3,
}: ProfileInfoProps) {
  const bd = new Date(birthDate).toDateString().slice(4);
  const ca = new Date(createAt).toDateString().slice(4);
  return (
    <div className="flex justify-center mx-auto">
      <Card className="w-[350px] md:w-[700px] shadow-none border-0">
        <CardHeader className="">
          <div className="flex gap-3 align-middle justify-center mx-auto lg:justify-start lg:mx-0">
            <p className="hidden lg:flex text-left lg:text-3xl font-bold">
              About {userName}
            </p>
            <Badge className="px-3 py-1 rounded-lg my-auto">{life1}</Badge>
            <Badge className="px-3 py-1 rounded-lg my-auto">{life2}</Badge>
            <Badge className="px-3 py-1 rounded-lg my-auto">{life3}</Badge>
          </div>
        </CardHeader>
        <CardContent className="">
          <div className="grid gird-cols-1 md:grid-cols-2 gap-y-5">
            <TextInCard
              icon={<User />}
              header="Name"
              data={firstName + ' ' + lastName}
            />
            <TextInCard icon={<CakeIcon />} header="Birthday" data={bd} />
            <TextInCard icon={<Calendar />} header="Joined" data={ca} />
            <TextInCard icon={<Mail />} header="Email" data={email} />
            <TextInCard icon={<CircleSlash />} header="Gender" data={gender} />
            <TextInCard
              icon={<University />}
              header="Student"
              data={studentAt}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
