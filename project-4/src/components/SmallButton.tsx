import React from 'react'

interface SmallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const SmallButton = ({ children, ...props }: SmallButtonProps) => {
  return (
    <button
      {...props}
      style={{
        padding: '4px 8px',
        fontSize: '0.8rem',
        border: '1px solid red',
        borderRadius: '6px',
        background: 'transparent',
        color: 'red',
        cursor: 'pointer',
        ...props.style,
      }}
    >
      {children}
    </button>
  )
}
