import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { json, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Auth, AuthAPI } from "../../lib/Auth";
import { login, userLoginThunk } from "../../store/user";

const LoginPage = () => {
  const user = useSelector((state: RootState) => state.user.value)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user !== null) navigate('/')
  }, [user])

  async function handleFormLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const jsonData = Object.fromEntries(formData.entries()) as { email: string, password: string };
    setIsLoading(true)
    const response = await AuthAPI.login(jsonData)
    const data = await response.json()
    if (response.status >= 200 && response.status < 300) {
      setErrors(null)
      dispatch(userLoginThunk(data.jwt))
    } else {
      setErrors(data.message)
    }
    console.log(response)
    setIsLoading(false)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form onSubmit={handleFormLogin} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
              </div>
              <button type="submit" className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
            </form>
            <div className="text-red-500">
              {errors && JSON.stringify(errors)}
            </div>
          </div>
        </div>
      </div>
      {isLoading && <div className="absolute top-0 left-0 bg-white">
        LOADING...
      </div>}
    </>
  )
}

export default LoginPage;