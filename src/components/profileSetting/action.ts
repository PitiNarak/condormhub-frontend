'use server';

import client from '@/api';

interface Value {
  username: string;
  firstname: string;
  lastname: string;
  gender: string;
  phoneNumber: string;
}

export const UpdateUserInformation = async (
  access_token: string,
  value: Value
) => {
  const res = await client.PATCH('/user', {
    body: {
      username: value.username,
      firstname: value.firstname,
      lastname: value.lastname,
      gender: value.gender,
      phoneNumber: value.phoneNumber,
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.error) {
    return {
      error: res.error.error,
    };
  }
};

export const DeleteAccount = async (access_token: string) => {
  console.log(access_token);
  // const res = await client.DELETE('/user/', {})
};

// export const GetUserInformation = async (access_token: string) => {
//   const res = await client.GET('/user/me', {
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   });

//   if (res.error) {
//     return {
//       error: res.error.error,
//     };
//   }
//   return res.data.data;
// };
