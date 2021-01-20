import React from 'react';
import { useSelector } from 'react-redux';

export const ProfilePic = () => {
  return (
    <img
      src={useSelector((state) => state.meta.profilePic)}
      alt={useSelector((state) => state.meta.userName)}
      style={{
        borderRadius: '50%',
        height: '2.5rem',
        width: '2.5rem',
        objectFit: 'cover',
      }}
    />
  );
};
