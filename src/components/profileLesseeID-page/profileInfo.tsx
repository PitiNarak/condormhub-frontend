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

export function ProfileInfo() {
  const birthDate = '29 Febuary 2024';
  const createAt = '30 Febuary 2024';
  const email = 'WinnieDaPoo1@gmail.com';
  const firstName = 'Winnie';
  const lastName = 'DaPool';
  const userName = 'Piti';
  const gender = 'Male';
  const studentAt = 'Chulalongkorn University';
  const life1 = 'Gamer';
  const life2 = 'Chill';
  const life3 = 'Party';
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
            <TextInCard
              icon={<CakeIcon />}
              header="Birthday"
              data={birthDate}
            />
            <TextInCard icon={<Calendar />} header="Joined" data={createAt} />
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
