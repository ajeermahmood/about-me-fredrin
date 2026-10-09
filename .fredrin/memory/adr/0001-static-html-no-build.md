# 0001: Static HTML and CSS, no framework, no build

Status: accepted

## Decision

The page is `site/index.html` and `site/styles.css`. No framework, no bundler, no
JavaScript, no dependencies.

## Why

It is one page of text. A framework would add a build step, a lockfile and a class of
failures that have nothing to do with the content, and every one of them is something
a Worker could get wrong. Static files can be hosted anywhere and checked by reading
them.

## Consequences

Layout is plain CSS. The acceptance check reads HTML with simple pattern matching,
which is enough because the markup is ours and stays small. If the page ever needs
interactivity, write a new decision record first.
