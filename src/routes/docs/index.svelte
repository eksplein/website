<script context="module">
    /**
     * EKSPLEIN (/ɛkˈspleɪn/) is a simple and stupid glossary-like blog
     * in which things are explained
     * Copyright (C) 2020  Tom Bazarnik and the contributors
     *
     * This program is free software: you can redistribute it and/or modify
     * it under the terms of the GNU General Public License as published by
     * the Free Software Foundation, either version 3 of the License, or
     * (at your option) any later version.
     *
     * This program is distributed in the hope that it will be useful,
     * but WITHOUT ANY WARRANTY; without even the implied warranty of
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     * GNU General Public License for more details.
     *
     * You should have received a copy of the GNU General Public License
     * along with this program.  If not, see <http://www.gnu.org/licenses/>.
     */
    export function preload({ params, query }) {
        return this.fetch(`docs.json`).then(r => r.json()).then(files => {
            return { files };
        });
    }
</script>

<script lang="ts">
    export let files
    import { onMount } from 'svelte'
    import {AST_NODE_TYPES} from '@typescript-eslint/types'
    let value = JSON.parse(JSON.stringify(files).replace(/<\/script>\\r/g, '%3C%2Fscript%3E%5Cr'))
    let JSONTree
    const NODE_TYPES = AST_NODE_TYPES

    onMount(async () => {
        const drawer = document.querySelector('.drawer-placement-left')
        const openButton = document.querySelector('#drawer-open')
        const closeButton = drawer.querySelector('#drawer-close')
        const module = await import('svelte-json-tree')
        JSONTree = module.default
        openButton.addEventListener('click', () => drawer.show())
        closeButton.addEventListener('click', () => drawer.hide())
    })
</script>

<style lang="scss">
    .skeleton-paragraphs {
        sl-skeleton {
            margin-bottom: 1rem;

            :nth-child(2) {
                width: 95%;
            }

            :nth-child(4) {
                width: 90%;
            }

            :last-child {
                width: 50%;
            }
        }
    }

    .avatar {
        border-radius: var(--sl-border-radius-circle);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: var(--size);
        height: var(--size);
        font-family: var(--sl-font-sans);
        font-size: calc(var(--size) * 0.5);
        font-weight: bold;
        color: var(--sl-color-white);
        overflow: hidden;
        user-select: none;
        vertical-align: text-top;
        margin-right: 7px;

        &.is-class {
            background-color: #FFBAD1;
            color: #D6285C;
        }
        &.is-enum {
            background-color: #FEEB9E;
            color: #FE9A2D;
        }
        &.is-file {
            background-color: #FFA0BC;
            color: #D6285C;
        }
        &.is-method {
            background-color: #CCFF99;
            color: #009900;
        }
        &.is-constant {
            background-color: #BCA178;
            color: #604E3A;
        }
        &.is-property {
            background-color: #70EFD8;
            color: #37919B;
        }
    }

    .button {
        display: inline-flex;
        align-items: stretch;
        justify-content: center;
        width: inherit;
        border-style: solid;
        border-width: var(--sl-input-border-width);
        font-family: var(--sl-input-font-family);
        font-weight: var(--sl-font-weight-semibold);
        user-select: none;
        white-space: nowrap;
        vertical-align: middle;
        transition: var(--sl-transition-fast) background-color, var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;
        cursor: inherit;
        font-size: var(--sl-button-font-size-medium);
        height: var(--sl-input-height-medium);
        line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
        border-radius: var(--sl-input-border-radius-medium);
        padding: 0 var(--sl-spacing-large);
        background-color: var(--sl-color-white);
        border-color: var(--sl-color-gray-80);
        color: var(--sl-color-gray-40);

        &:hover:not(:disabled) {
            background-color: var(--sl-color-primary-95);
            border-color: var(--sl-color-primary-80);
            color: var(--sl-color-primary-40);
        }

        &:focus:not(:disabled) {
            background-color: var(--sl-color-primary-95);
            border-color: var(--sl-color-primary-70);
            color: var(--sl-color-primary-40);
            box-shadow: 0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-primary-hue), var(--sl-color-primary-saturation), 50%, var(--sl-focus-ring-alpha));
        }
    }
</style>

<svelte:head>
    <title>Documentation</title>
</svelte:head>

<div class="container">
    <h1>Documentation</h1>
    <p>This is the place where frontend collaborators can see what are the available classes and methods, and how to use these.</p>
    <sl-drawer no-header label="Documentation" placement="left" class="drawer-placement-left" style="position: relative;">
        <sl-button id="drawer-close" style="position: absolute; right: 25px; z-index: 99;" type="default" size="medium" circle><sl-icon name="x"></sl-icon></sl-button>
        <sl-menu>
            {#each files as file, index}
                {#if file.ast && file.ast.length > 0}
                    <sl-menu-label>{file.path}</sl-menu-label>
                    {#each file.ast as element}
                        {#if element.valueType === NODE_TYPES.ClassDeclaration}
                            <sl-menu-item value="">
                                <div class="avatar is-class" style="--size: 24px;">C</div>
                                <span>{element.identifier}</span>
                            </sl-menu-item>
                            {#each element.properties as property}
                                <sl-menu-item value="" style="padding-left: 25px;">
                                    <div class="avatar is-property" style="--size: 24px;">P</div>
                                    <span>{property.key.name}</span>
                                </sl-menu-item>
                            {/each}
                            {#each element.methods as method}
                                <sl-menu-item value="" style="padding-left: 25px;">
                                    <div class="avatar is-method" style="--size: 24px;">M</div>
                                    <span>{method.key.name}</span>
                                </sl-menu-item>
                            {/each}
                        {/if}
                        {#if element.valueType === NODE_TYPES.TSEnumDeclaration}
                            <sl-menu-item value="">
                                <div class="avatar is-enum" style="--size: 24px;">E</div>
                                <span>{element.identifier}</span>
                            </sl-menu-item>
                        {/if}
                        {#if element.valueType === NODE_TYPES.VariableDeclaration}
                            <sl-menu-item value="">
                                <div class="avatar is-constant" style="--size: 24px;">C</div>
                                <span>{element.identifier}</span>
                            </sl-menu-item>
                        {/if}
                    {/each}
                {/if}
            {/each}
        </sl-menu>
    </sl-drawer>

    <button id="drawer-open" class="button button--default button--medium trigger-drawer">Open drawer</button>
    <br><br>
    {#each files as file, index}
        {#if file.ast && file.ast.length > 0}
            <!-- <sl-menu-label>{file.filename}</sl-menu-label> -->
            {#each file.ast as element}
                {#if element.valueType === NODE_TYPES.ClassDeclaration}
                    <h2>
                        <div class="avatar is-class" style="--size: 32px; vertical-align: top;">C</div>
                        <span>{element.identifier}</span>
                    </h2>
                    <p>{@html element.description ? element.description : ''}</p>

                    {#each element.properties as property}
                        <h2>
                            <div class="avatar is-property" style="--size: 32px; vertical-align: top;">P</div>
                            <span>{element.identifier}#{property.key.name}</span>
                        </h2>
                    {/each}
                    {#each element.methods as method}
                        <h2>
                            <div class="avatar is-method" style="--size: 32px; vertical-align: top;">M</div>
                            <span>{element.identifier}.{method.key.name}</span>
                        </h2>
                    {/each}
                {/if}
                {#if element.valueType === NODE_TYPES.TSEnumDeclaration}
                    <h2>
                        <div class="avatar is-enum" style="--size: 32px; vertical-align: top;">E</div>
                        <span>{element.identifier}</span>
                    </h2>
                    <p>{@html element.description ? element.description : ''}</p>
                {/if}
                {#if element.valueType === NODE_TYPES.VariableDeclaration}
                    <h2>
                        <div class="avatar is-constant" style="--size: 32px; vertical-align: top;">C</div>
                        <span>{element.identifier}</span>
                    </h2>
                    <p>{@html element.description ? element.description : ''}</p>
                {/if}
            {/each}
        {/if}
    {/each}
</div>
