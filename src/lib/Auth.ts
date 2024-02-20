export class Auth {
  BASE_URL = 'http://localhost:3000'
  async login(data: { email: string, password: string }) {
    return await fetch(this.BASE_URL + `/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
  
  async getuserDetails(jwt: string) {
    const response = await fetch(this.BASE_URL + `/user/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + jwt,
      },
    })
    return await response.json()
  }
}

export const AuthAPI = new Auth()