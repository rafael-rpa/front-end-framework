# Front-end Checklist

### Meta
- [ ] Language attribute <sup>*1</sup>
- [ ] Character encoding charset attribute <sup>*2</sup>
- [ ] X-UA-Compatible meta tag <sup>*3</sup>
- [ ] Viewport meta tag <sup>*4</sup>
- [ ] Title
- [ ] Description and author meta tags <sup>*5</sup>
- [ ] Favicon, Android icons, iOS icons, etc. <sup>*6</sup>
- [ ] Facebook Open Graph meta tags <sup>*7</sup>
- [ ] Twitter Cards meta tags <sup>*8</sup>

### Accessibility
- [ ] ARIA landmark roles and labels <sup>*9</sup>
- [ ] Links have :focus state
- [ ] Images alt text provided

### Performance
- [ ] Concatenate and minify JavaScript and CSS files
- [ ] Server performance and security settings (Gzip compression, Expires headers, Cross-origin requests, etc.) <sup>*10</sup>
- [ ] Cache busting <sup>*11</sup>
- [ ] Optimize images (and SVGs)

### SEO
- [ ] Set preferred domain (www or non-www) <sup>*12</sup>
- [ ] Consistently adopt trailing slash or not <sup>*13</sup>
- [ ] Sitemap
- [ ] robots.txt <sup>*14</sup>
- [ ] Schema.org Microdata markup <sup>*15</sup>
- [ ] Google Search Console (Webmaster Tools)

### General
- [ ] Error pages (404, 500, etc.)
- [ ] Print version
- [ ] Google Analytics

### Tests
- [ ] Code linting (JavaScript, SCSS, etc.)
- [ ] Forms testing (HTML5 specific input types, validation, submission, response)
- [ ] Social media share functionality
- [ ] Cross-browser testing
- [ ] Test across devices

### Validation
- [ ] [HTML Validation](https://validator.w3.org/)
- [ ] [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
- [ ] [WebPagetest](http://www.webpagetest.org/)
- [ ] [Pingdom Speed Test](http://tools.pingdom.com/)
- [ ] [Facebook Open Graph Debug](https://developers.facebook.com/tools/debug/)
- [ ] [Twitter Cards Validaton](https://cards-dev.twitter.com/validator)
- [ ] [Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/)

-------------------------------------------------------------------------------------------------

#### <sup>*1</sup> Language attribute
Refer to the language tags from [IANA Language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).
```html
<html lang="en">
```

#### <sup>*2</sup> Character encoding charset attribute
```html
<meta charset="utf-8">
```

#### <sup>*3</sup> X-UA-Compatible meta tag
```html
<meta http-equiv="x-ua-compatible" content="ie=edge">
```

#### <sup>*4</sup> Viewport meta tag
Remember to avoid "maximum-scale=1" as it harms accessibility and usability.
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

#### <sup>*5</sup> Description and author meta tags
Note that keywords meta tag is not being used and the reason for this is that Google ignore this tag and for others major search engines you are running the risk of more potential harm than good when using the keyword meta tag.
```html
<meta name="description" content="">
<meta name="author" content="">
```

#### <sup>*6</sup> Favicon, Android icons, iOS icons, etc.
In order to easily generate them you can use services like [RealFaviconGenerator](http://realfavicongenerator.net/).
```html
<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="/manifest.json">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/mstile-144x144.png">
<meta name="theme-color" content="#ffffff">
```

#### <sup>*7</sup> Facebook Open Graph meta tags 
For a more in-depth documentation see the [Open Graph protocol](http://ogp.me/) or the [Facebook OG markup document](https://developers.facebook.com/docs/sharing/webmasters#markup).
```html
<meta property="og:site_name" content="">
<meta property="og:title" content="">
<meta property="og:description" content="">
<meta property="og:type" content="website">
<meta property="og:url" content="http://www.example.com/">
<meta property="og:image" content="http://www.example.com/path/to/image.jpg">
```

#### <sup>*8</sup> Twitter Cards
Refer to the [Cards Markup Tag Reference](https://dev.twitter.com/cards/markup) for a more detailed documentation. Note that Twitter will use Open Graph when Cards is not available.
```html
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@account_username">
<meta name="twitter:title" content="">
<meta name="twitter:description" content="">
<meta name="twitter:image" content="http://www.example.com/path/to/image.jpg">
```

#### <sup>*9</sup> ARIA landmark roles and labels
Below you will find some landmarks examples and for a more detailed document refer to the [WAI-ARIA roles page](https://www.w3.org/TR/wai-aria/roles). 

It is also worth remembering that when you validate your HTML using landmark roles, you will receive a warning stating these roles are redundant. In HTML5, several of the landmark roles are implicit via the native structural element which is supported by most modern desktop browsers with the exception of IE and iOS Safari.
```html
<header role="banner"> 
<nav role="navigation"> 
<main role="main"> 
<article role="article"> 
<aside role="complementary"> 
<footer role="contentinfo"> 
<section role="region">
<form role="search"> 
```

Note that you can take a step further and describe a landmark using the aria-label attribute as it will not be displayed on screen but is relayed to the screen reader user. This can be very helpful, for instance, if you have multiple navigation areas within a single page: 
```html
<nav role="navigation" aria-label="main navigation">
<nav role="navigation" aria-label="secondary navigation">
```

Make sure that if there is visible text labeling the element, use aria-labelledby instead.
```html
<nav role="navigation" aria-labelledby="follow-us-heading">
    <h2 id="follow-us-heading">Follow us</h2>
```

You can also use aria-labels to provide an invisible label where a visible label cannot be used, such as:
```html
<button aria-label="close">X</button>
```

#### <sup>*10</sup> Server performance and security settings (Gzip compression, Expires headers, Cross-origin requests, etc.)
If you are using Apache as your webserver feel free to use the [.htaccess](https://github.com/rafael-rpa/front-end-framework/blob/master/.htaccess) from the Front-end Framework or for a more detailed collection of directives refer to [.htaccess Snippets](https://github.com/phanan/htaccess). It is worth remembering that if you have access to the main server config file you should add all directives there instead of in the .htaccess, as using .htaccess files slows down your Apache server.


#### <sup>*11</sup> Cache busting
Remember to cache bust your assets, mainly if you are serving them with far-future expires headers. Note that if you do not control versioning with filename-based cache busting you should consider lowering the cache time (e.g. one week).


#### <sup>*12</sup> Set preferred domain (www or non-www)
If you would like to go for the Apache .htaccess approach (check footnote #10 for some important considerations) find below both snippets:  

**Redirect to www**
```apacheconf
<IfModule mod_rewrite.c>
    RewriteEngine on
    RewriteCond %{HTTP_HOST} !^$
    RewriteCond %{HTTP_HOST} !^www\. [NC]
    RewriteCond %{HTTPS}s ^on(s)|
    RewriteRule ^ http%1://www.%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</IfModule>    
```
**Redirect to non-www**
```apacheconf
<IfModule mod_rewrite.c>
    RewriteEngine on
    RewriteCond %{HTTP_HOST} ^www\.
    RewriteCond %{HTTPS}s ^on(s)|off
    RewriteCond http%1://%{HTTP_HOST} ^(https?://)(www\.)?(.+)$
    RewriteRule ^ %1%3%{REQUEST_URI} [R=301,L]
</IfModule>
```

#### <sup>*13</sup> Consistently adopt trailing slash or not
Once again if you have decided to go for the Apache .htaccess solution (check footnote #10 for some important considerations) find below both snippets:

Note that if you already added the ```RewriteEngine on``` you do not need to add again.

**Force Trailing Slash**
```apacheconf
<IfModule mod_rewrite.c>
    RewriteEngine on
    RewriteCond %{REQUEST_URI} /+[^\.]+$
    RewriteRule ^(.+[^/])$ %{REQUEST_URI}/ [R=301,L]
</IfModule>    
```
**Remove Trailing Slash**
```apacheconf
<IfModule mod_rewrite.c>
    RewriteEngine on
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [R=301,L]
</IfModule>
```

#### <sup>*14</sup> robots.txt
Find some examples below and for a more detailed explanation see [robotstxt.org](http://www.robotstxt.org/robotstxt.html).

**Allow all robots complete access**
```
User-agent: *
Disallow:
```
**Exclude all robots from the entire server**
```
User-agent: *
Disallow: /   
```

#### <sup>*15</sup> Schema.org Microdata markup
[Schema.org](https://schema.org/docs/gs.html) provides a collection of shared vocabularies that you can use to mark up your pages in order to help search engines and other applications to better understand the content and display it in a useful and relevant way. Find below an example of Microdata usage:
  
```html
<div itemscope itemtype="http://schema.org/Person">
    <h1 itemprop="name">John Doe</h1>
    <img src="johndoe.jpg" itemprop="image" alt="Photo of John Joe">
    <h2 itemprop="jobTitle">Job Title</h2>
    <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <span itemprop="streetAddress">123 Lorem Ipsum Street</span>,
        <span itemprop="addressLocality">City</span>,
        <span itemprop="addressRegion">ST</span>,
        <span itemprop="postalCode">12345</span>
    </div>
    <span itemprop="telephone">(12) 3456-7890</span>
    <a href="mailto:johndoe@example.com" itemprop="email">johndoe@example.com</a>
    <a href="http://www.example.com/johndoe/" itemprop="url">example.com/johndoe</a>
</div>
```
