import React from 'react';

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export const Title: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => <h1 className={`font-title text-title ${className}`}>{children}</h1>;

export const HeadingLarge: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <h2 className={`font-heading text-heading-xl ${className}`}>{children}</h2>
);

export const Heading: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <h3 className={`font-heading text-heading-lg ${className}`}>{children}</h3>
);

export const HeadingSmall: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <h4 className={`font-heading text-heading-sm ${className}`}>{children}</h4>
);

export const LabelText: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <label className={`font-label text-label ${className}`}>{children}</label>
);

export const BodyText: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => <p className={`font-body text-body ${className}`}>{children}</p>;

export const ButtonText: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <span className={`font-button text-button ${className}`}>{children}</span>
);

export const InputText: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => <span className={`font-input text-input ${className}`}>{children}</span>;

export const SmallText: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <small className={`font-small text-small ${className}`}>{children}</small>
);
