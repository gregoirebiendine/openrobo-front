<script lang="ts">
    import { onMount } from "svelte";
    import type { LottiePlayer } from "@lottiefiles/lottie-player";

    import Fetcher from "$lib/Fetcher";
    import Emojis from "$lib/Emojis";
    import { chatHistory } from "$lib/Store";

    let lottiePlayer: LottiePlayer;
    let textareaElement: HTMLTextAreaElement;

    onMount(() => {
        Fetcher.listen();
    });

    function playAnimation(message: string) {
        const anim = Emojis.getAnimationByEmoji(message);

        if (anim === null)
            return;
        lottiePlayer.load(`/anims/${anim}.json`);
        lottiePlayer.setLooping(false);
    }

    chatHistory.subscribe(chats => {
        const lastChat = chats[chats.length - 1];
        if (lastChat != undefined && lastChat.sender === "assistant")
            playAnimation(lastChat.content);
    });

    function sendMessageToRobo() {
        const msg = textareaElement.value;

        Fetcher.ask(msg);
        textareaElement.value = "";
    }
</script>

<main class="w-full h-screen flex flex-col justify-start items-center bg-[#2d2d2d]">
    <!-- Robot Head -->
    <div class="relative mt-4">
        <img class="w-[300px]" src="/robot-frame.svg" alt="robot" />
        
        <lottie-player
            bind:this={lottiePlayer}
            class="absolute top-[33%] left-[22.5%] z-10"
            src="/anims/loading.json"
            background="transparent"
            speed="1"
            style="width: 164px; height: 164px"
            direction="1"
            mode="normal"
            loop
            autoplay
        />
    </div>

    <!-- Chat -->
    <div class="w-[92%] xl:w-[60%] h-[60%] flex flex-col justify-center items-center absolute bottom-4 gap-6">
        <div id="chatHist" class="w-full h-full flex flex-col justify-end overflow-y-hidden mask-opacity">
            {#each $chatHistory as chat}
                <div class="flex flex-col mt-4">
                    <p class="font-bold">{chat.sender === "user" ? "You" : "OpenRobo"}</p>
                    <p>{chat.content}</p>
                </div>
            {/each}
        </div>

        <hr class="w-full opacity-50">

        <div class="w-full flex flex-row justify-center items-center gap-4">
            <textarea bind:this={textareaElement} rows="1" placeholder="Ask something to OpenRobo"></textarea>
    
            <button on:click={sendMessageToRobo} class="w-[42px] h-[42px] bg-white rounded-lg flex justify-center items-center">
                <svg class="color-[#2d2d2d]" xmlns="http://www.w3.org/2000/svg" width="18.528" height="23.621" viewBox="0 0 18.528 23.621">
                    <g id="Groupe_1" data-name="Groupe 1" transform="translate(-90.736 -87.879)">
                      <line id="Ligne_1" data-name="Ligne 1" y1="20" transform="translate(100 90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/>
                      <line id="Ligne_2" data-name="Ligne 2" y1="10" transform="translate(99.928 90) rotate(45)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/>
                      <line id="Ligne_3" data-name="Ligne 3" y1="10" transform="translate(100.072 90) rotate(-45)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/>
                    </g>
                </svg>
            </button>
        </div>
    </div>
</main>

<style lang="postcss">
    textarea {
        @apply w-full resize-none p-2 bg-transparent border border-white border-opacity-60 rounded-lg outline-none focus-within:border-opacity-90 text-white;
    }

    #chatHist p {
        @apply text-white text-lg;
    }

    .mask-opacity {
        mask-image: linear-gradient(to top, black 40%, transparent 100%);
    }
</style>