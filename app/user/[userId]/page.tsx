import React from 'react';

interface UserProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function User(props: UserProps) {
  const params = await props.params;

  const {
    userId
  } = params;

  return <div>User</div>;
}
