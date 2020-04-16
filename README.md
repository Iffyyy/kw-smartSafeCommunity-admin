
## Build Setup

```bash
# 克隆项目
git clone https://github.com/Iffyyy/kw-smartSafeCommunity-admin.git

# 进入项目目录
cd kw-smartSafeCommunity-admin

# 新建本地dev分支
git checkout -b dev

# 从dev分支上获取最新代码
git pull origin dev

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 提交代码

```bash
# 先拉取dev分支上最新的代码
git pull origin dev

# 查看本地代码修改的状态
git status

# 暂存修改的代码
git add 你改的文件

# 提交暂存的文件
git commit -m '修改了xxx部分'

# 从本地推到线上dev分支上
git push origin dev

```
end

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```
