import { chatHistory } from "$lib/Store";
import { env } from '$env/dynamic/public';

export default class Fetcher {
    private static request(url: string) {
        return fetch(url, {
            method: 'GET',
            mode:'cors',
            headers: {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Authorization': "Bearer UwUMelio666",
            },
            redirect: 'follow'
        })
        .then((response) => response.text())
        .then((result) => {return result})
        .catch((error) => console.error(error));
    }

    public static ask(msg: string) {
        return this.request('https://openrobo-api.chausson.services/ask?smiley=yes&question='+msg);
    }
    
    public static listen() {
        const evtSource = new EventSource("https://openrobo-api.chausson.services/listen-messages?token="+env.PUBLIC_TOKEN);

        evtSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                chatHistory.update(chats => ([...chats, {content: data.content, sender: data.sender}]));
            } catch (e) {
                console.error("Error", e);
            }
        };
    }
}