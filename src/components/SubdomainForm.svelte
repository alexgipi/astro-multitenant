<script lang="ts">
    import EmojiPicker from "@/components/EmojiPicker.svelte";
    export let protocol = "http";
    export let rootDomain = "localhost:4321";

    let selectedEmoji: string;
    let subdomain: string;

    let message: string;
    let messageType: string;

    async function submit(e: SubmitEvent) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const response = await fetch("/api/tenants", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();

        message = data?.message
        
        messageType = data.ok ? "success" : "error";

        if(data.ok){
            window.location.href = `${protocol}://${data.doc.subdomain}.${rootDomain}`;
        }
        
    }
</script>

<form class="space-y-4" on:submit={submit}>
    <div class="space-y-2">
        <label
            data-slot="label"
            class="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            for="subdomain"
        >
            Subdomain
        </label>
        <div class="flex items-center">
            <div class="relative flex-1">
                <input
                    bind:value={subdomain}
                    data-slot="input"
                    class="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full rounded-r-none focus:z-10"
                    id="subdomain"
                    placeholder="your-subdomain"
                    required
                    name="subdomain"
                />
            </div>
            <span class="bg-gray-100 px-3 border border-l-0 border-input rounded-r-md text-gray-500 min-h-[36px] flex items-center">
                .{rootDomain}
            </span>
        </div>
    </div>

    <div class="space-y-2">
        <label
            data-slot="label"
            class="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            for="icon"
        >
            Icon
        </label>

        <div class="flex flex-col gap-2">
            <EmojiPicker bind:selectedEmoji={selectedEmoji}  />

            <p class="text-xs text-gray-500">
                Select an emoji to represent your subdomain
            </p>
        </div>
    </div>

    
    {#if message}
        <p 
        class="text-sm 
        {messageType === 'success' ? 'text-green-500' : 'text-red-500'}">
            {message}
        </p>
    {/if}

    <button
        data-slot="button"
        class="inline-flex bg-black text-white items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 w-full"
        type="submit"
        disabled={!subdomain || !selectedEmoji}
    >
        Create Subdomain
    </button>
</form>
