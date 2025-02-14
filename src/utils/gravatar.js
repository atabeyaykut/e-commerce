import md5 from 'md5';

export const getGravatarUrl = (email, size = 80) => {
  const hash = md5(email.toLowerCase().trim());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};
