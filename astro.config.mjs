// @ts-check
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import netlify from '@astrojs/netlify/functions';

dotenv.config();

// https://astro.build/config
export default defineConfig({  
    output: 'server',
    adapter: netlify({}),
});