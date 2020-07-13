---
layout: post
category: blog
tags: tools 
---

>项目用到的工具：
>
>travis：[自动构建发布工具](https://travis-ci.org/)
>
>github pages：[免费的静态网站托管平台](https://pages.github.com/)
>
>jekyll：[基于ruby的静态网页生成工具](https://jekyllrb.com/)

##### 前言：
##### 之前就接触过jekyll，但是由于没有接触过ruby，同时使用这个工具需要学习些DSL，所以没有继续学习使用下去。最近在回顾NUXT，看到BUXT也有生成静态页面的功能，和jekyll比较了一下觉得jekyll用来做静态网站的开发工具体验会更好一点（可能是更有折腾的感觉吧）。所以就有了这个基于jekyll开发个人部落格。

## 工具安装

在使用任何一个工具之前，其文档必然会有详细的安装配置指南，这里我只写出基本的步骤和常用的指令，因为有些东西我也没有用到过。所以想完整的学习还是得靠官方的文档。

### jekyll：
既然是基于ruby的工具，首先要安装必要的环境依赖。以ubuntu下安装为例（更多平台安装[参照官方文档](https://jekyllrb.com/docs/installation/)）：
{% highlight ubuntu %}
sudo apt-get install ruby-full build-essential zlib1g-dev 
#注意涉及到权限问题最好把Ruby Gems不要安装在root用户下。
#可以把gems理解成npm或者pip，在不通过的用户或者项目下安装方便依赖管理
#配置用户gems安装目录
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
#最后安装jekyll
gem install jekyll bundler
{% endhighlight %}
推荐使用bundler，在我的理解里，bundler应该作用类似于 npm 的**package-lock.json**和 pip 下的**pip freeze >requirement.txt**用于管理当前项目下各依赖项目的版本。使用bundler也方便后面我们使用travis等自动构建发布工具。
{% highlight ruby %}
#国内用户解决gems源下载慢的问题可以如下方式解决
gem sources -c #清除当前的源
gem sources -a https://gems.ruby-china.com #添加国内镜像源

mkdir pjfloder
cd pjfloder
bundle init #生成Gemfile，如果需要使用国内镜像源需要修改文件里的source为“https://gems.ruby-china.com”
bundle config set --local path 'vendor/bundle' #配置bundle下载gems包放置的目录，推荐使用这个目录可以省去不少的步骤。我修改过，走了不少弯路又改回来了，都是泪。
bundle add jekyll #安装jekyll
bundle exec jekyll new --force --skip-bundle . #在当前目录初始化jekyll项目,由于当前目录下已经有内容了所以使用--force，注意后面那个'.'。
bundle install #因为jekyll初始化后默认有一些依赖项而上面我们使用了--skip-bundle，如默认的模板minima等。所以需要执行一下install不然后缺少依赖报错。
{% endhighlight %}
然后就可以愉快的进行**bundle exec jekyll build**或者**bundle exec jekyll serve**等步骤了。注意**bundle exec**如果使用了bundler的话要记住加这个前缀保证每次运行时的依赖项版本一致。

### gh pages：
gh pages是以git repo的形式存在的，所以使用gh pages首先需要申请一个repo。注意，如果是个人页面即仓库格式为**https://github.com/username/username.github.io**则需要设置仓库类型为public且要发布的页面必须放在master分支下。
创建仓库很简单，默认情况下仓库对应的gh pages网址为**https://username.github.io**。如果需要设置自定义域名就需要在仓库里设置：

![custome domain](/assets/jekyll/custom-domain.JPG)

这一步会在仓库根目录下生成一个名为**CNAME**的文件，无论什么时候push了都要保证这个文件一直存在于根目录下。最后就需要到自己的DNS解析服务商下做CNAME自己的域名到gh pages默认域名下了。

### travis：
travis是一个开源的自动构建及发布平台，使用travis不需要下载安装任何东西，所有的操作都可以通过[网页](https://travis-ci.org/)操作。我们唯一需要做的就是保证提交到远程仓库的文件中有一个**.travis.yml**文件以定制travis的构建行为。

[如前所述](#gh-pages)，当发布个人页面时需要将要展示的文件放在master分支下。那么如果需要travis编译的话(**exec bundle jekyll build**)我们的源文件应该放在哪呢？这个时候我们可以把源文件放在一些特殊分支下如gh-pages，这个分支只在需要发布项目页面的时候有用。


travis可以使用github账号登录，登陆后可以看到我们托管的所有public的项目，当然如果需要对private项目进行操作也可以通过设置解决。

我们的目的是让travis监听我们每次的push，然后构建我们的静态页面并发布到master分支下。要完成这个步骤travis也需要一些操作我们托管的仓库的权限：

GitHub setting >> Developer settings >> Personal access tokens
![申请PAT](/assets/jekyll/pat.JPG)

生成PAT选项中NOTE可以随便填写。一般情况下我们只需要repo >> public_repo权限，如果有特殊需要的话也可以酌情勾选。最后一定要保存下生成key，因为刷新页面后这个key就再也不可见了。

然后选中我们的github pages仓库，并点击右侧的setting：

![travis setting](/assets/jekyll/travis-setting.jpg)

通过如下方式添加travis虚拟机下的环境变量。NAME随便填写建议用易分辨的名字，除了NAME和VALUE外别的可不设置：

![use pat](/assets/jekyll/use-pat.jpg)

最后修改一下**.travis.yml**文件如下形式：
{% highlight yml %}
os: linux
language: ruby
rvm:
  - 2.5.1

cache: bundler #缓存目录，可加快下次编译

branches:
  only:
  - gh-pages #只监听gh-pages分支上的push事件

script: bundle exec jekyll huild

env:
  global:
  - NOKOGIRI_USE_SYSTEM_LIBRARIES=true

notifications:
  email: false

deploy:
  provider: pages
  skip_cleanup: true
  token: $GITHUB_ACCESS_TOKEN  # 之前设置存放PAT的环境变量
  target_branch: master #需要将编译生成的文件push到哪个分支
  local_dir: _site #要被push到master分支的目录
  on:
    branch: gh-pages
{% endhighlight %}

然后就可以愉快的写blog然后push。剩下的就交给travis啦！

