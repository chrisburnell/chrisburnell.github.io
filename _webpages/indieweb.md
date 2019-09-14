---
title: IndieWeb
lede: How I've implemented and interact with the <a href="https://indieweb.org" rel="external">IndieWeb</a>.
page_class: page--indieweb
---

<figure class="media">
    <img src="/images/content/indiewebcamp.svg" alt="IndieWebCamp logo">
</figure>

{% include_cached content/heading.liquid title='My Setup' %}

I author posts of various *types* on this website, some of which I syndicate to silos around the web.

<dl>
    <dt><h2 class="delta"><a href="/articles">Articles</a></h2></dt>
    <dd><a href="https://indieweb.org/PESOS" rel="external"><abbr title="Publish Elsewhere, Syndicate on Own Site">PESOS</abbr></a> the lede to <a href="{{ site.urls.twitter }}" rel="external">Twitter</a> and <a href="{{ site.urls.mastodon }}" rel="external">Mastodon</a> then to this website.</dd>
    <dt><h2 class="delta"><a href="/notes">Notes</a></h2></dt>
    <dd><a href="https://indieweb.org/PESOS" rel="external"><abbr title="Publish Elsewhere, Syndicate on Own Site">PESOS</abbr></a> the content to <a href="{{ site.urls.twitter }}" rel="external">Twitter</a> and <a href="{{ site.urls.mastodon }}" rel="external">Mastodon</a> then to this website.</dd>
    <dt><h2 class="delta"><a href="/bookmarks">Bookmarks</a></h2></dt>
    <dd><a href="https://indieweb.org/PESOS" rel="external"><abbr title="Publish Elsewhere, Syndicate on Own Site">PESOS</abbr></a> the URL and content to <a href="{{ site.urls.twitter }}" rel="external">Twitter</a> and <a href="{{ site.urls.mastodon }}" rel="external">Mastodon</a> then to this website.</dd>
    <dt><h2 class="delta"><a href="/pens">Pens</a></h2></dt>
    <dd>Ones that I’m especially proud of I will cross-post, manually, to this website.</dd>
    <dt><h2 class="delta"><a href="/beer">Beer</a></h2></dt>
    <dd><a href="https://indieweb.org/PESOS" rel="external"><abbr title="Publish Elsewhere, Syndicate on Own Site">PESOS</abbr></a> the check-in data from <a href="https://untappd.com" rel="external">Untappd</a> using my project, <a href="https://ownyour.beer" rel="external">OwnYourBeer</a>, to this website.</dd>
    <dt><h2 class="delta"><a href="/books">Books</a></h2></dt>
    <dd>Typically posted only on this website.</dd>
    <dt><h2 class="delta"><a href="/music">Music</a></h2></dt>
    <dd>Typically posted only on this website.</dd>
</dl>

I still need to do some work to change my syndication model from <abbr title="Publish Elsewhere, Syndicate on Own Site">PESOS</abbr> to <abbr title="Publish on Own Site, Syndicate Elsewhere">POSSE</abbr>. At the moment, because my Micropub endpoint doesn’t have the ability to modify an existing post, I first post to *Twitter* and/or *Mastodon* and grab the permalinks from the responses which are then pumped into the front matter as syndication targets of the post when it gets posted to *GitHub*.


{% include_cached content/heading.liquid title='Tools Used' %}

To handle *incoming* webmentions, I use *[Webmention.io](https://webmention.io){:rel="external"}*, which takes care of parsing microformats and all sorts of filtering to ensure I’m not printing spam or advertisements on my website.

To syndicate interactions on my content inside silos, I use *[Bridgy](https://brid.gy){:rel="external"}* to push those interactions through *Webmention.io* and onto my website.

*Outgoing* webmentions are handled for me by *[Telegraph](https://telegraph.p3k.io){:rel="external"}*, which also takes care of microformats parsing and endpoint discovery for each link in my content.

I also take advantage of both *[Bridgy Fed](https://fed.brid.gy){:rel="external"}* and *[Switchboard](https://switchboard.p3k.io){:rel="external"}* to interact with federated networks and to make *[WebSub](https://indieweb.org/WebSub){:rel="external"}* and *[ActivityPub](https://activitypub.rocks){:rel="external"}* work.

Lastly, I use *[OwnYourBeer](https://ownyour.beer){:rel="external"}* to syndicate check-ins from *[Untappd](https://untappd.com){:rel="external"}* to my [beer](/beer) category</a>.


{% include_cached content/heading.liquid title='Thanks' %}

As much work as I’ve put into my sections of code, I have to give a massive thanks to a handful of people that helped to make all of this happen, as there’s no way I could have done all this myself.

<dl>
    <dt><a href="https://adactio.com" rel="external">Jeremy Keith</a></dt>
    <dd>*for* <a href="https://gist.github.com/adactio/8168e6b78da7b16a4644" rel="external">Minimum micropub endpoint</a></dd>
    <dt><a href="https://aaronparecki.com" rel="external">Aaron Parecki</a></dt>
    <dd>*for* <a href="https://atlas.p3k.io" rel="external">Atlas</a>, <a href="https://switchboard.p3k.io" rel="external">Switchboard</a>, <a href="https://telegraph.p3k.io" rel="external">Telegraph</a>, and <a href="https://webmention.io" rel="external">Webmention.io</a></dd>
    <dt><a href="https://snarfed.org" rel="external">Ryan Barrett</a></dt>
    <dd>*for* <a href="https://brid.gy" rel="external">Bridgy</a> and <a href="https://fed.brid.gy" rel="external">Bridgy Fed</a></dd>
</dl>