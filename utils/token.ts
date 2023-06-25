import jwtDecode from 'jwt-decode'

/**
 * Decode JWT token
 *
 * @param  {string} token
 * @returns {any} JWT token or false
 */
export const decodeJWT = (token: string): any => {
  if (!token) {
    return false
  }

  const decode = jwtDecode(token)
  if (process.server) {
    return decode
  }

  try {
    const tokenDecode = decode && JSON.parse(JSON.stringify(decode))
    return tokenDecode
  } catch (e) {
    console.error(e)
    return false
  }
}

/**
 * Check JWT token
 *
 * @param  {string} token
 * @returns {boolean} true if the specified token is alive token, false otherwise.
 */
export const isAliveJWT = (token: string): boolean => {
  if (!token) {
    return false
  }

  const tokenDecode = decodeJWT(token)
  if (tokenDecode && tokenDecode.exp * 1000 > new Date().getTime()) {
    return true
  }
  return false
}
