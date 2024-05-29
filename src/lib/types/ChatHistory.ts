export default interface ChatHistory {
    content: string;
    sender: 'user' | 'assistant';
}