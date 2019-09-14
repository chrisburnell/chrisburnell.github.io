---
page_class: page--books

redirect_from:
- book.html
- bookshelf.html
- read.html
- reading.html
- category/book.html

title: Bookshelf
lede: Tracking books I've read, am reading, and want to read.

feed: /books.xml
sparkline: books
---

*There are {{ site.categories.book | size }} published Book Reviews.*

<ol class="shelf  h-feed" id="books" role="list">
    {% assign books_to_read = site.categories.book | where_exp: 'book', 'book.date == nil' | sort: 'title' %}
    {% for page in books_to_read %}
        {% include components/item_shelf.liquid %}
    {% endfor %}
    {% assign books = site.categories.book | where_exp: 'book', 'book.date' %}
    {% for page in books %}
        {% include components/item_shelf.liquid %}
    {% endfor %}
</ol>

--------

{% include components/buttons_categories.liquid %}