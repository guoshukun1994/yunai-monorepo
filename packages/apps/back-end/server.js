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

// 读取 数据结构 - 链表 md 
app.get('/md/linkedList', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'datastructure/linked-list.md');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(`文件夹读取失败：${err}`);
            return;
        }
        res.send(data);
    });
});

// 读取 算法目录 - 组装目录下各文件数据
app.get('/md/sort-search', (req, res) => {
    const folderPath = path.join(__dirname, 'public', 'algorithm/sort-search');
    fs.readdir(folderPath, 'utf8', (err, files) => {
        if (err) {
            res.status(500).send(`文件夹读取失败：${err}`);
            return;
        }
        const result = {}
        let count = 0
        files.forEach(file => {
            const filePath = folderPath.concat('/', file)
            const key = file.split('.')[0]
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.status(500).send(`文件夹读取失败：${err}`);
                    return;
                }
                count++;
                result[key] = data;

                if (count === files.length) {
                    let sendRes = {};
                    ['bubble', 'select', 'insert'].forEach(key => {
                        sendRes[key] = result[key];
                    })
                    res.send(sendRes);
                }
            })
        })
    });
});

// 读取 js - 手写 md
app.get('/md/handwriting', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'basics/js/handwriting/index.md')
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(`文件读取失败：${err}`)
            return;
        }
        res.send(data);
    })
})

// 读取 js - 基础内功 md
app.get('/md/basement', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'basics/js/basement/index.md')
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(`文件读取失败：${err}`)
            return;
        }
        res.send(data);
    })
})

// 启动服务器并监听端口  
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});