const regex_emoji = /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]+/gu;
const emoji_map: Map<string, string> = new Map([]);

const emojis: {[key: string]: string} = {
    "😄😃😀😊😁": "grin",
    "😂🤣😆": "laught",
    "😠😡👿🤬☹️🙁": "angry",
    "😞😔😟😕😢": "sad",
    "😅😓": "sweat",
};

for (const key in emojis) {
    for (const emoji of key)
        emoji_map.set(emoji, emojis[key]);
}

export default class Emojis {
    public static getAnimationByEmoji(msg: string) {
        const fetchedEmojis = msg.match(regex_emoji)

        if (fetchedEmojis != undefined && fetchedEmojis.length > 0)
            return emoji_map.get(fetchedEmojis[0]);
        return null;
    }
}