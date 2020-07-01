<template functional>
  <q-item>
    <q-item-section>
      <q-item-label>
        <strong>{{ props.label }}</strong>
      </q-item-label>
    </q-item-section>
    <q-chip outline color="primary" text-color="white">
      <slot></slot>
    </q-chip>
  </q-item>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
};
</script>
