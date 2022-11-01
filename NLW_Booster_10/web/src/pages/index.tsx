import { FormEvent, useState } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';

import { api } from '../lib/axios';

import appPreviewImg from '../assets/app-preview.png';
import avataresImg from '../assets/avatares.png';
import logoSvg from '../assets/logo.svg';
import checkIconSvg from '../assets/check-icon.svg';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  usersCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');
  async function handleCreatePool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert(
        `Bolão criado com sucesso, o códico foi copiado para a área de transferancia: ${code}`
      );

      setPoolTitle('');
    } catch (error) {
      alert('Falha ao criar o bolão, tente novamente');
    }
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
