lint: lint-jscs lint-eslint
	@echo "All lints passing"

lint-jscs:
	@./node_modules/.bin/jscs -c .jscsrc lib tests

lint-eslint:
	@./node_modules/.bin/eslint -c .eslintrc lib tests  --ext .js,.jsx

test:
	@npm test

test-watch:
	@npm run test-watch