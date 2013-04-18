# ==========================================================================
# Project:   Forms
# Copyright: @2012 My Company, Inc.
# ==========================================================================

# This is your Buildfile, which sets build settings for your project.
# For example, this tells SproutCore's build tools that EVERYTHING
# requires the SproutCore framework.
config :all, :required => :sproutcore

# In addition to this Buildfile, which gives settings for your entire project,
# each of your apps has its own Buildfile with settings specific to that app.

mode :debug do
  config :all,
    :combine_javascript => false,
    :combine_stylesheet => true
end

mode :production do
  config :all, :url_prefix => "/forms/_design/data"
end

config :all, :html5_manifest => true

#proxy '/', :to => 'dat.iriscouch.com', :timeout => 30000
proxy '/', :to => 'localhost:5984', :timeout => 30000
#proxy '/forms', :to => 'localhost:5984', :timeout => 3000
#proxy '/_uuids', :to => 'localhost:5984', :timeout => 3000# 

#proxy '/forms-dev', :to => 'dat.iriscouch.com', :timeout => 3000