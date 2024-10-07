<template>
  <div>
    <NuxtRouteAnnouncer />
    <PhoneInput v-model="phone" />
    <h2>{{ phone }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PhoneInput from "./components/PhoneInput";

const phone = ref("");
</script>
