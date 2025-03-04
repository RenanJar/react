import Image from 'next/image';
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getRestaurante } from '@/services/api/restaurante.api';

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center min-h-screen bg-blue-950 p-4">{children}</div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
    {children}
  </div>
);

const Form = ({
  children,
  onHandleSubmit,
}: {
  children: React.ReactNode;
  onHandleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <>
      <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-emerald-400 mb-4">Cada Prato, Uma História</h2>
        <p className="text-gray-500 mb-6">
          Realize seu login para explorar tudo o que preparamos para você.
        </p>
        <form onSubmit={onHandleSubmit}>{children}</form>
      </div>
    </>
  );
};

const InputMail = ({
  isDisabled,
  onEmailChange,
}: {
  isDisabled: boolean;
  onEmailChange: (value: string) => void;
}) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onEmailChange(newValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-medium">Email Address</label>
      <input
        type="email"
        className=" text-gray-600 w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        placeholder="coolname@name.com"
        onChange={handleChange}
        value={value}
        disabled={isDisabled}
      />
    </div>
  );
};

const InputPassword = ({
  isDisabled,
  onPasswordChange,
}: {
  isDisabled: boolean;
  onPasswordChange: (value: string) => void;
}) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onPasswordChange(newValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-medium">Password</label>
      <input
        type="password"
        className=" text-gray-600 w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        placeholder="**********"
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
      />
    </div>
  );
};

const Buttons = ({ isLoading }: { isLoading: boolean }) => (
  <>
    <div className="flex justify-between items-center mb-6">
      <div>
        <input type="checkbox" id="remember" className="mr-2" />
        <label htmlFor="remember" className="text-gray-600 text-sm">
          Remember me
        </label>
      </div>
      <a href="#" className="text-emerald-400 text-sm hover:underline">
        Forgot password
      </a>
    </div>
    <div className="flex space-x-4">
      <button
        type="submit"
        className="w-full bg-sky-400 text-white p-3 rounded-lg hover:bg-sky-600 transition font-medium flex items-center justify-center "
      >
        <span className="mr-2">Login</span>
        {isLoading && <Spinner></Spinner>}
      </button>
    </div>
  </>
);

const Img = () => (
  <>
    <div className="w-1/2 hidden md:block relative">
      <Image
        src="/assets/logo.jpeg"
        alt="Login"
        fill
        priority
        sizes="50vw"
        style={{ objectFit: 'cover' }}
        className="rounded-l-lg"
      />
    </div>
  </>
);

const Spinner = () => {
  return (
    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  );
};

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const domain = window.location.hostname;
      const restaurante = await getRestaurante(domain);
      if (restaurante && restaurante.data) {
        await login(email, password, restaurante.data.resturautanteId);
        console.log('Login realizado com sucesso');
      } else {
        throw new Error('Restaurante não encontrado');
      }
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <Container>
      <Card>
        <Img />
        <Form onHandleSubmit={handleSubmit}>
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
          <InputMail onEmailChange={setEmail} isDisabled={isLoading} />
          <InputPassword onPasswordChange={setPassword} isDisabled={isLoading} />
          <Buttons isLoading={isLoading} />
        </Form>
      </Card>
    </Container>
  );
}
