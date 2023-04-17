# @marianmeres/emoji-fns

[Twemoji](https://twemoji.twitter.com/) and 
[Openmoji](https://openmoji.org/) emoji svgs wrapped as functions with customization 
arguments returning svg string. Each icon function lives in a separate file and is typed. 
Note that only default skin-tone is provided.

It's worth emphasizing, that all credit (and copyright) belongs to:
- [Twemoji](https://twemoji.twitter.com/)
- [Openmoji](https://openmoji.org/)

Thanks for the amazing work.

## Install
```shell
npm i @marianmeres/emoji-fns
```

## Usage

[Twemoji](https://twemoji.twitter.com/) are prefixed with `twemoji` 
and [Openmoji](https://openmoji.org/) with `openmoji`.

Signature for all functions is:

```typescript
prefixEmojiName(cls?: string, size?: number, style?: string): string;
```

Where emoji names are build from `CLDR Short Name` data from
https://unicode.org/emoji/charts/full-emoji-list.html

So the actual usage example may look like:

```javascript
import { twemojiAlarmClock } from "@marianmeres/emoji-fns";

// all arguments are optional and size defaults to original (twemoji 36, openmoji 72)
const svg = twemojiAlarmClock('inline-block', 32, "margin: 10px;");

// svg now contains:
// <svg class='inline-block' width="32" height="32" style="margin: 10px;" ... >...</svg>
```

All functions are typed, so your IDE intellisense should work.

## Related
- https://github.com/marianmeres/emoji-list
- https://github.com/marianmeres/icons-fns