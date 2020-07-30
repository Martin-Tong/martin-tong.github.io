---
category: blog
layout: post
tags: ubuntu nvm
keywords: ubuntu安装nvm 使用nvm管理node版本 nvm的安装
author: Martin Tong
---

> 在使用 node的时候经常有需要用到不同版本 node的需求。为了方便管理或者切换安装的 node版本，使用 [nvm](https://github.com/nvm-sh/nvm)是不错的选择。
> 本篇是 ubuntu上安装 nvm的记录。

#### **安装**

安装nvm前需要卸载原有的node和之前全局安装的依赖：

{% highlight bash %}
#查看包是否安装及路径 ex:command -v node
#查看原全局安装的依赖 npm ls -g ex: /usr/local/lib/node_modules
sudo apt-get remove --purge node 
rm -r node_modules路径
{% endhighlight %}

安装nvm：

官方推荐的方式是使用官方提供的脚本自动安装：

{% highlight bash %}
#注意安装的目录为当前路径下的.nvm目录，即'~/.nvm'
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

#然后添加下面脚本到~/.bash_profile, ~/.zshrc, ~/.profile, 或者 ~/.bashrc
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
{% endhighlight %}

但是不知道为什么，这个域名目前打不开，至少写本篇的时候打不开。所以，选择使用源码手动安装的方式：

{% highlight bash %}
#可以自定义安装目录 ex：$HOME/path/to path/.nvm
export NVM_DIR="$HOME/.nvm" && (
  git clone https://github.com/nvm-sh/nvm.git "$NVM_DIR"
  cd "$NVM_DIR"
  git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" $(git rev-list --tags --max-count=1)`
) && \. "$NVM_DIR/nvm.sh"

#然后添加下面脚本到~/.bashrc, ~/.profile, or ~/.zshrc使得每次登录系统时都能自动安装
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
{% endhighlight %}

到这里nvm安装完成，然后就可以通过nvm安装或者切换node版本。

#### **问题**

在使用nvm安装node的时候遇到的问题：

{% highlight bash %}
#安装
nvm install 10.16.3

#出现的错误
$>./configure --prefix=/home/martin/.nvm/versions/node/v10.16.3 <
./configure: 4: exec: python: not found
nvm: install v10.16.3 failed!
{% endhighlight %}

我本地安装的是`python3`，但是错误提示`exec: python: not found`。我的解决办法：`ln -fs /usr/bin/python3 /usr/bin/python`，如果出现权限限制加上`sudo`。