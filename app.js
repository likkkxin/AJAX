const express = require('express')
const app = express()
const bodyParser = require('body-parser');
//数据库操作
const mongoose=require('mongoose');
mongoose.connect('mongodb://jason:jason@127.0.0.1:27017/blog');
const emails = mongoose.model('email', { email: String });
// emails.create({"email":"sxrele@163.com"})
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/getajax', function (req, res) {
  res.send({"title":"饭店餐单","items":["孜然牛肉","羊肉饺子"]})
})

app.get('/search', function (req, res) {
  res.send(["世界","世界卫生组织","世界大战","世界杯"])
})

app.post('/verifyemail', async function (req, res) {
  // console.log(req.body);
  // res.send(req.body)
  let findemail=await emails.findOne({"email":req.body.email})
  console.log(findemail,req.body.email)
  if (!findemail) {
    res.send({"msg":"邮箱验证通过"})
    
  } else {
    res.send({"msg":"邮箱已存在，请更换邮箱"})
    
  }
  
})

app.listen(3000)