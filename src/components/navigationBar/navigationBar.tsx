import { SelectedMenu } from '@/components/navigationBar/selectedMenu';
import { Logo } from './logo';
import * as motion from 'motion/react-client';
import React from 'react';
import { auth } from '@/lib/auth';
import { UserDropdown } from '@/components/navigationBar/userDropdown';
import { NotiBtn } from '@/components/navigationBar/notificationButton';

export async function Navbar() {
  const session = await auth();
  return (
    <nav>
      <div className="px-4 md:px-16 py-4">
        <div className="flex justify-end">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{
              duration: 1,
            }}
            className="bg-primary h-[2px]"
          />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <Logo />
          </div>
          <div className="flex gap-4 justify-center items-center">
            <SelectedMenu text="home" path="/" />
            {!session ? (
              <>
                <SelectedMenu text="Register" path="/register" />
                <SelectedMenu text="Login" path="/login" />
              </>
            ) : (
              <>
                <NotiBtn />
                <UserDropdown
                  name={session.user?.firstname + ' ' + session.user?.lastname}
                />
              </>
              // <LogoutButton />
            )}
          </div>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{
            duration: 1,
          }}
          className="bg-primary h-[2px]"
        />
      </div>
    </nav>
  );
}
