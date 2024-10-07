<template>
    <div class="phone-input">
        <input
            type="text"
            :placeholder="placeHolder"
            :value="modelValue"
            @input="updateValue"
        />
    </div>
</template>

<script setup lang="ts">

// Import necessary functions
import { defineProps, ref, onMounted, nextTick } from 'vue';

// Default locale
const DEFAULT_LOCALE = "en-US";

// Define emits
const emit = defineEmits(['update:modelValue']);

// Define placeholder
const placeHolder = ref("Phone number");
// Check locale
onMounted(() => {
    const locale = navigator.language || navigator.languages[0];  
    // Browser locale is default
    if (locale === DEFAULT_LOCALE) {
        placeHolder.value = "+1 (123) 456-7890";
    }
});

/**
 * Props for PhoneInput component
 */
const props = defineProps({
    /**
     * The value of the input
     * @type {string}
     */
    modelValue: {
        type: String,
        default: ""
    }
});

/**
 * Update value that only allows digits, spaces and (, ), -, + characters
 */ 
const updateValue = (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    const cursorPosition = inputElement.selectionStart;
    const oldValue = inputElement.value;
    const newValue = oldValue.replace(/[^\d\s,+-]/g, '');

    // Emit the sanitized value
    emit('update:modelValue', newValue);

    // Set the input value and cursor position
    nextTick(() => {
        inputElement.value = newValue;
        const newCursorPosition = cursorPosition - (oldValue.length - newValue.length);
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    });
};

</script>

<style lang="less" scoped>
.phone-input {
    input {
        padding: 0.5rem;  
        font-size: 1.25rem;      
        border-radius: 0.25rem;
    }
}
</style>
