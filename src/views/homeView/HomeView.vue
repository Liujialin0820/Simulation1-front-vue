<template>
  <div class="welcome-page">
    <h1 style="text-align: center">Lifetime Well-being Simulation</h1>

    <div class="desc">
      <p>A model of member lifetime well-being is needed for:</p>
      <br />

      <ol
        style="list-style-type: decimal; padding-left: 15px; line-height: 1.5"
      >
        <li>
          <strong>Benchmarking:</strong> To benchmark the lifetime income
          products of different super funds and insurers.
        </li>
        <li>
          <strong>Product design:</strong> Design a suite of lifetime income
          products for the Fund;
        </li>
        <li>
          <strong>Advice:</strong> Determine the best combination of income
          sources (Aged pension + Account based pension + Lifetime income
          products + Home equity access) for members, in the provision of
          advice.
        </li>
      </ol>
      <p>
        This website is designed to simulate the lifetime well-being of members
        in retirement.
      </p>

      <h2><a href="/sone">In Simulation 1 :</a></h2>
      <ul>
        <li>
          The representative member has their superannuation (pension fund)
          invested in the standard product.
        </li>
        <li>
          The representative member is single female, 67 years, with a balance
          of $300k.
        </li>
      </ul>

      <h2><a href="/stwo">In Simulation 2 :</a></h2>
      <ul>
        <li>
          Everything in the model is the same as Simulation 1, except for the
          following:
        </li>
        <li>
          The return on the members balance each year, rt, is now inflation + 1%
          guaranteed by the superannuation fund.
        </li>
        <li>
          That is, Simulation 2 is the same as Simulation 1 except that return
          is now not its own draw from a normal distribution, but instead
          <code>rt = Inft + 0.01</code>.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.welcome-page {
  width: 800px;
  margin: 0 auto; /* Center the content horizontally */
  margin-top: 50px;
}

.welcome-page h1 {
  font-size: 24px;
}

.desc {
  width: 700px;
  margin-left: 20px;
}

.welcome-page h2 {
  font-size: 20px;
  margin-top: 20px;
  text-align: left;
}

.welcome-page p {
  font-size: 18px;
  margin-top: 20px;
  color: #333;
}

.welcome-page ul {
  list-style-type: disc;
  margin-left: 20px;
  text-align: left;
}
</style>
