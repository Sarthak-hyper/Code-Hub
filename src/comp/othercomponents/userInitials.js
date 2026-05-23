import React from 'react';

function UserInitials({ name }) {
  const words = name.split(' ');

  const initials = words.map((word) => word.charAt(0).toUpperCase()).join('');

  return <div className="initials">{initials}</div>;
}

export default UserInitials;
