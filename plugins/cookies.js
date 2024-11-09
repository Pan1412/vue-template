import Cookies from 'universal-cookie'

export default defineNuxtPlugin(() => {
  const cookies = new Cookies()

  // ฟังก์ชันสำหรับตั้งค่าคุกกี้ให้หมดอายุใน 3 ชั่วโมง
  const setCookie = (name, value) => {
    const now = new Date()
    const expireTime = new Date(now.getTime() + 8 * 60 * 60 * 1000) // เพิ่ม 3 ชั่วโมง
    // const expireTime = new Date(now.getTime() + 2 * 60 * 1000)
    cookies.set(name, value, {
      path: '/',
      expires: expireTime
    })
  }

  // ฟังก์ชันสำหรับดึงค่าคุกกี้
  const getCookie = (name) => {
    return cookies.get(name)
  }

  // ฟังก์ชันสำหรับลบคุกกี้
  const removeCookie = (name) => {
    cookies.remove(name, { path: '/' })
  }

  // คืนค่าและให้ใช้ฟังก์ชันในทุก component ผ่าน $cookies
  return {
    provide: {
      cookies: {
        setCookie,
        getCookie,
        removeCookie
      }
    }
  }
})
