import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        const user = await fetch('http://localhost:3000/api/adminLogin', {
          method: 'POST',
          body: JSON.stringify({ username: credentials.username, password: credentials.password }) ,
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        })
        if (user.ok) {
          const userDetails = await user.json()
          return userDetails[0]
        }
        else
          return false
      } catch (error) {
        console.log(error);
      }
    }
  })
]

const callbacks = {
  // Getting the JWT token from API response
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.token
    }

    return token
  },

  async session(session, token) {
    session.accessToken = token.accessToken
    return session
  }
}

const options = {
  providers,
  callbacks,
  pages: {
    error: '/admin'
  }
}

export default (req, res) => NextAuth(req, res, options)