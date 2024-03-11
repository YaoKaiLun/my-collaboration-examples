import React, { PropsWithChildren } from 'react';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
  ) => (
    <span
      {...props}
      className={className}
      style={{
        cursor: 'pointer',
        color: reversed ? (active ? 'white' : '#aaa') : (active ? 'black' : '#ccc'),
      }}
    />
  ),
);

export const Icon = React.forwardRef(
  (
    props: PropsWithChildren<BaseProps>,
  ) => (
    <span
      {...props}
      className="material-icons"
      style={{
        fontSize: '18px',
        verticalAlign: 'text-bottom',
      }}
    />
  ),
);

export const Toolbar = React.forwardRef(
  (
    props: PropsWithChildren<BaseProps>,
  ) => (
    <div
      {...props}
      style={{
        position: 'relative',
        padding: '1px 18px 17px',
        margin: '0 -20px',
        borderBottom: '2px solid #eee',
        marginBottom: '20px',
      }}
    />
  ),
);
