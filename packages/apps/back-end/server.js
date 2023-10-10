const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

// 添加CORS中间件  
app.use(cors());

// 设置静态文件目录  
// app.use(express.static(path.join(__dirname, 'public')));

// 解析原始数据  
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 读取Markdown文件内容  
app.get('/md/linkedList', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'linked-list.md');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});

// 启动服务器并监听端口  
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});