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

<style lang="scss">
  .home-container {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
    margin: 2em 0;
    min-height: 400px;
  }
  .home-copy {
    flex: 1;
  }
  @media (max-width: 800px) {
    .home-container {
      flex-direction: column;
    }

    .home-copy {
      flex: 0;
      padding-bottom: 2em;
    }
  }
</style>

<script>
    import { titleStyles } from '../components/styles'
    export let name: string = 'Eksplein.me'
</script>

<svelte:head>
  <title>Eksplein.me</title>
</svelte:head>

<div class="home-container">
  <div class="home-copy">
    <h1 class={titleStyles}>Welcome to {name}</h1>
  </div>
</div>
