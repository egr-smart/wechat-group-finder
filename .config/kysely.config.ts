import {
	DummyDriver,
	PostgresAdapter,
	PostgresIntrospector,
	PostgresQueryCompiler,
} from 'kysely'
import { defineConfig } from 'kysely-ctl'
import { dialect } from '../lib/db/db.ts'

export default defineConfig({
	// replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
	dialect: {
		createAdapter() {
			return dialect.createAdapter();
		},
		createDriver() {
			return dialect.createDriver()
		},
		createIntrospector(db) {
			return dialect.createIntrospector(db)
		},
		createQueryCompiler() {
			return dialect.createQueryCompiler()
		},
	},
	migrations: {
	  migrationFolder: "./migrations",
	},
	//   plugins: [],
	//   seeds: {
	//     seedFolder: "seeds",
	//   }
})
