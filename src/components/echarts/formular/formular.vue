<template>
  <div>
    <div
      v-for="(pair, index) in formula"
      :key="index"
      class="formula-row"
      :style="{ '--right-length': right_length, '--left-length': left_length }"
    >
      <span class="formula-left" v-html="pair[0]"></span>
      <span class="formula-equal">=</span>
      <span class="formula-right" v-html="pair[1]"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Formula",
  props: {
    formula: {
      type: Array,
      required: true,
    },
    right_length: {
      type: Number,
    },
    left_length: {
      type: Number,
    },
  },
};
</script>

<style>
.formula-row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  align-items: flex-start; /* 上对齐 */
}
/* span {
  border: 1px solid #ddd;
} */

.formula-left {
  flex: var(--left-length, 0.2);
  text-align: left;
  margin-right: 5px;
  margin-left: 10px;
  vertical-align: top; /* 文字向上对齐 */
}

.formula-equal {
  width: 10px;
  vertical-align: top; /* 文字向上对齐 */
  text-align: center;
  margin-right: 5px;
}

.formula-right {
  flex: var(--right-length, 3);
  text-align: left;
  vertical-align: top; /* 文字向上对齐 */
}
</style>
