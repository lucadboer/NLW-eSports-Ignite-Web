import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog"

export function CreateAdBanner() {
    return (
        <div className='pt-1.5 bg-nlw-gradient rounded-lg self-stretch mt-8'>
            <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
            <div>
            <strong className='font-bold text-2xl text-white'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>
          <Dialog.Trigger className='px-4 py-3 bg-violet-500 transition-all hover:bg-violet-700 text-white rounded flex items-center gap-3'>
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>
        </div>
      </div>
    )
}