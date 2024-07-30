import React from 'react';

interface UserProps {
  params: {
    userId: string;
  };
}

export default function User({params: {userId}}: UserProps) {
  return <div>User</div>;
}
