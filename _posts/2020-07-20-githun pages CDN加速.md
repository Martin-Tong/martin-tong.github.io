---
layout: post
category: blog
tags: tools cdn seo
author: Martin Tong
keywords: github-pages  静态网页加速 CDN CDN加速 免费的个人博客托管 SEO优化
---

##### 在[如何使用gihubpages 托管自己的blog](/blog/2020/07/12/%E4%BD%BF%E7%94%A8jekyll+githubpages+travis.html)我们实现了利用jekyll编写博客并通过travis自动构建部署到githubpages上。但是现在有个问题，我们的blog现在是托管在github的服务器上，由于是海外服务器，所以不论是在访问速度还是国内的收索引擎抓取上都或多或少的有一些影响。所以本篇的内容是如果通过CDN解决这些影响。

首先了解什么是`CDN`。CDN(Content Delivery Network)即内容分发网络，是构建在现有网络基础之上的智能虚拟网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN的关键技术主要有内容存储和分发技术。（选自百度百科=.=）

我们的主要目的就是通过CDN加快我们访问自己blog的速度。实现的步骤如下：

#### **为自己的域名开通CDN加速服务**

提供CDN加速服务的平台有很多，我这里使用的腾讯云，各家也都应该有详细的使用指南。

首先在**腾讯云控制台 -> 内容分发网络 -> 域名管理**处添加域名：

![CDN setting](/assets/cdn/cdn-setting.jpg)

**域名：**自己需要加速的地址，即[如何使用gihubpages 托管自己的blog](/blog/2020/07/12/%E4%BD%BF%E7%94%A8jekyll+githubpages+travis.html)中的custom domain；

**源站地址：**github pages服务器所在的地址。可以通过`dig example.30erli.cn +nostats +nocomments +nocmd`确认。

**回源协议：**由于GitHub pages默认情况下强制使用https，如果你使用**https**的话可以选择HTTPS选项。一般**协议跟随**可以满足所有情况。

#### **使用HTTPS**

默认情况下GitHub pages使用的是https协议，为了通过我们的自定义域名以https的方式访问我们的blog，我们需要为自定义域名申请https证书（这里是'example.30erli.cn'）。如果没有配置证书直接通过**https://example.30erli.cn**访问的话浏览器会弹出安全警告并阻止访问。

![https error](/assets/cdn/https-error.jpg)

配置的方式很简单，可以到自己的域名服务商下申请一个免费的证书，然后在**腾讯云控制台 -> 内容分发网络 -> 证书管理**下配置。

#### **添加域名解析**

按照前面配置好CDN，接下来需要将我们的域名解析到正确的位置。

![dns](/assets/cdn/dns.jpg)

这里国内的访问我们CNAME到CDN服务分配给我们的地址，国外的访问依旧CNAME到默认的地址。

以上就是为GitHub pages开启CDN加速的全部步骤啦！