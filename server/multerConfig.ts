import multer from 'multer'

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/profile')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const uploadProfileImg = multer({
  storage: profileStorage,
  limits: { fileSize: 81000 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/svg+xml' ||
      file.mimetype === 'image/webp'
    ) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  },
})

export default uploadProfileImg
