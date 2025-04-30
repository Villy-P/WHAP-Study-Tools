<script lang="ts">
    import { page } from '$app/stores'
  
    $: {
        if (typeof gtag !== 'undefined') {
            gtag('config', 'MEASUREMENT_ID', {
                page_title: document.title,
                page_path: $page.url.pathname,
            })
        }
    }

    const MEASUREMENT_ID = "G-M5CYWKTJF7";
    const ANALYTICS_URL = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
</script>
  
<svelte:head>
    <script async src={ANALYTICS_URL}></script>
    <script>
        window.dataLayer = window.dataLayer || []
        const MEASUREMENT_ID = "G-M5CYWKTJF7"
    
        function gtag() {
            dataLayer.push(arguments)
        }
    
        gtag('js', new Date())
        gtag('config', MEASUREMENT_ID)
    </script>
</svelte:head>