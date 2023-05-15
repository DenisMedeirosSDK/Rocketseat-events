import * as DialogPrimitive from '@radix-ui/react-dialog';

interface ModalError extends DialogPrimitive.DialogProps {
  title: string;
  description: string;
}

export function ModalError({ title, description, ...rest }: ModalError) {
  return (
    <DialogPrimitive.Root {...rest}>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/75 w-screen h-screen" />

      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
    bg-gray-900 rounded p-10 max-w-md min-w-[20rem] md:w-full flex flex-col items-center"
        >
          <DialogPrimitive.Title className="text-sm text-gray-100 dark:text-gray-100 uppercase font-bold">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-100 dark:text-gray-100">
            {description}
          </DialogPrimitive.Description>

          <DialogPrimitive.Close
            className="inline-flex cursor-pointer justify-center rounded px-4 py-2 mt-5 text-sm
            bg-yellow-500 text-gray-900 font-bold hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-700 transition-colors
            border border-transparent w-full"
          >
            Entendi
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
