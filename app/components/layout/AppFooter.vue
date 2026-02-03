<template>
    <UFooter>
        <div class="text-center text-xs">
            <pre class="inline">
                v{{ version }}
            </pre>

            <div>
                Created by
                <ULink
                    to="https://ghartemann.fr"
                    target="_blank"
                >
                    ghartemann
                </ULink>
                © {{ year }}
            </div>
        </div>
    </UFooter>
</template>

<script setup>
import v from '~~/version.json';

const version = ref(v.version);

const year = new Date().getFullYear();
</script>

<style scoped>

</style>
