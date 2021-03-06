---
title: Bowhead
photo: https://chrisburnell.com/images/bowhead.png
show_webmentions: true
eleventyComputed:
  tagline: "Bowhead v{{ pkg['dependencies']['@chrisburnell/bowhead'] | replace('^', '') }}"
  lede: "Memorable and maintainable design tokens in SCSS.<br>There are {{ github.bowhead['stargazers_count'] }} star-gazers <a href='https://github.com/chrisburnell/bowhead'>on GitHub</a> and it was downloaded {{ npm.bowhead['downloads'] }} times in the last month <a href='https://www.npmjs.com/package/@chrisburnell/bowhead'>on npm</a>."
---

<figure>
    <picture class="pixelated">
        <source srcset="/images/bowhead.webp" type="image/webp" />
        <img class="pixelated" src="/images/bowhead.png" alt="" role="presentation">
    </picture>
    <figcaption><p>A lovely <a href="https://en.wikipedia.org/wiki/Bowhead_whale">bowhead whale</a>. I’d love other suggestions! 😅</p></figcaption>
</figure>

## What?

**Bowhead** is a small SCSS framework on which to implement your design tokens, spitting out CSS Variables with optional fallbacks.

## Why?

Implementing a design system or even just a series of simple design tokens can come with some unpredictable mental overhead. **Bowhead** aims to reduce that mental overhead by abstracting the specifics of design tokens into human-sensible formats and nomenclature.

This has a positive effect that ranges from giving the colours in your design system fun and memorable names, to the time and effort saved when communicating about these colours with collaborators without getting bogged down by details, because let’s be real: you don’t want *or need* to memorise the six-character hex value for all your colours, nor does anyone else! Now imagine that scenario when applied to multiple times more design tokens.

## Installation

Yoink it [from npm](https://www.npmjs.com/package/@chrisburnell/bowhead):

```
npm install @chrisburnell/bowhead
```

You can also just download it directly [from GitHub](https://github.com/chrisburnell/bowhead): <samp>[https://github.com/chrisburnell/bowhead/archive/master.zip](https://github.com/chrisburnell/bowhead/archive/master.zip)</samp>

## What are <q>types of values</q>?

```css
selector {
    property: value;
}
```

An important first step to using *Bowhead* is to understand how it organises CSS properties into different <q>types</q>. By and large, this is done by looking at what the *expected* values for a given property are:

```css
selector {
    background-color: #b22222;
    color: #3cb371;
    outline-color: #d2b48c;

    padding: 0.5rem;
    margin: 2rem;

    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
}
```

If we take the above snippet as an example, we can quickly identify two <q>types</q> of values present: colors and measures. *Colors* typically stand out quite easily, and, historically, developers have done well to assign colors to variables to simplify their use throughout the codebase. *Measures* (or *sizes*), on the other hand, are rarely seen reflected as design tokens in *CSS* despite their frequent prescence in other forms of design tokens, e.g. the space around a logo or iconography is usually defined in a brand's guidelines.

Despite being presented in different formats, we can confidently say that `background-color`, `color`, and `outline-color` expect a *color*-type value, not just because <q>color</q> is in their names, but because we can interchange the values between the properties and they still make sense.

Measures can take trickier forms to identify and categorise, and I recommend allowing for more measures than you might expect at first and paring it back later. Getting everything categorised is the hard part; swapping tokens later becomes very trivial off the back of this up-front effort. Regardless, I attach any kind of distance-related value to a measure, and, once again, we could interchange any of the values between `padding`, `margin`, `border-width`, or `width` and the CSS still makes sense.

Extrapolating from here across the vast variety of CSS *properties* and the *types of values* they expect, you end up with a map of *most properties* against value types:

<table>
    <thead>
        <tr>
            <th>color</th>
            <th>measure</th>
            <th>alignment</th>
            <th>…</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code>background-color</code><br>
                <code>border-color</code><br>
                <code>outline-color</code><br>
                <code>color</code><br>
                <code>fill</code><br>
                <code>stroke</code><br>
                <code>…</code>
            </td>
            <td>
                <code>width</code><br>
                <code>height</code><br>
                <code>padding</code><br>
                <code>margin</code><br>
                <code>border-width</code><br>
                <code>min-width</code><br>
                <code>max-width</code><br>
                <code>…</code>
            </td>
            <td>
                <code>align-items</code><br>
                <code>justify-content</code><br>
                <code>…</code>
            </td>
        </tr>
    </tbody>
</table>

With this knowledge under our belt, we can begin to define the design tokens for our particular project by fleshing out what *values* are available underneath each *type*:

<table>
    <thead>
        <tr>
            <th>color</th>
            <th>measure</th>
            <th>alignment</th>
            <th>…</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code>#b22222</code><br>
                <code>#3cb371</code><br>
                <code>#d2b48c</code><br>
                <code>…</code>
            </td>
            <td>
                <code>1em</code><br>
                <code>20px</code><br>
                <code>2px</code><br>
                <code>…</code>
            </td>
            <td>
                <code>flex-start</code><br>
                <code>flex-end</code><br>
                <code>center</code><br>
                <code>…</code>
            </td>
        </tr>
    </tbody>
</table>

## Usage

<table>
    <thead>
        <tr>
            <th></th>
            <th>Values</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><code>$bowhead-variable-as-default</code><br><em>(optional)</em></th>
            <td style="white-space:nowrap">
                <strong>true</strong> <em>(default)</em><br>
                <strong>false</strong>
            </td>
            <td>Decides whether or not use the CSS Variable or raw value when calling the <samp>@v</samp> function.</td>
        </tr>
        <tr>
            <th><code>$bowhead-show-fallback</code><br><em>(optional)</em></th>
            <td style="white-space:nowrap">
                <strong>true</strong> <em>(default)</em><br>
                <strong>false</strong>
            </td>
            <td>Decides whether or not to show a fallback value for the CSS Variable. Only works when <samp>$bowhead-variable-as-default</samp> is also <samp>true</samp>.</td>
        </tr>
        <tr>
            <th><code>$bowhead-generate</code><br><em>(optional)</em></th>
            <td style="white-space:nowrap">
                <strong>true</strong> <em>(default)</em><br>
                <strong>false</strong>
            </td>
            <td>Decides whether or not to generate CSS Variables for you.</td>
        </tr>
        <tr>
            <th><code>$bowhead-property-map</code><br><em>(optional)</em></th>
            <td><a href="#property-map">See below.</a></td>
            <td>Defines which <q>types of values</q> each CSS property should map against.</td>
        </tr>
        <tr>
            <th><code>$bowhead-tokens</code></th>
            <td><a href="#tokens">See below.</a></td>
          <td>Defines the design token values, categorised by <q>types of values</q>.</td>
        </tr>
    </tbody>
</table>

<h3 id="default">01. Variable As Default</h3>

<div class="columns"><div class="owl">

```scss
$bowhead-variable-as-default: true;
body {
    color: v(color, brick);
}
```

```css
body {
    color: var(--color-brick);
}
```

</div><div class="owl">

```scss
$bowhead-variable-as-default: false;
body {
    color: v(color, brick);
}
```

```css
body {
    color: #b22222;
}
```

</div></div>

<h3 id="fallback">02. Show Fallback Value</h3>

<div class="columns"><div class="owl">

```scss
$bowhead-variable-as-default: true;
$bowhead-show-fallback: true;
body {
    @include v(color, desert);
}
```

```css
body {
    color: #d2b48c;
    color: var(--color-desert);
}
```

</div><div class="owl">

```scss
$bowhead-variable-as-default: true;
$bowhead-show-fallback: false;
body {
    @include v(color, desert);
}
```

```css
body {
    color: var(--color-desert);
}
```

</div></div>

When <samp>$bowhead-variable-as-default</samp> is <samp>false</samp>, <samp>$bowhead-show-fallback</samp> has no effect.

<div class="columns"><div class="owl">

```scss
$bowhead-variable-as-default: false;
$bowhead-show-fallback: true;
body {
    @include v(color, desert);
}
```

```css
body {
    color: #d2b48c;
}
```

</div><div class="owl">

```scss
$bowhead-variable-as-default: false;
$bowhead-show-fallback: false;
body {
    @include v(color, desert);
}
```

```css
body {
    color: #d2b48c;
}
```

</div></div>

<h3 id="generate">03. Generating CSS Variables</h3>

<div class="columns"><div class="owl">

```scss
$bowhead-generate: true;
```

```css
:root {
    --measure-small: 0.5rem;
    --measure-medium: 1rem;
    --measure-large: 2rem;
    --color-brick: #b22222;
    --color-plankton: #3cb371;
    --color-desert: #d2b48c;
    --opacity-alpha: 0.8;
    --opacity-beta: 0.5;
    --opacity-gamma: 0.2;
    --z-index-below: -1;
    --z-index-root: 0;
    --z-index-default: 1;
    --z-index-above: 2;
}
```

</div><div class="owl">

```scss
$bowhead-generate: false;
```

Nothing is generated!

</div></div>

<h3 id="property-map">04. Property Map <em>(optional)</em></h3>

`$bowhead-property-map` is another `map` that contains mappings from CSS properties (`padding-left`, `border-bottom-right-radius`, etc.) to our defined design token "types" (`measure`, `color`, etc.), i.e.

```scss
$bowhead-property-map: (
    width: measure,
    min-width: measure,
    max-width: measure,
    height: measure,
    min-height: measure,
    max-height: measure,
    ...
)
```

If you wish, you can create new mappings or overwrite existing defaults by defining your own property map, e.g.

```scss
$bowhead-property-map: (
    vertical-align: alignments
);
```

Where `alignments` would be one of your design token "types", e.g.

```scss
$bowhead-tokens: (
    alignments: (
        default: baseline,
        alternate: middle
    ),
    ...
);
```

**Bowhead** will merge new types in your defined map into its own defaults automatically! Any that you re-declare will overwrite what exists as a default from *Bowhead*.

<h3 id="tokens">05. Tokens</h3>

`$bowhead-tokens` expects an *SCSS* `map` of "types" of tokens. These types could be a *measure*, *color*, *opacity*, *z-index*, etc.

```scss
$bowhead-tokens: (
    measure: (
        small:  0.5rem,
        medium:   1rem,
        large:    2rem,
    ),
    color: (
        brick:    #b22222,
        plankton: #3cb371,
        desert:   #d2b48c
    ),
    opacity: (
        alpha: 0.8,
        beta:  0.5,
        gamma: 0.2
    ),
    z-index: (
        below:  -1,
        root:    0,
        default: 1,
        above:   2
    )
);
```

--------

Then you’ll have to include **Bowhead** in your SCSS somehow. You could use *Webpack* or something like that, or if you’re using *npm*, the below code snippet should suffice.

Take note that you need to define any of your **Bowhead** variables (`$bowhead-tokens`, `$bowhead-show-fallback`, `$bowhead-generate`(, `$bowhead-property-map`)) before importing **Bowhead** into your SCSS!

```scss
$bowhead-tokens: (
    ...
);
$bowhead-show-fallback: true;
$bowhead-generate: true;
$bowhead-property-map: (
    ...
);

@import "node_modules/@chrisburnell/bowhead/bowhead";
```

Finally, you can use either **Bowhead's** `@v` function, `@v` mixin, both, or just the CSS Variables it can spit out. However you use it is totally up to you! :)

```scss
.thing {
    @include v(background-color, desert);
    @include v(color, brick);
    border: v(measure, small) solid v(color, plankton);
    padding: v(measure, medium) v(measure, large);
    @include v(z-index, above);
    opacity: var(--opacity-alpha);
    // 1. if you just want the raw value, this is not really recommended:
    text-decoration-color: map-get(map-get($bowhead-tokens, "color"), "brick");
    // 2. this does the same for you:
    text-decoration-color: v(color, brick, true);
    // 3. so does this, although it includes the CSS Variable too:
    @include v(text-decoration-color, brick, true);
}
```

will generate…

```css
.thing {
    background-color: #d2b48c;
    background-color: var(--color-desert);
    color: #b22222;
    color: var(--color-brick);
    border: var(--measure-small) solid var(--color-plankton);
    padding: var(--measure-medium) var(--measure-large);
    z-index: 2;
    z-index: var(--z-index-above);
    opacity: var(--opacity-alpha);
    /* 1 */
    text-decoration-color: #b22222;
    /* 2 */
    text-decoration-color: #b22222;
    /* 3 */
    text-decoration-color: #b22222;
    text-decoration-color: var(--color-brick);
}
```

## Extras

Need a negative value? Use `calc()`:

```scss
.thing {
    margin-left: calc(#{v(measure, medium)} * -1);
}
```

Combining values? Same idea:

```scss
.thing {
    margin-left: calc(#{v(measure, medium)} + #{v(measure, small)});
}
```

What about multiple values in a function? Just make sure you're using the *raw* values from the `v()` function:

```scss
.thing {
    background-color: rgba(v(color, desert, true), v(opacity, alpha, true));
}
```
```
