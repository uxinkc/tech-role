/// FAKE API

const apiData = {

  auth: { loggedIn: true }
}

export const authService = {

  getData (callback) {
    setTimeout(() => callback( apiData ), 500)
  }

}
