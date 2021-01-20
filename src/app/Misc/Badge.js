import React from 'react';

export const badgeThemes = {
  coral: { backgroundColor: 'var(--coral', color: 'var(--warm-white)' },
  fusionYellow: {
    backgroundColor: 'var(--fusion-yellow',
    color: 'var(--deep-blue)',
    border: '1px solid var(--deep-blue)',
  },
};

export const Badge = ({ text, theme = badgeThemes.coral }) => {
  return (
    <span
      style={{
        ...theme,
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        borderRadius: '0.75rem',
        display: 'inline-flex',
        alignItems: 'center',
        height: '1.5rem',
        minWidth: '1.5rem',
        fontFamily: 'Rubik',
        fontWeight: '500',
        fontSize: '0.875rem',
      }}
    >
      {text}
    </span>
  );
};
