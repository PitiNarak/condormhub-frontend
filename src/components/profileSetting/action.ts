'use server';

import client from '@/api';
import { components } from '@/types/api';

interface Session {
  user?: components['schemas']['domain.User'];
  access_token?: components['schemas']['dto.TokenWithUserInformationResponseBody']['accessToken'];
  refresh_token?: components['schemas']['dto.TokenWithUserInformationResponseBody']['refreshToken'];
  access_token_expired?: number;
}

interface Value {
  username: string;
  firstname: string;
  lastname: string;
  gender: string;
  phoneNumber: string;
}

export const UpdateUserInformation = async (session: Session, value: Value) => {
  const res = await client.PATCH('/user', {
    body: {
      username: value.username,
      firstname: value.firstname,
      lastname: value.lastname,
      gender: value.gender,
      phoneNumber: value.phoneNumber,
    },
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (res.error) {
    return {
      error: res.error.error,
    };
  }
};
