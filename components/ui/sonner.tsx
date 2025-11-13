import { Toaster as SonnerToaster } from "sonner"

export type ToastProps = React.ComponentProps<typeof SonnerToaster>

export function Toaster({ ...props }: ToastProps) {
  return <SonnerToaster {...props} />
}

