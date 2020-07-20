<!--
  EKSPLEIN (/ɛkˈspleɪn/) is a simple and stupid glossary-like blog
  in which things are explained 
  Copyright (C) 2020  Tom Bazarnik and the contributors

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<script>
  import Header from '../components/Header.svelte'
  export let segment
</script>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    min-height: 100vh;
  }

  main {
    flex: 1;
    position: relative;
    margin: 0 auto;
    max-width: 1400px;
    background-color: white;
    padding: 1em 2em;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  footer {
    color: #AAA;
    font-size: 1em;
    font-family: Rubik, sans-serif;
    margin: 1em auto;
    max-width: 1400px;
    padding: 1em 2em;
    text-align: center;
    width: 100%;
  }

  .license {
    vertical-align: sub;
    height: 22px;
    filter: grayscale(1);
    margin-right: 8px;
  }
</style>

<div class="layout">
  <Header {segment}/>

  <main>
    <slot></slot>
  </main>

  <footer>
    <a target="_blank" href="http://www.gnu.org/licenses/gpl-3.0.en.html"><img class="license" alt="GNU General Public License v3.0" src="https://www.gnu.org/graphics/gplv3-88x31.png" /></a>
    <span>
      &copy; {new Date().getFullYear()} Tom Bazarnik and the contributors.
    </span>
  </footer>
</div>
