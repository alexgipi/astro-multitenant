<script lang="ts">
  import * as Popover from "$lib/components/ui/popover/index.js";

  // Types
  type EmojiSet = {
    type: string;
    minVal: number;
    maxVal: number;
  };

  let emojiSets: EmojiSet[] = [
    { type: "faces", minVal: 128512, maxVal: 128580 },
    { type: "faces2", minVal: 129296, maxVal: 129327 },
    { type: "body", minVal: 128066, maxVal: 128080 },
    { type: "animals", minVal: 129408, maxVal: 129442 },
    { type: "transport", minVal: 128640, maxVal: 128676 },
    { type: "misc", minVal: 129494, maxVal: 129535 },
  ];

  let selectedSet: number = 0;
  $: min = emojiSets[selectedSet].minVal;
  $: max = emojiSets[selectedSet].maxVal;

  // storage of emojis to make emoji keyboard
  let emojis: string[] = [];

  $: for (let i = min; i <= max; i++) {
    emojis = [...emojis, String.fromCodePoint(i)];
  }

  const clearEmojiMenu = () => (emojis = []);

  const chooseEmojiSet = (e: Event): void => {
    const target = e.target as HTMLElement;
    selectedSet = Number(target.dataset.id);
    clearEmojiMenu();
  };

  // Header on emoji keyboard to select different emoji sets
  let setIcons: number[] = [128512, 129313, 128074, 129417, 128664, 129504];

  // Emoji icon to open modal of emojis
  let emojiIcon: string = String.fromCodePoint(128571);

  export let selectedEmoji: string = "";

  const addEmoji = (e: any): void => {
    selectedEmoji = e.target.textContent;
  };
</script>

<Popover.Root>
  <div class="flex items-center gap-2">
    <div
      data-slot="card"
      class="bg-card text-card-foreground gap-6 shadow-sm flex-1 flex flex-row items-center justify-between p-2 border border-input rounded-md"
    >
      <div
        class="min-w-[40px] min-h-[40px] flex items-center pl-[14px] select-none"
      >
            {#if selectedEmoji}
                <span class="text-gray-400 text-2xl font-normal">
                    {selectedEmoji}
                </span>
            {:else}
                <span class="text-gray-400 text-sm font-normal">
                    No icon selected
                </span>
            {/if}
        
      </div>

      <Popover.Trigger>
        <button
          data-slot="popover-trigger"
          class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 gap-1.5 px-3 has-[>svg]:px-2.5 ml-auto rounded-sm"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-«r0»"
          data-state="closed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-smile h-4 w-4 mr-2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" x2="9.01" y1="9" y2="9"></line>
            <line x1="15" x2="15.01" y1="9" y2="9"></line>
          </svg>
          Select Emoji
        </button>
      </Popover.Trigger>
    </div>
  </div>

  <Popover.Content class="p-0">
    <div class="emojipicker-tabs flex h-9 items-center border-b">
      {#each setIcons as icon, i}
        <button
          data-slot="emoji-picker-search-wrapper"
          class="emojipicker-tabs__btn cursor-pointer flex h-9 justify-center items-center gap-2 flex-1 border-r last:border-r-0"
          on:click={chooseEmojiSet}
          data-id={i}
        >
          {String.fromCodePoint(icon)}
        </button>
      {/each}
    </div>

    <div class="emojipicker-viewport">
      {#each emojis as emoji}
        <span on:click={addEmoji}>{emoji}</span>
      {/each}
    </div>

    <div
      class="max-w-(--frimousse-viewport-width) flex w-full min-w-0 items-center gap-1 border-t p-2"
      data-slot="emoji-picker-footer"
    >
      <span
        class="text-muted-foreground ml-1.5 flex h-7 items-center truncate text-xs"
        >Select an emoji…</span
      >
    </div>
  </Popover.Content>
</Popover.Root>

<input type="hidden" name="icon" value={selectedEmoji} />
<style>
  .emojipicker-viewport {
    padding: 6px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    max-height: 174px;
    overflow: auto;

    & span {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      min-width: 29px;
      aspect-ratio: 1;
      line-height: 1;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #e5e5e580;
      }
    }
  }

  .emojipicker-tabs__btn {
    /* border-right: 1px solid #e5e5e580; */

    /* &:last-child {
        border-right: none;
    } */
  }
</style>
