source "https://rubygems.org"

# This will help ensure the proper Jekyll version is running.
gem "jekyll", "~> 3.9.0"

# This is the default theme
gem "minima", "~> 2.5"

# Required for GitHub Pages
gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.6"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock kramdown version for security
gem "kramdown", ">= 2.3.0" 