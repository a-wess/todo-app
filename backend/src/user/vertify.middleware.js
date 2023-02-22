import jwt from 'jsonwebtoken'

export default function verify (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] ?? null
  if (!token) {
    return res.status(403).send('Token is missing')
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    req.userId = decoded.userId
  } catch (err) {
    return res.status(403).send('Invalid Token')
  }
  return next()
}
