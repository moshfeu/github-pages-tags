[![https://nodei.co/npm/github-pages-tags.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/github-pages-tags.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/github-pages-tags)


[![HitCount](https://hits.dwyl.com/moshfeu/github-pages-tags.svg)](https://hits.dwyl.com/dwyl/start-here)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/moshfeu/github-pages-tags/issues)

## Introduction
You are display tags list on each post in your github pages website and this is good.<br />
But, usually, you want that those tags will be links to a tag page which will display all the posts
which contains the tag, right?<br />
The problem is that `jekyll` is a static "language" so you have to generate each page as static file.<br />
Will you do this manually? I don't think so.

## How it works?

After the package have been installed, this package modify the `package.json` and add to it a postcommit script.<br />
This script is reading all the tags in the site and generate a `.md` file for each of them under `/tags` folder.

## Installation

#### Step 1

```shell
npm install github-pages-tags --save
```

#### Step 2

create a _tag.html_ in _layout_ folder which will be the tag template.
This file should looks like:

```ruby
---
layout: default
---

<h1>`{{ page.title }}` posts</h1>

<div class="view">
  {% for post in site.posts %}
    {% if post.tags contains page.title %}
      {% include post-item.html post=post last=forloop.last %}
    {% endif %}
  {% endfor %}
</div>
```

#### Step 3 (optinal)

You can custom the plugin behavior by creating ~~`github-pages-tags.config.js`~~ `github-pages-tags.config.json`.

Here are the options:

```js
{
  // tag page title
  "title": "{{tag}}}",
  // tag page meta description
  "description": "Here are all the posts that related to {{tag}}",
  // generate only tag who have more than `minPostCount` posts. See link below:
  "minPostCount": 0
}
```

### Notes
- `{{tag}}` will be replaced by the actuall tag name.
- `minPostCount` - (<a href="https://savyagency.com/tags-and-categories-create-duplicate-content/" target="_blank">Why is good?</a>)
