# @marianmeres/emoji-list

Full list of emojis (data from https://unicode.org/emoji/charts/full-emoji-list.html)
compiled into javascript plain object maps.

Useful for UI emoji search pickers and/or other emoji processing tools.

## key to hex
```javascript
import { emojiKeyMap } from './@marianmers/emoji-list';

// emojiKeyMap contains full key-to-hex map of all emojis
{
    "emojiGrinningFace": "1f600",
    // ... ~1870 records omitted here
    "emojiFlagWales": "1f3f4-e0067-e0062-e0077-e006c-e0073-e007f"
}
```

## hex to key
```javascript
import { emojiCodeMap } from './@marianmers/emoji-list';

// emojiCodeMap contains full hex-to-key map of all emojis
{
    "1f600": "emojiGrinningFace",
    // ... ~1870 records omitted here
    "1f3f4-e0067-e0062-e0077-e006c-e0073-e007f": "emojiFlagWales"
}
```

## groups map (both major and minor)
```javascript
import { emojiKeyToGroupMap, emojiGroupToKeyMap } from './@marianmers/emoji-list';

// emojiKeyToGroupMap contains full key-to-groups [major, minor] map
{
    "emojiGrinningFace": [ "smileys and emotion", "face-smiling" ],
    // ... ~1870 records omitted here
    "emojiFlagWales": [ "flags", "subdivision-flag" ]
}

// emojiGroupToKeyMap contains full group-to-key map
{
    // major group
    "smileys and emotion": [ "emojiGrinningFace", /*...*/ ],
    // ...
	
    // major/minor group
    "smileys and emotion/face-smiling": [ "emojiGrinningFace", /*...*/ ],
    // ...
}
```

## text description
```javascript
import { emojiFulltextMap } from './@marianmers/emoji-list';

// emojifulltextMap contains full key-to-text map of all emojis
{
    "emojiGrinningFace": "grinning face",
    // ... ~1870 records omitted here
    "emojiFlagWales": "flag: Wales"
}
```
