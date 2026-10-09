# 0002: The facts file is the only source of claims

Status: accepted

## Decision

Every claim, number and external link on the page comes from `content/facts.md`. The
acceptance check fails on any number or link that is not in that file.

## Why

A coding agent writing about a person has every incentive to sound impressive and no
way to know what is true. An instruction not to invent things is a request. A check
that fails the build on an unknown number is a guarantee. This page is about someone
whose work is making that distinction, so it should be built that way.

## Consequences

Changing a fact means editing `content/facts.md` first, in a reviewed pull request.
A Worker that needs a fact the file does not have parks the ticket in Blocked and asks.
