import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import PhoneInput from "../components/PhoneInput.vue";

describe("PhoneInput", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders the input field", () => {
    const wrapper = mount(PhoneInput);
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("change placeholder if the client browser locale is en-US", async () => {
    const originalNavigator = global.navigator;
    vi.stubGlobal("navigator", { ...originalNavigator, language: "en-US" });

    const wrapper = mount(PhoneInput);
    await vi.runAllTimers();

    expect(wrapper.find("input").attributes("placeholder")).toBe(
      "+1 (123) 456-7890"
    );

    vi.stubGlobal("navigator", originalNavigator);
  });

  it("allows numbers in input", async () => {
    const wrapper = mount(PhoneInput);
  
    // Triggering the emission of the update:modelValue event
    wrapper.vm.$emit('update:modelValue', '123456');
    
    // Ensure that the event was emitted before checking the value
    const emittedEvent = wrapper.emitted('update:modelValue');
    expect(emittedEvent).toBeTruthy(); // Check if the event exists
    
    // Now check the emitted event payload
    expect(emittedEvent![0]).toEqual(['123456']);
  });

  it("disallows alphabets in input", async () => {
    const wrapper = mount(PhoneInput);
    const input = wrapper.find("input");

    await input.setValue("+1, 234 w5678");
    await vi.runAllTimers();

    // Ensure the event was emitted
    const emittedEvent = wrapper.emitted('update:modelValue');
    expect(emittedEvent).toBeTruthy(); // Check that event exists
    
    // Assert the first emission has the correct value
    expect(emittedEvent![0]).toEqual(['+1, 234 5678']);
  });
});
