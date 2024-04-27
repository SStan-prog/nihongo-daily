<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import Button from '$lib/components/ui/button/button.svelte';

  export let formRes: any;
  export let questions;
  export let testOver: boolean;
  export let score: number;
</script>

<Dialog.Root bind:open={testOver} closeOnOutsideClick>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{`You scored ${score}/${questions.length}`}</Dialog.Title>
      <Dialog.Description>
        <div class="flex gap-5 mt-4">
          <Button href="/quiz" data-sveltekit-reload>Load New Questions</Button>
          <slot name="restart" />
        </div>
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
