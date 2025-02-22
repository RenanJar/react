import Image from 'next/image'
import React, { useState } from 'react'

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center min-h-screen bg-blue-950 p-4">{children}</div>
)

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
    {children}
  </div>
)

const Form = ({
  children,
  onHandleSubmit
}: {
  children: React.ReactNode
  onHandleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
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
  )
}

const InputMail = ({ onEmailChange }: { onEmailChange: (value: string) => void }) => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onEmailChange(newValue)
  }

  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-medium">Email Address</label>
      <input
        type="email"
        className=" text-gray-600 w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        placeholder="coolname@name.com"
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}

const InputPassword = ({ onPasswoordChange }: { onPasswoordChange: (value: string) => void }) => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onPasswoordChange(newValue)
  }

  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-medium">Password</label>
      <input
        type="password"
        className=" text-gray-600 w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        placeholder="**********"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

const Buttons = () => (
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
        className="w-full bg-sky-400 text-white p-3 rounded-lg hover:bg-sky-600 transition font-medium"
      >
        Login
      </button>
    </div>
  </>
)

const Img = () => (
  <>
    <div className="w-1/2 hidden md:block relative">
      <Image
        src="/assets/logo.jpeg"
        alt="Login"
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-l-lg"
      />
    </div>
  </>
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(email)
    console.log(password)
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  return (
    <>
      <Container>
        <Card>
          <Img />
          <Form onHandleSubmit={handleSubmit}>
            <InputMail onEmailChange={handleEmailChange} />
            <InputPassword onPasswoordChange={handlePasswordChange} />
            <Buttons />
          </Form>
        </Card>
      </Container>
    </>
  )
}
