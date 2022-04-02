import typedoc from 'gulp-typedoc'
import { task, src } from 'gulp'

task('typedoc', function () {
	return src(['src/**/*.ts']).pipe(
		typedoc({
			out: 'docs/',
			name: 'API Server Documentation',
		})
	)
})
