import { graphql, HttpResponse } from 'msw';
import { type LoginMutation, type LoginMutationVariables } from "@/generated/graphql";

const Login = graphql.mutation<
  LoginMutation,
  LoginMutationVariables
>('Login', ({ variables }) => {
  const { email, password } = variables.input;

  if (email === 'error@test.com' || password !== 'password123') {
    return HttpResponse.json({
      errors: [
        {
          message: 'Invalid email or password. Please try again.',
          extensions: { code: 'BAD_REQUEST' },
        },
      ],
    });
  }

  return HttpResponse.json({
    data: {
      login: {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        user: {
          id: '1',
          email,
          nameEn: 'Mock User',
          nameZh: '模拟用户',
          displayName: 'Mock User',
          role: 'ADMIN',
          avatarUrl: null,
          status: true,
          department: {
            id: '1',
            name: 'Engineering',
          },
          position: {
            id: '1',
            name: 'Senior Developer',
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    },
  });
});

export default [
  Login
];
