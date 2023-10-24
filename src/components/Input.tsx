interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      type="text"
      className={`px-4 rounded-md w-72 border border-gray_100 focus:border-blue_300 h-10 ${className}}`}
    />
  )
}
