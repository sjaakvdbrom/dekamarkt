<style>
  @import "normalize.css";

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter';
  }

  .container {
    margin: 0 auto;
    max-width: 1200px;
  }

  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }
</style>

<template>
  <div class="container">
    <h1>Homepage</h1>
    <p>Navigeer naar een categorie pagina door gebruik te maken van de volgende url structuur: url/[group]/[subgroup].</p>
    <p>Bijvoorbeeld: <NuxtLink to="/55/103" class="nav-link">Koeken</NuxtLink></p>
  </div>
</template>
