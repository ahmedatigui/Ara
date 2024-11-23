<script setup lang="ts">                                                                   
useHead({                                                                                  
  title: 'About Us',                                                                       
  meta: [                                                                                  
    { name: 'description', content: 'Learn more about our company, mission, and values.' } 
  ]                                                                                        
});                                                                                        
</script>
<template>
  <div class="about-page">
    <h1>About Us</h1>
    <p>Welcome to our About page. Here you can find information about our company, mission, and values.</p>
    <section>
      <h2>Our Mission</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed,
        convallis ex.</p>
    </section>
    <section>
      <h2>Our Values</h2>
      <ul>
        <li>Value 1: Lorem ipsum dolor sit amet.</li>
        <li>Value 2: Sed sit amet nulla auctor.</li>
        <li>Value 3: Vestibulum magna sed, convallis ex.</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.about-page h1 {
  color: #333;
  margin-bottom: 20px;
}

.about-page section {
  margin-bottom: 40px;
}

.about-page section h2 {
  color: #666;
  margin-bottom: 10px;
}

.about-page ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.about-page li {
  margin-bottom: 10px;
}
</style>
