import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {ContentCrawler} from '../src/models/ContentCrawler'

// @ts-ignore
import Bio from '../src/components/Bio.svelte'

const sampleTypeScriptTestSuite = suite('ContentCrawler')

sampleTypeScriptTestSuite('get subfolders from content folder', () => {
	const crawler: ContentCrawler = new ContentCrawler('posts/')
	const dirs = crawler.getDirectories()
	assert.is(dirs.length, 2)
})

sampleTypeScriptTestSuite.run()

const sampleSvelteTestSuite = suite('Bio.svelte')
const ENV: any = require('./setup/env')
sampleSvelteTestSuite.before(ENV.setup)
sampleSvelteTestSuite.before.each(ENV.reset)
sampleSvelteTestSuite('should render Bio.svelte', () => {
	const {container} = ENV.render(Bio)

	assert.is(
		container.innerHTML.includes('Hi, I\'m <strong>Tom</strong>. I\'m a fullstack developer from Paris, France.'),
		true
	)
})

sampleSvelteTestSuite.run()
