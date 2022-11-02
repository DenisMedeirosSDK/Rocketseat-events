import { FormEvent, useState } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { api } from '../lib/axios';

import appPreviewImg from '../assets/app-preview.png';
import avataresImg from '../assets/avatares.png';
import logoSvg from '../assets/logo.svg';
import checkIconSvg from '../assets/check-icon.svg';
import { ModalError } from '../components/Modal/Error';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  usersCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');
  const [codePool, setCodePool] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleCreatePool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      });

      const { code } = response.data;

      setCodePool(code);
      setIsError(false);
      setIsOpen(true);
      setPoolTitle('');
    } catch (error) {
      setIsOpen(false);
      setIsError(true);
      alert('Falha ao criar o bolão, tente novamente');
    }
  }

  async function handleClipboard() {
    await navigator.clipboard.writeText(codePool);
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto lg:grid lg:grid-cols-2 items-center gap-28 px-5 lg:px-0">
      <main className="mt-10 lg:mt-0">
        <Image src={logoSvg} alt="NLW Copa" className="mx-auto lg:mx-0" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight text-center lg:text-left">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex flex-col lg:flex-row items-center gap-2">
          <Image src={avataresImg} alt="" />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.usersCount}</span> pessoas
            já estão usando
          </strong>
        </div>

        <form
          action=""
          onSubmit={handleCreatePool}
          className="mt-10 flex flex-col lg:flex-row gap-2"
        >
          <input
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            value={poolTitle}
            onChange={event => setPoolTitle(event.target.value)}
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-700 transition-colors px-6 py-4 rounded
            text-gray-900 font-bold text-sm uppercase"
          >
            Criar meu bolão
          </button>

          <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
            <DialogPrimitive.Overlay className="fixed inset-0 bg-black/75 w-screen h-screen" />

            <DialogPrimitive.Portal>
              <DialogPrimitive.Content
                className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
          bg-gray-900 rounded p-10 max-w-md min-w-[20rem] md:w-full flex flex-col items-center"
              >
                <DialogPrimitive.Title className="text-sm font-medium text-gray-100 dark:text-gray-100">
                  Novo Bolão
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-100 dark:text-gray-100">
                  Bolão criado com sucesso, clique em copiar para obter o código
                </DialogPrimitive.Description>

                <h2 className="text-gray-100 font-bold text-2xl my-5">
                  {codePool}
                </h2>

                <DialogPrimitive.Close
                  onClick={handleClipboard}
                  className="inline-flex cursor-pointer justify-center rounded px-4 py-2 text-sm
                  bg-yellow-500 text-gray-900 font-bold hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-700 transition-colors
                  border border-transparent w-full"
                >
                  Copiar
                </DialogPrimitive.Close>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </form>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 mx-auto py-10 gap-3 border-y border-gray-600 flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between text-gray-100">
          <div className="flex items-center lg:gap-6 gap-3">
            <Image src={checkIconSvg} alt="" />
            <div className="flex flex-row items-center gap-3 lg:flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="lg:w-0.5 lg:h-14 bg-gray-600" />
          <div className="flex items-center lg:gap-6 gap-3">
            <Image src={checkIconSvg} alt="" />
            <div className="flex flex-row items-center gap-3 lg:flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
        <ModalError
          title="Erro ao criar bolão"
          description="Não foi possivel criar o bolão, tente novamente"
          open={isError}
          onOpenChange={setIsError}
        />
      </main>
      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação mobile"
        quality={90}
        className="mt-10 lg:mt-0 mx-auto lg:mx-0"
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, usersCountResponse] =
    await Promise.all([
      api.get('/pools/count'),
      api.get('/guesses/count'),
      api.get('/users/count'),
    ]);

  return {
    revalidate: 60 * 60, // 1 hour
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    },
  };
};
