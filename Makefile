build:
	npm run build
	mkdir -p docs
	cp index.html docs/
	cp -a dist docs/
