const router = require('express').Router();
const multer  = require('multer');
const upload = multer();
const { getUser } = require('../../DB/db');
const filesController = require('../controllers/files.controller');

router.get('/', async (req, res) => {
  res.send('Hello World!');
});

router.get('/files', async (req, res) => {
  const response = await filesController.getTextFiles();
  res.status(200).send(response);
});

router.post('/paths', async (req, res) => {
  const data = req.body;
  const response = filesController.setObjectPath(data);
  res.status(200).send(response);
});

router.post('/parse',  upload.single('file') ,async (req, res) => {
  const {userId, file} = req.body;
  const user = getUser(userId);
  const response = await filesController.parseFile(user, file);

  if (!response) {
    res.status(403).send('not allowed');
    return;
  }
  res.status(200).send('allowed');
});

module.exports = router;