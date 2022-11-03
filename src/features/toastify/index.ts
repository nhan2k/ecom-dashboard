import { toast, ToastOptions } from 'react-toastify'

type TType = 'info' | 'success' | 'warning' | 'error' | 'default'
const showToast = (type: TType, message: string) => {
  const options: ToastOptions<{}> = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  }
  switch (type) {
    case 'info':
      return toast.info(message, options)
    case 'success':
      return toast.success(message, options)
    case 'warning':
      return toast.warning(message, options)
    case 'error':
      return toast.error(message, options)
    default:
    case 'default':
      return toast(message, options)
  }
}
export { showToast }
