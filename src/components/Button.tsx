interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  title: string
}

export function Button({ className, title, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={`rounded-md p-2 border ${className}`}>
      {title}
    </button>
  )
}
