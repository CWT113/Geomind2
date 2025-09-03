# Docker 安装教程

基于 CentOS9 安装 Docker 的步骤。

### 1.卸载旧版本

如果系统中已经安装了旧版本的 Docker，需要先进行卸载：

```bash
yum remove -y docker \
              docker-client \
              docker-client-latest \
              docker-common \
              docker-latest \
              docker-latest-logrotate \
              docker-logrotate \
              docker-engine
```



### 2.安装 yum 工具

安装 `yum-utils` 以便下载和管理软件包：

```bash
yum install -y yum-utils
```



### 3.配置 Docker 仓库

添加 Docker 官方或阿里云镜像源：

```bash
# Docker官方镜像源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 阿里云镜像源（推荐国内用户）
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```



### 4.安装 Docker

运行以下命令安装 Docker 及其相关组件：

```bash
yum install -y docker-ce \
               docker-ce-cli \
               containerd.io \
               docker-buildx-plugin \
               docker-compose-plugin
```



### 5.启动 Docker

启动 Docker 服务，并设置开机自启：

```bash
# 启动 Docker
systemctl start docker

# 设置开机自启
systemctl enable docker
```



### 6.配置镜像加速器

为了提升国内访问速度，可配置 [阿里云镜像加速器](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)，或者下面的加速节点（亲测可用）：

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
      "https://proxy.vvvv.ee",
      "https://docker.1panel.live"
  ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```



### 7.常用命令

```bash
# 查看版本
docker -v

# 查看 Docker 状态
systemctl status docker

# 停止 Docker 服务
systemctl stop docker

# 重启 Docker 服务
systemctl restart docker

# 设置开机自启
systemctl enable docker
```
