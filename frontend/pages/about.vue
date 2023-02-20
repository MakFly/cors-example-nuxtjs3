<script setup>

const resError = ref({});
const { data, pending, error } = await useFetch('/api/data');

if (error.value != null) {
    resError.value = { message: "Error fetching data" };
}

</script>

<template>
    <NuxtExampleLayout example="composables/use-fetch">
        <div>
            Fetch result:
            <p>
                <NuxtLink to="/">back</NuxtLink>
            </p>
            <pre class="text-left">
                            <code>
                                <p v-if="data">{{ data }}</p>
                                <p v-else="error">{{ resError }}</p>
                            </code>
                    </pre>
        </div>
    </NuxtExampleLayout>
</template>
  