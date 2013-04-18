iDAT
====

iDAT is a web application for completing Red Cross casework electronically using any web browser, replacing the existing "901" and "1030" forms.  It is especially designed to be easy to use portably on a tablet such as an iPad, and work even with an intermittent internet connection, as may be observed on the scene of a disaster.  

Using iDAT, 30+ minutes of handwritten paperwork can be reduced to 5-10 minutes on a tablet, and iDAT ensures that all data is collected and formatted, and even validates that financial assistance is issued and accounted for correctly.  Once the incident is complete, iDAT outputs printed forms that look near-identical (except neater) to the original, handwritten versions, so as to integrate with existing Red Cross processes.

iDAT is currently designed to handle Disaster Action Team work for small-scale disasters, but I hope to look at ways to expand its applicability to larger events as well. 

Behind the Scenes
-----------------

The iDAT application itself is built on [Sproutcore](/sproutcore/sproutcore), an HTML5/Javascript framework for building entire applications in the browser.  [CouchDB](http://couchdb.apache.org) provides the backend database, and PouchDB is used as a CouchDB-like layer in the browser, allowing the application to work independently of whether there is an internet connection to the main database.  PouchDB takes care of ensuring that everything is synced when the connection is up.

Development and Deployment
--------------------------

To deploy iDAT: 

1. Install or locate a CouchDB server.  You can install one locally, perhaps through Homebrew, or use a service such as [IrisCouch](http://www.iriscouch.com).  
2. Create a file called ```build-private.sh``` with the following contents (insert your own values here):

        SERVER="http://username:password@couchservername:port"
        DATA_DB="idat-dbname"
3. Run `./build.sh`, this will pre-fill information such as the price list to that database.

4. Create a CouchDB user, ensuring that it has permissions to access the database you designated above, and add a field `database: "idat-dbname"` to the user definition.  This allows different users to access different sets of incident data.
    * [CouchDB Wiki on Authentication](http://wiki.apache.org/couchdb/Security_Features_Overview)
    
5. Start the sproutcore build server with `sc-server`, or navigate to `http://servername:port/forms/_design/data/index.html`

Todo
----

Things to work on and ideas for improvements:

* Translate the client-facing screens - Spanish, Chinese, Vietnamese
* Add a wizard-style workflow for collecting data
* Test iDAT across IE/Firefox/Chrome/Safari
* Fix navigation on Android devices
* Improve theming
* Move more configuration to per-chapter/service delivery unit
    * Price List
    * Select fields
* Prompt for chapter when creating an incident
* Better authentication/data security
* Implement printing in the original 901 format for chapters that use those.