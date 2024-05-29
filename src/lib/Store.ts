import { writable } from 'svelte/store';
import type ChatHistory from "$lib/types/ChatHistory";

export const chatHistory = writable([] as ChatHistory[]);