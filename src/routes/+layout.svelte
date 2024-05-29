<script>
    import "../app.css";

    // @ts-ignore
    import { pwaInfo } from 'virtual:pwa-info';

    $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '<link rel="manifest" href="/manifest.json" />';
</script>

<svelte:head> 
 	{@html webManifestLink}
</svelte:head>
  
<slot />