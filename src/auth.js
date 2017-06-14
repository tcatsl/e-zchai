import decode from 'jwt-decode'
import auth0 from 'auth0-js'
import Router from 'vue-router'
import Auth0Lock from 'auth0-lock'
const ID_TOKEN_KEY = 'id_token'
const ACCESS_TOKEN_KEY = 'access_token'
const CLIENT_ID = '4LSs0DR68CpppXyNSt8Qmpzi6LY57FcI'
const CLIENT_DOMAIN = 'tcats.auth0.com'
const REDIRECT = 'https://e-zchai.cafe/callback'
//I did not write most of the functions in this file, but i did heavily modify some of them --tcats
var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
})

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    scope: "openid email"
  })
}

var router = new Router({
   mode: 'history',
})

export function logout() {
  clearIdToken()
  clearAccessToken()
  router.go('/')
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY)
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY)
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

// Get and store access_token in local storage
export function setAccessToken() {
  var accessToken = getParameterByName('access_token')
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

// Get and store id_token in local storage
export function setIdToken() {
  var idToken = getParameterByName('id_token')
  localStorage.setItem(ID_TOKEN_KEY, idToken)
}

export function isLoggedIn() {
  const idToken = getIdToken()
  if (!!idToken && !!isTokenExpired(idToken)){
    clearIdToken()
    clearAccessToken()
  }
  return !!idToken && !isTokenExpired(idToken)
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken)
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)
  return date
}
export function returnEmail() {
  if (!!isLoggedIn()){
    const token = decode(getIdToken())
    return token.email
  }
  return null
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}
